import React, { useEffect } from 'react';
import {
    Form,
    Input,
} from '@lipihipi/form';
import { Row, Col, Button, PageHeader } from '@lipihipi/ec-ui';
import swal from 'sweetalert';
import SelectQuestionsModal from './select-questions-modal';
import Questions from './questions';
import EducrackAPI from '@lipihipi/client-sdk';

const CreateTest = ({
    id,
    title,
    breadCrumbs,
    getQuestionList,
    getTest,
    updateTest,
    createTests,
    afterAddOrEditTest
}: any) => {
    const [questions, setQuestions] = React.useState<any>([]);
    const [questionData, setQuestionData] = React.useState<any>([]);
    const [data, setData] = React.useState<any>({});
    const [isOpenTest, setIsOpenTest] = React.useState(false);

    useEffect(() => {
        if (id) {
            getTest(id).then(({ data }: any) => {
                setData(data);
            })
        }
    }, []);

    useEffect(() => {
        if (id) {
            data?.questions?.map((value: any) => {
                EducrackAPI.psychometricQuestion.get(value, { populate: true }).then(({ data }: any) => {
                    setQuestionData([...questionData, data])
                })
            });

        }
    }, [data])

    const onChangeFreeQuestions = (isChecked: boolean, data: any) => {

        if (isChecked) {
            setQuestions([...questions, data._id]);
            setQuestionData([...questionData, data])
        }
        else {
            setQuestions(questions.filter((item: any) => item !== data._id));
            setQuestionData(questionData.flter((item: any) => { item._id !== data._id }))
        }
    };

    const handleSubmit = (values: any, formik: any) => {
        console.log(values, 'values')

        let payload;
        if (id) {
            payload = {
                name: values.name,
                totalDurationInMinute: values.totalDurationInMinute,
                questions: questions
            };
        }
        else {
            payload = {
                name: values.name,
                totalDurationInMinute: values.totalDurationInMinute,
                questions: questions
            };
        }
        if (id) {
            updateTest(payload).then(() => {
                swal({
                    title: 'Success',
                    text: 'Program Updated',
                    icon: 'success',
                }).then(function () {
                    formik.resetForm();
                    afterAddOrEditTest();
                });
            })
                .catch((err: any) => {
                    swal({
                        title: 'Error',
                        text: err?.data?.message || 'Server Error!',
                        icon: 'error',
                        dangerMode: true,
                    });
                });
        }
        else {
            createTests(payload).then(() => {
                swal({
                    title: 'Success',
                    text: 'Program Created',
                    icon: 'success',
                }).then(function () {
                    formik.resetForm();
                    afterAddOrEditTest();
                });
            })
                .catch((err: any) => {
                    swal({
                        title: 'Error',
                        text: err?.data?.message || 'Server Error!',
                        icon: 'error',
                        dangerMode: true,
                    });
                });
        }
    };



    return (
        <section className='main-structure'>
            <>
                <PageHeader
                    title={title || 'Create Program'}
                    breadCrumbs={
                        breadCrumbs || [
                            { title: 'Home', link: '/dashboard' },
                            { title: 'Create Program', link: '/program' },
                        ]
                    }
                />
                <Form
                    initialValues={data}
                    validationSchema={""}
                    onSubmit={handleSubmit}
                    render={({ values, setFieldValue, errors, ...rest }: any) => {
                        console.log(rest)
                        return (
                            <>
                                <div>
                                    <Row spacing={20}>
                                        <Col xs={12} md={12}>
                                            <Input
                                                id="name"
                                                name="name"
                                                label="Name"
                                                placeholder="Enter your Test Name..."
                                                required
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Input
                                                id="totalDurationInMinute"
                                                name="totalDurationInMinute"
                                                label="Total Duration(Minute)"
                                                type="number"
                                                required
                                            />
                                        </Col>
                                        <Col>
                                            <Button
                                                className="px-5"
                                                shape="secondary"
                                                type="button"
                                                onClick={() => {
                                                    setIsOpenTest(true);
                                                }}
                                            >
                                                Add Questions
                                            </Button>
                                        </Col>

                                    </Row>
                                </div>
                                <Questions data={questionData} />
                                <div className="mt-3">
                                    <div className="row ml-0">
                                        <Button shape="primary" className="ml-3" type="submit">
                                            Save{' '}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        );
                    }}
                />

                {isOpenTest ? (
                    <SelectQuestionsModal
                        isOpen={isOpenTest}
                        onRequestClose={() => {
                            setIsOpenTest(false);
                        }}
                        initialValues={data}
                        getQuestions={getQuestionList}
                        onChangeFreeQuestions={onChangeFreeQuestions}
                    />
                ) : (
                    ''
                )}
            </>
        </section>
    );
};

export default CreateTest;
