import { isProduction } from 'app-config'
import { RadioStation } from 'lib/station-utils'
import { Db, ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import { NextApiRequestWithSession } from './middleware'
import { connectToDatabase } from './mongodb-connection'

export type StationCollection = 'favorites' | 'recent'

type UserStationData = { date: string; id: string }

/**
 * Handle uncaught api errors
 */
export function onError(err: any, req: NextApiRequest, res: NextApiResponse) {
  console.log(err)
  res.status(500).json({
    msg: 'Internal Server Error',
    debug: isProduction ? undefined : err.toString()
  })
}

/**
 * Handle 404 api requests
 */
export function onNoMatch(req: NextApiRequest, res: NextApiResponse) {
  res.status(404).json({
    msg: 'Resource not found',
    debug: isProduction
      ? undefined
      : {
          url: req.url,
          query: req.query,
          method: req.method,
          headers: req.headers
        }
  })
}

/**
 * Gets stations for a particular collection
 * @param collection
 * @returns
 */
export function getStations(collection: 'favorites' | 'recent') {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { db } = await connectToDatabase()

    // find the user via session ID (if we are here, session is present)
    const user = await db
      .collection('users')
      .findOne(
        { _id: new ObjectId(req.session!.user.id) },
        { projection: { [collection]: 1 } }
      )

    if (!user) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    let stations = []

    if (user[collection]) {
      // sort the collection by date added
      const sorted = user[collection]
        .sort(
          (a: UserStationData, b: UserStationData) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .map(function (obj: UserStationData) {
          return obj.id
        })

      // query the stations collection for user stations
      let query = [
        { $match: { _id: { $in: sorted } } },
        {
          $addFields: {
            __order: { $indexOfArray: [sorted, '$_id'] }
          }
        },
        { $sort: { __order: 1 } },
        { $project: { __order: 0 } }
      ]

      const cursor = db.collection('stations').aggregate(query)

      stations = await cursor.toArray()

      await cursor.close() //no need to wait
    }

    return res.json(stations)
  }
}

/**
 * Handle saving stations to particular collections
 * @param collection - where to save the station
 */
export function handleSaveStation(collection: StationCollection) {
  return async (
    req: NextApiRequestWithSession,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    const { db, client } = await connectToDatabase()

    const session = client.startSession()
    try {
      await session.withTransaction(async () => {
        if (collection === 'recent') {
          await saveRecentStation(db, req.body, req.session!.user.id)
        } else {
          await saveFavoriteStation(db, req.body, req.session!.user.id)
        }
      })

      return res.status(201).json({ msg: 'Saved' })
    } catch (e) {
      next(e)
      // TODO - log
    } finally {
      session.endSession()
    }
  }
}

/**
 * Deletes station from a particular collection
 * @param collection - name of the collection
 */
export function deleteStation(collection: StationCollection) {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { db } = await connectToDatabase()

    const { id } = req.query

    if (!id) {
      return res.status(400).json({ msg: 'Station ID expected' })
    }
    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(req.session!.user.id) },
        { $pull: { [collection]: { id: id } } }
      )

    return res.status(200).json({ msg: 'deleted' })
  }
}

/**
 * Saves station to stations collection
 * @param db - database collection
 * @param station - station payload
 */
async function saveStation(db: Db, station: RadioStation) {
  return await db
    .collection('stations')
    .updateOne({ _id: station._id }, { $set: station }, { upsert: true })
}

/**
 * Saves recent station
 * @param db - database connection
 * @param station - station payload
 * @param userId  - user id
 */
async function saveRecentStation(
  db: Db,
  station: RadioStation,
  userId: string
) {
  await saveStation(db, station)

  return await db.collection('users').update(
    {
      _id: new ObjectId(userId)
    },
    {
      $addToSet: { recent: { id: station._id, date: new Date() } },
      $set: { lastPlayed: station._id }
    }
  )
}

/**
 * Saves favorite station
 * @param db - database connection
 * @param station - station payload
 * @param userId - user id
 */
async function saveFavoriteStation(
  db: Db,
  station: RadioStation,
  userId: string
) {
  await saveStation(db, station) //todo -move outside

  throw new Error('fav error')
  await db.collection('users').update(
    {
      _id: new ObjectId(userId)
    },
    {
      $addToSet: { favorites: { id: station._id, date: new Date() } }
    }
  )
}

/**
 * Gets last played station for user
 * @param collection
 * @returns
 */
export async function getLastPlayed(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase()

  let lastPlayed = null
  const user = await db
    .collection('users')
    .findOne(
      { _id: new ObjectId(req.session!.user.id) },
      { projection: { lastPlayed: 1 } }
    )

  if (!user) {
    return res.status(401).json({ msg: 'Not authorized' })
  }

  if (user.lastPlayed) {
    lastPlayed = await db
      .collection('stations')
      .findOne({ _id: user.lastPlayed })
  }

  return res.json([lastPlayed])
}
