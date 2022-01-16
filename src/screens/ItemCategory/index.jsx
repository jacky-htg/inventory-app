import React, {useEffect, useState } from 'react';
import { Select } from 'antd';
import { ItemCategory, Lov } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const [fields, setFields] = useState([]);
  const [categoryGroups, setCategoryGroups] = useState([]);
  const {Option} = Select;

  const mrpStatuses = [
    <Option key='Y' value='Y' >YES</Option>,
    <Option key='N' value='N' >NO</Option>
  ];

  const setupFields = () => {
    setFields([
      {label: 'Category Code', field: 'categoryCode', default: true, filter: true}, 
      {label: 'Description', field: 'description', default: true}, 
      {label: 'Category Sub Code', field: 'categorySubCode', default: true, filter: true}, 
      {label: 'Sub Description', field: 'subDescription', default: true}, 
      {label: 'Group', field: 'categoryGroup', default: true, filter: true, lookup: categoryGroups},
      {label: 'MRP Status', field: 'mrpStatus', default: true, filter: true, lookup: mrpStatuses},
      {label: 'Design Qty A', field: 'designQtya'},
      {label: 'Design Qty B', field: 'designQtyb'},
      {label: 'Design Qty C', field: 'designQtyc'},
      {label: 'Design Qty D', field: 'designQtyd'},
      {label: 'Mif A', field: 'mifA'},
      {label: 'Mif B', field: 'mifB'},
      {label: 'Mif C', field: 'mifC'},
      {label: 'Mif D', field: 'mifD'},
    ]);
  };

  useEffect(() => {
    let data = Lov.getCategoryGroups();
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      let temp = [];
      for (const c of result) {
        temp.push(<Option key={ c.codeValue } value={ c.codeValue } >{ c.codeDesc }</Option>);
      }
      setCategoryGroups(temp);
    });
  }, []);

  useEffect(() => {
    setupFields();
  }, [categoryGroups]); 


  return (
    <PageList 
      filter={true}
      fields={fields} 
      title="Item Category" 
      url="item-categories" 
      data = {ItemCategory} 
      id={['categoryCode', 'categorySubCode', 'categoryGroup']} 
      actions={['view', 'edit', 'delete']} />
  );
}

export default Page;
