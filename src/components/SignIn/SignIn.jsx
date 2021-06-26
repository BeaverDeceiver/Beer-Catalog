import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import { SignedIn } from '../Auth/SignedIn';
import { sendSignInRequest } from '../../apis/Auth';
import { getAccessToken, setTokens } from '../../apis/Session';
import { setAuthStatus } from '../../store/actions/actions';
import { AUTH_STATUS_LOGGED_IN } from '../../constants/authConstants';

import './SignIn.css';

const validateEmail = (value) => {
  let errorMessage;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errorMessage = 'Invalid email address';
  }

  return errorMessage;
};

export function SignIn() {
  const [redirect, setRedirect] = useState(null);
  const [invalidData, setInvalidData] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInvalidData = () => {
    setInvalidData(true);
    setTimeout(() => setInvalidData(false), 2000);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  if (getAccessToken()) {
    return <SignedIn />;
  }

  return (
    <>
      <section className="load-placeholder">
        {submitted ? <LinearProgress /> : null}
      </section>
      <section className="sign-up">
        <h1 className="sign-up__header form__header">Sign In</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            setSubmitted(true);
            sendSignInRequest(values)
              .then((response) => {
                setTokens(response);
                dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_IN }));
                setSubmitted(false);
                setRedirect(true);
              })
              .catch((e) => {
                setSubmitted(false);
                handleInvalidData();
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="sign-in__form">
              <article className="form__input-area">
                <label className="form__input-label" htmlFor="email">
                  Email
                </label>
                <Field
                  className="form__input-field"
                  id="email"
                  name="email"
                  placeholder="mail@box.com"
                  type="email"
                  validate={validateEmail}
                />
                {errors.email && touched.email ? (
                  <div className="form__error-message">{errors.email}</div>
                ) : null}
              </article>

              <article className="form__input-area">
                <label className="form__input-label" htmlFor="password">
                  Password
                </label>
                <Field
                  className="form__input-field"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </article>

              <article className="form__buttons-area">
                <Link to="/auth/signup">
                  <button
                    type="button"
                    className="form__button form__button_sign-in button"
                  >
                    Sign up instead
                  </button>
                </Link>
                <button
                  className="form__button form__button_sign-up button"
                  type="submit"
                >
                  Sign In
                </button>
              </article>
              {invalidData ? (
                <div className="auth__error">Invalid Email and/or Password</div>
              ) : null}
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}
