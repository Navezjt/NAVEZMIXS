import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { t } from '@lingui/macro'

export function AppUpdatedNotification({ cookieName }: { cookieName: string }) {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (Cookies.get(cookieName)) {
      Cookies.remove(cookieName)
      setOpen(true)
    }
  }, [cookieName])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="success"
      >
        {t`Application Updated!`}
      </Alert>
    </Snackbar>
  )
}
