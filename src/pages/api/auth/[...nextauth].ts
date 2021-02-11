import { auth, db } from 'app-confg'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions, User } from 'next-auth'
import Providers from 'next-auth/providers'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options: InitOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [Providers.GitHub(auth.github), Providers.Google(auth.google)],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //

  // Notes:
  // * You must to install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,
  database: `${db.uri}/${db.dbName}`,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: auth.signSecret,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in pages.
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/api/auth/signin',  // Displays signin buttons
    // signOut: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // signIn: async (user, account, profile) => { return Promise.resolve(true) },
    // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    session: async (session: any, user: any) => {
      // console.log('Session CB')
      // console.log({ session })
      // console.log({ user })

      if (user.id) {
        session.user.id = user.id
      }

      return Promise.resolve(session)
    },
    jwt: async (
      token,
      user: User & { id: string },
      _account,
      _profile,
      _isNewUser
    ) => {
      if (user) {
        //first sign in
        // add user id
        token.id = user.id
      }

      return Promise.resolve(token)
    }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    createUser: async (_user) => {
      /* user created */
      // console.log('user created')
      // console.log({ message: user })
      // // add data to user table
      // const { db } = await connectToDatabase()
      // await db
      //   .collection('users')
      //   .updateOne(
      //     { _id: new ObjectId(user.id) },
      //     { $set: { favorites: [], recent: [] } }
      //   )
    }
  },
  debug: auth.debug
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options)
}
