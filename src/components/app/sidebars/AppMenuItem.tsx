import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link, { LinkProps } from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

export function AppMenuItem({
  onClick,
  link,
  icon,
  // trackingKey,
  primary,
  secondary = '',
  selected
}: {
  link: LinkProps
  // trackingKey?: string | number
  primary: string
  secondary?: string
  onClick?: (...args: any[]) => void
  selected?: (router: NextRouter) => boolean
  // children?: ReactNode
  icon?: ReactNode
}) {
  // trackingKey = trackingKey || primary
  // console.log('tracking key', trackingKey)
  const router = useRouter()
  const [clientRender, setClientRender] = useState(false)

  // https://nextjs.org/docs/routing/shallow-routing#caveats
  useEffect(() => {
    setClientRender(true)
  }, [])

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link {...link} passHref>
      <ListItem
        button
        component="a"
        onClick={handleClick}
        selected={clientRender && selected && selected(router)}
      >
        {icon}
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </Link>
  )
}
