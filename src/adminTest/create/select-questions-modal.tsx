import React, { useState, useEffect } from 'react';
import { Form, Select, CheckBox, Input } from '@lipihipi/form';
import { Button, Modal, Pagination, Table } from '@lipihipi/ec-ui';
import { MdSearch } from 'react-icons/md';
import { commonApiError } from '../../admin/create/index';

const mapOptions = (values: any[]) => {
  return values.map(value => ({ label: value.name, value: value._id }));
};

const SelectQuestionsModal = ({
  isOpen,
  onRequestClose,
  initialValues,
  getQuestions,
  onChangeFreeQuestions,
}: any) => {
  const [params, setParams] = useState<any>({
    populate: true,
    isRecent: true,
    page: 1,
  });
  const [questions, setQuestions] = useState<any>({
    totalItems: 0,
    questions: [],
  });
  const [topics] = React.useState<any>([]);

  useEffect(() => {
    getQuestions({ ...params })
      .then((res: any) => {
        setQuestions(res.data);
      })
      .catch((err: any) => {
        commonApiError(err)
      });
  }, [params]);

  // useEffect(() => {
  //   sectionSubjects.map((item: any) => {
  //     item.topics.map((values: any) => {
  //       setTopics((prevState: any) => ([
  //         ...prevState,
  //         {
  //           _id: values._id,
  //           name: values.name
  //         }
  //       ]))
  //     })
  //   });
  // }, [sectionSubjects]);

  // const getTopicHandler = (data: any) => {
  //   const _topics =
  //     sectionSubjects.find((item: any) => item.subject._id === data.value)
  //       ?.topics || [];
  //   setTopics(_topics);
  // };

  const handleSearch = (values: any) => {
    setParams((prev: any) => ({
      ...prev,
      q: values.q,
      subject: values.subject,
      topic: values.topic,
    }));
  };

  const getCheckStatus = (data: any) => {
    let status = false;
    initialValues?.forEach((file: any) => {
      if (file === data._id) {
        status = true;
      }

      return false;
    });

    if (status) {
      return true;
    }

    return false;
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="question-bank">
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3>
              {`You are attaching a file from Library for the Batch : ${initialValues?.name ||
                'NA'}`}
            </h3>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div className="row">
              <div className="col-12 col-md-12">
                <Form
                  initialValues={{
                    q: '',
                    subject: '',
                    topic: '',
                  }}
                  onSubmit={handleSearch}
                  render={({ submitForm }: any) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col-md-4">
                            <Input
                              prefix={<MdSearch />}
                              id="q"
                              name="q"
                              label="Search by keyword"
                              placeholder="Search the content here"
                            />
                          </div>

                          <div className="col-12 col-md-4">
                            <Select
                              id="topic"
                              name="topic"
                              label="Topics"
                              placeholder="Select topic"
                              options={[
                                { label: 'ALL', value: '' },
                                ...mapOptions(topics),
                              ]}
                              onChange={submitForm}
                            />
                          </div>
                          <Button
                            shape="primary"
                            className="d-none"
                            type="submit"
                          >
                            Search
                          </Button>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ minHeight: '100px' }}>
          <Table
            data={questions.questions}
            columns={[
              {
                dataRenderer: (data: any) => (
                  <>
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <Form
                        initialValues={{
                          [data._id]: getCheckStatus(data),
                        }}
                      >
                        <CheckBox
                          id={data._id}
                          name={data._id}
                          onChange={(event: any) => {
                            onChangeFreeQuestions(event.target.checked, data);
                          }}
                        />
                      </Form>
                    </div>
                  </>
                ),
                title: '',
                width: '30%',
              },
              {
                dataRenderer: (data: any) => <>{data?.text}</>,
                title: 'Questions',
              },
            ]}
          />
        </div>

        <div className="question-bank--footer">
          <Button shape="secondary" onClick={onRequestClose}>
            Close
          </Button>
        </div>
      </div>
      <Pagination
        totalItems={questions.totalItems}
        currentPage={params.page || 1}
        itemsPerPage={10}
        onPageChange={(page: number) => {
          setParams({ ...params, page: page });
        }}
      />
    </Modal>
  );
};

export default SelectQuestionsModal;
