import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import MaterialLink from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'baseline',
      marginLeft: theme.spacing(2),
      paddingTop: theme.spacing(2)
    }
  }
})

export function LocationBreadcrumbs({
  links
}: {
  links: { href?: string; as?: string; text: string }[]
}) {
  const renderedLinks = []
  const classes = useStyles()

  for (const link of links) {
    let linkToClick = null
    if (link.href) {
      // it should be a link
      linkToClick = (
        <Link
          key={link.text}
          href={link.href}
          as={link.as ?? link.href}
          passHref
        >
          <MaterialLink color="inherit" href={link.href}>
            {link.text}
          </MaterialLink>
        </Link>
      )
    } else {
      // regular breadcrumb
      linkToClick = (
        <Typography key={link.text} color="textPrimary">
          {link.text}
        </Typography>
      )
    }

    renderedLinks.push(linkToClick)

    //   <Typography color="textPrimary">Breadcrumb</Typography>
  }

  return (
    // <div className={className}>
    <Breadcrumbs
      component="div"
      className={classes.root}
      separator="›"
      aria-label="breadcrumb"
    >
      {renderedLinks}
    </Breadcrumbs>
    // </div>
  )
}
