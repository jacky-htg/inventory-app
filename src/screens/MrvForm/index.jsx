import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Divider } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Location, Mrv } from '../../services';
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
      let data = Mrv.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        setLoadingPage(false);
        setState(result);

        let arr = [];
        result.mrvDetails && result.mrvDetails.length > 0 && result.mrvDetails.forEach(el => {
          arr.push(el);
        });
        console.log('arr :>> ', arr);
        setDetails([...arr]);
      });
    }
  }, [id]);

  useEffect(() => {
    let data = Mrv.getMrvNo();
    data.then(result => {
      console.log('result :>> ', result);
      setState({
        ...state,
        mrvNo: result.generatedNo,
        entryUser: env.username
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

  const populateBySiv = async (data) => {
    console.log('data :>> ', data.target.value);
    if (data.target.value.length > 0) {
      const siv = await Mrv.populateBySivNo(data.target.value);
      if (siv.ok !== undefined && !siv.ok) {
        const res = await siv.data;
        message.error(res.message ? res.message : env.internalError);
      } else {
        console.log('getSupplierByGrnNo result :>> ', grn);
        setDetails(siv.mrvDetails);
        const temp = [];
        siv.msrDetails.map((el, index) => {
          el.sn = index + 1;
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
      details.map((e, i) => {
        details[i]["seqNo"] = (i + 1);
        details[i]['mrvNo'] = state.mrvNo;
      });

      console.log('details', details);
      console.log('state :>> ', state);
      let obj = {
        "mrvDetails": details,
        "mrvNo": state.mrvNo
      };
      console.log('obj :>> ', obj);
      const hasil = await Mrv.create(obj);
      console.log('hasil :>> ', hasil);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        message.error(res.message ? res.message : env.internalError);
      } else {
        history.push('/msr');
        message.success("Record successfully added");
      }
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
        <h2>MRV Entry (WIP Stock Return)</h2>
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
                  <Form.Item
                    name="mrvNo"
                    label="MRV No"
                  >
                    <Input hidden/>
                    <Input
                      className='normal' disabled={ isDisabled }
                      defaultValue={ state.mrvNo }
                      value={ state.mrvNo }
                      readOnly
                    />
                  </Form.Item>

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

                  <Form.Item
                    name="entryUser"
                    label="Entry User"
                  >
                    <Input hidden/>
                    <Input
                      className='normal' disabled={ isDisabled }
                      defaultValue={ state.entryUser }
                      value={ state.entryUser }
                      readOnly
                    />
                  </Form.Item>
                </div>

                <div className="row2">
                  <Form.Item
                    name="sivNo"
                    label="SIV No"
                  >
                    <Input
                      className='normal' disabled={ isDisabled }
                      defaultValue={ state.sivNo }
                      value={ state.sivNo }
                      onBlur={populateBySiv}
                    />
                  </Form.Item>

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
                                    <Input className='smallInput' defaultValue={ el.sn } value={ el.sn } onChange={ e => changeDetail(idx, 'sn', e.target.value) } readOnly />
                                  </Form.Item>
                                }

                                {
                                  <Form.Item
                                    name="itemType"
                                    label="Type"
                                  >
                                    <Input className='smallInput' defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } readOnly />
                                  </Form.Item>
                                }

                                {
                                  <Form.Item
                                    name="UOM"
                                    label="UOM"
                                  >
                                    <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } readOnly />
                                  </Form.Item>
                                }
                              </div>
                              <div className="row2">
                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="recdPrice"
                                      label="Recd Price"
                                    >
                                      <Input className='smallInput' defaultValue={ el.recdPrice } value={ el.recdPrice } onChange={ e => changeDetail(idx, 'recdPrice', e.target.value) } readOnly />
                                    </Form.Item>
                                  }


                                  {
                                    <Form.Item
                                      name="recdQty"
                                      label="Recd Qty"
                                    >
                                      <Input type='number' className='smallInput' defaultValue={ el.recdQty } value={ el.recdQty } onChange={ e => changeDetail(idx, 'recdQty', e.target.value) }  />
                                    </Form.Item>
                                  }
                                </div>

                                <div className="dual">
                                  
                                </div>
                              </div>

                              <div className="row2">

                                {
                                  <Form.Item
                                    name="itemNo"
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
                                    name="partNo"
                                    label="Part No"
                                  >
                                    <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' readOnly />
                                  </Form.Item>
                                }

                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="projectNo"
                                      label="Project No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } placeholder='Type Project No here...' readOnly />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="sivNo"
                                      label="SIV No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.sivNo } value={ el.sivNo } onChange={ e => changeDetail(idx, 'sivNo', e.target.value) } readOnly />
                                    </Form.Item>
                                  }
                                </div>
                                <div className="dual">

                                  {
                                    <Form.Item
                                      name="refNo"
                                      label="Ref No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.refNo } value={ el.refNo } onChange={ e => changeDetail(idx, 'refNo', e.target.value) } readOnly />
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
                <Button onClick={ () => history.push(`/mrv`) } type="default" htmlType="submit">
                  Back To MRV
                </Button>
                { !id && <Divider type='vertical' /> }
                {
                  !id &&
                  <Button onClick={ submit } type="primary" htmlType="submit">
                    Create MRV
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
