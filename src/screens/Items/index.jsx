import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select, Form, Input, message, AutoComplete, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';

import { StyledDiv } from './styled';

import { Item, Location } from '../../services';

function Items() {
  const history = useHistory();
  const { Column } = Table;
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filterLocation, setFilterLocation] = useState({});

  useEffect(() => {
    getListLocations();
  }, []);

  useEffect(() => {
    clickFilter();
  }, []);

  useEffect(() => {
    setLoading(true);
    getListData(filterSearch);
  }, [filterSearch]);

  const getListLocations = search => {
    let data = Location.list({});
    let optionData = [];
    data.then(result => {
      if (result.status && result.status !== 200) {
        message.error(result.error);
      }
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
      if (result.status && result.status !== 200) {
        message.error(result.error);
      }
      const myData = result.rows;
      result.rows.forEach((element, index) => {
        myData[index]["key"] = index;
      });
      setPagination({
        current: (result.currentPageNumber + 1),
        pageSize: 10,
        total: result.totalRows
      });
      setItems(myData);
      setLoading(false);
    });
  };

  const blurLocation = event => {
    changeLocation(event.target.value);
  }

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

  const clickFilter = (p) => {
    if (!p) {
      p = {
        "limit": 10,
        "page": 0
      };
    }
    
    let filters = [];
    if (JSON.stringify(filterLocation) !== '{}') {
      filters.push(filterLocation);
    }
    const filterSearch = {
      "filters": filters,
      "limit": p.pageSize,
      "page": (p.current - 1)
    }; 
    setFilterSearch(filterSearch);
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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const filter = (
    <Form className='filter'>
      <Form.Item
        label="Location"
        name="loc"
      // style={ { width: 400 } }
      >
        <AutoComplete
<<<<<<< HEAD
          options={options}
          style={{ width: 200 }}
          onSelect={changeLocation}
          onBlur={blurLocation}
          onSearch={getListLocations}
=======
          options={ options }
          style={ { width: 200 } }
          onSelect={ changeLocation }
          onSearch={ getListLocations }
>>>>>>> cc49c36579635e8c863fe2bde614a49930b294e6
          placeholder="input here"
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={ clickFilter } size='large'>Filter</Button>
        {/* <Button className='reset' onClick={ resetFilter } size='large'>Reset</Button> */ }
      </Form.Item>
    </Form>
  );

  return (
    <StyledDiv>
      <div className="header">
        <h2 style={ { fontSize: '180%', color: '#1990ff', marginBottom: '3%' } }>Items</h2>
      </div>
      { filter }
      <div style={ { textAlign: 'right' } }>
        <Button onClick={ () => history.push('/items/create') } type="primary" style={ { marginBottom: 16 } }>
          Add a row
        </Button>
      </div>
      <Table
        dataSource={ items }
        pagination={ pagination }
        onChange={ clickFilter }
        loading={ loading }
      >
        <Column title="Item No" dataIndex="itemNo" key="itemNo" />
        <Column title="Location" dataIndex="loc" key="loc" />
        <Column title="Source" dataIndex="source" key="source" />
        <Column title="Category Code" dataIndex="categoryCode" key="categoryCode" />
        <Column title="Category Subcode" dataIndex="categorySubCode" key="categorySubCode" />
        <Column title="Part No" dataIndex="partNo" key="partNo" />
        <Column title="Storage Location" dataIndex="storageShelf" key="storageShelf" />
        <Column title="Qty On Hand" dataIndex="qoh" key="qoh" />
        <Column
          title="Action"
          key="action"
          render={ (text, record) => {
            return (
              <Space size="middle">
                <a onClick={ () => history.push(`/items/${ record.loc }`) }>View</a>
                <a onClick={ () => history.push(`/items/${ record.loc }?edit=true`) }>Edit</a>
                <Popconfirm
                  title="Are you sure to delete this record?"
                  onConfirm={() => handleDelete(record.itemNo)}
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
    </StyledDiv>
  );
}

export default Items;
