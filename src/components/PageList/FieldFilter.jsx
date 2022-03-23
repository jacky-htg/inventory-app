import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Space, Select, Form, Input, message, Popconfirm, Modal, Divider, Checkbox, notification } from 'antd';


function FieldFilter(props) {
  let {
    filters,
    n,
    useDelete,
    fields,
    lookups,
    optionFilters,
    changeData,
    setFilters,
    removeFilter,
  } = props;

  const { Option } = Select;
  const inputRef = useRef();
  const [form] = Form.useForm();

  let valueForm = (
    <Form form={ form } ref={ inputRef } style={ { display: 'contents' } }>
      <Form.Item name='search' noStyle >
        <Input
          style={ { width: 200, marginRight: '1%' } }
          placeholder="input here"
          onBlur={ (data) => changeData(n, data.target.value, 'value') }
        // defaultValue={ filters[n] ? filters[n].value : "" }
        />
      </Form.Item>
    </Form>
  );

  lookups.map(el => {
    if (filters[n] && filters[n].field === el.field) {
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
          { el.lookup }
        </Select>
      );
    }
  });

  let defaultOperators = ['LIKE', 'EQUALS'];
  fields.map(e => {
    if (e.field && filters[n] && filters[n].field && e.field === filters[n].field) {
      if (e.operators) {
        defaultOperators = e.operators;
      }
    }
  });

  let defaultOperator = defaultOperators[0];
  if (filters[n] && filters[n].operator) {
    if (defaultOperators.includes(filters[n].operator)) {
      defaultOperator = filters[n].operator;
    } else {
      filters[n].operator = defaultOperator;
      setFilters(filters);
    }
  }

  return (
    <div data-order={ n } style={ { paddingBottom: '0.5%', width: 556 } }>
      <Select
        style={ { width: 200, marginRight: '1%' } }
        placeholder="Select Field"
        allowClear={ filters[n] ? true : false }
        onChange={ (data) => { changeData(n, data, 'field'); form.setFieldsValue({ search: '' }); } }
        defaultValue={ filters[n] ? filters[n].field : null }
        value={ filters[n] ? filters[n].field : null }
        onClear={ () => form.setFieldsValue({ search: '' }) }
      >
        { optionFilters.map((o, i) => (<Option key={ i } value={ o.field } >{ o.label }</Option>)) }
      </Select>

      <Select
        style={ { width: 100, marginRight: '1%' } }
        onChange={ (data) => changeData(n, data, 'operator') }
        defaultValue={ defaultOperator }
        value={ defaultOperator }
      >
        { defaultOperators.map((o, i) => (<Option key={ i } value={ o } >{ o }</Option>)) }
      </Select>

      { valueForm }
      { useDelete && <Button onClick={ () => removeFilter(n) }>-</Button> }

    </div>
  );
}

export default FieldFilter;