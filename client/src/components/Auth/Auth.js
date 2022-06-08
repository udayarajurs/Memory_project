import React, {useState, useEffect} from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleCallbackResponse(response) {
    const result = jwt_decode(response?.credential);
    const token = 'TOKEN';

    try {
      dispatch({type: 'AUTH', data: {token, result}});
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    /* Global Google  */
    window.google.accounts.id.initialize({
      client_id:
        '310101506890-ps8kjro18ta1ad1vcg7i9sfpcn1tcqia.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'large',
      },
    );
    google.accounts.id.prompt();
  }, []);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword(prevShowPassword => !prevShowPassword);
  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
    handleShowPassword(false);
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

          <Button id="signInDiv" className={classes.submit1} />

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
