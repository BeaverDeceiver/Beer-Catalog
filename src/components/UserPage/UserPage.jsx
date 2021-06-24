import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { fetchUser } from '../../apis/Fetch';

import { Error } from '../Error/Error';
import './UserPage.css';

export function UserPage() {
  const { userId } = useParams();

  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);
  const [user, setUser] = useState({});

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId)
      .then((data) => {
        setUser(data);
        setIsInitiallyLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsInitiallyLoading(false);
      });
  }, [userId]);

  if (isInitiallyLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Error message={error.statusText} status={error.status} />;
  }

  return (
    <section className="page__inner-container scroll-area">
      <article className="user-info">
        <section className="user-info__text-area">
          <h1 className="user-info__field">
            <p className="user-info__field-caption">First Name: </p>
            {user.firstName}
          </h1>
          <h1 className="user-info__field">
            <p className="user-info__field-caption">Last Name: </p>
            {user.lastName}
          </h1>
          <h1 className="user-info__field">
            <p className="user-info__field-caption">Email: </p>
            {user.email}
          </h1>
          <h1 className="user-info__field">
            <p className="user-info__field-caption">DOB: </p>
            {user.userInfo.dob
              ? new Date(user.userInfo.dob).toLocaleDateString()
              : `N/A`}
          </h1>
        </section>
        <article className="user-info__avatar">
          <img
            className="user-info__avatar-image"
            src={user.userInfo.avatar_url}
            alt="User Avatar"
          ></img>
        </article>
      </article>
    </section>
  );
}
