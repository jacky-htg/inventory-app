import React, { useEffect, useState } from 'react';
import { Grn } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      { label: 'GRN No', field: 'grnNo', default: true, filter: true, sorter:true },
      { label: 'Currency Code', field: 'currencyCode', default: true },
      { label: 'CurrencyRate', field: 'currencyRate', default: true, decimal:4, align:'right' },
      { label: 'Recd Date', field: 'recdDate' },
      { label: 'Created At', field: 'createdAt' }
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []);

  return (
    <PageList
      filter={ true }
      defaultFilter={{"field":"subType", "operator":"EQUALS", "value":"M"}}
      fields={ fields }
      title="GRN Manual"
      url="grn-manuals"
      data={ Grn }
      id={ ['grnNo', 'subType'] }
      actions={ ['view'] } />
  );
}

export default Page;
