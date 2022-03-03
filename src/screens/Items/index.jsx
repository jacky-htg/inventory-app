import React, {useEffect, useState } from 'react';
import { Item } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      {label: 'Item No', field: 'itemNo', default: true, fixed:true, filter: true}, 
      {label: 'Part No', field: 'partNo', default: true, filter: true}, 
      {label: 'Description', field: 'description', default: true, filter: true}, 
      {label: 'QOH', field: 'qoh', default: true, filter: true}, 
      {label: 'Loc', field: 'loc', default: true, filter: true},
      {label: 'Source', field: 'source', default: true, filter: true},
      {label: 'Manufacturer', field: 'manufacturer', default: true, filter: true},
      {label: 'Product Group', field: 'productGroup', default: true, filter: true},
      {label: 'Category Code', field: 'categoryCode', default: true, filter: true},
      {label: 'SUpplier Code', field: 'supplierCode', default: true, filter: true},
      {label: 'Spec No', field: 'specNo', default: true, filter: true},
      {label: 'UOM', field: 'uom', default: true, filter: true}
    ]);
  };

  useEffect(() => {
    setupFields();
  }, []); 

  return (
    <PageList 
      filter={true}
      fields={fields} 
      title="Items" 
      url="items" 
      data = {Item} 
      id={['id']} 
      actions={['view', 'edit', 'delete']} />
  );
}

export default Page;
