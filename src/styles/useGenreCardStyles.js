import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  button: {
    color: '#b3b3b3',
    fontSize: '16px',
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  menuTitle: {
  	backgroundColor: "#3f51b5",
  	color: "#fff",
  },
  menuItem: {
    padding: '0px 0px 0px 10px',
  },
  formControl: {
    margin: theme.spacing(0.5),
  }
}))