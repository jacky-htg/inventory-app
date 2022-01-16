import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { InventoryControl } from '../../services';

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
  console.log('id kuuuu',id);
  const [state, setState] = useState({
    stockDepn: "",
    provAge: ""
  });

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
        console.log('result :>> ', result);
        // if (result.status && result.status !== 200) {
        //   message.error(result.error);
        // } else {
        
        setState(result);

        if (result.provAge) {
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
        InventoryControl.edit(obj);
      } else {
        InventoryControl.create(obj);
      }
      history.push('/inventory-controls');
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
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
                  {
                    !state.stockDepn && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="stockDepn"
                        label="Stock Depreciation (%)"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <InputNumber 
                          className='normal' 
                          min={0} 
                          max={99990}
                          disabled={ isDisabled } 
                          defaultValue={ state.stockDepn } 
                          value={ state.stockDepn } 
                          onBlur={ e => changeData(e.target.value, 'stockDepn') } 
                          />
                      </Form.Item>
                  }

                </div>
                <div className="row">
                  {
                    !state.provAge && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="provAge"
                        label="Stock Provision Age (Yrs)"
                        rules={ [
                          {
                            required: true,
                          },
                        ] }
                      >
                        <InputNumber 
                          className='normal' 
                          min={0} 
                          max={99990}
                          disabled={ isDisabled } 
                          defaultValue={ state.provAge } 
                          value={ state.provAge } 
                          onBlur={ e => changeData(e.target.value, 'provAge') } 
                          />
                      </Form.Item>
                  }
                </div>
              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/inventory-controls`) } htmlType="submit">
                    Back To Inventory Control
                  </Button>

                  {
                    (!id || isEdit) &&
                    <Button onClick={ submit } type="primary" style={{marginLeft: '1%'}} htmlType="submit">
                      {
                        isEdit
                          ?
                          "Edit Inventory Control"
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
