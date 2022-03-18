import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import env from '../../env';
import { InventoryControl } from '../../services';
import { StyledDiv } from './styled';
import { Images } from '../../constant';
import { formFailedSubmit } from '../../helpers';

const FormPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isEdit, setIsEdit] = useState(query.get("edit") ? query.get('edit') === 'true' : false);
  const [isDisabled, setIsDisabled] = useState(id && !isEdit ? true : false);

  const [state, setState] = useState({
    stockDepn: parseFloat(0).toFixed(2),
    provAge: parseFloat(0).toFixed(2)
  });

  const [errorFields, setErrorFields] = useState([]);

  const stockDepnRef = useRef();
  const provAgeRef = useRef();

  const changeData = (value, field) => {
    state[field] = value;
    setState(state);
  };

  useEffect(() => {
    if (
      id
    ) {
      const data = InventoryControl.view();
      data.then(result => {
        result.stockDepn = parseFloat(result.stockDepn).toFixed(2);
        result.provAge = parseFloat(result.provAge).toFixed(2);
        setState(result);

        if (result.provAge) {
          setLoadingPage(false);
        }
      });
    }
  }, [id]);

  const submit = async () => {
    try {
      const values = await form.validateFields();
      state.provAge = parseFloat(state.provAge);
      state.stockDepn = parseFloat(state.stockDepn);

      let obj = state;
      console.log('obj :>> ', obj);
      if (isEdit) {
        obj.version = parseInt(obj.version);
        const hasil = await InventoryControl.edit(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
          // message.error(res.message ? res.message : env.internalError);
        } else {
          notification.success({
            message: 'Record successfully updated',
          });
          // message.success('Record successfully updated');
          history.push('/inventory-controls');
        }
      } else {
        const hasil = await InventoryControl.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
          // message.error(res.message ? res.message : env.internalError);
        } else {
          notification.success({
            message: 'Record successfully added',
          });
          // message.success('Record successfully added');
          history.push('/inventory-controls');
        }
      }
    } catch (errorInfo) {
      const temp = [];
      if (errorInfo && errorInfo.errorFields) {
        errorInfo.errorFields.map(e => {
          temp.push(e.name[0]);
        });
      }
      setErrorFields(temp);
      console.log('Failed:', errorInfo, errorFields);
    }
  };

  useEffect(() => {
    console.log('errrr', errorFields);
    if (errorFields.includes("stockDepn")) {
      console.log('stockDepnRef :>> ', stockDepnRef);
      stockDepnRef.current.focus();
    } else if (errorFields.includes("provAge")) {
      provAgeRef.current.focus();
    }
  }, [errorFields, stockDepnRef, provAgeRef]);

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    if (!this.toString().split(".")[1]) {
      return parseInt(this.toString().split("-")[1]);
    }
    return this.toString().split(".")[1].length || 0;
  };

  return (
    <StyledDiv>
      <div className="header">
        <h2></h2>
        <h2>Inventory Control</h2>
      </div>
      <div className="formWrapper">
        {
          loadingPage
            ?
            <div className="loading">
              <img src={ Images.loading } alt="" />
            </div>
            :
            <Form onFinish={ submit } onFinishFailed={ data => formFailedSubmit(data, setErrorFields) } form={ form } name="control-hooks">
              <div className="group">
                <div className="row">
                  <Form.Item
                    name="stockDepn"
                    label="Stock Depreciation (%)"
                    initialValue={ state.stockDepn }
                    rules={ [
                      {
                        required: true,
                        message: 'Stock Deprecation cannot be blank!'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(state.stockDepn)) {
                            return Promise.reject(new Error('Stock Deprecation format mask is 99990.00'));
                          }
                          if (Number(state.stockDepn).countDecimals() > 2) {
                            return Promise.reject(new Error('Stock Deprecation decimal length must be less than 2 digits : 99990.00'));
                          }
                          if (Number(state.stockDepn) < 0) {
                            return Promise.reject(new Error('Stock Deprecation cannot be negative : 99990.00'));
                          }
                          if (Number(state.stockDepn) > 99990) {
                            return Promise.reject(new Error('Stock Deprecation max 99990.00'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      ref={ stockDepnRef }
                      className='normal right'
                      disabled={ isDisabled }
                      defaultValue={ state.stockDepn }
                      value={ state.stockDepn }
                      onBlur={ e => changeData(e.target.value, 'stockDepn') }
                    />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="provAge"
                    label="Stock Provision Age (Yrs)"
                    initialValue={ state.provAge }
                    rules={ [
                      {
                        required: true,
                        message: 'Stock Provision Age cannot be blank!'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(state.provAge)) {
                            return Promise.reject(new Error('Stock Provision Age format mask is 99990.00'));
                          }
                          if (Number(state.provAge).countDecimals() > 2) {
                            return Promise.reject(new Error('Stock Provision Age decimal length must be less than 2 digits : 99990.00'));
                          }
                          if (Number(state.provAge) < 0) {
                            return Promise.reject(new Error('Stock Provision Age cannot be negative : 99990.00'));
                          }
                          if (Number(state.provAge) > 99990) {
                            return Promise.reject(new Error('Stock Provision Age max 99990.00'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      ref={ provAgeRef }
                      className='normal right'
                      disabled={ isDisabled }
                      defaultValue={ state.provAge }
                      value={ state.provAge }
                      onBlur={ e => changeData(e.target.value, 'provAge') }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/inventory-controls`) } htmlType="submit">
                    Back To Inventory Control
                  </Button>

                  {
                    (!id || isEdit) &&
                    <Button type="primary" style={ { marginLeft: '1%' } } htmlType="submit">
                      {
                        isEdit
                          ?
                          "Update Inventory Control"
                          :
                          "Create Inventory Control"
                      }
                    </Button>
                  }
                </Form.Item>
              </div>
            </Form>
        }
      </div >
    </StyledDiv >
  );
};

export default FormPage;
