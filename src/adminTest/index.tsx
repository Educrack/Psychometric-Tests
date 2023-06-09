import React, { useState } from 'react';
import {
  ActionButton,
  Button,
  IconButton,
  ListItemAction,
  Menu,
  Modal,
  PageHeader,
  PaginatedTable,
} from '@lipihipi/ec-ui';
import EduCrackAPI from '@lipihipi/client-sdk';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdSearch } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Form, Input, Label } from '@lipihipi/form';
import SearchableSelect from '../components/searchable-select';
import swal from 'sweetalert';
import { commonApiError } from '../admin/create/index';
import { Select } from '../components/select/select';

interface IListProps {
  getTestList: any;
  title?: string;
  breadCrumbs?: any[];
  onAddTest?: () => void;
  onEditClick?: (_id: string) => void;
  // currentModulePermission?: any[];
  assignTest: any;
  getUserGroup: any;
  getUserByName: any;
  onUpdateTest: any;
  role: string;
}

export const showErrorPopup = (error: any, setLoading: any) => {
  swal({
    title: error?.data?.message || 'Error',
    text:
      error?.data?.error?.code === 11000
        ? `Duplicate ${JSON.stringify(error?.data?.error?.keyValue)}`
        : 'Server error!',
    icon: 'error',
    dangerMode: false,
  });
  setLoading(false);
};

// const mapOptions = (values: any[]) => {
//   return values?.map(value => ({ label: value.name, value: value._id }));
// };

export const getComponent = (onClick: any, name: string) => {
  return (
    <IconButton onClick={onClick} className="primary-outine-button ml-2">
      <AiOutlinePlusCircle />
      {name}
    </IconButton>
  );
};

const TestList = ({
  getTestList,
  breadCrumbs,
  onAddTest,
  onEditClick,
  // currentModulePermission
  getUserGroup,
  getUserByName,
  assignTest,
  onUpdateTest,
  role,
}: IListProps) => {
  const [loading, setLoading] = useState(true);

  const [params, setParams] = useState<any>({
    page: 1,
    perPage: 10,
    isRecent: true,
  });
  const [tests, setTests] = React.useState<any>({
    totalItems: 0,
    tests: [],
  });

  const [
    showAssignTestToStudentModal,
    setShowAssignTestToStudentModal,
  ] = useState<any>(null);

  const [assignPayload, setAssignPayload] = useState<{
    group?: '';
    user?: '';
    test: '';
  }>({
    test: '',
  });
  const [assignData, setAssignData] = useState<any>({
    users: [],
    groups: [],
  });

  const [center, setCenter] = useState<any>([]);

  React.useEffect(() => {
    //@ts-ignore
    EduCrackAPI.center.list().then(({ data }: any) => {
      setCenter(data.centers);
    });
  }, []);

  React.useEffect(() => {
    getTestListData();
    getUserGroup()
      .then(({ data }: any) => {
        setAssignData((oldData: any) => ({ ...oldData, groups: data.groups }));
        setLoading(false);
      })
      .catch((err: any) => {
        commonApiError(err);
      });
  }, [params]);

  const getTestListData = () => {
    getTestList(params)
      .then(({ data }: any) => {
        setTests(data);
        setLoading(false);
      })
      .catch((err: any) => {
        commonApiError(err);
      });
  };

  const handleSearch = (values: any) => {
    setParams({
      page: 1,
      ...values,
    });
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (showAssignTestToStudentModal === 'center') {
        const { status } = await onUpdateTest(values.test, {
          center: values.center,
        });
        apiStatus(status, 'Test Assigned.');

        return;
      }
      const data = await assignTest(values);
      apiStatus(data?.status, 'Test Assigned.');
    } catch (error) {
      showErrorPopup(error, setLoading);
    }
  };

  // const apiStatus = (data: any, text: string) => {
  //   if (
  //     data?.status === 200 &&
  //     data?.data?.message === 'Successfully Assigned'
  //   ) {
  //     swal({
  //       title: 'Success',
  //       text,
  //       icon: 'success',
  //     }).then(() => {
  //       setShowAssignTestToStudentModal(null);
  //       setLoading(false);
  //     })
  //       .catch((err: any) => {
  //         commonApiError(err)
  //       });
  //   } else if (data?.status === 200) {
  //     swal({
  //       title: 'Error',
  //       text: data?.data?.message,
  //       icon: 'warning',
  //     }).then(() => {
  //       setShowAssignTestToStudentModal(null);
  //       setLoading(false);
  //     });
  //   } else {
  //     swal({
  //       title: 'Error',
  //       text: 'Server Error!',
  //       icon: 'error',
  //     }).then(() => {
  //       setShowAssignTestToStudentModal(null);
  //       setLoading(false);
  //     });
  //   }
  // };

  const apiStatus = (status: number, text: string) => {
    if (status === 200) {
      swal({
        title: 'Success',
        text,
        icon: 'success',
      }).then(() => {
        setShowAssignTestToStudentModal(null);
        setLoading(false);
        getTestListData();
      });
    } else {
      swal({
        title: 'Error',
        text: 'Server Error!',
        icon: 'error',
      }).then(() => {
        setShowAssignTestToStudentModal(null);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <section className="main-structure">
        {/* {currentModulePermission?.includes('read') ? ( */}
        <>
          <PageHeader
            title={'Psychometric Tests'}
            breadCrumbs={breadCrumbs || [{ title: 'Psychometric Tests' }]}
            component={
              <div className="d-flex align-items-center">
                {getComponent(
                  onAddTest,
                  'Add Test'
                  // currentModulePermission?.includes('create')
                )}
              </div>
            }
          />

          <Form
            initialValues={params}
            onSubmit={handleSearch}
            render={() => (
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <Input
                    prefix={<MdSearch />}
                    id="searchTest"
                    name="q"
                    placeholder="Enter here to search for Tests"
                  />
                </div>
                <Button shape="primary" className="ml-3" type="submit">
                  Apply{' '}
                </Button>
              </div>
            )}
          />

          <PaginatedTable
            data={tests.tests}
            columns={[
              {
                dataRenderer: (_data: any, index: number) => (
                  <>
                    <div className="primary-text">{index + 1}</div>
                  </>
                ),
                title: 'S.No',
                width: '15%',
              },
              {
                dataRenderer: (data: any) => (
                  <div className="primary-text">{data?.name}</div>
                ),
                title: 'Question',
                width: '50%',
              },
              {
                dataRenderer: (data: any) => (
                  <div className="primary-text">
                    {data?.totalDurationInMinute}
                  </div>
                ),
                title: 'Duration',
                width: '20%',
              },
              {
                dataRenderer: (data: any) => (
                  <ListItemAction className="action-button">
                    <ActionButton>
                      <BsThreeDotsVertical />
                    </ActionButton>
                    <Menu>
                      {/* {currentModulePermission?.includes('update') && ( */}
                      {/* @ts-ignore */}
                      <li onClick={() => onEditClick(data._id)}>Edit</li>
                      {/* )} */}
                      <li
                        onClick={() => {
                          setShowAssignTestToStudentModal('candidate');
                          setAssignPayload((oldData: any) => ({
                            ...oldData,
                            test: data?._id,
                          }));
                        }}
                      >
                        Assign To Candidate
                      </li>
                      {role === 'superadmin' && (
                        <li
                          onClick={() => {
                            setShowAssignTestToStudentModal('center');
                            setAssignPayload((oldData: any) => ({
                              ...oldData,
                              test: data?._id,
                              center: data?.center,
                            }));
                          }}
                        >
                          Assign to Centers
                        </li>
                      )}
                    </Menu>
                  </ListItemAction>
                ),
                title: '',
                width: '10%',
              },
            ]}
            totalItems={tests.totalItems}
            onPageChange={(page: any) => {
              setParams({ ...params, page: page });
            }}
            itemsPerPage={10}
            currentPage={params.page || 1}
          />
        </>
        {showAssignTestToStudentModal !== '' && (
          <Modal
            isOpen={
              showAssignTestToStudentModal === 'candidate' ||
              showAssignTestToStudentModal === 'center'
            }
            onRequestClose={() => setShowAssignTestToStudentModal('')}
          >
            <Form initialValues={{ ...assignPayload }} onSubmit={handleSubmit}>
              <header
                className="text-center mb-4"
                style={{ minWidth: '320px' }}
              >
                <Label
                  id="topic_header"
                  label={
                    showAssignTestToStudentModal === 'candidate'
                      ? 'Assign Test To Candidate'
                      : 'Assign Test To Center'
                  }
                  className="text-dark font-weight-bolder"
                />
                <br />
                <hr />
              </header>
              {loading ? (
                <div>Loading..</div>
              ) : (
                <>
                  <Select
                    id={
                      showAssignTestToStudentModal === 'candidate'
                        ? 'group'
                        : 'center'
                    }
                    name={
                      showAssignTestToStudentModal === 'candidate'
                        ? 'group'
                        : 'center'
                    }
                    placeholder={
                      showAssignTestToStudentModal === 'candidate'
                        ? 'Select Group'
                        : 'Select a Center'
                    }
                    options={
                      showAssignTestToStudentModal === 'candidate'
                        ? assignData?.groups
                        : assignData?.centers
                    }
                    isMulti={showAssignTestToStudentModal === 'center'}
                    onChange={() => {}}
                  />
                  {showAssignTestToStudentModal === 'candidate' && (
                    <>
                      <p>OR</p>
                      <div className="form-group">
                        <SearchableSelect
                          getUserByName={getUserByName}
                          name="user"
                        />
                        <br />
                        <hr />
                        <Label
                          id="new_user"
                          label="For new user"
                          className="text-dark font-weight-bolder"
                        />
                        <Input name="name" id="name" placeholder="Name" />
                        <Input name="email" id="email" placeholder="Email" />
                        <Input name="mobile" id="mobile" placeholder="Mobile" />
                      </div>
                    </>
                  )}
                  <footer className="text-center mb-4">
                    <hr />
                    <br />
                    <Button className="px-5" shape="primary" type="submit">
                      SAVE
                    </Button>
                    <Button
                      className="px-5"
                      shape="primary"
                      onClick={() => setShowAssignTestToStudentModal('')}
                    >
                      Close
                    </Button>
                  </footer>
                </>
              )}
            </Form>
          </Modal>
        )}

        {showAssignTestToStudentModal !== '' && (
          <Modal
            isOpen={showAssignTestToStudentModal === 'center'}
            onRequestClose={() => setShowAssignTestToStudentModal('')}
          >
            <Form initialValues={{ ...assignPayload }} onSubmit={handleSubmit}>
              <header
                className="text-center mb-4"
                style={{ minWidth: '320px' }}
              >
                <Label
                  id="topic_header"
                  label={'Assign Program To Center'}
                  className="text-dark font-weight-bolder"
                />
                <br />
                <hr />
              </header>
              {loading ? (
                <div>Loading..</div>
              ) : (
                <>
                  <Select
                    id={'center'}
                    name={'center'}
                    placeholder={'Select a Center'}
                    options={center}
                    isMulti={true}
                    onChange={() => {}}
                  />
                  <footer className="text-center mb-4">
                    <hr />
                    <br />
                    <Button className="px-5" shape="primary" type="submit">
                      SAVE
                    </Button>
                    <Button
                      className="px-5"
                      shape="primary"
                      onClick={() => setShowAssignTestToStudentModal('')}
                    >
                      Close
                    </Button>
                  </footer>
                </>
              )}
            </Form>
          </Modal>
        )}
      </section>
    </>
  );
};

export default TestList;
