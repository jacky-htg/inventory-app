import React, {useEffect, useState } from 'react';
import { Uom } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      {label: 'From', field: 'uomFrom', default: true, filter: true, sorter:true}, 
      {label: 'From UOM Description', field: 'fromDescription', default: true, filter: true, sorter:true}, 
      {label: 'To', field: 'uomTo', default: true, filter: true, sorter:true}, 
      {label: 'To UOM Description', field: 'toDescription', default: true, filter: true, sorter:true}, 
      {label: 'Convertion Factor', field: 'uomFactor', default: true, filter: true, align:'right', sorter:true, decimal:6}
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []); 

  return (
    <PageList 
      filter={true}
      fields={fields} 
      title="UOM" 
      url="uoms" 
      data = {Uom} 
      id={['uomFrom', 'uomTo']} 
      actions={['view', 'edit', 'delete']} />
  );
}

export default Page;
