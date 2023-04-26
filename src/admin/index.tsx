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
    getQuestionsList: any;
    title?: string;
    breadCrumbs?: any[];
    onAddQuestion?: () => void;
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


const QuestionList = ({
    getQuestionsList,
    title,
    breadCrumbs,
    onAddQuestion,
    onEditClick,
    // currentModulePermission
}: IListProps) => {
    const [params, setParams] = useState<any>({
        page: 1,
        perPage: 10,
        recent: true
    });
    const [questions, setQuestions] = React.useState<any>({
        totalItems: 0,
        questions: [],
    });

    React.useEffect(() => {
        getQuestionsList(params).then(({ data }: any) => {
            setQuestions(data);
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
                        title={title || 'Psychometric Questions'}
                        breadCrumbs={breadCrumbs || [{ title: 'Psychometric Tests' }]}
                        component={
                            <div className='d-flex align-items-center'>
                                {getComponent(
                                    onAddQuestion,
                                    'Add Questions',
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
                                        placeholder="Enter here to search for questions"
                                    />
                                </div>
                                <Button shape="primary" className="ml-3" type="submit">
                                    Apply{' '}
                                </Button>
                            </div>
                        )}
                    />

                    <PaginatedTable
                        data={questions.questions}
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
                                    <div className="primary-text">{data?.text}</div>
                                ),
                                title: 'Question',
                                width: '70%',
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
                        totalItems={questions.totalItems}
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

export default QuestionList;
