import { Table } from '@lipihipi/ec-ui';
import React, { useEffect } from 'react';

import { cloneDeep } from 'lodash';

const Questions = ({ data }: any) => {
  const [dataValue, setData] = React.useState([]);
  const [dragObject, setDragObject] = React.useState({
    index: 0,
    dataItem: {},
  });

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleOnDragOver = (dataItem: object, index: number) => {
    setDragObject({ index: index, dataItem: dataItem });
  };

  const handleOnDragEnd = (dataItem: object, index: number) => {
    const prevData = cloneDeep(dataValue);
    prevData.splice(index, 1);
    //@ts-ignore
    prevData.splice(dragObject?.index, 0, dataItem);
    setData(prevData);
  };

  return (
    <div style={{ width: '100%' }}>
      {dataValue.length > 0 ?
        <div className="my-3">
          <Table
            data={dataValue}
            columns={[
              {
                dataRenderer: (data: any) => (
                  <>
                    {data?.text}
                  </>
                ),
                title: '',
                width: 'calc(100% - (80px + 140px))',
              },
            ]}
            isDraggable={true}
            handleOnDragOver={handleOnDragOver}
            handleOnDragEnd={handleOnDragEnd}
          />
        </div>
        : ('')
      }
    </div>
  );
};

export default Questions;
