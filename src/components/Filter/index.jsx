import React, { useState, useEffect } from 'react';
import { Form, Button, Divider, Select, Input} from 'antd';

function Filter() {
  const { Option } = Select;

  const [filterForm, setFilterForm] = useState();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilterForm(fieldFilter(0));
  }, []);

  const optionFilters = ['grnNo', 'poNo', 'doNo'];
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

    if (filters[n] && filters[n].field === "countryCode") {
      valueForm = (
        <Select
          // mode="multiple"
          showSearch
          allowClear
          style={ { width: 200, marginRight: '1%'  } }
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

  return filter;
}

export default Filter;


