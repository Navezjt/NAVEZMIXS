import { ListStations } from 'components/ListStations'
import { useRootStore } from 'components/providers/RootStoreProvider'
import { stationDataRow } from 'lib/stationUtils'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useFilterDataStore } from './providers/FilterDataStoreProvider'
import { Trans } from '@lingui/macro'

const indexes = ['language', 'country', 'tags', 'continent', 'name']

export const FavoritesList = observer(function FavoritesList() {
  const { favoriteStations } = useRootStore()
  const filterStore = useFilterDataStore()

  useEffect(() => {
    ;(async function () {
      await favoriteStations.load()
      filterStore.hydrate(favoriteStations.stations, 'id', indexes)
    })()
  }, [filterStore, favoriteStations])

  useEffect(
    () =>
      reaction(
        () => favoriteStations.stations.length,
        () => {
          filterStore.hydrate(
            favoriteStations.stations,
            'id',
            indexes,
            filterStore.query
          )
        }
      ),
    [favoriteStations, filterStore]
  )

  return (
    <ListStations
      showFallback={!favoriteStations.loaded}
      showSearch={favoriteStations.stations.length > 0}
      dataRow={stationDataRow(true, true, true, true)}
      noData={
        <Trans>
          <p>No favorites</p>
        </Trans>
      }
    />
  )
})
