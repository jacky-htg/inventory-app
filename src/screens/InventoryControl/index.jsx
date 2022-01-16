import React, {useEffect, useState } from 'react';
import { InventoryControl } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      {label: 'Stock Depreciation %', field: 'stockDepn', default: true}, 
      {label: 'Stock Provision Age (Yrs)', field: 'provAge', default: true}
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []); 
  console.log('cococo');
  return (
    <PageList 
      filter={false}
      fields={fields} 
      title="Inventory Control" 
      url="inventory-controls" 
      data = {InventoryControl} 
      id={[]} 
      addButtonLimit={1}
      actions={['edit', 'delete']} />
  );
}

export default Page;
