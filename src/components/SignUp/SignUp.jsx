import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import { sendSignUpRequest } from '../../apis/Auth';
import { getAccessToken } from '../../apis/Session';
import { SignedIn } from '../Auth/SignedIn';

import './SignUp.css';

const validateEmail = (value) => {
  let errorMessage;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errorMessage = 'Invalid email address';
  }

  return errorMessage;
};

const validateName = (value) => {
  let errorMessage;

  if (!/.{2,}/i.test(value)) {
    errorMessage = 'Value too short';
    return errorMessage;
  }

  if (/\d/i.test(value)) {
    errorMessage = 'No numbers allowed';
    return errorMessage;
  }

  if (/\s/i.test(value)) {
    errorMessage = 'No whitespaces allowed';
    return errorMessage;
  }

  return errorMessage;
};

const validatePassword = (value) => {
  let errorMessage;

  if (!/.{8,}/i.test(value)) {
    errorMessage = 'Password too short (at least 8 symbols)';
    return errorMessage;
  }
  return errorMessage;
};

export function SignUp() {
  const [registered, setRegistered] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInvalidData = (e) => {
    setInvalidData(true);
    setErrorMessage(e.message);
    setTimeout(() => setInvalidData(false), 2000);
  };

  if (getAccessToken()) {
    return <SignedIn />;
  }

  if (registered) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <>
      <section className="load-placeholder">
        {submitted ? <LinearProgress /> : null}
      </section>
      <section className="sign-up">
        <h1 className="sign-up__header form__header">Sign Up</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            setSubmitted(true);
            try {
              const response = await sendSignUpRequest(values);
              if (response) {
                setSubmitted(false);
                setRegistered(true);
              }
            } catch (e) {
              handleInvalidData(e);
              setSubmitted(false);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="sign-up__form form">
              <article className="form__input-area">
                <label className="form__input-label" htmlFor="firstName">
                  First Name
                </label>
                <Field
                  className="form__input-field"
                  id="firstName"
                  name="firstName"
                  placeholder="Jane"
                  validate={validateName}
                />
                {errors.firstName && touched.firstName ? (
                  <div className="form__error-message">{errors.firstName}</div>
                ) : null}
              </article>

              <article className="form__input-area">
                <label className="form__input-label" htmlFor="lastName">
                  Last Name
                </label>
                <Field
                  className="form__input-field"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  validate={validateName}
                />
                {errors.lastName && touched.lastName ? (
                  <div className="form__error-message">{errors.lastName}</div>
                ) : null}
              </article>

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
                  validate={validatePassword}
                />
                {errors.password && touched.password ? (
                  <div className="form__error-message">{errors.password}</div>
                ) : null}
              </article>

              <article className="form__buttons-area">
                <Link to="/auth/signin">
                  <button className="form__button form__button_sign-in button">
                    Sign in instead
                  </button>
                </Link>
                <button
                  className="form__button form__button_sign-up button"
                  type="submit"
                >
                  Sign Up
                </button>
              </article>
            </Form>
          )}
        </Formik>
        {invalidData ? <div className="auth__error">{errorMessage}</div> : null}
      </section>
    </>
  );
}
