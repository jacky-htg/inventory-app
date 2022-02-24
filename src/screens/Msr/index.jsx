import React, { useEffect, useState } from 'react';
import { Msr } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      { label: 'Documen No', field: 'docmNo', default: true, filter: true },
      { label: 'Currency Code', field: 'currencyCode', default: true, filter: true },
      { label: 'Currency Rate', field: 'currencyRate', default: true, filter: true },
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []);

  return (
    <PageList
      filter={ true }
      fields={ fields }
      title="MSR Entry"
      url="msr"
      data={ Msr }
      id={ ['id'] }
      actions={ ['view'] } />
  );
}

export default Page;
