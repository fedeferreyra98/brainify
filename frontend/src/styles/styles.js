import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#DDEBF8',
  },
  button: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: '#DDEBF8',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  commentCard: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
