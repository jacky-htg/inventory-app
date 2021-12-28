import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select, Form, Input, message, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';

import { StyledDiv } from './styled';

import { Country, Location } from '../../services';

function StockLocation() {
  const history = useHistory();
  const { Column } = Table;
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [locations, setLocations] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filterCountryCode, setFilterCountryCode] = useState({});
  const [filterDescription, setFilterDescription] = useState({});
  let optionCountries = getOptionCountries(countries);

  useEffect(() => {
    let data = Country.list();
    data.then(result => {
      if (result.status && result.status !== 200) {
        message.error(result.error);
      }
      setCountries(result);
      optionCountries = getOptionCountries(countries);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getStockData(filterSearch);
  }, [filterSearch]);

  const getStockData = (filter) => {
    let data = Location.list(filter);
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
      setLocations(myData);
      setLoading(false);
    });
  };

  const changeCountryCode = value => {
    if (value !== 'all') {
      setSelectedCountry(value);
      setFilterCountryCode({
        "field": "countryCode",
        "operator": "EQUALS",
        "value": value
      });
    } else {
      setFilterCountryCode({});
      setSelectedCountry(null);
      setFilterDescription({});
    }
  };

  const changeDescription = event => {
    if (event.target.value) {
      setFilterDescription({
        "field": "description",
        "operator": "LIKE",
        "value": event.target.value
      });
    }
  };

  const clickFilter = p => {
    if (!p) {
      p = {
        "limit": 10,
        "page": 0
      };
    }

    let filters = [];
    if (JSON.stringify(filterCountryCode) !== '{}') {
      filters.push(filterCountryCode);
    }

    if (JSON.stringify(filterDescription) !== '{}') {
      filters.push(filterDescription);
    }

    setFilterSearch({
      "filters": filters,
      "limit": p.pageSize,
      "page": (p.current - 1)
    });
  };

  const resetFilter = () => {
    setSelectedCountry(null);
    setFilterDescription({});
    setFilterSearch({});
  };

  const handleDelete = loc => {
    let data = Location.remove(loc);
    data.then(result => {
      if (result.status && result.status !== 204) {
        message.error(result.error);
      }
      setLoading(true);
      getStockData(filterSearch);
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const filter = (
    <Form className='filter'>
      <Form.Item
        label="Country"
        name="countryCode"
      // style={ { width: 400 } }
      >
        <Select
          defaultValue={ selectedCountry }
          // mode="multiple"
          showSearch
          value={ selectedCountry }
          // searchValue={ selectedCountry }
          // allowClear
          style={ { width: 200 } }
          placeholder="Select Country"
          onChange={ changeCountryCode }
          filterOption={ (input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          { optionCountries }
        </Select>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
      // style={ { width: 400 } }
      >
        <Input
          style={ { width: 200 } }
          placeholder="input here"
          onBlur={ changeDescription }
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
      <h2 style={ { fontSize: '180%', color: '#1990ff', marginBottom: '3%' } }>Stock Location</h2>
      { filter }
      <div style={ { textAlign: 'right' } }>
        <Button onClick={ () => history.push('/stock-locations/create') } type="primary" style={ { marginBottom: 16 } }>
          Add a row
        </Button>
      </div>
      <Table
        dataSource={ locations }
        pagination={ pagination }
        onChange={ clickFilter }
        loading={ loading }
      >
        <Column title="Location" dataIndex="loc" key="loc" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Address" dataIndex="address1" key="address1" />
        <Column title="Country Code" dataIndex="countryCode" key="countryCode" />
        <Column title="PIC" dataIndex="personInCharge" key="personInCharge" />
        <Column
          title="Action"
          key="action"
          render={ (text, record) => {
            return (
              <Space size="middle">
                <a onClick={ () => history.push(`/stock-locations/${ record.loc }`) }>View</a>
                <a onClick={ () => history.push(`/stock-locations/${ record.loc }?edit=true`) }>Edit</a>
                <Popconfirm
                  title="Are you sure to delete this record?"
                  onConfirm={() => handleDelete(record.loc)}
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

function getOptionCountries(countries) {
  const { Option } = Select;
  let optionCountries = [];
  for (const country of countries) {
    optionCountries.push(<Option key={ country.countryCode } value={ country.countryCode } >{ country.description }</Option>);
  }
  optionCountries.unshift(<Option key={ 'all' } value={ 'all' } >{ 'ALL COUNTRIES' }</Option>);
  return optionCountries;
}

export default StockLocation;
