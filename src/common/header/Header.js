import React, {Component} from 'react';

//importing material-ui styles
import {withStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//importing material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

//importing the css file of the header
import './Header.css';

//styles for the header using breakpoints to make the header responsive
const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#263238',
        boxShadow: 'none',
    },
    headerTools: {
        [theme.breakpoints.only('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    logo: {
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
        cursor: 'default',
    },
    searchBox: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        width: '30ch',
    },
    headerLoginBtn: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    customerProifleBtn: {
        color: 'white',
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
});

// theme for the searchbox 
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});

//custom style for modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Tab container inside the modal
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            loginContactNoRequired: "dispNone",
            loginContactNo: "",
            loginContactNoRequiredMessage: "required",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequiredMessage: "required",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            openLoginSnackBar: false,
            loginErroMessage: "",
            loginErroMessageRequired: "dispNone",
            signupFirstname: "",
            signupFirstnameRequired: "dispNone",
            singupLastname: "",
            signupEmail: "",
            signupEmailRequired: "",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupContactNo: "",
            signupContactNoRequired: "dispNone",
            signupEmailRequiredMessage: "required",
            signupPasswordRequiredMessage: "required",
            signupContactNoRequiredMessage: "required",
            openSignupSnackBar: false,
            signupErrorMessage: "",
            signupErrorMessageRequired: "dispNone",
            menuState: false,
            anchorEl: null,
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.appBar}>
                    {/* Toolbar that contains app logo, searchbox and login button */}
                    <Toolbar className={classes.headerTools}>
                        {/* app logo inside iconButton*/}
                        <IconButton disableRipple={true} className={classes.logo} edge="start" color="inherit"
                                    aria-label="app logo">
                            <FastfoodIcon/>
                        </IconButton>
                        <div className={classes.grow}/>
                        {/* searchbox will be displayed only if needed */}
                        {this.props.showSearchBox ?
                            <div className={classes.searchBox}>
                                <ThemeProvider theme={theme}>
                                    <InputLabel htmlFor="search-box-input"/>
                                    <Input id="search-box-input"
                                           startAdornment={
                                               <InputAdornment position="start">
                                                   <SearchIcon/>
                                               </InputAdornment>
                                           }
                                           placeholder="Search by Restaurant Name"
                                           classes={{
                                               root: classes.inputRoot,
                                               input: classes.inputInput,
                                           }}
                                           onChange={this.props.searchHandler}
                                    />
                                </ThemeProvider>
                            </div>
                            : null
                        }
                        <div className={classes.grow}/>
                        {/* If customer is not logged in then it displays login button otherwise displays the customer's firstname */}
                        {!this.state.loggedIn ?
                            <div className={classes.headerLoginBtn}>
                                <Button variant="contained" color="default" startIcon={<AccountCircle/>}
                                        onClick={this.openModalHandler}>Login</Button>
                            </div>
                            :
                            //Customer profile button to display my account or logout
                            <div className={classes.customerProifleBtn}>
                                <Button id="customer-profile" startIcon={<AccountCircle/>}
                                        onClick={this.onProfileIconClick}>{sessionStorage.getItem("first-name")}</Button>
                                <Menu id="profile-menu" open={this.state.menuState} onClose={this.onMenuClose}
                                      anchorEl={this.state.anchorEl} getContentAnchorEl={null}
                                      anchorOrigin={{vertical: "bottom", horizontal: "left"}} keepMounted>
                                    <MenuItem style={{minHeight: 48}} onClick={this.onMyProfile}><Typography><Link
                                        to={"/profile"} style={{textDecoration: 'none', color: 'black'}}>My
                                        Profile</Link></Typography></MenuItem>
                                    <MenuItem style={{minHeight: 48}} onClick={this.onLogout}><Link to={"/"} style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}><Typography>Logout</Typography></Link></MenuItem>
                                </Menu>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                {/* displays login modal if customer clicks on the login button, modal contains two tabs one for login and one for signup */}
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs value={this.state.value} className="tabs" onChange={this.tabChangeHandler}>
                        <Tab label="Login"/>
                        <Tab label="Signup"/>
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required className="login-and-signup-forms">
                            <InputLabel htmlFor="contactno">Contact No</InputLabel>
                            <Input id="contactno" type="text" value={this.state.loginContactNo}
                                   contactno={this.state.loginContactNo}
                                   onChange={this.inputLoginContactNoChangeHandler}/>
                            <FormHelperText className={this.state.loginContactNoRequired}>
                                <span className="red">{this.state.loginContactNoRequiredMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="login-and-signup-forms">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" value={this.state.loginPassword}
                                   password={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler}/>
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">{this.state.loginPasswordRequiredMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <div id="login-error-msg-div" className={this.state.loginErroMessageRequired}><span
                            id="login-error-msg" className="red">{this.state.loginErroMessage}</span></div>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }
                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required className="login-and-signup-forms">
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" value={this.state.signupFirstname}
                                   signupfirstname={this.state.signupFirstname}
                                   onChange={this.inputSignupFirstNameChangeHandler}/>
                            <FormHelperText className={this.state.signupFirstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl className="login-and-signup-forms">
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" value={this.state.singupLastname}
                                   signuplastname={this.state.singupLastname}
                                   onChange={this.inputSignupLastNameChangeHandler}/>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="login-and-signup-forms">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" value={this.state.signupEmail}
                                   signupemail={this.state.signupEmail} onChange={this.inputSignupEmailChangeHandler}/>
                            <FormHelperText className={this.state.signupEmailRequired}>
                                <span className="red">{this.state.signupEmailRequiredMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="login-and-signup-forms">
                            <InputLabel htmlFor="signupPassword">Password</InputLabel>
                            <Input id="signupPassword" type="password" value={this.state.signupPassword}
                                   signuppassword={this.state.signupPassword}
                                   onChange={this.inputSignupPasswordChangeHandler}/>
                            <FormHelperText className={this.state.signupPasswordRequired}>
                                <span className="red">{this.state.signupPasswordRequiredMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required className="login-and-signup-forms">
                            <InputLabel htmlFor="signupContactNo">Contact No.</InputLabel>
                            <Input id="signupContactNo" type="text" value={this.state.signupContactNo}
                                   signupcontactno={this.state.signupContactNo}
                                   onChange={this.inputSignupContactNoChangeHandler}/>
                            <FormHelperText className={this.state.signupContactNoRequired}>
                                <span className="red">{this.state.signupContactNoRequiredMessage}</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <div id="signup-error-msg-div" className={this.state.signupErrorMessageRequired}><span
                            id="signup-error-msg" className="red">{this.state.signupErrorMessage}</span></div>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                    </TabContainer>
                    }
                </Modal>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openLoginSnackBar}
                    autoHideDuration={10000}
                    onClose={this.loginSnackBarCloseHandler}
                    message="Logged in successfully!"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit"
                                        onClick={this.loginSnackBarCloseHandler}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSignupSnackBar}
                    autoHideDuration={10000}
                    onClose={this.signupSnackBarCloseHandler}
                    message="Registered successfully! Please login now!"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit"
                                        onClick={this.signupSnackBarCloseHandler}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        );
    }

    // clears all the values and required field validation messages and error messages when modal is opened
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            loginContactNoRequired: "dispNone",
            loginContactNo: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loginErroMessage: "",
            loginErroMessageRequired: "dispNone",
            signupFirstname: "",
            signupFirstnameRequired: "dispNone",
            singupLastname: "",
            signupEmail: "",
            signupEmailRequired: "dispNone",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupContactNo: "",
            signupContactNoRequired: "dispNone",
            signupErrorMessage: "",
            signupErrorMessageRequired: "dispNone",
        });
    }

    // closes the modal
    closeModalHandler = () => {
        this.setState({modalIsOpen: false});
    }

    // changes the tabs inside modal
    tabChangeHandler = (event, value) => {
        this.setState({value});
    }

    /* login with invalid credentials or contact no is not registered */
    loginClickHandler = () => {

        let contactNoRequired = false;
        if (this.state.loginContactNo === "") {
            this.setState({
                loginContactNoRequired: "dispBlock",
                loginContactNoRequiredMessage: "required"
            });
            contactNoRequired = true;
        } else {
            this.setState({
                loginContactNoRequired: "dispNone"
            });
        }

        let passwordRequired = false;
        if (this.state.loginPassword === "") {
            this.setState({
                loginPasswordRequired: "dispBlock",
                loginPasswordRequiredMessage: "required"
            });
            passwordRequired = true;
        } else {
            this.setState({
                loginPasswordRequired: "dispNone"
            });
        }

        if ((contactNoRequired && passwordRequired) || contactNoRequired) {
            return;
        }
          // Integrating login functionality with backend


        //   contact number vaidation
        const isvalidContactNo = validator.isMobilePhone(this.state.loginContactNo);
        if ((contactNoRequired === false && !isvalidContactNo) || this.state.loginContactNo.length !== 10) {
            this.setState({
                loginContactNoRequiredMessage: "Invalid Contact",
                loginContactNoRequired: "dispBlock"
            });
            return;
        }

        if (passwordRequired) {
            return;
        }
        this.sendLoginDetails();
    }

    inputLoginContactNoChangeHandler = (e) => {
        this.setState({loginContactNo: e.target.value});
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({loginPassword: e.target.value});
    }

    loginSnackBarCloseHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openLoginSnackBar: false
        });
    }
    sendLoginDetails = () => {
        let loginData = null;
        let that = this;
        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let loginResponse = JSON.parse(this.responseText);
                // displays the login error message
                if (this.status === 401) {
                    that.setState({
                        loginErroMessage: loginResponse.message,
                        loginErroMessageRequired: "dispBlock"
                    });
                }
                // after successful login stores uuid, access-token, first-name inside session storage and displays the login snackbar
                if (this.status === 200) {
                    sessionStorage.setItem("uuid", loginResponse.id);
                    sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                    sessionStorage.setItem("first-name", loginResponse.first_name)
                    that.setState({
                        loggedIn: true,
                        openLoginSnackBar: true
                    });
                    //closes the modal after successful login
                    that.closeModalHandler();
                }
            }
        });
        let url = this.props.baseUrl + 'customer/login';
        xhrLogin.open("Post", url);
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginContactNo + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(loginData);
    }
            
}

  
    






 export default withStyles(styles)(Header);


 