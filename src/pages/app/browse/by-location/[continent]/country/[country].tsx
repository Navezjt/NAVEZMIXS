import { continents, countries } from 'countries-list'
import { GetStaticPaths, GetStaticProps } from 'next'
import { RadioBrowserApi } from 'radio-browser-api'
import { AppDefaultLayout } from '../../../../../../components/app/layout/AppDefaultLayout'
import {
  RadioList,
  RadioStation
} from '../../../../../../components/app/RadioList'

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    // todo - add major countries
    paths: [{ params: { country: 'RS', continent: 'EU' } }],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async function (ctx) {
  console.log('country get static props', ctx)

  const countryCode = (ctx.params?.country as string).replace(/-/g, ' ')

  const continent = (ctx.params?.continent as string).replace(/-/g, ' ')

  const country = countries[countryCode as keyof typeof countries]

  const api = new RadioBrowserApi('radio-next', fetch)
  const stations = await api.searchStations({
    countryCode: countryCode.toUpperCase(),
    limit: 2000,
    hideBroken: true
  })

  const leanStations = []
  // strip properties that are not in use
  for (const station of stations) {
    leanStations.push({
      tags: [...new Set(station.tags.split(','))],
      name: station.name,
      url: station.url_resolved,
      uuid: station.stationuuid,
      favicon: station.favicon,
      homepage: station.homepage,
      country: station.country,
      language: station.language.split(','),
      continent: country.continent
    })
  }

  return {
    props: {
      stations: leanStations,
      countryName: country.name,
      countryCode,
      continentName: continents[country.continent as keyof typeof continents],
      continentCode: continent
    },
    revalidate: 600 // 10 minutes
  }
}

export default function CountryStations({
  stations,
  countryName,
  _countryCode,
  continentName,
  continentCode
}: {
  stations: RadioStation[]
  countryName: string
  _countryCode: string
  continentName: string
  continentCode: string
}) {
  /// ////
  const breadcrumbLinks = [
    {
      href: '/app/browse',
      text: 'Browse'
    },
    {
      href: '/app/browse/by-location',
      text: 'By Location'
    },
    {
      href: '/app/browse/by-location/[continent]',
      as: `/app/browse/by-location/${continentCode}`,
      text: `${continentName}`
    },
    {
      text: `${countryName}`
    }
  ]

  return (
    <RadioList
      title={`Browse For Stations in ${countryName}`}
      breadcrumbs={breadcrumbLinks}
      noResults={`Currently there is no data for ${countryName}. Sorry for the inconvenience.`}
      rowPrimary={(station: RadioStation) => `${station.name}`}
      stations={stations}
    ></RadioList>
  )
}

CountryStations.layout = AppDefaultLayout
