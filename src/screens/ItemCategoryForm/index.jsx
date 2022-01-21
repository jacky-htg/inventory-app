import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { ItemCategory, Lov } from '../../services';

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

  useEffect(() => {
    let data = Lov.getCategoryGroups();
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
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
        // if (result.status && result.status !== 200) {
        //   message.error(result.error);
        // } else {
        
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
        ItemCategory.edit(id, obj);
      } else {
        ItemCategory.create(obj);
      }
      history.push('/item-categories');
    } catch (errorInfo) {
      console.error('Failed:', errorInfo);
    }
  };

  return (
    <StyledDiv>
      <div className="header">
        <h2>{ id ? id : "FORM_ID" }</h2>
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
                  {
                    !state.categoryCode && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="categoryCode"
                        label="Category Code"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.categoryCode } value={ state.categoryCode } onBlur={ e => changeData(e.target.value, 'categoryCode') } placeholder='Type category code here...' />
                      </Form.Item>
                  }

                </div>
                <div className="row">
                  {
                    !state.description && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="description"
                        label="Description"
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.description } value={ state.description } onBlur={ e => changeData(e.target.value, 'description') } placeholder='Type description here...' />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !state.categorySubCode && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="categorySubCode"
                        label="Category Sub Code"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.categorySubCode } value={ state.categorySubCode } onBlur={ e => changeData(e.target.value, 'categorySubCode') } placeholder='Type category sub code here...' />
                      </Form.Item>
                  }

                </div>
                <div className="row">
                  {
                    !state.subDescription && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="subDescription"
                        label="Sub Description"
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.subDescription } value={ state.subDescription } onBlur={ e => changeData(e.target.value, 'subDescription') } placeholder='Type sub description here...' />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !state.categoryGroup && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="categoryGroup"
                        label="Category Group"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <Select 
                          className='normal' 
                          disabled={ isDisabled } 
                          defaultValue={ state.categoryGroup } 
                          value={ state.categoryGroup } 
                          onChange={ e => changeData(e, 'categoryGroup') } 
                          placeholder='Type category group here...' >
                            {categoryGroups}
                        </Select>
                      </Form.Item>
                  }

                  {
                    !state.mrpStatus && id && !isEdit
                      ?
                      <></>
                      :
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
                  }
                </div>

                <div className="row">
                  {
                    !state.designQtya && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="designQtya"
                        label="Design Qty A"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.designQtya } 
                          value={ state.designQtya } 
                          onBlur={ e => changeData(e.target.value, 'designQtya') } 
                        />
                      </Form.Item>
                  }

                  {
                    !state.mifA && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="mifA"
                        label="MIF A"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.mifA } 
                          value={ state.mifA } 
                          onBlur={ e => changeData(e.target.value, 'mifA') } 
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row">
                  {
                    !state.designQtyb && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="designQtyb"
                        label="Design Qty B"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.designQtyb } 
                          value={ state.designQtyb } 
                          onBlur={ e => changeData(e.target.value, 'designQtyb') } 
                        />
                      </Form.Item>
                  }

                  {
                    !state.mifB && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="mifB"
                        label="MIF B"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.mifB } 
                          value={ state.mifB } 
                          onBlur={ e => changeData(e.target.value, 'mifB') } 
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row">
                  {
                    !state.designQtyc && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="designQtyc"
                        label="Design Qty C"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.designQtyc } 
                          value={ state.designQtyc } 
                          onBlur={ e => changeData(e.target.value, 'designQtyc') } 
                        />
                      </Form.Item>
                  }

                  {
                    !state.mifC && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="mifC"
                        label="MIF C"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.mifC } 
                          value={ state.mifC } 
                          onBlur={ e => changeData(e.target.value, 'mifC') } 
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row">
                  {
                    !state.designQtyd && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="designQtyd"
                        label="Design Qty D"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.designQtyd } 
                          value={ state.designQtyd } 
                          onBlur={ e => changeData(e.target.value, 'designQtyd') } 
                        />
                      </Form.Item>
                  }

                  {
                    !state.mifD && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="mifD"
                        label="MIF D"
                      >
                        <InputNumber 
                          min={0} 
                          max={99990} 
                          className='normal' 
                          defaultValue={ state.mifD } 
                          value={ state.mifD } 
                          onBlur={ e => changeData(e.target.value, 'mifD') } 
                        />
                      </Form.Item>
                  }
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
                          "Edit Item Category"
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
