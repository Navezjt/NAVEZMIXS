import { enableStaticRendering } from 'mobx-react-lite'
import { createContext, ReactNode, useContext } from 'react'
import { FilterDataStore } from '../../../lib/stores/FilterDataStore'
import { RadioStation } from '../ListStations'

enableStaticRendering(typeof window === 'undefined')
// todo store provider u posebnu klasu
let store: FilterDataStore
const StoreContext = createContext<FilterDataStore | undefined>(undefined)

export function useFilterDataStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStoreContext must be used within StoreProvider')
  }

  return context
}

export function FilterStoreProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState: RadioStation[]
}) {
  const store = initMyStore(initialState)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function initMyStore(initialState: RadioStation[]) {
  const _store = store ?? new FilterDataStore()

  console.log('init store')
  console.log('browser ', typeof window !== 'undefined')
  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialState) {
    _store.hydrate(initialState)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}
