import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {

  if(action.type === "USER_INPUT"){

    return { value: action.val, isValid: action.val.includes('@') ? true : false }
   }
   if(action.type === "INPUT_BLUR"){
  
    return { value: state.value, isValid: state.value.includes('@') ? true : false }
   }

  return{
    value: '',
    isValid: false
  }
}

const passwordReducer = (state, action) => {

  if(action.type === "PASSWORD"){

    return { value: action.val, isValid: action.val.trim().length > 6 ? true : false }

   }
   if(action.type === "PASSWORD_BLUR"){

    return { value: state.value, isValid: state.value.trim().length > 6 ? true : false }

   }
  return{
    value: '',
    isValid: false
  }
}
const Login = (props) => {


  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispachEmail] = useReducer(emailReducer,{value: '', isValid: null})
  const [passwordState, dispachPassword] = useReducer(passwordReducer,{value: '', isValid: null})

  const {isValid : emailValid} = emailState;
  const {isValid : passwordValid} = passwordState;
  //run useEffect with delay ,5 sec to check form.
  useEffect( () => {
  
    const checkInputs = setTimeout( () => {
      console.log("Checking Form!!!")
      setFormIsValid(
        emailValid && passwordValid
      );
    },500)
    return () => {
      clearTimeout(checkInputs)
      console.log("CLEAN UP ")
    }
  },[emailValid,passwordValid])

  const emailChangeHandler = (event) => {
    dispachEmail({type:'USER_INPUT',val: event.target.value})

  };

  const passwordChangeHandler = (event) => {
   
    dispachPassword({type: 'PASSWORD',val:event.target.value})

  };

  const validateEmailHandler = () => {

    dispachEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {

    dispachPassword({type:'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
