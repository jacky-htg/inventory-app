import React, { useEffect, useState } from 'react';
import { Siv } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      { label: 'SIV No', field: 'sivNo', default: true, filter: true, sorter:true },
      { label: 'Ref Type', field: 'refType', default: true, filter: true, sorter:true },
      { label: 'Ref No', field: 'refNo', default: true, filter: true, sorter:true },
      { label: 'Currency Code', field: 'currencyCode', default: true, filter: true, sorter:true },
      { label: 'Currency Rate', field: 'currencyRate', default: true, filter: true, sorter:true },
      { label: 'Status', field: 'status', default: true, filter: true, sorter:true },
      { label: 'Entry User', field: 'entryUser', default: true, filter: true, sorter:true },
      { label: 'Entry Date', field: 'entrydate', default: true }
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []);

  return (
    <PageList
      filter={ true }
      fields={ fields }
      title="SIV Entry"
      url="siv"
      data={ Siv }
      id={ ['id'] }
      actions={ ['view'] } />
  );
}

export default Page;
