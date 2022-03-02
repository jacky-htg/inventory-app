import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
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
    uomFactor: 0,
    version: 0
  });

  const [errorFields, setErrorFields] = useState([]);

  const fromRef = useRef();
  const toRef = useRef();

  const changeData = (value, field) => {
    console.log(field, value, state);
    if (field === "uomFactor") {
      value = parseFloat(value);
    }
    state[field] = value;
    setState(state);
  };

  useEffect(() => {
    if (
      id
    ) {
      const data = Uom.view(id);
      data.then(result => {
        setState(result);

        if (result.uomFrom) {
          setLoadingPage(false);
        }
      });
    }
  }, [id]);

  const submit = async () => {
    try {
      console.log(state.uomFactor);
      if (!isEdit) {
        const values = await form.validateFields();
      }
      let obj = state;
      console.log('eeeeeeeeeeeeeeeee', obj);
      if (isEdit) {
        obj.version = parseInt(obj.version);
        const hasil = await Uom.edit(id, obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message ? res.message : env.internalError);
        } else {
          history.push('/uoms');
        }
      } else {
        const hasil = await Uom.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          console.log('eeeeeeeeeeeeeeeee create', res);
          message.error(res.message ? res.message : env.internalError);
        } else {
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

  useEffect(() => {
    console.log('errrr', errorFields);
    if (errorFields.includes("uomFrom")) {
      fromRef.current.focus();
    } else if (errorFields.includes("uomTo")) {
      toRef.current.focus();
    }
  }, [errorFields, fromRef, toRef]);

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
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
            <Form form={ form } name="control-hooks">
              <div className="group">
                <div className="row">
                  <Form.Item
                    name="uomFrom"
                    label="From"
                    initialValue={ state.uomFrom }
                    rules={ [
                      {
                        required: true,
                        message: 'From is required'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('From can not empty'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input ref={ fromRef } maxLength={ 3 } style={ { textTransform: 'uppercase' } } className='normal' disabled={ isDisabled } defaultValue={ state.uomFrom } value={ state.uomFrom } onBlur={ e => changeData(e.target.value.toUpperCase(), 'uomFrom') } />
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
                        message: 'To is required'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('To can not empty'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input ref={ toRef } maxLength={ 3 } style={ { textTransform: 'uppercase' } } className='normal' disabled={ isDisabled } defaultValue={ state.uomTo } value={ state.uomTo } onBlur={ e => changeData(e.target.value.toUpperCase(), 'uomTo') } />
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
                    name="uomfactor"
                    label="Convertion Factor"
                    rules={ [
                      {
                        required: true,
                        message: 'Convertion Factor is required'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (Number(value).countDecimals() > 4) {
                            return Promise.reject(new Error('decimal length must be less than 4 digits '));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <InputNumber
                      min={ 0 }
                      max={ 999991 }
                      step="0.0001"
                      stringMode
                      maxLength={ 14 }
                      style={ { width: "50%" } }
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
                    <Button onClick={ submit } type="primary" style={ { marginLeft: '1%' } } htmlType="submit">
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
