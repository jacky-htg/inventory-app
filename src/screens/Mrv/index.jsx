import React, { useEffect, useState } from 'react';
import { Mrv } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      { label: 'MRV No', field: 'mrvNo', default: true, filter: true, sorter:true }
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []);

  return (
    <PageList
      filter={ true }
      fields={ fields }
      title="MRV Entry"
      url="mrv"
      data={ Mrv }
      id={ ['id'] }
      actions={ ['view'] } />
  );
}

export default Page;
