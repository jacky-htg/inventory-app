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
      {label: 'Category Code', field: 'categoryCode', default: true, filter: true, sorter:true}, 
      {label: 'Description', field: 'description', default: true}, 
      {label: 'Category Sub Code', field: 'categorySubCode', default: true, filter: true, sorter:true}, 
      {label: 'Sub Description', field: 'subDescription', default: true}, 
      {label: 'Group', field: 'categoryGroup', default: true, filter: true, lookup: categoryGroups, sorter:true},
      {label: 'MRP Status', field: 'mrpStatus', filter: true, lookup: mrpStatuses, sorter:true, operators:["EQUALS"]},
      {label: 'MRP Status Description', field: 'mrpStatusDesc', default: true},
      {label: 'Design Qty A', field: 'designQtya', align:'right'},
      {label: 'Design Qty B', field: 'designQtyb', align:'right'},
      {label: 'Design Qty C', field: 'designQtyc', align:'right'},
      {label: 'Design Qty D', field: 'designQtyd', align:'right'},
      {label: 'Mif A', field: 'mifA', align:'right'},
      {label: 'Mif B', field: 'mifB', align:'right'},
      {label: 'Mif C', field: 'mifC', align:'right'},
      {label: 'Mif D', field: 'mifD', align:'right'},
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
      id={['id']} 
      actions={['view', 'edit', 'delete']} />
  );
}

export default Page;
