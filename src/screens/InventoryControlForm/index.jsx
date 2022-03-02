import React, { useState, useEffect, useRef } from 'react';
import { Form, InputNumber, Button, message } from 'antd';
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
    stockDepn: "",
    provAge: ""
  });

  const [errorFields, setErrorFields] = useState([]);

  const stockDepnRef = useRef();
  const provAgeRef = useRef();

  const changeData = (value, field) => {
    value = parseFloat(value);
    state[field] = value;
    setState(state);
  };

  useEffect(() => {
    if (
      id
    ) {
      const data = InventoryControl.view();
      data.then(result => {
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
      let obj = state;
      console.log('obj :>> ', obj);
      if (isEdit) {
        obj.version = parseInt(obj.version);
        const hasil = await InventoryControl.edit(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message ? res.message : env.internalError);
        } else {
          history.push('/inventory-controls');
        }
      } else {
        const hasil = await InventoryControl.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message ? res.message : env.internalError);
        } else {
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
            <Form form={ form } name="control-hooks">
              <div className="group">
                <div className="row">
                  <Form.Item
                    name="stockDepn"
                    label="Stock Depreciation (%)"
                    initialValue={ state.stockDepn }
                    rules={ [
                      {
                        required: true,
                        message: 'Stock Deprecation Can Not be Blank !'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (Number(state.stockDepn).countDecimals() > 2) {
                            return Promise.reject(new Error('decimal length must be less than 2 digits '));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <InputNumber
                      ref={ stockDepnRef }
                      className='normal right'
                      min={ 0 }
                      max={ 99990 }
                      maxLength={ 5 }
                      step="0.01"
                      style={ { width: "50%" } }
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
                        message: 'Stock Provision Age Can Not be Blank !'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (Number(state.provAge).countDecimals() > 2) {
                            return Promise.reject(new Error('decimal length must be less than 2 digits '));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <InputNumber
                      ref={ provAgeRef }
                      className='normal right'
                      min={ 0 }
                      max={ 99990 }
                      maxLength={ 5 }
                      step="0.01"
                      style={ { width: "50%" } }
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
                    <Button onClick={ submit } type="primary" style={ { marginLeft: '1%' } } htmlType="submit">
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
