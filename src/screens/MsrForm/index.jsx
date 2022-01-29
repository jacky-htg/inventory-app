import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Divider } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Location, Msr } from '../../services';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

import { StyledDiv } from './styled';
import { Images } from '../../constant';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const PageForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
  const [state, setState] = useState({});
  const [details, setDetails] = useState([
    {}
  ]);

  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isDisabled, setIsDisabled] = useState(id ? true : false);

  const [locOpt, setLocOpt] = useState([]);
  

  useEffect(() => {
    let data = Location.list({});
    data.then(result => {
      let temp = [];
      result.rows.forEach(el => {
        temp.push(<Option key={ el.loc } value={ el.loc } >{ el.loc }</Option>);
      });
      setLocOpt(temp);
    });
  }, []);

  const submit = async () => {
    try {
      console.log(details);
      // const values = await form.validateFields();
      // console.log('Success:', values);
      details.map((e, i) => {
        // details[i]["subType"] = "M";
        // details[i]["grnNo"] = grnNo;
        // details[i]["poPrice"] = e.recdPrice;
        // details[i]["recdDate"] = e.dueDate;
        // details[i]["loc"] = "TE";
        details[i]["seqNo"] = (i+1);
      });

      console.log('details', details);

      let obj = {
        /*subType: 'M',
        grnNo,
        doNo,
        currencyCode,
        currencyRate,
        grnDetails: details*/
      };
      console.log('obj :>> ', obj);
      const hasil = await Msr.create(obj);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        message.error(res.message);
      }

      history.push('/msr');
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const addNewDetail = () => {
    let arr = [...details, {}];
    setDetails(arr);
  };

  const deleteDetail = (id) => {
    let arr = [...details];
    arr.splice(id, 1);
    setDetails(arr);
  };

  return (
    <StyledDiv>
      <div className="header">
        <h2></h2>
        <h2>MSR Entry</h2>
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
                <div className="row2">
                  {
                    !state.msrNo && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="msrNo"
                        label="MSR No"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.msrNo }
                          value={ state.msrNo }
                          readOnly
                        />
                      </Form.Item>
                  }

                  {
                    !state.originator && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="originator"
                        label="Originator"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.originator }
                          value={ state.originator }
                          placeholder={ "Type currency code here..." }
                        />
                      </Form.Item>
                  }

                  {
                    !state.entryUser && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="entryUser"
                        label="Entry User"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.entryUser }
                          value={ state.entryUser }
                          readOnly
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    !state.mrvNo && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="mrvNo"
                        label="MRV No"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.mrvNo }
                          value={ state.mrvNo }
                        />
                      </Form.Item>
                  }

                  {
                    !state.status && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="status"
                        label="Status"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue="Y"
                          value="Y"
                          readOnly
                        />
                      </Form.Item>
                  }

                  {
                    !state.entryDate && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="entryDate"
                        label="Entry Date"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ moment().format() }
                          value={ moment().format() }
                          readOnly
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    !state.docmNo && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="docmNo"
                        label="Docm No"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.docmNo }
                          value={ state.docmNo }
                        />
                      </Form.Item>
                  }

                  {
                    !state.currencyCode && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="currencyCode"
                        label="Currency Code"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue="USD"
                          value="USD"
                          readOnly
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    !state.batchId && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="batchId"
                        label="Batch ID"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.batchId }
                          value={ state.batchId }
                        />
                      </Form.Item>
                  }

                  {
                    !state.currencyRate && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="currencyRate"
                        label="Currency Rate"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue="1"
                          value="1"
                          readOnly
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    !state.supplierCode && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="supplierCode"
                        label="Supplier Code"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.supplierCode }
                          value={ state.supplierCode }
                        />
                      </Form.Item>
                  }
                </div>
              </div>
              <div className="detail-wrapper"> 
                {
                  details.map((el, idx) => {
                    return (
                      <div className="detail-card">
                        <div className="border">
                          <div className="row2">
                              {
                                <Form.Item
                                  name="SN"
                                  label="SN"
                                >
                                  <Input className='smallInput' defaultValue={ el.sn } value={ el.sn } onChange={ e => changeDetail(idx, 'sn', e.target.value) } placeholder='Type SN here...' />
                                </Form.Item>
                              }

                              {
                                <Form.Item
                                  name="Type"
                                  label="Type"
                                >
                                  <Input className='smallInput' defaultValue={ el.type } value={ el.type } onChange={ e => changeDetail(idx, 'type', e.target.value) } placeholder='Insert type here...' />
                                </Form.Item>
                              }

                              {
                                <Form.Item
                                  name="UOM"
                                  label="UOM"
                                >
                                  <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } placeholder='Type UOM here...' />
                                </Form.Item>
                              }
                          </div>
                          <div className="row2">
                            <div className="dual">
                              {
                                <Form.Item
                                  name="returnPrice"
                                  label="Return Price"
                                >
                                  <Input className='smallInput' defaultValue={ el.returnPrice } value={ el.returnPrice } onChange={ e => changeDetail(idx, 'returnPrice', e.target.value) } placeholder='Type Return Price here...' />
                                </Form.Item>
                              }

                              
                              {
                                <Form.Item
                                  name="returnQty"
                                  label="Return Qty"
                                >
                                  <Input className='smallInput' defaultValue={ el.returnQty } value={ el.returnQty } onChange={ e => changeDetail(idx, 'returnQty', e.target.value) } placeholder='Type Return Qty here...' />
                                </Form.Item>
                              }
                            </div>
                            <div className="dual">
                              {
                                <Form.Item
                                  name="returnType"
                                  label="Return Type"
                                >
                                  <Input className='smallInput' defaultValue={ el.returnType } value={ el.returnType } onChange={ e => changeDetail(idx, 'returnType', e.target.value) } placeholder='Type Return Type here...' />
                                </Form.Item>
                              }

                              {
                                <Form.Item
                                  name="returnAction"
                                  label="Return Action"
                                >
                                  <Input className='smallInput' defaultValue={ el.returnAction } value={ el.returnAction } onChange={ e => changeDetail(idx, 'returnAction', e.target.value) } placeholder='Type Return Action here...' />
                                </Form.Item>
                              }
                            </div>
                          </div>

                          <div className="row2">

                            {
                              <Form.Item
                                name="Item No"
                                label="Item No"
                              >
                                <Input defaultValue={ el.itemNo } value={ el.itemNo } onChange={ e => changeDetail(idx, 'itemNo', e.target.value) } placeholder='Type item no here...' />
                              </Form.Item>
                            }

                            {
                              <Form.Item
                                name="batchNo"
                                label="Batch No"
                              >
                                <Input defaultValue={ el.batchNo } value={ el.batchNo } onChange={ e => changeDetail(idx, 'batchNo', e.target.value) } placeholder='Type batch no here...' />
                              </Form.Item>
                            }
                            
                            {
                              <Form.Item
                                name="Loc"
                                label="Loc"
                              >
                                <Select
                                  className='normal' disabled={ isDisabled }
                                  defaultValue={ el.loc }
                                  value={ el.loc }
                                  placeholder={ "Select loc.." }
                                  filterOption={ (inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                  }
                                >
                                  { locOpt }
                                </Select>
                              </Form.Item>
                            }
                          </div>

                          <div className="row2">
                            {
                              <Form.Item
                                name="Part No"
                                label="Part No"
                              >
                                <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' />
                              </Form.Item>
                            }

                            <div className="dual">
                              {
                                <Form.Item
                                  name="Project No"
                                  label="Project No"
                                >
                                  <Input className='smallInput' defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } placeholder='Type Project No here...' />
                                </Form.Item>
                              }

                              {
                                <Form.Item
                                  name="grnNo"
                                  label="GRN No"
                                >
                                  <Input className='smallInput' defaultValue={ el.grnNo } value={ el.grnNo } onChange={ e => changeDetail(idx, 'grnNo', e.target.value) } placeholder='Insert GRN No here...' />
                                </Form.Item>
                              }
                            </div>
                            <div className="dual">

                              {
                                <Form.Item
                                  name="mrvNo"
                                  label="MRV No"
                                >
                                  <Input className='smallInput' defaultValue={ el.mrvNo } value={ el.mrvNo } onChange={ e => changeDetail(idx, 'mrvNo', e.target.value) } placeholder='Insert MRV No here...' />
                                </Form.Item>
                              }
                            </div>

                          </div>
                          <div className="row">
                            {
                              <Form.Item
                                name="Remarks"
                                label="Remarks"
                              >
                                <TextArea className='smallInput' defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } placeholder='Type remarks here...' />
                              </Form.Item>
                            }
                          </div>
                        </div>

                        <div className="actions">
                          {
                            idx !== 0 &&
                            <TiDelete color='red' size={ 30 } onClick={ () => deleteDetail(idx) } />
                          }
                          <MdAddCircle color='#1990ff' size={ 24 } onClick={ addNewDetail } />
                        </div>

                      </div>
                    );
                  })
                }
              </div>

              <div className="submit">
                <Button onClick={ () => history.push(`/msr`) } type="default" htmlType="submit">
                  Back To MSR
                </Button>
                { !id && <Divider type='vertical'/>}
                {
                  !id && 
                  <Button onClick={ submit } type="primary" htmlType="submit">
                    Create MSR
                  </Button>
                }
              </div>
            </Form>
        }
      </div >
    </StyledDiv >
  );
};

export default PageForm;
