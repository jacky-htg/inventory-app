import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Space, Select, Form, Input, message, Popconfirm, Modal, Divider, Checkbox, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import Draggable from 'react-draggable';
import { StyledDiv } from './styled';
import env from '../../env';
import FieldFilter from './FieldFilter';

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
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const [inputValue, setInputValue] = useState('');

  const draggleRef = useRef();
  const inputRef = useRef();

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
    if (props.fields && datas) {
      datas.forEach((element, index) => {
        props.fields.forEach(field => {
          if (field.lov || field.decimal) {
            datas.forEach((data, index) => {
              if (data[field.field] || data[field.field] === 0) {
                if (field.lov) {
                  field.lov.forEach(e => {
                    if (data[field.field] === e.codeValue) {
                      datas[index][field.field] = e.codeDesc;
                    }
                  });
                } else if (field.decimal) {
                  datas[index][field.field] = parseFloat(datas[index][field.field]).toFixed(field.decimal);
                }
              }
            });
          }
        });
      });
    }
  }, [props.fields, datas]);

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
            let alignValue = 'left';
            if (props.fields[i].align) {
              alignValue = props.fields[i].align;
            }
            temp.push(<Column ellipsis title={ props.fields[i].label } dataIndex={ e } key={ e } align={ alignValue } sorter={ props.fields[i].sorter } />);
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
    if (props.defaultFilter) {
      if (!filter.filters) {
        filter = {
          filters: []
        };
      }
      filter.filters.push(props.defaultFilter);
    }
    let data = props.data.list(filter);
    data.then(result => {
      console.log('result siv:>> ', result.data);
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      // return result.data;
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

  const clickFilter = (p, filter, sorter) => {
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

    let sorts = [];
    console.log('sort', sorter);
    if (sorter && sorter.field && sorter.order) {
      sorts = [
        {
          "field": sorter.field,
          "sort": sorter.order === "descend" ? "DESC" : "ASC"
        }
      ];
    }
    setFilterSearch({
      "filters": temp,
      "sorts": sorts,
      "limit": p.pageSize,
      "page": (p.current - 1)
    });
  };

  const handleDelete = loc => {
    let data = props.data.remove(loc);
    data.then(result => {
      if (result && !result.ok) {
        result.data.then(res => {
          // message.error(res.message ? res.message : env.internalError);
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
        });
      } else {
        notification.success({
          message: 'Record successfully deleted',
        });  
      }
      setLoading(true);
      getData(filterSearch);
    });
  };

  const changeData = (n, data, type) => {
    console.log(n, data, type);
    // form.setFieldsValue({ search: '' });
    if (!filters[n]) {
      filters[n] = {
        field: null,
        operator: "LIKE",
        value: ""
      };
    }

    filters[n][type] = data;

    if (type === "field") {
      filters[n].value = "";
      if (typeof (data) === "undefined") {
        filters[n] = {
          field: null,
          operator: "LIKE",
          value: ""
        };
      }
    }

    if (type === "value" && !data) {
      filters[n][type] = "";
    }

    setFilters(filters);
    const [f] = renderFilter();
    console.log('f :>> ', f);
    setFilterForm(f);
  };

  useEffect(() => {
    if (filterForm && filterForm.length === 0) {
      addFilter();
    }
  }, [filterForm]);

  const renderFilter = () => {
    let temp = [];
    let counter = 0;
    console.log('filters >>', filters);
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

  const [form] = Form.useForm();

  const fieldFilter = (n, useDelete = false) => {
    return <FieldFilter
      n={ n }
      useDelete={ useDelete }
      filters={ filters }
      fields={ fields }
      lookups={ lookups }
      optionFilters={ optionFilters }
      changeData={ changeData }
      setFilters={ setFilters }
      removeFilter={ removeFilter }
    />;
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
    props.fields.map(e => {
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
          onChange={ (data) => changeData(n, data, 'field') }
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
  };

  const filter = (
    <Form className='filter'>
      { filterForm }
      <Form.Item>
        <Button onClick={ clickFilter } size='large'>Filter</Button>
        <Divider type="vertical" />
        <Button onClick={ addFilter } size='large'>Add Filter</Button>
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

          if (props.url === 'grn-with-pos' || props.url === 'grn-manuals') {
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
          let alignValue = 'left';
          if (props.fields[i].align) {
            alignValue = props.fields[i].align;
          }
          temp.push(<Column ellipsis title={ props.fields[i].label } dataIndex={ e } key={ e } align={ alignValue } sorter={ props.fields[i].sorter } />);
          break;
        }
      }
    });
    setColumns(temp);
    setModal();
  };

  const setModal = () => {
    const temp = [];
    temp.push(<h3>Check the columns below (maximum 8 columns).</h3>);
    props.fields.map(e => {
      let isChecked = false;
      if (fields.includes(e.field)) {
        isChecked = true;
      }
      let disabled = false;
      if (e.fixed) {
        disabled = true;
      }
      temp.push(<p><Checkbox disabled={ disabled } checked={ isChecked } onClick={ () => changeField(e.field) } /> { e.label }</p>);
    });

    setContentModal(temp);
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds(
      {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      }
    );
  };

  const modal = () => {
    return (
      <Modal title={
        <div
          style={ {
            width: '100%',
            cursor: 'move',
          } }
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={ () => { } }
          onBlur={ () => { } }
        // end
        >
          Coloumn Setting
        </div>
      }
        visible={ isModalVisible } onOk={ handleOk } onCancel={ handleCancel }
        modalRender={ modal => (
          <Draggable
            bounds={ bounds }
            onStart={ (event, uiData) => onStart(event, uiData) }
          >
            <div ref={ draggleRef }>{ modal }</div>
          </Draggable>
        ) }
        footer={ [
          <Button key="submit" type="primary" loading={ loading } onClick={ handleOk }
          >
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
      <h2 style={ { fontSize: '180%', color: '#ffc401', marginTop: '-1.5%', marginBottom: '0%' } }>{ props.title }</h2>
      { props.filter && filter }
      <div style={ { textAlign: 'right', marginTop: '-40px' } }>
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
