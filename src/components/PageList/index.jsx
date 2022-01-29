import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Select, Form, Input, message, Popconfirm, Modal, Divider, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import { StyledDiv } from './styled';

function PageList(props) {
  const { Option } = Select;

  const history = useHistory();
  const { Column } = Table;
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const [filters, setFilters] = useState([]);
  const [filterForm, setFilterForm] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fields, setFields] = useState([]);
  const [optionFilters, setOptionFilters] = useState([]);
  const [lookups, setLookups] = useState([]);
  const [disabledCreate, setDisabledCreate] = useState(false);

  useEffect(() => {
    if (props.fields.length > 0) {
      const temp = [];
      const tempLookups = [];
      props.fields.map(el => {
        if (el.filter) temp.push(el);
        if (el.lookup) tempLookups.push(el);
      });
      setOptionFilters(temp);
      setLookups(tempLookups);
      setupFields(props.fields);
      setModal();
    }
  }, [props.fields]);

  useEffect(() => {
    setLoading(true);
    getData(filterSearch);
  }, [filterSearch]);

  useEffect(() => {
    if (optionFilters.length > 0) {
      setFilterForm(fieldFilter(0));
    }
  }, [optionFilters]);

  useEffect(() => {
    if (fields.length > 0) {
      const temp = [];
      fields.map(e => {
        for (let i = 0; i < props.fields.length; i++) {
          if (props.fields[i] && props.fields[i].field === e) {
            temp.push(<Column title={ props.fields[i].label } dataIndex={ e } key={ e } />);
            break;
          }
        }
      });
      setColumns(temp);
      setModal();
    }
  }, [fields]);

  const setupFields = (arr) => {
    const tempFields = [];
    arr.map(tmp => {
      if (tmp.default && tempFields.length < 8) {
        tempFields.push(tmp.field);
      }
    });
    setFields(tempFields);
  };

  const getData = (filter) => {
    let data = props.data.list(filter);
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
      if (props.addButtonLimit && myData.length >= props.addButtonLimit) {
        setDisabledCreate(true);
      }
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

  const handleDelete = loc => {
    let data = props.data.remove(loc);
    data.then(result => {
      if (result.status && result.status !== 204) {
        message.error(result.error);
      }
      setLoading(true);
      getData(filterSearch);
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
      filters[n].value = "";
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

    return (
      <div data-order={ n } style={ { paddingBottom: '0.5%', width: 556 } }>
        <Select
          style={ { width: 200, marginRight: '1%' } }
          placeholder="Select Field"
          allowClear={ filters[n] ? true : false }
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
      { columns }

      <Column
        title="Action"
        key="action"
        render={ (text, record) => {
          const ids = [];
          props.id.map(el => {
            ids.push(record[el]);
          });
          if (ids.length === 0) {
            ids.push('edit');
          }

          let id = ids.join('-');

          if (props.url === 'grn-with-pos') {
            id = record.id;
          }

          return (
            <Space size="middle">
              { props.actions.includes('view') && <a onClick={ () => history.push(`/${ props.url }/${ id }`) }>View</a> }
              { props.actions.includes('edit') && <a onClick={ () => history.push(`/${ props.url }/${ id }?edit=true`) }>Edit</a> }
              { props.actions.includes('delete') && <Popconfirm
                title="Are you sure to delete this record?"
                onConfirm={ () => handleDelete(id) }
                okText="Yes"
                cancelText="No"
              >
                <a href="#">Delete</a>
              </Popconfirm> }
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

    const temp = [];
    fields.map(e => {
      for (let i = 0; i < props.fields.length; i++) {
        if (props.fields[i] && props.fields[i].field === e) {
          temp.push(<Column title={ props.fields[i].label } dataIndex={ e } key={ e } />);
          break;
        }
      }
    });
    setColumns(temp);
    setModal();
  };

  const setModal = () => {
    const temp = [];
    props.fields.map(e => {
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
      <h2 style={ { fontSize: '180%', color: '#1990ff', marginBottom: '3%' } }>{ props.title }</h2>
      { props.filter && filter }
      <div style={ { textAlign: 'right' } }>
        <Button onClick={ showModal }>Column Settings</Button>
        <Divider type="vertical" />
        <Button onClick={ () => history.push(`/${ props.url }/create`) } type="primary" style={ { marginBottom: 16 } } disabled={ disabledCreate }>
          Add a row
        </Button>
      </div>
      { TableList }
    </StyledDiv>
  );
}

export default PageList;
