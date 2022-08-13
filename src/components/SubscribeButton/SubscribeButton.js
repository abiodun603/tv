import React, { FC, useState, useCallback, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

import http from '../../api/axiosApi';
import { PATH_URL_SUBSCRIBE, PATH_URL_UNSUBSCRIBE } from '../../constants/API';

import { ButtonContainer } from '../widgets/Button';

const SubscribeButton = ({ isSubscribed, id, disabled, type = '' }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const [isCurrentSubscribed, setCurrentSubscribed] = useState(isSubscribed);

  useEffect(() => {
    setCurrentSubscribed(isSubscribed);
  }, [isSubscribed]);

  const token = cookies.get('token');
  http.setToken(token);

  const onClick = useCallback(() => {
    setLoading(true);

    let req;

    if (type === 'collection') {
      req = isCurrentSubscribed
        ? http.post(`${'/collection/unsubscribe/'}${id}`)
        : http.post(`${'/collection/subscribe/'}${id}`);
    } else {
      req = isCurrentSubscribed
        ? http.delete(`${PATH_URL_UNSUBSCRIBE}${id}`)
        : http.post(`${PATH_URL_SUBSCRIBE}${id}`);
    }

    return req
      .then((res) => {
        const data = res.data;

        if (Boolean(data.success) || (!data.seccess && type === 'collection')) {
          setCurrentSubscribed(!isCurrentSubscribed);
        } else {
          enqueueSnackbar(data.message, {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            variant: 'warning',
          });
        }

        setLoading(false);
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          variant: 'warning',
        });

        setLoading(false);
      });
  }, [id, isCurrentSubscribed]);

  // if (isLoading) {
  //   return <Spinner animation="border" variant="success" />;
  // }

  return (
    <ButtonContainer onClick={onClick} disabled={disabled}>
      {isCurrentSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </ButtonContainer>
  );
};

export default SubscribeButton;
