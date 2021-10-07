import { t } from '@lingui/macro'
import { AppDefaultLayout } from 'components/layout/AppDefaultLayout'
import { PageTitle } from 'components/PageTitle'
import { getStaticTranslations } from 'lib/translations'
import { FilterDataStoreProvider } from 'components/providers/FilterDataStoreProvider'
import { RemovableItemsList } from 'components/RemovableItemsList'
import { useRootStore } from 'components/providers/RootStoreProvider'
import { stationSearchIndexes } from 'browser-config'

export { getStaticTranslations as getStaticProps }

export default function RecentStations() {
  const { recentStations } = useRootStore()
  const noDataTitle = t`Your recently played stations will appear here`

  return (
    <>
      <PageTitle title={t`Your Recently Listened Stations`} />
      <FilterDataStoreProvider
        initialState={[...recentStations.stations]}
        uuid="id"
        indexes={stationSearchIndexes}
      >
        <RemovableItemsList
          noDataTitle={noDataTitle}
          store={recentStations}
          indexes={stationSearchIndexes}
        />
      </FilterDataStoreProvider>
    </>
  )
}

RecentStations.layout = AppDefaultLayout
