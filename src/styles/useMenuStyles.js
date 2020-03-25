import { fade, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#fff',
    '&:hover': {
      color: fade(theme.palette.common.white, 1)
    },
    fontFamily: 'Helvetica',
    fontSize: '1.5rem',
    padding: '0.25rem',
    textAlign: "left"
  },
  header: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#b3b3b3',
    '&:hover': {
      color: fade(theme.palette.common.white, 1)
    },
    fontFamily: 'Helvetica',
    fontWeight: '500',
    padding: '0rem 0.5rem',
  },
  appBar: {
    backgroundColor: 'black',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#ffffff',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));