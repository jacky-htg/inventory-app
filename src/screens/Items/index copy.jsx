import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select, Form, Input, message, AutoComplete, Popconfirm, Divider, Modal, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';

import { StyledDiv } from './styled';

import { Item, Location } from '../../services';

function Items() {
  const history = useHistory();
  const { Column } = Table;
  const [options, setOptions] = useState([]);
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filters, setFilters] = useState([]);
  const [filterForm, setFilterForm] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState([]);
  const [columns, setColumns] = useState([]);
  
  const allFields = [
    {label: 'Item No', field: 'itemNo'}, 
    {label: 'Part No', field: 'partNo'}, 
    {label: 'Description', field: 'description'}, 
    {label: 'QOH', field: 'qoh'}, 
    {label: 'Loc', field: 'loc'},
    {label: 'Source', field: 'source'},
    {label: 'Manufacturer', field: 'manufacturer'},
    {label: 'Product Group', field: 'productGroup'},
    {label: 'Category Code', field: 'categoryCode'},
    {label: 'SUpplier Code', field: 'supplierCode'},
    {label: 'Spec No', field: 'specNo'},
    {label: 'UOM', field: 'uom'}
  ];

  const optionFilters = allFields;
  

  const tempFields = [];
  allFields.map(tmp => {
    if (tempFields.length < 8 ) {
      tempFields.push(tmp.field);
    }
  });
  const [fields, setFields] = useState(tempFields);

  useEffect(() => {
    getListLocations();
    clickFilter();

    setFilterForm(fieldFilter(0));
    setModal();
  }, []);

  useEffect(() => {
    setLoading(true);
    getListData(filterSearch);
  }, [filterSearch]);

  useEffect(() => {
    const temp = [];
    fields.map(e => {
      temp.push(<Column title={ e } dataIndex={e} key={e} />);
    });
    setColumns(temp);
  }, [fields]);

  const getListLocations = search => {
    let data = Location.list({});
    let optionData = [];
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      result.rows.forEach((element, index) => {
        if (!search || (search && element.loc.includes(search))) {
          optionData.push({
            key: index,
            value: element.loc
          });
        }
      });
      setOptions(optionData);
    });
  };

  const getListData = (filter) => {
    let data = Item.list(filter);
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      const myData = result.rows;
      result.rows.forEach((element, index) => {
        myData[index]["key"] = index;
      });
      setPagination({
        current: (result.currentPageNumber + 1),
        pageSize: 10,
        total: result.totalRows
      });
      setDatas(myData);
      setLoading(false);
    });
  };

  const blurLocation = event => {
    changeLocation(event.target.value);
  };

  const changeLocation = value => {
    let temp = {};
    if (value) {
      temp = {
        "field": "loc",
        "operator": "EQUALS",
        "value": value
      };
    }
    setFilterLocation(temp);
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

  const handleDelete = loc => {
    let data = Item.remove(loc);
    data.then(result => {
      if (result.status && result.status !== 204) {
        message.error(result.error);
      }
      setLoading(true);
      getListData(filterSearch);
    });
  };

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
  };

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
        defaultValue={ filters[n] ? filters[n].value : "" }
      />
    );

    if (filters[n] && filters[n].field === "countryCode") {
      valueForm = (
        <Select
          // mode="multiple"
          showSearch
          allowClear
          style={ { width: 200, marginRight: '1%' } }
          placeholder="Please select"
          onChange={ (value) => changeData(n, value, 'value') }
          filterOption={ (input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          { optionCountries }
        </Select>
      );
    }

    return (
      <div data-order={ n } style={ { paddingBottom: '0.5%', width: 556 } }>
        <Select
          style={ { width: 200, marginRight: '1%' } }
          placeholder="Select Field"
          allowClear={filters[n] ? true : false}
          onChange={ (data) => changeData(n, data, 'field') }
          defaultValue={ filters[n] ? filters[n].field : null }
        >
          { optionFilters.map((o, i) => (<Option key={ i } value={ o.field } >{ o.label }</Option>)) }
        </Select>

        <Select
          style={ { width: 100, marginRight: '1%' } }
          onChange={ (data) => changeData(n, data, 'operator') }
          defaultValue={ filters[n] ? filters[n].operator : "LIKE" }
        >
          <Option key="0" value="EQUALS">EQUALS</Option>
          <Option key="1" value="LIKE">LIKE</Option>
        </Select>

        { valueForm }
        { useDelete && <Button onClick={ () => removeFilter(n) }>-</Button> }

      </div>
    );
  };

  const filter = (
    <Form className='filter'>
      { filterForm }
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
      dataSource={ datas }
      pagination={ pagination }
      onChange={ clickFilter }
      loading={ loading }
    >

      {columns}
      
      <Column
        title="Action"
        key="action"
        render={ (text, record) => {
          return (
            <Space size="middle">
               <a onClick={ () => history.push(`/items/${ record.itemNo }`) }>View</a>
                <a onClick={ () => history.push(`/items/${ record.itemNo }?edit=true`) }>Edit</a>
                <Popconfirm
                  title="Are you sure to delete this record?"
                  onConfirm={ () => handleDelete(record.itemNo) }
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#">Delete</a>
                </Popconfirm>
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

  const setModal = () => {
    const temp = [];
    allFields.map(e => {
      let isChecked = false;
      if (fields.includes(e.field)) {
        isChecked = true;
      }
      temp.push(<p><Checkbox checked={ isChecked } onClick={ () => changeField(e.field) } /> { e.label }</p>);
    });

    setContentModal(temp);
  };

  const modal = () => {
    return (
      <Modal title="Coloumn Setting" visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel } footer={ [
        <Button key="submit" type="primary" loading={ loading } onClick={ handleOk }>
          CLOSE
        </Button>
      ] }>
        { contentModal }
      </Modal>
    );
  };

  return (
    <StyledDiv>
       { modal() }
      <h2 style={ { fontSize: '180%', color: '#1990ff', marginBottom: '3%' } }>Stock Location</h2>
      { filter }
      <div style={ { textAlign: 'right' } }>
        <Button onClick={ showModal }>Settings</Button>
        <Divider type="vertical" />
        <Button onClick={ () => history.push('/items/create') } type="primary" style={ { marginBottom: 16 } }>
          Add a row
        </Button>
      </div>
      { TableList }
    </StyledDiv>
  );
}

export default Items;
