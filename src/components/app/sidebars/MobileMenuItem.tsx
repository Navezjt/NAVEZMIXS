import { ReactNode } from 'react'
import { AppMenuItem } from './AppMenuItem'
import { useAppShell } from '../providers/AppShellProvider'
import { LinkProps } from 'next/link'

export function MobileMenuItem({
  onClick,
  link,
  children,
  icon
}: {
  link: LinkProps
  onClick?: (...args: any[]) => void
  children: ReactNode
  icon?: ReactNode
}) {
  const { dispatch } = useAppShell()

  const closeDrawer = () => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: false })
  }
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    closeDrawer()
  }

  return (
    <AppMenuItem icon={icon} link={link} onClick={handleClick}>
      {children}
    </AppMenuItem>
  )
}
