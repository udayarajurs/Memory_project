import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword(prevShowPassword => !prevShowPassword);
  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
    handleShowPassword(false);
  };
  const googleSuccess = res => {
    console.log(res);
  };
  const googleError = error => {
    console.log(error);
    console.log('google failure');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="310101506890-ps8kjro18ta1ad1vcg7i9sfpcn1tcqia.apps.googleusercontent.com"
            // render={renderProps => (
            //   <Button
            //     className={classes.googleButton}
            //     color="primary"
            //     fullWidth
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //     startIcon={<Icon />}
            //     variant="contained">
            //     Google Sign In
            //   </Button>
            // )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            isSignedIn={true}
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
