import React, { useState } from 'react';
import { Table, Button, Space, Select, Form, Input } from 'antd';

function StockLocation() {
  
  const { Column } = Table;
  const { Option } = Select;

  const countries = [];
  for (const country of getCountries()) {
    countries.push(<Option key={country.code} value={country.code}>{country.name}</Option>);
  }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const filter = (
    <>
      <Form.Item {...layout}
        label="Country"
        name="countryCode"
        style={{width: 400}}
      >
        <Select
        mode="multiple"
        allowClear
        style={{ width: 200 }}
        placeholder="Please select"
        onChange={handleChange}
      >
        {countries}
      </Select>
      </Form.Item>
      <Form.Item {...layout}
        label="Description"
        name="description"
      >
        <Input
          style={{ width: 200 }}
          placeholder="input here"
        />
      </Form.Item>
      <Form.Item>
        <Button size='large'>Filter</Button>
      </Form.Item>
    </>
  );

  return (
    <div>
      <h2 style={{ fontSize:'180%', color:'darkblue', marginBottom:'3%' }}>Stock Location</h2>
      {filter}
      <div style={{textAlign:'right' }}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
      </div>
      <Table dataSource={getItem()}>
      <Column title="Location" dataIndex="location" key="location" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column title="Country Code" dataIndex="countryCode" key="countryCode" />
      <Column title="Country" dataIndex="country" key="country" />
      <Column title="PIC" dataIndex="pic" key="pic" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>View</a>
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  </div>
  );
}

function getCountries() {
  return [
    {
      code: "ITA",
      name: "Italy"
    },
    {
      code: "SGP",
      name: "Singapure"
    },
    {
      code: "JPN",
      name: "Japan"
    },
    {
      code: "USA",
      name: "United States of America"
    },
    {
      code: "CHN",
      name: "China"
    },
    {
      code: "THA",
      name: "Thailand"
    },
  ];
}

function getItem() {
  return [
    {
      key : 1,
      location : "SE",
      description : "description-1",
      address : "address-1",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 2,
      location : "SE",
      description : "description-2",
      address : "address-2",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 3,
      location : "SE",
      description : "description-3",
      address : "address-3",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 4,
      location : "SE",
      description : "description-4",
      address : "address-4",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 5,
      location : "SE",
      description : "description-5",
      address : "address-5",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 6,
      location : "SE",
      description : "description-6",
      address : "address-6",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 7,
      location : "SE",
      description : "description-7",
      address : "address-7",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 8,
      location : "SE",
      description : "description-8",
      address : "address-8",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 9,
      location : "SE",
      description : "description-9",
      address : "address-9",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    },
    {
      key : 10,
      location : "SE",
      description : "description-10",
      address : "address-10",
      countryCode: "INA",
      country: "Indonesia",
      pic: "John"
    }
  ]
}

export default StockLocation;
