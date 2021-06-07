import { t } from '@lingui/macro'
import { countries } from 'generated/countries'
import niceFetch from 'nice-fetch'
import { useEffect, useState } from 'react'

export function countryDataByKey(key: 'code' | 'name' | 'flag', value: string) {
  const countryData = countries()
  for (const [_i, continent] of Object.entries(countryData)) {
    for (const [_i, country] of Object.entries(continent)) {
      if (country[key].toLowerCase() === value.toLowerCase()) {
        return country
      }
    }
  }
}

export function httpsSwitch(url: string) {
  return url.replace(/http:/, 'https:')
}

export function continentsByCode() {
  return {
    AF: {
      raw: 'Africa',
      t: t`Africa`
    },
    AN: {
      raw: 'antarctica',
      t: t`Antarctica`
    },
    AS: {
      raw: 'asia',
      t: t`Asia`
    },
    EU: {
      raw: 'europe',
      t: t`Europe`
    },
    NA: {
      raw: 'North America',
      t: t`North America`
    },
    OC: {
      raw: 'oceania',
      t: t`Oceania`
    },
    SA: {
      raw: 'South America',
      t: t`South America`
    }
  }
}

export function searchTranslation(
  needle: string,
  hayStack: { [key: string]: string }
) {
  if (hayStack[needle]) {
    console.log('haystack needle ', hayStack[needle])

    return hayStack[needle]
  }

  return needle
}

export function useClientUrl(path: string = '') {
  const [url, setUrl] = useState('')
  useEffect(() => {
    setUrl(`${window.location.origin.replace(/\/$/, '')}${path}`)
  }, [url, path])

  return url
}

export type ClientRequest = RequestInit & {
  token?: string
  data?: Record<string, unknown>
}

export function client<T>(endpoint: string, customConfig: ClientRequest = {}) {
  const { data, token, headers: customHeaders, ...rest } = customConfig

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      // @ts-expect-error  - can't return undefined here
      Authorization: token ? `Bearer ${token}` : undefined,
      // @ts-expect-error - can't return undefined here
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    ...rest
  }

  return niceFetch(endpoint, config) as Promise<[T, Response]>
}

export function booleanEnv(env: string | undefined, initial: boolean) {
  if (env) {
    return env === 'true'
  }

  return initial
}
