import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useField } from 'formik';
import { ErrorMessage } from '../error/error';

const SearchableSelect = ({ name, isMulti, getUserByName }: any) => {
  // @ts-ignore
  const [field, meta, helpers] = useField({ name });
  const _onChange = (v: any) => {
    if (isMulti) {
      helpers.setValue(v.map((item: any) => item.value));
    } else {
      helpers.setValue(v.value);
    }
  };

  const getUsers = async (inputValue: string) => {
    try {
      const { data } = await getUserByName({ q: inputValue, role: 'user' });
      const users = data.users.map((v: any) => ({
        label: v?.name,
        value: v?._id,
      }));
      return users;
    } catch (err) {
      console.log('error', err);
    }
  };

  const promiseOptions = async (inputValue: string) => {
    try {
      const users = await getUsers(inputValue);
      return users;
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <>
      <AsyncCreatableSelect
        cacheOptions
        formatCreateLabel={() => null}
        placeholder="Search for candidate name"
        loadOptions={promiseOptions}
        onChange={_onChange}
      />
      <ErrorMessage meta={meta} />
    </>
  );
};

export default SearchableSelect;
