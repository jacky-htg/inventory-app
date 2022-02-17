import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, message, Divider } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Location, Msr, Siv } from '../../services';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

import { StyledDiv } from './styled';
import { Images } from '../../constant';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import Collapsible from "react-collapsible";

const PageForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
  const [state, setState] = useState({
    projectNo: null,
  });
  const [details, setDetails] = useState([]);

  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isDisabled, setIsDisabled] = useState(id ? true : false);

  const [locOpt, setLocOpt] = useState([]);
  const [projectNoOption, setProjectNoOption] = useState([]);


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

  useEffect(() => {
    let data = Siv.getDefaultValue({ subType: 'N' });
    data.then(result => {
      console.log('result :>> ', result);
      setState({
        ...state,
        currencyCode: result.currencyCode,
        currencyRate: result.currencyRate,
        entryDate: result.entryDate,
        entryUser: result.entryUser,
        status: result.statuz,
        subType: result.subType
      });
    });
  }, []);

  useEffect(() => {
    let data = Siv.getProjectNo();
    data.then(result => {
      let temp = [];
      result.forEach(el => {
        console.log('el :>> ', el);
        temp.push({ value: el.projectNo });
      });
      setProjectNoOption(temp);
    });
  }, []);

  useEffect(() => {
    if (state.projectNo) {
      let data = Siv.getSivNo({ 'projectNo': state.projectNo, subType: 'N' });
      data.then(result => {
        console.log('result sivNo :>> ', result);
        if (result.generatedNo) {
          setState({ ...state, sivNo: result.generatedNo, docmNo: result.docmNo });
        }
      });

      let data2 = Siv.populateDetail({ 'projectNo': state.projectNo });
      data2.then(result => {
        console.log('result items :>> ', result);
      });
    }
  }, [state.projectNo]);



  useEffect(() => {
    if (state) {
      console.log('state :>> ', state);
    }
  }, [state]);


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
      const hasil = await Siv.create(obj);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        message.error(res.message);
      }

      history.push('/siv');
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
        <h2>SIV Entry</h2>
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
                    !state.projectNo && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="projectNo"
                        label="Project No"
                      >
                        {/* <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.projectNo }
                          value={ state.projectNo }
                          readOnly
                        /> */}
                        <Input hidden />
                        <Select
                          showSearch
                          allowClear
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.projectNo }
                          value={ state.projectNo }
                          options={ projectNoOption }
                          onSelect={ data => setState({ ...state, projectNo: data }) }
                          placeholder={ "Type Project No here..." }
                          filterOption={ (inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                  }

                  {
                    !state.currencyCode && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="ccyCodeRate"
                        label="Ccy Code / Rate"
                      >
                        <Input
                          className='normal smallInput2' disabled={ isDisabled }
                          defaultValue={ state.currencyCode }
                          value={ state.currencyCode }
                          readOnly
                        />
                        <span className='divider'>/</span>
                        <Input
                          className='normal smallInput2' disabled={ isDisabled }
                          defaultValue={ state.currencyRate }
                          value={ state.currencyRate }
                          readOnly
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
                    !state.sivNo && id
                      ?
                      <></>
                      :
                      <Form.Item
                        name="sivNo"
                        label="SIV No"
                      >
                        <Input hidden />
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.sivNo }
                          value={ state.sivNo }
                          readOnly
                        />
                        {/* <Select
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.sivNo }
                          value={ state.sivNo }
                        >
                          <Option>PR</Option>
                          <Option>DS</Option>
                          <Option>WD</Option>
                          <Option>OTHER</Option>
                        </Select> */}
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
                          defaultValue="O"
                          value="O"
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
                        <Input hidden />
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ state.entryDate }
                          value={ state.entryDate }
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
                        <Checkbox />
                        <div className="border">
                          <Collapsible trigger={ `Serial Number: ${ idx + 1 }` }>
                            <div className="inputs">
                              <div className="row2">
                                <div className="dual">
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
                                </div>

                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="itemNo"
                                      label="Item No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.itemNo } value={ el.itemNo } onChange={ e => changeDetail(idx, 'itemNo', e.target.value) } placeholder='Type Item No here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="partNo"
                                      label="Part No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' />
                                    </Form.Item>
                                  }
                                </div>

                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="batchNo"
                                      label="Batch No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.batchNo } value={ el.batchNo } onChange={ e => changeDetail(idx, 'batchNo', e.target.value) } placeholder='Type Batch No here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="uom"
                                      label="UOM"
                                    >
                                      <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } placeholder='Type UOM here...' />
                                    </Form.Item>
                                  }
                                </div>

                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="refNo"
                                      label="Ref No"
                                    >
                                      <Input className='smallInput' defaultValue={ el.refNo } value={ el.refNo } onChange={ e => changeDetail(idx, 'refNo', e.target.value) } placeholder='Type Ref No here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="refType"
                                      label="Ref Type"
                                    >
                                      <Input className='smallInput' defaultValue={ el.refType } value={ el.refType } onChange={ e => changeDetail(idx, 'refType', e.target.value) } placeholder='Type Ref Type here...' />
                                    </Form.Item>
                                  }
                                </div>

                                {
                                  <Form.Item
                                    name="remarks"
                                    label="Remark"
                                  >
                                    <TextArea defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } />
                                  </Form.Item>
                                }
                              </div>
                              <div className="row2">
                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="projectNo1"
                                      label="Project No 1"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo1 } value={ el.projectNo1 } onChange={ e => changeDetail(idx, 'projectNo1', e.target.value) } placeholder='Type Project No 1 here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="projectNo2"
                                      label="Project No 2"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo2 } value={ el.projectNo2 } onChange={ e => changeDetail(idx, 'projectNo2', e.target.value) } placeholder='Type Project No 2 here...' />
                                    </Form.Item>
                                  }
                                </div>
                                <div className="dual">

                                  {
                                    <Form.Item
                                      name="projectNo3"
                                      label="Project No 3"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo3 } value={ el.projectNo3 } onChange={ e => changeDetail(idx, 'projectNo3', e.target.value) } placeholder='Type Project No 3 here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="projectNo4"
                                      label="Project No 4"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo4 } value={ el.projectNo4 } onChange={ e => changeDetail(idx, 'projectNo4', e.target.value) } placeholder='Type Project No 4 here...' />
                                    </Form.Item>
                                  }
                                </div>
                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="projectNo5"
                                      label="Project No 5"
                                    >
                                      <Input className='smallInput' defaultValue={ el.projectNo5 } value={ el.projectNo5 } onChange={ e => changeDetail(idx, 'projectNo5', e.target.value) } placeholder='Type Project No 5 here...' />
                                    </Form.Item>
                                  }
                                </div>
                              </div>
                              <div className="row2">
                                <div className="dual">
                                  {
                                    <Form.Item
                                      name="issuedQty"
                                      label="Issued Qty"
                                    >
                                      <Input className='smallInput' defaultValue={ el.issuedQty } value={ el.issuedQty } onChange={ e => changeDetail(idx, 'issuedQty', e.target.value) } placeholder='Type issueed Qty here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="issuedQty1"
                                      label="Issued Qty 1"
                                    >
                                      <Input className='smallInput' defaultValue={ el.issuedQty1 } value={ el.issuedQty1 } onChange={ e => changeDetail(idx, 'issuedQty1', e.target.value) } placeholder='Type issueed Qty 1 here...' />
                                    </Form.Item>
                                  }
                                </div>
                                <div className="dual">

                                  {
                                    <Form.Item
                                      name="issuedQty2"
                                      label="Issued Qty 2"
                                    >
                                      <Input className='smallInput' defaultValue={ el.issuedQty2 } value={ el.issuedQty2 } onChange={ e => changeDetail(idx, 'issuedQty2', e.target.value) } placeholder='Type issueed Qty 2 here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="issuedQty3"
                                      label="Issued Qty 3"
                                    >
                                      <Input className='smallInput' defaultValue={ el.issuedQty3 } value={ el.issuedQty3 } onChange={ e => changeDetail(idx, 'issuedQty3', e.target.value) } placeholder='Type issueed Qty 3 here...' />
                                    </Form.Item>
                                  }
                                </div>
                                <div className="dual">

                                  {
                                    <Form.Item
                                      name="issuedQty4"
                                      label="Issued Qty 4"
                                    >
                                      <Input className='smallInput' defaultValue={ el.issuedQty4 } value={ el.issuedQty4 } onChange={ e => changeDetail(idx, 'issuedQty4', e.target.value) } placeholder='Type issueed Qty 4 here...' />
                                    </Form.Item>
                                  }

                                  {
                                    <Form.Item
                                      name="issuedQty5"
                                      label="Issued Qty 5"
                                    >
                                      <Input className='smallInput' defaultValue={ el.issuedQty5 } value={ el.issuedQty5 } onChange={ e => changeDetail(idx, 'issuedQty5', e.target.value) } placeholder='Type issueed Qty 5 here...' />
                                    </Form.Item>
                                  }
                                </div>
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
                <Button onClick={ () => history.push(`/siv`) } type="default" htmlType="submit">
                  Back To SIV List
                </Button>
                { !id && <Divider type='vertical' /> }
                {
                  !id &&
                  <Button onClick={ submit } type="primary" htmlType="submit">
                    Create SIV Entry
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
