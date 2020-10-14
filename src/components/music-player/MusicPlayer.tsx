import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange, deepPurple } from '@material-ui/core/colors'
import { useMusicPlayerStore } from '../app/providers/MusicPlayerProvider'
import clsx from 'clsx'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import {
  MusicPlayerStore,
  PlayerStatus
} from '../../lib/stores/MusicPlayerStore'
import { PlayStopBtn } from './PlayStopBtn'
import { AddToFavouritesBtn } from './AddToFavouritesBtn'
import { ShareStationBtn } from './ShareStationBtn'
import { FullScreenBtn } from './FullScrenBtn'
import { useAppShell } from '../app/providers/AppShellProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      width: '100%',
      display: 'flex',
      bottom: 0,
      height: '110px',
      zIndex: 10000,
      left: ({ drawerWidth }: { drawerWidth: number }) => drawerWidth,

      // maxHeight: 200,
      // height: 200,
      // height: ({ isFullScreen }: { isFullScreen: boolean }) =>
      //   isFullScreen ? '100%' : 'auto',
      borderLeft: 0,
      borderRight: 0,
      borderBottom: 'none',
      // alignItems: 'center',
      padding: theme.spacing(1)
      // backgroundColor: '#123133'
      // transition: 'all 1s ease-in'
    },
    boxAnim: {
      transition: theme.transitions.create(
        ['width', 'top', 'height', 'background-color', 'bottom', 'left'],
        {
          easing: theme.transitions.easing.easeIn,
          // duration: theme.transitions.duration.leavingScreen
          duration: 400
        }
      )
    },
    heightFull: {
      // height: '100%',
      left: '0px!important',
      // width: '50%',
      height: '100%'
      // backgroundColor: '#ff99f2'
      // top: 100
      // left: '100px'
    },
    appBarSpacer: {
      ...theme.mixins.toolbar
    },
    uiWrap: {
      display: 'flex',
      flexDirection: 'column'
    },
    column: {
      display: 'flex',
      alignItems: 'center'
      // marginLeft: theme.spacing(1)
    },
    infoWrap: {
      display: 'flex',
      flexDirection: 'column'
    },
    artistInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    songInfo: {
      display: 'flex',
      flexDirection: 'column',
      '& p': {
        // fontSize: '1.1rem',
        margin: 0
      }
    },
    avatar: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(1),
      width: 48,
      height: 48
    },
    stationName: {
      marginRight: theme.spacing(1),
      fontSize: '1.7rem',
      margin: 0
    }
  })
)
// music player is a global component
export const MusicPlayer = observer(function MusicPlayer() {
  const player = useMusicPlayerStore()
  const appShell = useAppShell()
  console.log('player is full screen ', appShell.playerInFullScreen)
  const classes = useStyles({
    isFullScreen: appShell.playerInFullScreen,
    drawerWidth: appShell.desktopDrawerWidth
  })
  // const classes = useStyles()
  const iconSize = '2rem'

  const testclick = function () {
    console.log('test click')
    if (appShell.playerInFullScreen) {
      appShell.setPlayerFullScreen(false)
    } else {
      appShell.setPlayerFullScreen(true)
    }
  }

  return (
    <Paper
      variant="outlined"
      square
      className={clsx(classes.root, classes.boxAnim, {
        [classes.heightFull]: appShell.playerInFullScreen
      })}
    >
      <div className={classes.uiWrap}>
        {/* {appShell.playerInFullScreen ? (
          <div className={classes.appBarSpacer}></div>
        ) : null} */}
        <div className={classes.column}>
          <p className={classes.stationName}>BBC RADIO ONE</p>
          <AddToFavouritesBtn fontSize={iconSize} />
          <ShareStationBtn onClick={testclick} url="" fontSize={iconSize} />
          <FullScreenBtn fontSize={iconSize} />
        </div>
        <div className={classes.column}>
          <PlayStopBtn onClick={testclick} fontSize="55px"></PlayStopBtn>
          <div className={classes.infoWrap}>
            <div className={classes.artistInfo}>
              <Avatar
                onClick={testclick}
                variant="rounded"
                className={classes.avatar}
              >
                N
              </Avatar>
              <div className={classes.songInfo}>
                <p>Rolling Stones </p>
                <p>Make Love Not War</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
})
