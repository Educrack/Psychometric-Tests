import React, { useEffect } from 'react';
import {
    Form,
    Input,
} from '@lipihipi/form';
import { Row, Col, Button, PageHeader } from '@lipihipi/ec-ui';
import swal from 'sweetalert';

const CreateQuestion = ({
    id,
    title,
    breadCrumbs,
    getQuestion,
    updateQuestion,
    createQuestion,
    afterAddOrEditQuestion
}: any) => {

    const [data, setData] = React.useState<any>({});

    useEffect(() => {
        if (id) {
            getQuestion(id).then(({ data }: any) => {
                console.log(data, 'data')
                let formattedData = {
                    text:data.text,
                    d:data.score.d,
                    s:data.score.s,
                    i:data.score.i,
                    c:data.score.c
                }
                setData(formattedData)
            })
        }
    }, []);

    const handleSubmit = (values: any, formik: any) => {
        console.log(values, 'values')

        let payload;
        if (id) {
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
                    text: 'Program Updated',
                    icon: 'success',
                }).then(function () {
                    formik.resetForm();
                    afterAddOrEditQuestion();
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
            createQuestion(payload).then(() => {
                swal({
                    title: 'Success',
                    text: 'Program Created',
                    icon: 'success',
                }).then(function () {
                    formik.resetForm();
                    afterAddOrEditQuestion();
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
                                                id="text"
                                                name="text"
                                                label="Question"
                                                placeholder="Enter your Question..."
                                                required
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Input
                                                id="d"
                                                name="d"
                                                label="D"
                                                type="number"
                                                required
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Input
                                                id="s"
                                                name="s"
                                                type="number"
                                                label="S"
                                                required
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Input
                                                id="i"
                                                name="i"
                                                label="I"
                                                type="number"
                                            />
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <div className='form-group'>
                                                <Input
                                                    id="c"
                                                    name="c"
                                                    type="number"
                                                    label="C"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
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
            </>
        </section>
    );
};

export default CreateQuestion;
