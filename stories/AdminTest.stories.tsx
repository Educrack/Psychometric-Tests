import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import EduCrackAPI from '@lipihipi/client-sdk';
import TestList from '../src/adminTest/index';
import CreateTest from '../src/adminTest/create/index';
import '@lipihipi/theme';
import EducrackAPI from '@lipihipi/client-sdk';
// import './style.css';

export default {
  title: 'Admin',
};

EduCrackAPI.setENV('development');

export const adminTestList = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    EduCrackAPI.auth
      .login({
        email: 'educrack2023@gmail.com',
        password: 'password',
      })
      .then(() => {
        setLoggedIn(true);
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <TestList
          breadCrumbs={[{ title: 'Psychometric Tests', link: '/' }]}
          getTestList={EducrackAPI.psychometricTest.list}
          onAddTest={() => console.log('On Add Question')}
          onEditClick={(id: String) => {
            console.log('Edit Question clicked', id);
          }}
          getUserGroup={EduCrackAPI.userGroup.list}
          getUserByName={EduCrackAPI.user.list}
          assignTest={EducrackAPI.psychometricUserTest.assign}
          onUpdateTest={EduCrackAPI.psychometricTest.update}
          role="superadmin"
        />
      )}
    </BrowserRouter>
  );
};

export const adminAddTest = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    EduCrackAPI.auth
      .login({
        email: 'educrack2023@gmail.com',
        password: 'password',
      })
      .then(() => {
        setLoggedIn(true);
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <CreateTest
          title={'Add a Test'}
          breadCrumbs={[{ title: 'add question', link: '/' }]}
          getQuestionList={EducrackAPI.psychometricQuestion.list}
          getTest={EducrackAPI.psychometricTest.get}
          updateTest={EducrackAPI.psychometricTest.update}
          createTests={EducrackAPI.psychometricTest.create}
          afterAddOrEditQuestion={() => {
            console.log('redirect to list');
          }}
          createAsset={EduCrackAPI.asset.create}
          getAssetUrl={EduCrackAPI.asset.getAssetUrl}
        />
      )}
    </BrowserRouter>
  );
};

export const adminEditTest = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    EduCrackAPI.auth
      .login({
        email: 'educrack2023@gmail.com',
        password: 'password',
      })
      .then(() => {
        setLoggedIn(true);
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <CreateTest
          id={'6435bed1b7bda88c3afda3c9'}
          title={'Add a Test'}
          breadCrumbs={[{ title: 'add question', link: '/' }]}
          getQuestionList={EducrackAPI.psychometricQuestion.list}
          getTest={EducrackAPI.psychometricTest.get}
          updateTest={EducrackAPI.psychometricTest.update}
          createTests={EducrackAPI.psychometricTest.create}
          afterAddOrEditQuestion={() => {
            console.log('redirect to list');
          }}
          createAsset={EduCrackAPI.asset.create}
          getAssetUrl={EduCrackAPI.asset.getAssetUrl}
        />
      )}
    </BrowserRouter>
  );
};
