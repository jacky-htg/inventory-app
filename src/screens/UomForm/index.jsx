import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, message, notification } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Uom } from '../../services';
import env from '../../env';
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
    uomFrom: "",
    fromDescription: "",
    uomTo: "",
    toDescription: "",
    uomFactor: parseFloat(0).toFixed(6),
    version: 0
  });

  const [errorFields, setErrorFields] = useState([]);

  const fromRef = useRef();
  const toRef = useRef();
  const factorRef = useRef();

  const changeData = (value, field) => {
    state[field] = value;
    setState(state);
  };

  useEffect(() => {
    if (
      id
    ) {
      const data = Uom.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        result.uomFactor = parseFloat(result.uomFactor).toFixed(6);
        setState(result);

        if (result.uomFrom) {
          setLoadingPage(false);
        }
      });
    }
  }, [id]);

  const submit = async () => {
    try {
      if (!isEdit) {
        const values = await form.validateFields();
      }
      state.uomFactor = parseFloat(state.uomFactor);
      let obj = state;
      if (isEdit) {
        obj.version = parseInt(obj.version);
        const hasil = await Uom.edit(id, obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
        } else {
          notification.success({
            message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
          });
          history.push('/uoms');
        }
      } else {
        const hasil = await Uom.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
        } else {
          notification.success({
            message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
          });
          history.push('/uoms');
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

  const showError = ({ values, errorFields, outOfDate }) => {
    if (errorFields.length > 0) {
      const temp = [];
      errorFields.forEach(el => {
        temp.push(el.name[0]);
      });
      console.log('temp :>> ', temp);
      setErrorFields(temp);
    }
  };

  useEffect(() => {
    if (errorFields.includes("uomFrom")) {
      fromRef.current.focus();
    } else if (errorFields.includes("uomTo")) {
      toRef.current.focus();
    } else if (errorFields.includes("uomFactor")) {
      factorRef.current.focus();
    }
  }, [errorFields, fromRef, toRef, factorRef]);

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
        <h2>UOM</h2>
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
                    name="uomFrom"
                    label="From"
                    initialValue={ state.uomFrom }
                    rules={ [
                      {
                        required: true,
                        message: 'From cannot be blank!'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('From cannot be blank'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input ref={ fromRef } maxLength={ 3 } style={ { textTransform: 'uppercase' } } className='normal' readOnly={ isEdit ? true : false } disabled={ isDisabled } defaultValue={ state.uomFrom } value={ state.uomFrom } onBlur={ e => changeData(e.target.value.toUpperCase(), 'uomFrom') } />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="fromDescription"
                    label="From UOM Description"
                  >
                    <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } className='normal' disabled={ isDisabled } defaultValue={ state.fromDescription } value={ state.fromDescription } onBlur={ e => changeData(e.target.value.toUpperCase(), 'fromDescription') } />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="uomTo"
                    label="To"
                    initialValue={ state.uomTo }
                    rules={ [
                      {
                        required: true,
                        message: 'To cannot be blank!'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('To cannot be blank!'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input ref={ toRef } maxLength={ 3 } style={ { textTransform: 'uppercase' } } className='normal' readOnly={ isEdit ? true : false } disabled={ isDisabled } defaultValue={ state.uomTo } value={ state.uomTo } onBlur={ e => changeData(e.target.value.toUpperCase(), 'uomTo') } />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="toDescription"
                    label="To UOM Description"
                  >
                    <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } className='normal' disabled={ isDisabled } defaultValue={ state.toDescription } value={ state.toDescription } onBlur={ e => changeData(e.target.value.toUpperCase(), 'toDescription') } />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="uomFactor"
                    label="Convertion Factor"
                    className='required'
                    initialValue={ state.uomFactor }
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('Convertion Factor cannot be blank!'));
                          }
                          if (isNaN(state.uomFactor)) {
                            return Promise.reject(new Error('Convertion Factor format mask is 999990.000000'));
                          }
                          if (Number(state.uomFactor).countDecimals() > 6) {
                            return Promise.reject(new Error('Convertion Factor decimal length must be less than 6 digits : 999990.000000'));
                          }
                          if (Number(state.uomFactor) === 0) {
                            return Promise.reject(new Error('Convertion Factor cannot be zero : 999990.000000'));
                          }
                          if (Number(state.uomFactor) < 0) {
                            return Promise.reject(new Error('Convertion Factor cannot be negative : 999990.000000'));
                          }
                          if (Number(state.uomFactor) > 999990) {
                            return Promise.reject(new Error('Convertion Factor max 999990.000000'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      ref={ factorRef }
                      className='normal right' disabled={ isDisabled } defaultValue={ state.uomFactor } value={ state.uomFactor } onBlur={ e => changeData(e.target.value, 'uomFactor') } />
                  </Form.Item>
                </div>
              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/uoms`) } htmlType="submit">
                    Back To UOM
                  </Button>

                  {
                    (!id || isEdit) &&
                    <Button type="primary" style={ { marginLeft: '1%' } } htmlType="submit">
                      {
                        isEdit
                          ?
                          "Update UOM"
                          :
                          "Create UOM"
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
