import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { ItemCategory, Lov } from '../../services';
import env from '../../env';
import { StyledDiv } from './styled';
import { Images } from '../../constant';

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
    designQtya: 0,
    designQtyb: 0,
    designQtyc: 0,
    designQtyd: 0,
    mifA: 0,
    mifB: 0,
    mifC: 0,
    mifD: 0
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
    const arrInt = [ 'designQtya', 'designQtyb', 'designQtyc', 'designQtyd', 'mifA', 'mifB', 'mifC', 'mifD'];
    if (arrInt.includes(field)) {
      value = parseInt(value);
    }
    state[field] = value;
    setState(state);
  };
  
  useEffect(() => {
    if (
      id
    ) {
      const data = ItemCategory.view(id);
      data.then(result => {
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
      if (isEdit) {
        obj.version = parseInt(obj.version);
        const hasil = await ItemCategory.edit(id, obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message ? res.message : env.internalError);
        } else {
          history.push('/item-categories');
        }
      } else {
        const hasil = await ItemCategory.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message ? res.message : env.internalError);
        } else {
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

  useEffect(()=> {
    console.log('errrr', errorFields);
    if (errorFields.includes("categoryCode")) {
      categoryCodeRef.current.focus();
    } else if (errorFields.includes("categorySubCode")) {
      categorySubCodeRef.current.focus();
    } else if (errorFields.includes("categoryGroup")) {
      categoryGroupRef.current.focus();
    }
  }, [errorFields, categoryCodeRef, categorySubCodeRef, categoryGroupRef]);

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
            <Form form={ form } name="control-hooks">
              <div className="group">
                <div className="row">
                  <Form.Item
                    name="categoryCode"
                    label="Category Code"
                    initialValue={state.categoryCode}
                    rules={ [
                      {
                        required: true,
                        message: "category code is required"
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
                    <Input ref={categoryCodeRef} maxLength={10} style={{ textTransform: 'uppercase' }} className='normal' disabled={ isDisabled } defaultValue={ state.categoryCode } value={ state.categoryCode } onBlur={ e => changeData(e.target.value.toUpperCase(), 'categoryCode') } />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <Input maxLength={60} style={{ textTransform: 'uppercase' }} className='normal' disabled={ isDisabled } defaultValue={ state.description } value={ state.description } onBlur={ e => changeData(e.target.value.toUpperCase(), 'description') } />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="categorySubCode"
                    label="Category Sub Code"
                    initialValue={state.categorySubCode}
                    rules={ [
                      {
                        required: true,
                        message:"category sub code is required"
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
                    <Input ref={categorySubCodeRef} maxLength={10} style={{ textTransform: 'uppercase' }} className='normal' disabled={ isDisabled } defaultValue={ state.categorySubCode } value={ state.categorySubCode } onBlur={ e => changeData(e.target.value.toUpperCase(), 'categorySubCode') } />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="subDescription"
                    label="Sub Description"
                  >
                    <Input maxLength={60} style={{ textTransform: 'uppercase' }} className='normal' disabled={ isDisabled } defaultValue={ state.subDescription } value={ state.subDescription } onBlur={ e => changeData(e.target.value.toUpperCase(), 'subDescription') } />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="categoryGroup"
                    label="Category Group"
                    initialValue={state.categoryGroup}
                    rules={ [
                      {
                        required: true,
                        message: 'category group is required'
                      },
                    ] }
                  >
                    <Select 
                      ref={categoryGroupRef} 
                      className='normal' 
                      disabled={ isDisabled } 
                      defaultValue={ state.categoryGroup } 
                      value={ state.categoryGroup } 
                      onChange={ e => changeData(e, 'categoryGroup') } 
                      >
                        {categoryGroups}
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
                  >
                    <InputNumber 
                      min={0} 
                      max={999999991} 
                      step="0.0001"
                      stringMode
                      maxLength={18} 
                      style={{ width: "50%"}}
                      className='normal right' 
                      defaultValue={ state.designQtya } 
                      value={ state.designQtya } 
                      onBlur={ e => changeData(e.target.value, 'designQtya') } 
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifA"
                    label="MIF A"
                  >
                    <InputNumber 
                      min={0} 
                      max={99990} 
                      maxLength={6} 
                      style={{ width: "50%"}}
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
                  >
                    <InputNumber 
                      min={0} 
                      max={999999991} 
                      step="0.0001"
                      stringMode
                      maxLength={18} 
                      style={{ width: "50%"}}
                      className='normal right' 
                      defaultValue={ state.designQtyb } 
                      value={ state.designQtyb } 
                      onBlur={ e => changeData(e.target.value, 'designQtyb') } 
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifB"
                    label="MIF B"
                  >
                    <InputNumber 
                      min={0} 
                      max={99990} 
                      maxLength={6} 
                      style={{ width: "50%"}}
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
                  >
                    <InputNumber 
                      min={0} 
                      max={999999991} 
                      step="0.0001"
                      stringMode
                      maxLength={18} 
                      style={{ width: "50%"}}
                      className='normal right' 
                      defaultValue={ state.designQtyc } 
                      value={ state.designQtyc } 
                      onBlur={ e => changeData(e.target.value, 'designQtyc') } 
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifC"
                    label="MIF C"
                  >
                    <InputNumber 
                      min={0} 
                      max={99990} 
                      maxLength={6} 
                      style={{ width: "50%"}}
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
                  >
                    <InputNumber 
                      min={0} 
                      max={999999991} 
                      step="0.0001"
                      stringMode
                      maxLength={18} 
                      style={{ width: "50%"}}
                      className='normal right' 
                      defaultValue={ state.designQtyd } 
                      value={ state.designQtyd } 
                      onBlur={ e => changeData(e.target.value, 'designQtyd') } 
                    />
                  </Form.Item>

                  <Form.Item
                    name="mifD"
                    label="MIF D"
                  >
                    <InputNumber 
                      min={0} 
                      max={99990} 
                      maxLength={6} 
                      style={{ width: "50%"}}
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
                    <Button onClick={ submit } type="primary" style={{marginLeft: '1%'}} htmlType="submit">
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
