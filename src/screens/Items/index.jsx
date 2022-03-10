import React, { useEffect, useState } from 'react';
import { Item, Lov } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);
  const [sourcesData, setSourcesData] = useState([]);
  const [sourcesOpt, setSourcesOpt] = useState([]);

  const setupFields = () => {
    setFields([
      { label: 'Item No', field: 'itemNo', default: true, fixed: true, filter: true, sorter: true },
      { label: 'Part No', field: 'partNo', default: true, filter: true, sorter: true },
      { label: 'Description', field: 'description', default: true, filter: true, sorter: true },
      { label: 'QOH', field: 'qoh', default: true, filter: true, sorter: true },
      { label: 'Loc', field: 'loc', default: true, filter: true, sorter: true },
      { label: 'Source', field: 'source', default: true, filter: true, sorter: true, lov: sourcesData, lookup: sourcesOpt },
      { label: 'Manufacturer', field: 'manufacturer', default: true, filter: true, sorter: true },
      { label: 'Product Group', field: 'productGroup', default: true, filter: true, sorter: true },
      { label: 'Category Code', field: 'categoryCode', default: true, filter: true, sorter: true },
      { label: 'Supplier Code', field: 'supplierCode', default: true, filter: true, sorter: true },
      { label: 'Spec No', field: 'specNo', default: true, filter: true, sorter: true },
      { label: 'UOM', field: 'uom', default: true, filter: true, sorter: true }
    ]);
  };

  useEffect(() => {
    setupFields();
  }, [sourcesData, sourcesOpt]);

  useEffect(() => {
    console.log("source opt >> ", sourcesOpt);
  }, [sourcesOpt]);

  useEffect(() => {
    const data = Lov.getSources();
    let temp = [];
    data.then(res => {
      res.forEach(e => {
        temp.push(<Option key={ e.codeValue } value={ e.codeValue } >{ e.codeDesc }</Option>);  
      });
      setSourcesOpt(temp);
      setSourcesData(res);
    });
  }, []);

  return (
    <PageList
      filter={ true }
      fields={ fields }
      title="Items"
      url="items"
      data={ Item }
      id={ ['id'] }
      actions={ ['view', 'edit', 'delete'] } />
  );
}

export default Page;
