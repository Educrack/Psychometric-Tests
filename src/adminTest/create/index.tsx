import React, { useEffect } from 'react';
import { Form, Input, RichTextEditor } from '@lipihipi/form';
import { Row, Col, Button, PageHeader, Loader } from '@lipihipi/ec-ui';
import swal from 'sweetalert';
import SelectQuestionsModal from './select-questions-modal';
import Questions from './questions';
import EducrackAPI from '@lipihipi/client-sdk';
import { TestSchema } from './test.schema';
import { commonApiError } from 'admin/errorModule';

const CreateTest = ({
  id,
  title,
  breadCrumbs,
  getQuestionList,
  getTest,
  updateTest,
  createTests,
  afterAddOrEditTest,
  createAsset,
  getAssetUrl,
}: any) => {
  //   const [questions, setQuestions] = React.useState<any>([]);
  const [questionData, setQuestionData] = React.useState<any>([]);
  const [data, setData] = React.useState<any>({});
  const [isOpenTest, setIsOpenTest] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (id) {
      getTest(id)
        .then(({ data }: any) => {
          setData(data);
          setLoading(false)
        })
        .catch((err: any) => {
          commonApiError(err)
        });
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        for (const value of data?.questions || []) {
          try {
            const { data } = await EducrackAPI.psychometricQuestion.get(value, { populate: true });
            setQuestionData((oldData: any) => [...oldData, data]);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            swal({
              title: 'Error',
              text: err.message || 'Server error!',
              icon: 'error',
              dangerMode: false,
            });
          }
        }
      };
      fetchData();
    }
  }, [data]);

  const onChangeFreeQuestions = (isChecked: boolean, data: any) => {
    if (isChecked) {
      //   setQuestions([...questions, data._id]);
      setQuestionData([...questionData, data]);
    } else {
      //   setQuestions(questions.filter((item: any) => item !== data._id));
      setQuestionData(
        questionData.filter((item: any) => {
          item._id !== data._id;
        })
      );
    }
  };

  const handleSubmit = (values: any, formik: any) => {
    const payload = {
      name: values.name,
      totalDurationInMinute: values.totalDurationInMinute,
      questions: questionData,
      instruction: values.instruction,
    };

    const method = id ? updateTest(id, payload) : createTests(payload);

    method
      .then(() => {
        swal({
          title: 'Success',
          text: `Test ${id ? 'Updated' : 'Created'}`,
          icon: 'success',
        }).then(function () {
          formik.resetForm();
          afterAddOrEditTest();
        });
      })
      .catch((err: any) => {
        commonApiError(err)
      });
  };

  const updateQuestionData = (data: any) => {
    setQuestionData(data);
  };

  return (
    <section className="main-structure">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageHeader
            title={title || 'Create Test'}
            breadCrumbs={
              breadCrumbs || [
                { title: 'Home', link: '/dashboard' },
                { title: 'Create Test', link: '/pyschometric/test' },
              ]
            }
          />
          <Form
            initialValues={data}
            validationSchema={TestSchema}
            onSubmit={handleSubmit}
            render={() => {
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
                      <Col xs={12} md={6}>
                        <RichTextEditor
                          id={'instruction'}
                          name={'instruction'}
                          label={'Instructions'}
                          required
                          uploadFile={createAsset}
                          getAssetUrl={getAssetUrl}
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
                  <Questions data={questionData} updateQuestionData={updateQuestionData} />
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
              initialValues={questionData?.map((v: any) => v?._id)}
              getQuestions={getQuestionList}
              onChangeFreeQuestions={onChangeFreeQuestions}
            />
          ) : (
            ''
          )}
        </>
      )}
    </section>
  );
};

export default CreateTest;
