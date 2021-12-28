import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select, Form, Input, message } from 'antd';
import { useHistory } from 'react-router-dom';

import { StyledDiv } from './styled';

import { Item, Location } from '../../services';

function Items() {
  const history = useHistory();
  const { Column } = Table;
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filterLocation, setFilterLocation] = useState({});
  
  useEffect(() => {
    let data = Location.list();
    data.then(result => {
      if (result.status && result.status !== 200) {
        message.error(result.error);
      }
      setLocations(result);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getListData(filterSearch);
  }, [filterSearch]);

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
      setItems(myData);
      setLoading(false);
    });
  };

  const changeLocation = value => {
    setSelectedLocation(value);
    setFilterLocation({
      "field": "loc",
      "operator": "EQUALS",
      "value": value
    });
  };

  const onSearch = searchText => {
    console.log(searchText);
  };

  const clickFilter = () => {
    let filters = [];
    if (JSON.stringify(filterLocation) !== '{}') {
      filters.push(filterLocation);
    }

    setFilterSearch({
      "filters": filters,
      "limit": pagination.pageSize,
      "page": (pagination.current - 1)
    });
  };

  const handleTableChange = pagination => {
    console.log('pag', pagination);
    clickFilter();
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
          options={options}
          style={{ width: 200 }}
          onSelect={changeLocation}
          onSearch={onSearch}
          placeholder="input here"
        />
      </Form.Item>
    </Form>
  );

  return (
    <StyledDiv>
      <h2 style={ { fontSize: '180%', color: '#1990ff', marginBottom: '3%' } }>Items</h2>
      { filter }
      <div style={ { textAlign: 'right' } }>
        <Button onClick={ () => history.push('/items/create') } type="primary" style={ { marginBottom: 16 } }>
          Add a row
        </Button>
      </div>
      <Table
        dataSource={ items }
        pagination={ pagination }
        onChange={ handleTableChange }
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
                <a onClick={ () => handleDelete(record.loc) }>Delete</a>
              </Space>
            );
          } }
        />
      </Table>
    </StyledDiv>
  );
}

export default Items;
