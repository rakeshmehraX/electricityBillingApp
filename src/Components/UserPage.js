import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserService from '../Service/UserService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 560,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function UserPage(props) {

    const classes = useStyles();
    const [userDetails, setUserDetails] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [emailId, setEmailId] = React.useState('');
    const [bill, setBill] = React.useState('');
    const [date, setDate] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [amountPaid, setAmountPaid] = React.useState('');
    const [paymentStatus, setPaymentStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [alertDialog, setAlertDialog] = React.useState("");
    const [alertDesc, setAlertDesc] = React.useState("");
    const [remarks, setRemarks] = React.useState("");
    const [showPopup, setShowPopup] = React.useState(false);

    React.useEffect(() => {
        UserService.getUserById(props.match.params.id).then((res) => {
            setUserDetails(res);
            setFirstName(res.data.firstName);
            setPhoneNumber(res.data.phoneNo);
            setEmailId(res.data.emailId);
            setBill(res.data.amount);
            setDate(res.data.date);
            setAmountPaid(res.data.paidAmount);
            setPaymentStatus(res.data.paymentSuccess);
            setRemarks(res.data.remarks);
        });

        console.log("Iam invoked first");
        console.log("User details received", userDetails);
    }, []);

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

    const printUserDetails = () => {
        if (amount != 0) {
            let nowDate = new Date();
            const month = nowDate.toLocaleString('default', { month: 'long' });
            const day = nowDate.toLocaleDateString('default', { weekday: 'long' });
            let dateToday = day + ' - ' + month + ' ' + nowDate.getDate() + ' ' + nowDate.getFullYear();
            setPaymentStatus('Initiated');
            let user = {
                id: props.match.params.id,
                paidAmount: amount,
                date: dateToday,
            }

            //alert(userDetails.data.firstName + ' ' + amount + ' ' + date);
            console.log('Login user onClick invoked!');
            UserService.payBill(user).then((res) => {
                console.log("Response status: ", res.status);
                setShowPopup(true);
                window.location.reload();
            })
        } else {
            setAlertDialog("Invalid Amount");
            setAlertDesc("Please enter amount greater then 0");
            setOpen(true);
        }
    }

    return (
        <div className="UserPageBody">
            <Alert hidden={remarks === "" || remarks === null} severity="info">{remarks}</Alert>
            <Card className={classes.root} style={{ marginLeft: "25%", marginTop: "3%" }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Payment Portal
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Welcome to Uttarakhand Power Corporation Limited.
                            Please note the bill will be considered payed once it is confirmed by the concerned authority.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={firstName} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PhoneAndroidIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Phone Number" secondary={phoneNumber} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email ID" secondary={emailId} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ReceiptIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Bill" secondary={bill} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountBalanceWalletIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Amount Paid" secondary={amountPaid} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountBalanceWalletIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Payment Status" secondary={paymentStatus ? "Paid" : "Pending"} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EventAvailableIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Paid Date" secondary={date} />
                    </ListItem>
                </List>
                <TextField
                    id="standard-basic"
                    type="number"
                    label="Amount"
                    style={{ marginLeft: "5%" }}
                    onChange={e => setAmount(e.target.value)}
                />
                <CardActions>
                    <Button size="large" onClick={printUserDetails} style={{ marginLeft: "85%", backgroundColor: "rgb(110, 230, 235)" }}>Pay</Button>
                </CardActions>
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
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
            <Snackbar open={showPopup} autoHideDuration={3000} onClose={handlePopupClose}>
                <Alert onClose={handlePopupClose} severity="success" sx={{ width: '100%' }}>
                    Payment Successful!
                </Alert>
            </Snackbar>
        </div>
    );
}