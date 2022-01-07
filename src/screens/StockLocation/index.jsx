import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Space, Select, Form, Input, message, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';

import { StyledDiv } from './styled';

import { Country, Location } from '../../services';
import { e } from '../../../dist/assets/vendor.5ce9889e';

function StockLocation() {

  const { Option } = Select;

  const history = useHistory();
  const { Column } = Table;
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [locations, setLocations] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filters, setFilters] = useState([]);
  const [filterForm, setFilterForm] = useState();
  let optionCountries = getOptionCountries(countries);

  useEffect(() => {
    let data = Country.list();
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      setCountries(result);
      optionCountries = getOptionCountries(countries);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getStockData(filterSearch);
  }, [filterSearch]);

  useEffect(() => {
    setFilterForm(fieldFilter(0));
  }, []);

  const getStockData = (filter) => {
    let data = Location.list(filter);
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
      setLocations(myData);
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

  const optionFilters = ['countryCode', 'description'];
  const changeData = (n, data, type) => {
    const temp = filters;
    if (!temp[n]) {
      temp[n] = {
        field: "",
        operator: "LIKE",
        value: ""
      };
    }
    temp[n][type] = data;  
    setFilters(temp);

    console.log("kulkul", type);
    if (type === "field") {
      const [f, c] = renderFilter(); 
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
    const array = filters;
    const index = n;
    console.log(index);
    if (index > -1 && index < array.length) {
      array.splice(index, 1);
    }
    setFilters(array);
    
    const [temp, counter] = renderFilter();
    if (n < filter.length) {
      temp.push(fieldFilter(counter, true));
    }
    setFilterForm(temp);
  };

  const fieldFilter = (n, useDelete = false) => {
    let valueForm = (
      <Input
        style={ { width: 200 } }
        placeholder="input here"
        onBlur={ (data) => changeData(n, data.target.value, 'value') }
        defaultValue={filters[n]?filters[n].value:""}
      />
    );

    console.log('busan', filters[n]);

    if (filters[n] && filters[n].field === "countryCode") {
      console.log('coco');
      valueForm = (
        <Select
          // mode="multiple"
          showSearch
          // allowClear
          style={ { width: 200 } }
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
      <div data-order={n}>
        <Select
          style={ { width: 200 } }
          placeholder="Select Field"
          onChange={ (data) => changeData(n, data, 'field')}
          defaultValue={filters[n]?filters[n].field:""}
        >
          <Option key="none" value="none">NONE</Option>
          { optionFilters.map((o, i) => (<Option key={ i } value={ o } >{ o }</Option>))}
        </Select>

        <Select
          style={ { width: 100 } }
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
        <Button onClick={ addFilter } size='large'>Add Filter</Button>
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
                  onConfirm={ () => handleDelete(record.loc) }
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
