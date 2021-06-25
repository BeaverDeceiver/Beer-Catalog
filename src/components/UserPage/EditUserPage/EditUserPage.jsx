import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import { fetchUser } from '../../../apis/Fetch';

import { Error } from '../../Error/Error';
import { getOwnId } from '../../../apis/Session';

import '../UserPage.css';
import './EditUserPage.css';

export function EditUserPage() {
  const { userId } = useParams();

  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);
  const [user, setUser] = useState({});

  const [error, setError] = useState(null);
  const [isOwnAccount, setIsOwnAccount] = useState(null);

  // const [invalidData, setInvalidData] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // const handleInvalidData = (e) => {
  //   setInvalidData(true);
  //   setErrorMessage(e.message);
  //   setTimeout(() => setInvalidData(false), 2000);
  // };

  useEffect(() => {
    setIsOwnAccount(getOwnId() === Number(userId));
    if (isOwnAccount) {
      fetchUser(userId)
        .then((data) => {
          setUser(data);
          console.log(data);
          setIsInitiallyLoading(false);
        })
        .catch((error) => {
          setIsInitiallyLoading(false);
          setError(error);
        });
    }
  }, [userId, isOwnAccount]);

  if (error) {
    return <Error message={error.statusText} status={error.status} />;
  }

  if (isOwnAccount === false) {
    return <Error message={'Not own page for editing'} status={400} />;
  }

  if (isInitiallyLoading) {
    return <LinearProgress />;
  }

  return (
    <section className="page__inner-container scroll-area">
      <section className="user-info user-info_edit">
        <div>
          <h1 className="form__header">Edit</h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              dob: {},
            }}
            // onSubmit={async (values) => {
            //   setSubmitted(true);
            //   try {
            //     const response = await sendSignUpRequest(values);
            //     if (response) {
            //       setSubmitted(false);
            //       setRegistered(true);
            //     }
            //   } catch (e) {
            //     handleInvalidData(e);
            //     setSubmitted(false);
            //   }
            // }}
          >
            {({ errors, touched }) => (
              <Form className="sign-up__form form">
                <article className="form__input-area edit-form__input-area">
                  <label className="form__input-label" htmlFor="firstName">
                    First Name
                  </label>
                  <Field
                    className="form__input-field edit-form__input-field"
                    id="firstName"
                    name="firstName"
                    placeholder={user.firstName}
                    // validate={validateName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="form__error-message">
                      {errors.firstName}
                    </div>
                  ) : null}
                </article>

                <article className="form__input-area edit-form__input-area">
                  <label className="form__input-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <Field
                    className="form__input-field edit-form__input-field"
                    id="lastName"
                    name="lastName"
                    placeholder={user.lastName}
                    // validate={validateName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="form__error-message">{errors.lastName}</div>
                  ) : null}
                </article>

                <article className="form__input-area edit-form__input-area">
                  <label className="form__input-label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="form__input-field edit-form__input-field"
                    id="email"
                    name="email"
                    placeholder={user.email}
                    type="email"
                    // validate={validateEmail}
                  />
                  {errors.email && touched.email ? (
                    <div className="form__error-message">{errors.email}</div>
                  ) : null}
                </article>

                <article className="form__input-area edit-form__input-area">
                  <label className="form__input-label" htmlFor="dob">
                    DOB
                  </label>
                  <Field
                    className="form__input-field edit-form__input-field"
                    id="dob"
                    name="dob"
                    placeholder={
                      user.userInfo && user.userInfo.dob
                        ? new Date(user.userInfo.dob).toLocaleDateString()
                        : `N/A`
                    }
                    // validate={validatePassword}
                  />
                  {errors.dob && touched.dob ? (
                    <div className="form__error-message">{errors.password}</div>
                  ) : null}
                </article>

                <article className="form__buttons-area edit-form__buttons-area">
                  <button
                    className="form__button form__button_sign-up button"
                    type="submit"
                  >
                    Apply
                  </button>

                  <Link to={`/user/${userId}`}>
                    <button
                      type="button"
                      className="form__button form__button_sign-in button"
                    >
                      Cancel
                    </button>
                  </Link>
                </article>
              </Form>
            )}
          </Formik>
          {/* {invalidData ? (
            <div className="auth__error">{errorMessage}</div>
          ) : null} */}
        </div>
      </section>
    </section>
  );
}

// const validateEmail = (value) => {
//   let errorMessage;

//   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     errorMessage = 'Invalid email address';
//   }

//   return errorMessage;
// };

// const validateName = (value) => {
//   let errorMessage;

//   if (!/.{2,}/i.test(value)) {
//     errorMessage = 'Value too short';
//     return errorMessage;
//   }

//   if (/\d/i.test(value)) {
//     errorMessage = 'No numbers allowed';
//     return errorMessage;
//   }

//   if (/\s/i.test(value)) {
//     errorMessage = 'No whitespaces allowed';
//     return errorMessage;
//   }

//   return errorMessage;
// };
