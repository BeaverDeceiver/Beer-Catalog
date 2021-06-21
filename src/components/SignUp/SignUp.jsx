import React from 'react';
import { Formik, Form, Field } from 'formik';

import './SignUp.css';
import { Link } from 'react-router-dom';
import { sendSignUpRequest } from '../../apis/Auth';

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
  return (
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
          sendSignUpRequest(values);
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
    </section>
  );
}
