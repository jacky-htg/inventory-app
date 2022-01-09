import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select, Form, Input, message, Checkbox, Modal, Divider } from 'antd';
import { useHistory } from 'react-router-dom';

import { StyledDiv } from './styled';

import { Grn } from '../../services';

function List() {

  const { Option } = Select;

  const history = useHistory();
  const { Column } = Table;
  const [listData, setListData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filters, setFilters] = useState([]);
  const [filterForm, setFilterForm] = useState();
  const [fields, setFields] = useState(['grnNo', 'subType', 'poNo', 'supplierCode', 'currencyCode', 'currencyRate', 'recdDate']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState([]);

  const allFields = ['id', 'grnNo', 'subType', 'poNo', 'supplierCode', 'currencyCode', 'currencyRate', 'recdDate', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'];

  useEffect(() => {
    setFilterForm(fieldFilter(0));
    setModal();
  }, []);

  useEffect(() => {
    setLoading(true);
    getData(filterSearch);
  }, [filterSearch]);

  const getData = (filter) => {
    let data = Grn.list(filter);
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      const myData = result.rows;
      result.rows.forEach((element, index) => {
        myData[index]["key"] = index;
        const options = {day: "numeric", month: "short", year: "numeric"};
        myData[index]["recdDate"] = new Date(element.recdDate).toLocaleDateString("en", options);
        myData[index]["createAt"] = new Date(element.createAt).toLocaleDateString("en", options);
        myData[index]["updatedAt"] = new Date(element.updatedAt).toLocaleDateString("en", options);
      });
      setPagination({
        current: (result.currentPageNumber + 1),
        pageSize: 10,
        total: result.totalRows
      });
      setListData(myData);
      setLoading(false);
    });
  };

  const clickFilter = p => {
    if (!p) {
      p = {
        "limit": 10,
        "page": 0
      };
    }

    const temp = [];
    filters.map(e => {
      if (e && e.field) {
        temp.push(e);
      }
    });

    setFilterSearch({
      "filters": temp,
      "limit": p.pageSize,
      "page": (p.current - 1)
    });
  };

  const optionFilters = ['poNo', 'supplierCode', 'currencyCode'];
  const changeData = (n, data, type) => {
    if (!filters[n]) {
      filters[n] = {
        field: "",
        operator: "LIKE",
        value: ""
      };
    }
    filters[n][type] = data;
    setFilters(filters);

    if (type === "field") {
      const [f] = renderFilter(); 
      setFilterForm(f);
    }
  };

  const renderFilter = () => {
    let temp = [];
    let counter = 0;
    filters.map((e, i) => {
      counter++;
      if (i === 0) {
        temp.push(fieldFilter(i));
      } else {
        temp.push(fieldFilter(i, true));
      }
    }); 
    return [temp, counter];
  }

  const addFilter = () => {
    const [temp, counter] = renderFilter(); 
    
    if (counter == 0) {
      temp.push(fieldFilter(counter));
    } else if (counter < optionFilters.length) {
      temp.push(fieldFilter(counter, true));
    }
    setFilterForm(temp);
  };

  const removeFilter = (n) => {
    if (n > -1 && n < filters.length) {
      filters.splice(n, 1);
    }
    setFilters(filters);
    
    const [temp, counter] = renderFilter();
    if (n < filter.length) {
      temp.push(fieldFilter(counter, true));
    }
    setFilterForm(temp);
  };

  const fieldFilter = (n, useDelete = false) => {
    let valueForm = (
      <Input
        style={ { width: 200, marginRight: '1%' } }
        placeholder="input here"
        onBlur={ (data) => changeData(n, data.target.value, 'value') }
        defaultValue={filters[n]?filters[n].value:""}
      />
    );

    return (
      <div data-order={n} style={{paddingBottom: '0.5%', width: 556 }}>
        <Select
          style={ { width: 200, marginRight: '1%' } }
          placeholder="Select Field"
          allowClear
          onChange={ (data) => changeData(n, data, 'field')}
          defaultValue={filters[n]?filters[n].field:""}
        >
          { optionFilters.map((o, i) => (<Option key={ i } value={ o } >{ o }</Option>))}
        </Select>

        <Select
          style={ { width: 100, marginRight: '1%'  } }
          onChange={ (data) => changeData(n, data, 'operator')} 
          defaultValue={filters[n]?filters[n].operator:"LIKE"}
        >
          <Option key="0" value="EQUALS">EQUALS</Option>
          <Option key="1" value="LIKE">LIKE</Option>
        </Select>

        { valueForm }
        { useDelete && <Button onClick={ () => removeFilter(n)}>-</Button>}

      </div>
    )
  };

  const filter = (
    <Form className='filter'>
      {filterForm}
      <Form.Item>
        <Button onClick={ clickFilter } size='large'>Filter</Button>
        <Divider type="vertical" />
        <Button onClick={ addFilter } size='large'>Add Filter</Button>
        {/* <Button className='reset' onClick={ resetFilter } size='large'>Reset</Button> */ }
      </Form.Item>
    </Form>
  );

  const TableList = (
    <Table
        dataSource={ listData }
        pagination={ pagination }
        onChange={ clickFilter }
        loading={ loading }
      >
        { fields.includes('id') && <Column title="ID" dataIndex="id" key="id" /> }
        { fields.includes('grnNo') && <Column title="GRN No" dataIndex="grnNo" key="grnNo" /> }
        { fields.includes('subType') && <Column title="Sub Type" dataIndex="subType" key="subType" /> }
        { fields.includes('poNo') && <Column title="PO No" dataIndex="poNo" key="poNo" /> }
        { fields.includes('supplierCode') && <Column title="Supplier Code" dataIndex="supplierCode" key="supplierCode" /> }
        { fields.includes('currencyCode') && <Column title="Currency Code" dataIndex="currencyCode" key="currencyCode" /> }
        { fields.includes('currencyRate') && <Column title="Currency Rate" dataIndex="currencyRate" key="currencyRate" /> }
        { fields.includes('recdDate') && <Column title="Recd Date" dataIndex="recdDate" key="recdDate" /> }
        { fields.includes('createdBy') && <Column title="Created By" dataIndex="createdBy" key="createdBy" /> }
        { fields.includes('createdAt') && <Column title="Created At" dataIndex="createdAt" key="createdAt" /> }
        { fields.includes('updatedBy') && <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" /> }
        { fields.includes('updatedAt') && <Column title="Updated At" dataIndex="updatedAt" key="updatedAt" /> }
        <Column
          title="Action"
          key="action"
          render={ (text, record) => {
            return (
              <Space size="middle">
                <a onClick={ () => history.push(`/grn-with-pos/${ record.grnNo }`) }>View</a>
              </Space>
            );
          } }
        />
      </Table>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeField = e => {
    if (fields.includes(e)) {
      var index = fields.indexOf(e);
      if (index !== -1) {
        fields.splice(index, 1);
      }
    } else if (fields.length < 8) {
      fields.push(e);
    }
    setFields(fields);
    setModal();
  };

  const setModal= () => {
    const temp = []; 
    allFields.map(e => {
      let isChecked = false;
      if (fields.includes(e)) {
        isChecked = true;
      }
      temp.push(<p><Checkbox checked={isChecked} onClick={() => changeField(e)}/> {e}</p>);
    });

    setContentModal(temp);
  };

  const modal = () => {
    return (
      <Modal title="Coloumn Setting" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          CLOSE
        </Button>
      ]}>
        { contentModal }
      </Modal>
    )
  };

  return (
    <StyledDiv>
      {modal()}
      <h2 style={ { fontSize: '180%', color: '#1990ff', marginBottom: '3%' } }>GRN With PO</h2>
      { filter }
      <div style={ { textAlign: 'right' } }>
        <Button onClick={showModal}>Settings</Button> 
        <Divider type="vertical" />
        <Button onClick={ () => history.push('/grn-with-pos/create') } type="primary" style={ { marginBottom: 16 } }>
          Add a row
        </Button>
      </div>
      { TableList }
    </StyledDiv>
  );
}

export default List;
