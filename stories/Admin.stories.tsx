import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import EduCrackAPI from '@lipihipi/client-sdk';
import QuestionList from '../src/admin/index';
import CreateQuestion from '../src/admin/create/index'
import '@lipihipi/theme';
import EducrackAPI from '@lipihipi/client-sdk';
// import './style.css';

export default {
    title: 'Admin',
};

EduCrackAPI.setENV('development');

export const adminQuestionList = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        EduCrackAPI.auth
            .login({
                email: 'admin@educrack.com',
                password: 'password',
            })
            .then(() => {
                setLoggedIn(true);
            });
    }, []);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <QuestionList
                    breadCrumbs={[{ title: 'Psychometric Tests', link: '/' }]}
                    getQuestionsList={EducrackAPI.psychometricQuestion.list}
                    onAddQuestion={() => console.log("On Add Question")}
                    onEditClick={(id: String) => {
                        console.log('Edit Question clicked', id);
                    }
                    }
                />
            )}
        </BrowserRouter>
    );
};

export const adminAddQuestion = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        EduCrackAPI.auth
            .login({
                email: 'admin@educrack.com',
                password: 'password',
            })
            .then(() => {
                setLoggedIn(true);
            });
    }, []);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <CreateQuestion
                    title={"Add a Question"}
                    breadCrumbs={[{ title: 'add question', link: '/' }]}
                    getQuestion={EducrackAPI.psychometricQuestion.get}
                    updateQuestion={EducrackAPI.psychometricQuestion.update}
                    createQuestion={EducrackAPI.psychometricQuestion.create}
                    afterAddOrEditQuestion={() => { console.log('redirect to list'); }}
                />
            )}
        </BrowserRouter>
    );
};

export const adminEditQuestion = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        EduCrackAPI.auth
            .login({
                email: 'admin@educrack.com',
                password: 'password',
            })
            .then(() => {
                setLoggedIn(true);
            });
    }, []);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <CreateQuestion
                    id={"6421dd135f546a11fe7221ce"}
                    title={"Edit Question"}
                    breadCrumbs={[{ title: 'edit question', link: '/' }]}
                    getQuestion={EducrackAPI.psychometricQuestion.get}
                    updateQuestion={EducrackAPI.psychometricQuestion.update}
                    createQuestion={EducrackAPI.psychometricQuestion.create}
                    afterAddOrEditQuestion={() => { console.log('redirect to list'); }}
                />
            )}
        </BrowserRouter>
    );
};
