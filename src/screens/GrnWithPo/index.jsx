import React, { useEffect, useState } from 'react';
import { Grn } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      { label: 'PO No', field: 'poNo', default: true, filter: true, sorter:true },
      { label: 'DO No', field: 'doNo', default: true, filter: true, sorter:true },
      { label: 'GRN No', field: 'grnNo', default: true, filter: true, sorter:true },
      { label: 'Supplier Code', field: 'supplierCode', default: true },
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
      defaultFilter={{"field":"subType", "operator":"EQUALS", "value":"N"}}
      fields={ fields }
      title="GRN With PO"
      url="grn-with-pos"
      data={ Grn }
      id={ ['grnNo', 'subType'] }
      actions={ ['view'] } />
  );
}

export default Page;
