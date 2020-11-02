import { AppMenuItem } from 'components/sidebars/AppMenuItem'

export function DefaultMenuItems({
  onClick
}: {
  onClick?: (...args: any[]) => void
}) {
  return (
    <>
      <AppMenuItem link={{ href: '/browse' }} onClick={onClick}>
        Browse
      </AppMenuItem>
    </>
  )
}