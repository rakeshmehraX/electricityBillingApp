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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import UserService from '../Service/UserService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function SignUp(props) {
    const classes = useStyles();
    // const {register, handleSubmit} = useForm();
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNo, setPhoneNo] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [alertDialog, setAlertDialog] = React.useState("");
    const [alertDesc, setAlertDesc] = React.useState("");
    const [showPopup, setShowPopup] = React.useState(false);

    // let user = { password: password, emailId: emailAddress };

    const loginUser = () => {
        let user = { firstName: firstName, lastName: lastName, emailId: emailAddress, phoneNo: phoneNo, password: password, userType };
        console.log('Login user onClick invoked!');
        UserService.userSignUp(user).then((res) => {
            console.log("Response status: ", res.status);
            console.log("Response data: ", res.data);
            if (res.status === 200) {
                console.log("User saved successfully");
                setAlertDialog("Registration Successful");
                setAlertDesc("You are now registered! Please login with your user ID and passowrd");
                setOpen(true);
                setShowPopup(true);
                //props.history.push('/signIn');
            } else {
                console.log("Some error occurred while saving the user");
            }
        })
    }

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePopupClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
    };

    const handleLogin = () => {
        props.history.push('/signIn');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth
                        value={userType}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"User"}>User</MenuItem>
                        <MenuItem value={"Clerk"}>Clerk</MenuItem>
                        <MenuItem value={"SuperUser"}>SuperUser</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    // variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    autoComplete="current-password"
                    onChange={e => setFirstName(e.target.value)}
                />
                <TextField
                    // variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastnName"
                    autoComplete="current-password"
                    onChange={e => setLastName(e.target.value)}
                />
                <TextField
                    // variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNo"
                    label="Phone Number"
                    id="phoneNo"
                    autoComplete="current-password"
                    onChange={e => setPhoneNo(e.target.value)}
                />
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={loginUser}
                >
                    Sign Up
                </Button>
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
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleLogin} color="primary" autoFocus>
                            Go to Login
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={showPopup} autoHideDuration={3000} onClose={handlePopupClose}>
                    <Alert onClose={handlePopupClose} severity="success" sx={{ width: '100%' }}>
                        Registeration Successful
                    </Alert>
                </Snackbar>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}