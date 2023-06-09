import React, { useEffect } from 'react';
import {
    Form,
    Input,
} from '@lipihipi/form';
import { Row, Col, Button, PageHeader, Loader } from '@lipihipi/ec-ui';
import swal from 'sweetalert';
import { QuestionsSchema } from './question.schema';

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

const CreateQuestion = ({
    id,
    title,
    breadCrumbs,
    getQuestion,
    updateQuestion,
    createQuestion,
    afterAddOrEditQuestion
}: any) => {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<any>({});

    useEffect(() => {
        if (id) {
            getQuestion(id)
                .then(({ data }: any) => {
                    let formattedData = {
                        text: data.text,
                        d: data.score.d,
                        s: data.score.s,
                        i: data.score.i,
                        c: data.score.c
                    }
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((err: any) => {
                    commonApiError(err)
                });
        }
    }, []);

    const handleSubmit = (values: any, formik: any) => {
        console.log(values, 'values')

        let payload;
        if (id) {
            payload = {
                _id: id,
                text: values.text,
                score: {
                    "d": values.d,
                    "i": values.i,
                    "s": values.s,
                    "c": values.c
                }
            };
        }
        else {
            payload = {
                text: values.text,
                score: {
                    "d": values.d,
                    "i": values.i,
                    "s": values.s,
                    "c": values.c
                }
            };
        }
        if (id) {
            updateQuestion(payload).then(() => {
                swal({
                    title: 'Success',
                    text: 'Question Updated',
                    icon: 'success',
                }).then(function () {
                    formik.resetForm();
                    afterAddOrEditQuestion();
                });
            })
                .catch((err: any) => {
                    commonApiError(err)
                });
        }
        else {
            createQuestion(payload).then(() => {
                swal({
                    title: 'Success',
                    text: `Question ${id ? 'Updated' : 'Created'}`,
                    icon: 'success',
                }).then(function () {
                    formik.resetForm();
                    afterAddOrEditQuestion();
                });
            })
                .catch((err: any) => {
                    commonApiError(err)
                });
        }
    };



    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <section className="main-structure">
                    <>
                        <PageHeader
                            title={title || 'Create Questions'}
                            breadCrumbs={
                                breadCrumbs || [
                                    { title: 'Home', link: '/dashboard' },
                                    { title: 'Create Questions', link: '/pyschometric' },
                                ]
                            }
                        />
                        <Form
                            initialValues={data}
                            validationSchema={QuestionsSchema}
                            onSubmit={handleSubmit}
                            render={({ values, setFieldValue, errors, ...rest }: any) => {
                                console.log(rest);
                                return (
                                    <>
                                        <Row spacing={20}>
                                            <Col xs={12} md={12}>
                                                <Input
                                                    id="text"
                                                    name="text"
                                                    label="Question"
                                                    placeholder="Enter your Question..."
                                                    required
                                                />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <Input id="d" name="d" label="D" type="number" required />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <Input id="i" name="i" label="I" type="number" required />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <Input id="s" name="s" type="number" label="S" required />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <div className="form-group">
                                                    <Input id="c" name="c" type="number" label="C" required />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="mt-3">
                                            <Button shape="primary" type="submit">
                                                Save
                                            </Button>
                                        </div>
                                    </>
                                );
                            }}
                        />
                    </>
                </section>
            )}
        </>
    );
};

export default CreateQuestion;
