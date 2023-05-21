// import React, { useEffect } from "react";
import swal from 'sweetalert';

export const commonApiError = (
    error: any,
    setLoading?: any,
    history?: any,
    url?: string
  ) => {
    swal({
      title: 'Error',
      text: error?.message|| error?.data?.message || 'Something went wrong, please try after some time.',
      icon: 'error',
    }).then(() => {
      setLoading(false);
      if (url) {
        history.push('/dashboard');
      }
    });
  };