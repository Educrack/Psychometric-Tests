import React, { useState } from 'react';
import {
    ActionButton,
    Button,
    IconButton,
    ListItemAction,
    Menu,
    PageHeader,
    PaginatedTable,
} from '@lipihipi/ec-ui';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdSearch } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Form, Input } from '@lipihipi/form';

interface IListProps {
    getTestList: any;
    title?: string;
    breadCrumbs?: any[];
    onAddTest?: () => void;
    onEditClick?: (_id: string) => void;
    // currentModulePermission?: any[];
}

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
}: IListProps) => {
    const [params, setParams] = useState<any>({
        page: 1,
        perPage: 10,
    });
    const [tests, setTests] = React.useState<any>({
        totalItems: 0,
        tests: [],
    });

    React.useEffect(() => {
        getTestList(params).then(({ data }: any) => {
            setTests(data);
        });
    }, [params]);


    const handleSearch = (values: any) => {
        setParams({
            page: 1,
            ...values,
        });
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
                            <div className='d-flex align-items-center'>
                                {getComponent(
                                    onAddTest,
                                    'Add Test',
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
                                    <div className="primary-text">{data?.totalDurationInMinute
                                    }</div>
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
                {/* ) :
                    (
                        <div>
                            <h4>Sorry!, you don't have permission to see this.</h4>
                        </div>
                    )} */}
            </section>
        </>
    );
};

export default TestList;
