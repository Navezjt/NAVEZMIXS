import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

export function AppMenuItem({
  onClick,
  children,
  link,
  icon
}: {
  link: LinkProps
  onClick?: (...args: any[]) => void
  children: ReactNode
  icon?: ReactNode
}) {
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
        selected={clientRender && router.asPath === link.href}
      >
        {icon}
        <ListItemText>{children}</ListItemText>
      </ListItem>
    </Link>
  )
}
