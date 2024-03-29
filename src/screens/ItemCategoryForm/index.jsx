import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, message, notification } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { ItemCategory, Lov } from '../../services';
import env from '../../env';
import { StyledDiv } from './styled';
import { Images } from '../../constant';
import { formFailedSubmit } from '../../helpers';

const FormPage = (props) => {
  const { Option } = Select;
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
  const [categoryGroups, setCategoryGroups] = useState([]);

  const [state, setState] = useState({
    categoryCode: "",
    description: "",
    categorySubCode: "",
    subDescription: "",
    categoryGroup: "",
    mrpStatus: null,
    designQtya: null,
    designQtyb: null,
    designQtyc: null,
    designQtyd: null,
    mifA: null,
    mifB: null,
    mifC: null,
    mifD: null
  });

  const [errorFields, setErrorFields] = useState([]);

  const categoryCodeRef = useRef();
  const categorySubCodeRef = useRef();
  const categoryGroupRef = useRef();

  useEffect(() => {
    let data = Lov.getCategoryGroups();
    data.then(result => {
      let temp = [];
      for (const c of result) {
        temp.push(<Option key={ c.codeValue } value={ c.codeValue } >{ c.codeDesc }</Option>);
      }
      setCategoryGroups(temp);
    });
  }, []);

  const changeData = (value, field) => {
    state[field] = value;
    setState(state);
  };

  useEffect(() => {
    if (
      id
    ) {
      const data = ItemCategory.view(id);
      data.then(result => {
        if (result.designQtya) result.designQtya = parseFloat(result.designQtya).toFixed(4);
        if (result.designQtyb) result.designQtyb = parseFloat(result.designQtyb).toFixed(4);
        if (result.designQtyc) result.designQtyc = parseFloat(result.designQtyc).toFixed(4);
        if (result.designQtyd) result.designQtyd = parseFloat(result.designQtyd).toFixed(4);
        setState(result);

        if (result.categoryCode) {
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

      let obj = state;
      
      if (obj.designQtya) obj.designQtya = parseFloat(obj.designQtya);
      if (obj.designQtyb) obj.designQtyb = parseFloat(obj.designQtyb);
      if (obj.designQtyc) obj.designQtyc = parseFloat(obj.designQtyc);
      if (obj.designQtyd) obj.designQtyd = parseFloat(obj.designQtyd);
      if (obj.mifA) obj.mifA = parseInt(obj.mifA);
      if (obj.mifB) obj.mifB = parseInt(obj.mifB);
      if (obj.mifC) obj.mifC = parseInt(obj.mifC);
      if (obj.mifD) obj.mifD = parseInt(obj.mifD);
    
      if (isEdit) {
        obj.version = parseInt(obj.version);
        const hasil = await ItemCategory.edit(id, obj);
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
          history.push('/item-categories');
        }
      } else {
        const hasil = await ItemCategory.create(obj);
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
          history.push('/item-categories');
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
    if (errorFields.includes("categoryCode")) {
      categoryCodeRef.current.focus();
    } else if (errorFields.includes("categorySubCode")) {
      categorySubCodeRef.current.focus();
    } else if (errorFields.includes("categoryGroup")) {
      categoryGroupRef.current.focus();
    }
  }, [errorFields, categoryCodeRef, categorySubCodeRef, categoryGroupRef]);

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
        <h2>Item Category</h2>
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
                    name="categoryCode"
                    label="Category Code"
                    initialValue={ state.categoryCode }
                    rules={ [
                      {
                        required: true,
                        message: "Category Code cannot be blank!"
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('Category Code can not empty'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input ref={ categoryCodeRef } maxLength={ 10 } style={ { textTransform: 'uppercase' } } className='normal' readOnly={ isEdit ? true : false } disabled={ isDisabled } defaultValue={ state.categoryCode } value={ state.categoryCode } onBlur={ e => changeData(e.target.value.toUpperCase(), 'categoryCode') } />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <Input maxLength={ 60 } style={ { textTransform: 'uppercase' } } className='normal' disabled={ isDisabled } defaultValue={ state.description } value={ state.description } onBlur={ e => changeData(e.target.value.toUpperCase(), 'description') } />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="categorySubCode"
                    label="Category Sub Code"
                    initialValue={ state.categorySubCode }
                    rules={ [
                      {
                        required: true,
                        message: "Category Sub Code cannot be blank!"
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (/^\s+$/.test(value)) {
                            return Promise.reject(new Error('Category Sub Code can not empty'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input ref={ categorySubCodeRef } maxLength={ 10 } style={ { textTransform: 'uppercase' } } className='normal' readOnly={ isEdit ? true : false } disabled={ isDisabled } defaultValue={ state.categorySubCode } value={ state.categorySubCode } onBlur={ e => changeData(e.target.value.toUpperCase(), 'categorySubCode') } />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="subDescription"
                    label="Sub Description"
                  >
                    <Input maxLength={ 60 } style={ { textTransform: 'uppercase' } } className='normal' disabled={ isDisabled } defaultValue={ state.subDescription } value={ state.subDescription } onBlur={ e => changeData(e.target.value.toUpperCase(), 'subDescription') } />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="categoryGroup"
                    label="Group"
                    initialValue={ state.categoryGroup }
                    rules={ [
                      {
                        required: true,
                        message: 'Group cannot be blank!'
                      },
                    ] }
                  >
                    <Select
                      ref={ categoryGroupRef }
                      className='normal'
                      readOnly={ isEdit ? true : false } 
                      disabled={ isEdit ? true : isDisabled }
                      defaultValue={ state.categoryGroup }
                      value={ state.categoryGroup }
                      onChange={ e => changeData(e, 'categoryGroup') }
                    >
                      { categoryGroups }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="mrpStatus"
                    label="MRP Status"
                  >
                    <Select
                      className='normal'
                      disabled={ isDisabled }
                      defaultValue={ state.mrpStatus }
                      value={ state.mrpStatus }
                      onChange={ e => changeData(e, 'mrpStatus') }
                    >
                      <Option key='Y' value='Y' >YES</Option>
                      <Option key='N' value='N' >NO</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="row">
                  <Form.Item
                    name="designQtya"
                    label="Design Qty A"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.designQtya != null && isNaN(state.designQtya)) || (state.designQtya && isNaN(state.designQtya) && state.designQtya.includes("-"))) {
                            return Promise.reject(new Error('Design Qty A format mask is 999999990.0000'));
                          }
                          if (Number(state.designQtya) > 999999990) {
                            return Promise.reject(new Error('Design Qty A max 999999990.0000'));
                          }
                          if (Number(state.designQtya).countDecimals() > 4) {
                            return Promise.reject(new Error('Design Qty A decimal length must be less than 4 digits : 999999990.0000'));
                          } 
                          if (Number(state.designQtya) < 0) {
                            return Promise.reject(new Error('Design Qty A cannot be negative : 999999990.0000'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.designQtya }
                      value={ state.designQtya }
                      onBlur={ e => changeData(e.target.value, 'designQtya') }
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifA"
                    label="MIF A"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          console.log("hoopla",state.mifA);
                          if ((state.mifA != null && isNaN(state.mifA)) || (state.mifA && isNaN(state.mifA) && state.mifA.includes("-"))) {
                            return Promise.reject(new Error('MIF A format mask is 99990'));
                          }
                          if (Number(state.mifA) > 99990) {
                            return Promise.reject(new Error('MIF A max 99990'));
                          }
                          if (Number(state.mifA) < 0) {
                            return Promise.reject(new Error('MIF A cannot be negative : 99990'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.mifA }
                      value={ state.mifA }
                      onBlur={ e => changeData(e.target.value, 'mifA') }
                    />
                  </Form.Item>
                </div>

                <div className="row">
                  <Form.Item
                    name="designQtyb"
                    label="Design Qty B"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.designQtyb != null && isNaN(state.designQtyb)) || (state.designQtyb && isNaN(state.designQtyb) && state.designQtyb.includes("-"))) {
                            return Promise.reject(new Error('Design Qty B format mask is 999999990.0000'));
                          }
                          if (Number(state.designQtyb) > 999999990) {
                            return Promise.reject(new Error('Design Qty B max 999999990.0000'));
                          }
                          if (Number(state.designQtyb).countDecimals() > 4) {
                            return Promise.reject(new Error('Design Qty B decimal length must be less than 4 digits : 999999990.0000'));
                          } 
                          if (Number(state.designQtyb) < 0) {
                            return Promise.reject(new Error('Design Qty B cannot be negative : 999999990.0000'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.designQtyb }
                      value={ state.designQtyb }
                      onBlur={ e => changeData(e.target.value, 'designQtyb') }
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifB"
                    label="MIF B"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.mifB != null && isNaN(state.mifB)) || (state.mifB && isNaN(state.mifB) && state.mifB.includes("-"))) {
                            return Promise.reject(new Error('MIF B format mask is 99990'));
                          }
                          if (Number(state.mifB) > 99990) {
                            return Promise.reject(new Error('MIF B max 99990'));
                          }
                          if (Number(state.mifB) < 0) {
                            return Promise.reject(new Error('MIF B cannot be negative : 99990'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.mifB }
                      value={ state.mifB }
                      onBlur={ e => changeData(e.target.value, 'mifB') }
                    />
                  </Form.Item>
                </div>

                <div className="row">
                  <Form.Item
                    name="designQtyc"
                    label="Design Qty C"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.designQtyc != null && isNaN(state.designQtyc)) || (state.designQtyc && isNaN(state.designQtyc) && state.designQtyc.includes("-"))) {
                            return Promise.reject(new Error('Design Qty C format mask is 999999990.0000'));
                          }
                          if (Number(state.designQtyc) > 999999990) {
                            return Promise.reject(new Error('Design Qty C max 999999990.0000'));
                          }
                          if (Number(state.designQtyc).countDecimals() > 4) {
                            return Promise.reject(new Error('Design Qty C decimal length must be less than 4 digits : 999999990.0000'));
                          } 
                          if (Number(state.designQtyc) < 0) {
                            return Promise.reject(new Error('Design Qty C cannot be negative : 999999990.0000'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.designQtyc }
                      value={ state.designQtyc }
                      onBlur={ e => changeData(e.target.value, 'designQtyc') }
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifC"
                    label="MIF C"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.mifC != null && isNaN(state.mifC)) || (state.mifC && isNaN(state.mifC) && state.mifC.includes("-"))) {
                            return Promise.reject(new Error('MIF C format mask is 99990'));
                          }
                          if (Number(state.mifC) > 99990) {
                            return Promise.reject(new Error('MIF C max 99990'));
                          }
                          if (Number(state.mifC) < 0) {
                            return Promise.reject(new Error('MIF C cannot be negative : 99990'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.mifC }
                      value={ state.mifC }
                      onBlur={ e => changeData(e.target.value, 'mifC') }
                    />
                  </Form.Item>
                </div>

                <div className="row">
                  <Form.Item
                    name="designQtyd"
                    label="Design Qty D"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.designQtyd != null && isNaN(state.designQtyd)) || (state.designQtyd && isNaN(state.designQtyd) && state.designQtyd.includes("-"))) {
                            return Promise.reject(new Error('Design Qty D format mask is 999999990.0000'));
                          }
                          if (Number(state.designQtyd) > 999999990) {
                            return Promise.reject(new Error('Design Qty D max 999999990.0000'));
                          }
                          if (Number(state.designQtyd).countDecimals() > 4) {
                            return Promise.reject(new Error('Design Qty D decimal length must be less than 4 digits : 999999990.0000'));
                          } 
                          if (Number(state.designQtyd) < 0) {
                            return Promise.reject(new Error('Design Qty D cannot be negative : 999999990.0000'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.designQtyd }
                      value={ state.designQtyd }
                      onBlur={ e => changeData(e.target.value, 'designQtyd') }
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifD"
                    label="MIF D"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if ((state.mifD != null && isNaN(state.mifD)) || (state.mifD && isNaN(state.mifD) && state.mifD.includes("-"))) {
                            return Promise.reject(new Error('MIF D format mask is 99990'));
                          }
                          if (Number(state.mifD) > 99990) {
                            return Promise.reject(new Error('MIF D max 99990'));
                          }
                          if (Number(state.mifD) < 0) {
                            return Promise.reject(new Error('MIF D cannot be negative : 99990'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input
                      disabled={ isDisabled }
                      className='normal right'
                      defaultValue={ state.mifD }
                      value={ state.mifD }
                      onBlur={ e => changeData(e.target.value, 'mifD') }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/item-categories`) } htmlType="submit">
                    Back To Item Category
                  </Button>

                  {
                    (!id || isEdit) &&
                    <Button type="primary" style={ { marginLeft: '1%' } } htmlType="submit">
                      {
                        isEdit
                          ?
                          "Update Item Category"
                          :
                          "Create Item Category"
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
