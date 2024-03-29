import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Divider, notification } from 'antd';
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
  const [state, setState] = useState({
    currencyCode: 'USD',
    currencyRate: 1,
  });
  const [details, setDetails] = useState([]);

  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isDisabled, setIsDisabled] = useState(id ? true : false);

  const [locOpt, setLocOpt] = useState([]);

  useEffect(() => {
    if (id) {
      let data = Msr.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        setLoadingPage(false);
        setState(result);

        /*result.grnNo && setGrnNo(result.grnNo);
        result.currencyRate && setCurrencyRate(result.currencyRate);
        result.currencyCode && setCurrencyCode(result.currencyCode);
        result.createdAt && setEntryDate(result.createdAt);
        result.updatedAt && setRecdDate(result.updatedAt);
        result.entryUser && setEntryUser(result.entryUser);
        result.subType && setSubType(result.subType);
        result.orderNo && setOrderNo(result.orderNo);
        result.projectNo && setProjectNo(result.projectNo); */
        let arr = [];
        result.msrDetails && result.msrDetails.length > 0 && result.msrDetails.forEach(el => {
          arr.push(el);
        });
        console.log('arr :>> ', arr);
        setDetails([...arr]);
      });
    }
  }, [id]);

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
    if (data.length > 0) {
      const grn = await Msr.getSupplierByGrnNo(data);
      if (grn.ok !== undefined && !grn.ok) {
        const res = await grn.data;
        notification.error({
          message: res.message ? res.message : env.internalError,
        });
        // message.error(res.message);
      } else {
        console.log('getSupplierByGrnNo result :>> ', grn);
        setState({
          ...state,
          supplierCode: grn.supplierCode
        });
        setDetails(grn.msrDetails);
        const temp = [];
        grn.msrDetails.map((el, index) => {
          el.sn = index + 1;
          /*if (!el.retnQty) {
            el.retnQty = 0;
          }
          if (!el.retnType) {
            el.retnType = null;
          }
          if (!el.retnAction) {
            el.retnAction = null;
          }*/

          temp.push(el);
        });
        console.log('temp detail msr :>> ', temp);
        setDetails(temp);
      }
    }
  };

  const changeDetail = (index, field, value) => {
    console.log(index, field, value);
    const temp = details;
    console.log(temp[index][field]);
    temp[index][field] = value;
    setDetails(temp);
  };

  useEffect(() => {
    console.log("details => ", details);
  }, [details]);

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
        details[i]['msrNo'] = state.msrNo;
        /*details[i]["retnQty"] = 1;
        details[i]["retnType"] = "R1";
        details[i]["retnAction"] = "A1";*/
      });

      console.log('details', details);
      console.log('state :>> ', state);
      let obj = {
        "currencyCode": state.currencyCode,
        "currencyRate": state.currencyRate,
        "docmNo": state.docmNo,
        "msrDetails": details,
        "msrNo": state.msrNo,
        "originator": state.originator,
        "supplierCode": state.supplierCode
      };
      console.log('obj :>> ', obj);
      const hasil = await Msr.create(obj);
      console.log('hasil :>> ', hasil);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        // message.error(res.message);
        notification.error({
          message: res.message ? res.message : env.internalError,
        });
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
                          onChange={ e => setState({ ...state, originator: e.target.value }) }
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
                          defaultValue={ state.currencyCode }
                          value={ state.currencyCode }
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
                          defaultValue={ state.currencyRate }
                          value={ state.currencyRate }
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
                        <Input hidden />
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
                                    <Input hidden />
                                    <Input className='smallInput' defaultValue={ el.sn } value={ el.sn } onChange={ e => changeDetail(idx, 'sn', e.target.value) } placeholder='Type SN here...' readOnly />
                                  </Form.Item>
                                }

                                {
                                  <Form.Item
                                    name="itemType"
                                    label="Type"
                                  >
                                    <Input className='smallInput' defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } placeholder='Insert type here...' readOnly />
                                  </Form.Item>
                                }

                                {
                                  <Form.Item
                                    name="UOM"
                                    label="UOM"
                                  >
                                    <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } placeholder='Type UOM here...' readOnly />
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
                                      <Input className='smallInput' defaultValue={ el.retnPrice } value={ el.retnPrice } onChange={ e => changeDetail(idx, 'retnPrice', e.target.value) } placeholder='Type Return Price here...' readOnly />
                                    </Form.Item>
                                  }


                                  {
                                    <Form.Item
                                      name="returnQty"
                                      label="Return Qty"
                                    >
                                      <Input type='number' className='smallInput' defaultValue={ el.retnQty } value={ el.retnQty } onChange={ e => changeDetail(idx, 'retnQty', e.target.value) } placeholder='Type Return Qty here...' />
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
                                        onSelect={ e => changeDetail(idx, 'retnType', e) }
                                        filterOption={ (inputValue, option) =>
                                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                      >
                                        <Option value="R1">R1 - FAILED QUALITY CHECK</Option>
                                        <Option value="R2">R2 - DAMAGES</Option>
                                        <Option value="R3">R3 - QUANTITY SHORTAGE</Option>
                                        <Option value="R4">R4 - QUANTITY ACCESS</Option>
                                        <Option value="R5">R5 - WRONG PARTS DELIVERED</Option>
                                        <Option value="R6">R6 - OTHER</Option>
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
                                        onSelect={ e => changeDetail(idx, 'retnAction', e) }
                                        filterOption={ (inputValue, option) =>
                                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                      >
                                        <Option value="A1">A1 - REWORK</Option>
                                        <Option value="A2">A2 - COLLECT AND REPLACE REJECTS</Option>
                                        <Option value="A3">A3 - COLLECT EXCESSIVE PARTS</Option>
                                        <Option value="A4">A4 - DELIVER SHORTAGE</Option>
                                        <Option value="A5">A5 - REJECT/ORDER CANCELLED</Option>
                                        <Option value="A6">A6 - CORRECTIVE ACTION</Option>
                                        <Option value="A7">A7 - OTHER</Option>
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
                                    <Input defaultValue={ el.itemNo } value={ el.itemNo } onChange={ e => changeDetail(idx, 'itemNo', e.target.value) } placeholder='Type item no here...' readOnly />
                                  </Form.Item>
                                }

                                {
                                  <Form.Item
                                    name="batchNo"
                                    label="Batch No"
                                  >
                                    <Input defaultValue={ el.batchNo } value={ el.batchNo } onChange={ e => changeDetail(idx, 'batchNo', e.target.value) } placeholder='Type batch no here...' readOnly />
                                  </Form.Item>
                                }

                                {
                                  <Form.Item
                                    name="Loc"
                                    label="Loc"
                                  >
                                    <Select
                                      className='normal' disabled={ id ? isDisabled : true }
                                      readOnly
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
                                    <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' readOnly />
                                  </Form.Item>
                                }

                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="Project No"
                                      label="Project No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } placeholder='Type Project No here...' readOnly />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="grnNo"
                                      label="GRN No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.grnNo } value={ el.grnNo } onChange={ e => changeDetail(idx, 'grnNo', e.target.value) } placeholder='Insert GRN No here...' readOnly />
                                    </Form.Item>
                                  }
                                </div>
                                <div className="dual">

                                  {
                                    <Form.Item
                                      name="mrvNo"
                                      label="MRV No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.mrvNo } value={ el.mrvNo } onChange={ e => changeDetail(idx, 'mrvNo', e.target.value) } placeholder='Insert MRV No here...' readOnly />
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

                        {/* <div className="actions">
                          {
                            idx !== 0 &&
                            <TiDelete color='red' size={ 30 } onClick={ () => deleteDetail(idx) } />
                          }
                          <MdAddCircle color='#1990ff' size={ 24 } onClick={ addNewDetail } />
                        </div> */}

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
