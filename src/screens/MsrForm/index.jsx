import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Divider } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Location, Msr } from '../../services';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

import env from '../../env';
import { StyledDiv } from './styled';
import { Images } from '../../constant';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import Collapsible from "react-collapsible";

const PageForm = (props) => {
  const { Search } = Input;
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
    let data = Msr.getMsrNo();
    data.then(result => {
      console.log('result :>> ', result);
      setState({
        ...state,
        msrNo: result.generatedNo,
        entryUser: env.username,
        docmNo: result.docmNo
      });
    });
  }, []);


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

  const searchSupplier = async (data) => {
    console.log('data :>> ', data);
    if (data.length > 0){
      const grn = await Msr.getSupplierByGrnNo(data);
      if (grn.ok !== undefined && !grn.ok) {
        const res = await grn.data;
        message.error(res.message);
      } else {
        console.log('getSupplierByGrnNo result :>> ', grn);
        setState({
          ...state,
          supplierCode: grn.supplierCode
        });
        setDetails(grn.msrDetails);
        const temp = [];
        grn.msrDetails.map((el, index) => {
          el.sn = index+1
          temp.push(el);
        });
        setDetails(temp);
      }
    }
  };

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
        details[i]["seqNo"] = (i + 1);
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
                        <Input hidden />
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
                          placeholder={ "Type originator here..." }
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
                        <Input hidden />
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
                          placeholder='Type MRV No...'
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
                        <Input hidden />
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.docmNo }
                          value={ state.docmNo }
                          readOnly
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
                          placeholder='Type Batch ID...'
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
                    !state.grnNo && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="grnNo"
                        label="GRN No"
                      >
                        <Search
                          placeholder="Type GRN No..."
                          allowClear
                          enterButton="Check"
                          defaultValue={ state.grnNo }
                          value={ state.grnNo }
                          onSearch={ searchSupplier }
                        />
                        {/* <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.grnNo }
                          value={ state.grnNo }
                        /> */}
                      </Form.Item>
                  }

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
                          placeholder='Enter GRN No first..'
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.supplierCode }
                          value={ state.supplierCode }
                          readOnly
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
                          <Collapsible trigger={ `Serial Number: ${ idx + 1 }` }>
                            <div className="inputs">
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
                                    name="itemType"
                                    label="Type"
                                  >
                                    <Input className='smallInput' defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } placeholder='Insert type here...' />
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
                                      <Input className='smallInput' defaultValue={ el.retnPrice } value={ el.retnPrice } onChange={ e => changeDetail(idx, 'retnPrice', e.target.value) } placeholder='Type Return Price here...' />
                                    </Form.Item>
                                  }


                                  {
                                    <Form.Item
                                      name="returnQty"
                                      label="Return Qty"
                                    >
                                      <Input className='smallInput' defaultValue={ el.retnQty } value={ el.retnQty } onChange={ e => changeDetail(idx, 'retnQty', e.target.value) } placeholder='Type Return Qty here...' />
                                    </Form.Item>
                                  }
                                </div>
                                
                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="returnType"
                                      label="Return Type"
                                    >
                                      <Select
                                      className='normal' disabled={ isDisabled }
                                      defaultValue={ el.retnType }
                                      value={ el.retnType }
                                      placeholder={ "Select return Type.." }
                                      onSelect={ e => changeDetail(idx, 'retnType', e.target.value) }
                                      filterOption={ (inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                      }
                                    >
                                      <Option value="R1">R1</Option>
                                    </Select>
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="returnAction"
                                      label="Return Action"
                                    >
                                      <Select
                                      className='normal' disabled={ isDisabled }
                                      defaultValue={ el.retnAction }
                                      value={ el.retnAction }
                                      placeholder={ "Select return Action.." }
                                      onSelect={ e => changeDetail(idx, 'retnAction', e.target.value) }
                                      filterOption={ (inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                      }
                                    >
                                      <Option value="A1">A1</Option>
                                    </Select>
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

                          </Collapsible>
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
                { !id && <Divider type='vertical' /> }
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
