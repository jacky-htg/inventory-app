import React, {useEffect, useState } from 'react';
import { Uom } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      {label: 'UOM From', field: 'uomFrom', default: true, filter: true}, 
      {label: 'From Description', field: 'fromDescription', default: true, filter: true}, 
      {label: 'UOM To', field: 'uomTo', default: true, filter: true}, 
      {label: 'To Description', field: 'toDescription', default: true, filter: true}, 
      {label: 'UOM Factor', field: 'uomFactor', default: true, filter: true}
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []); 

  return (
    <PageList 
      fields={fields} 
      title="UOM" 
      url="uoms" 
      data = {Uom} 
      id={['uomFrom', 'uomTo']} 
      actions={['view', 'edit', 'delete']} />
  );
}

export default Page;
