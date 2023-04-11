import React, { useEffect } from 'react';

const Questions = ({ data }: any) => {
    const [dataValue, setData] = React.useState([]);

    useEffect(() => {
        setData(data);
    }, [data]);

    return (
        <div style={{ width: "100%" }}>
            {
                dataValue.map((topic: any) => {
                    return (
                        <>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="lesson-notes-list">
                                        <li>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flex: 1,
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {topic.text}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )
                }
                )}
        </div>
    );
}

export default Questions;
