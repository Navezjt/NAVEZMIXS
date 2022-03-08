import { t, Trans } from '@lingui/macro'
import { stationSearchIndexes, userAgentName } from 'browser-config'
import { AppDefaultLayout } from 'components/layout/AppDefaultLayout'
import { ListStations } from 'components/ListStations'
import { ListStationsFallback } from 'components/ListStationsFallback'
import { PageTitle } from 'components/PageTitle'
import { FilterDataStoreProvider } from 'components/providers/FilterDataStoreProvider'
import { genres } from 'generated/genres'
import {
  createStationListRow,
  dataToRadioDTO,
  RadioDTO,
  stationDataToStationModel
} from 'lib/utils/station-utils'
import {
  loadTranslations,
  paramsWithLocales
} from 'lib/utils/taranslation-utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { RadioBrowserApi } from 'radio-browser-api'
import { useMemo } from 'react'

// if (isSSR()) {
//   global.crypto = crypto
// }
//prerender most popular genres
export const getStaticPaths: GetStaticPaths = async function ({ locales }) {
  const paths = paramsWithLocales(
    [
      { genre: 'pop' },
      { genre: 'rock' },
      { genre: 'dance' },
      { genre: 'rock' },
      { genre: 'house' }
    ],
    locales!
  )

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async function (ctx) {
  const genre = (ctx.params!.genre as string).replace(/-/g, ' ')

  const translation = await loadTranslations(ctx.locale!)

  const api = new RadioBrowserApi(userAgentName)
  const stations = await api.searchStations(
    {
      tag: genre,
      limit: 1500,
      hideBroken: true
    },
    undefined,
    true
  )

  return {
    props: {
      stations: dataToRadioDTO(stations),
      genre,
      translation
    },
    revalidate: 600 // 10 minutes
  }
}

export default function GenreStations({
  genre,
  stations
}: {
  stations: RadioDTO[]
  genre: string
}) {
  const router = useRouter()

  const stationModels = useMemo(
    () => stationDataToStationModel(stations),
    [stations]
  )

  if (router.isFallback) {
    console.log('fallback')

    return <ListStationsFallback />
  }

  const genreTranslation = genres().find(
    (g) => genre.toLowerCase() === g.raw.toLowerCase()
  )!

  const breadcrumbs = [
    {
      href: '/app',
      text: t`Search`
    },
    {
      href: '/app/by-genre',
      text: t`By Genre`
    },
    {
      text: `${genreTranslation.t}`
    }
  ]

  return (
    <FilterDataStoreProvider
      initialState={stationModels}
      uuid="id"
      indexes={stationSearchIndexes}
    >
      <PageTitle title={t`Search For Stations in ${genreTranslation.t}`} />
      <ListStations
        breadcrumbs={breadcrumbs}
        dataRow={createStationListRow()}
        noData={
          <p>
            <Trans>
              Currently there is no data for{' '}
              <strong> ${genreTranslation.t}</strong>.
            </Trans>
          </p>
        }
      ></ListStations>
    </FilterDataStoreProvider>
  )
}

GenreStations.layout = AppDefaultLayout
