import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Uom } from '../../services';

import { StyledDiv } from './styled';
import { Images } from '../../constant';

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
        console.log('result :>> ', result);
        // if (result.status && result.status !== 200) {
        //   message.error(result.error);
        // } else {
        
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
      if (isEdit) {
        obj.version = parseInt(obj.version);
        Uom.edit(id, obj);
      } else {
        Uom.create(obj);
      }
      history.push('/uoms');
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <StyledDiv>
      <div className="header">
        <h2>{ id ? id : "FORM_ID" }</h2>
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
                  {
                    !state.uomFrom && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="uomFrom"
                        label="UOM From"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.uomFrom } value={ state.uomFrom } onBlur={ e => changeData(e.target.value, 'uomFrom') } placeholder='Type uom from here...' />
                      </Form.Item>
                  }

                </div>
                <div className="row">
                  {
                    !state.fromDescription && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="fromDescription"
                        label="From Description"
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.fromDescription } value={ state.fromDescription } onBlur={ e => changeData(e.target.value, 'fromDescription') } placeholder='Type from description here...' />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !state.uomTo && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="uomTo"
                        label="UOM To"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.uomTo } value={ state.uomTo } onBlur={ e => changeData(e.target.value, 'uomTo') } placeholder='Type uom to here...' />
                      </Form.Item>
                  }

                </div>
                <div className="row">
                  {
                    !state.toDescription && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="toDescription"
                        label="To Description"
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ state.toDescription } value={ state.toDescription } onBlur={ e => changeData(e.target.value, 'toDescription') } placeholder='Type to description here...' />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !state.uomFactor && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="uomfactor"
                        label="UOM factor"
                      >
                        <InputNumber 
                          min={0} 
                          max={999990} 
                          className='normal' disabled={ isDisabled } defaultValue={ state.uomFactor } value={ state.uomFactor } onBlur={ e => changeData(e.target.value, 'uomFactor') } placeholder='Type uom factor here...' />
                      </Form.Item>
                  }
                </div>
              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/uoms`) } htmlType="submit">
                    Back To UOM
                  </Button>

                  {
                    (!id || isEdit) &&
                    <Button onClick={ submit } type="primary" style={{marginLeft: '1%'}} htmlType="submit">
                      {
                        isEdit
                          ?
                          "Edit UOM"
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
