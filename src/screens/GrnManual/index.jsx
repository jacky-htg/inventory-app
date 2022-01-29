import React, {useEffect, useState } from 'react';
import { Grn } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      {label: 'PO No', field: 'poNo', default: true, filter: true}, 
      {label: 'DO No', field: 'doNo', default: true, filter: true}, 
      {label: 'GRN No', field: 'grnNo', default: true, filter: true}, 
      {label: 'PRJ', field: 'prj', default: true, filter: true},
      {label: 'MSR', field: 'msr', default: true, filter: true},
      {label: 'Supplier Code', field: 'supplierCode'},
      {label: 'Currency Code', field: 'currencyCode'},
      {label: 'CurrencyRate', field: 'currencyRate'},
      {label: 'Recd Date', field: 'recdDate'},
      {label: 'Created At', field: 'createdAt'}
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []); 

  return (
    <PageList 
      filter={true}
      fields={fields} 
      title="GRN Manual" 
      url="grn-manuals" 
      data = {Grn} 
      id={['grnNo', 'subType']} 
      actions={['view']} />
  );
}

export default Page;
