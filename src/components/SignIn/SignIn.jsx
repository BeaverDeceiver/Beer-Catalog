import React from 'react';
import { Formik, Form, Field } from 'formik';

import './SignIn.css';
import { Link } from 'react-router-dom';

const validateEmail = (value) => {
  let errorMessage;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errorMessage = 'Invalid email address';
  }

  return errorMessage;
};

export function SignIn() {
  return (
    <section className="sign-up">
      <h1 className="sign-up__header form__header">Sign In</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        // onSubmit={async (values) => {}}
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
              <Link to="/signup">
                <button className="form__button form__button_sign-in button">
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
          </Form>
        )}
      </Formik>
    </section>
  );
}