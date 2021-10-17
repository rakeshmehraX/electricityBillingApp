import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserService from '../Service/UserService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.upcl.org/">
        Uttarakhand Power Corporation Limited
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  // const {register, handleSubmit} = useForm();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [alertDialog, setAlertDialog] = React.useState("");
  const [alertDesc, setAlertDesc] = React.useState("");

  // let user = { password: password, emailId: emailAddress };

  const loginUser = () => {
    console.log('Login user onClick invoked!');
    UserService.userLogin(emailAddress, password).then((res) => {
      console.log("Response status: ", res.status);
      if (res.data === "Invalid Username") {
        setAlertDialog("Invalid Credentials");
        setAlertDesc("Please check the username you've entered");
        setOpen(true);
        return console.log("Invalid Username");;
      } else if (res.data === "Invalid Password") {
        setAlertDialog("Invalid Credentials");
        setAlertDesc("The password you entered is not correct, please try again");
        setOpen(true);
        return console.log("Invalid Password");
      } else if (res.data === "Clerk") {
        props.history.push('/users');
      } else if (res.data === "SuperUser") {
        props.history.push('/allUsers');
      } else {
        console.log('Response: ', res);
        props.history.push('/me/' + res.data);
      }
    })
  }

  const handleClickOpen = () => {
    setAlertDialog("Forgot password?");
    setAlertDesc("Keep calm and try to remember your password");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          //variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => setEmailAddress(e.target.value)}
        />
        <TextField
          // variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="remember" defaultValue={false} color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={loginUser}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link onClick={handleClickOpen} variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href={"http://localhost:3000/signup"} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{alertDialog}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {alertDesc}
                {/* Keep calm and try to remember your password... */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
     
              <Button onClick={handleClose} color="primary" autoFocus>
                Got it!
              </Button>
            </DialogActions>
          </Dialog>
          {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open alert dialog
          </Button> */}
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}