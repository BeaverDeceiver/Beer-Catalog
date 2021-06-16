import React from 'react';
import { Formik, Form, Field } from 'formik';

import './SignUp.css';
import { Link } from 'react-router-dom';

export function SignUp() {
  return (
    <section className="sign-up">
      <h1 className="sign-up__header">Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        // onSubmit={async (values) => {}}
      >
        <Form className="sign-up__form">
          <article className="form__input-area">
            <label className="form__input-label" htmlFor="firstName">
              First Name
            </label>
            <Field
              className="form__input-field"
              id="firstName"
              name="firstName"
              placeholder="Jane"
            />
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
            />
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
            />
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
            <Link to="/signin">
              <button className="form__button form__button_sign-in button">
                Sign in instead
              </button>
            </Link>
            <button
              className="form__button form__button_sign-up button"
              type="submit"
            >
              Submit
            </button>
          </article>
        </Form>
      </Formik>
    </section>
  );
}
