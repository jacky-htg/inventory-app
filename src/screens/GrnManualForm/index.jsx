import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message, Collapse, Menu, Dropdown, notification, Modal, Divider } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Lov, Location, Item } from '../../services';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import moment from 'moment';

import { Grn } from '../../services';
import { StyledDiv } from './styled';
import env from '../../env';
import { Images } from '../../constant';
import { parse } from 'postcss';
import GrnDetail from './components/GrnDetail';

const GrnManualForm = (props) => {
  const { Option } = Select;
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
  const [details, setDetails] = useState([
    {
      labelQty: 0,
      recdPrice: 0.0000,
      recdQty: 0
    }
  ]);
  const [locData, setLocData] = useState([]);
  const [locOpt, setLocOpt] = useState([]);
  const [itemCategoriesData, setItemCategoriesData] = useState([]);
  const [itemCategoriesOpt, setItemCategoriesOpt] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subCategoriesOpt, setSubCategoriesOpt] = useState([]);
  const [mslData, setMslData] = useState([]);
  const [mslOpt, setMslOpt] = useState([]);
  const [sourcesData, setSourcesData] = useState([]);
  const [sourcesOpt, setSourcesOpt] = useState([]);
  const [uomData, setUomData] = useState([]);
  const [uomOpt, setUomOpt] = useState([]);
  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isEdit, setIsEdit] = useState(query.get("edit") ? query.get('edit') === 'true' : false);
  const [isDisabled, setIsDisabled] = useState(id && !isEdit ? true : false);

  const [balbfQty, setBalbfQty] = useState(0);
  const [categoryCode, setCategoryCode] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categorySubCode, setCategorySubCode] = useState('');
  const [categorySubCodeName, setCategorySubCodeName] = useState('');
  const [description, setDescription] = useState('');
  const [dimension, setDimension] = useState('');
  const [issueNo, setIssueNo] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [leadtime, setLeadtime] = useState(0);
  const [loc, setLoc] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [mslCode, setMslCode] = useState('');
  const [mslCodeName, setMslCodeName] = useState('');
  const [obsoleteCode, setObsoleteCode] = useState('');
  const [obsoleteItem, setObsoleteItem] = useState('');
  const [openClose, setOpenClose] = useState('');
  const [orderQty, setOrderQty] = useState(0);
  const [partNo, setPartNo] = useState('');
  const [prodnResv, setProdnResv] = useState(0);
  const [productGroup, setProductGroup] = useState('');
  const [qoh, setQoh] = useState(0);
  const [qryObsItem, setQryObsItem] = useState('');
  const [refUrl, setRefUrl] = useState('');
  const [remarks, setRemarks] = useState('');
  const [reorder, setReorder] = useState(0);
  const [requestor, setRequestor] = useState('');
  const [rev, setRev] = useState('');
  const [rohsStatus, setRohsStatus] = useState(false);
  const [source, setSource] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [stdMaterial, setStdMaterial] = useState(0);
  const [storageShelf, setStorageShelf] = useState('');
  const [uom, setUom] = useState('');
  const [uomName, setUomName] = useState('');
  const [version, setVersion] = useState(0);

  const [grnNo, setGrnNo] = useState(null);
  const [msrNo, setMsrNo] = useState(null);
  const [doNo, setDoNo] = useState(null);
  const [subType, setSubType] = useState('M');
  const [orderNo, setOrderNo] = useState(null);
  const [projectNo, setProjectNo] = useState(null);

  const [timer, setTimer] = useState(null);


  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyRate, setCurrencyRate] = useState('');
  const [recdDate, setRecdDate] = useState('');
  const [entryUser, setEntryUser] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');

  useEffect(() => {
    if (id) {
      let data = Grn.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        setLoadingPage(false);
        result.grnNo && setGrnNo(result.grnNo);
        result.currencyRate && setCurrencyRate(result.currencyRate);
        result.currencyCode && setCurrencyCode(result.currencyCode);
        result.createdAt && setEntryDate(moment(result.createdAt).format('MM/DD/YYYY'));
        result.updatedAt && setRecdDate(moment(result.updatedAt).format('MM/DD/YYYY'));
        result.updatedAt && setUpdatedAt(moment(result.updatedAt).format('MM/DD/YYYY'));
        result.updatedBy && setUpdatedBy(result.updatedBy);
        result.entryUser && setEntryUser(result.entryUser);
        result.createdBy && setEntryUser(result.createdBy);
        result.subType && setSubType(result.subType);
        result.orderNo && setOrderNo(result.orderNo);
        result.projectNo && setProjectNo(result.projectNo);
        let arr = [];
        result.grnDetails && result.grnDetails.length > 0 && result.grnDetails.forEach(el => {
          arr.push(el);
        });
        console.log('arr :>> ', arr);
        setDetails([...arr]);

        console.log('updated byyyy', result, result.updatedBy, updatedAt, updatedBy);
      });
    }
  }, [id]);

  useEffect(() => {
    console.log('details :>> ', details);
  }, [details]);

  useEffect(() => {
    console.log('by up :>> ', updatedBy);
  }, [updatedBy]);



  useEffect(() => {
    let data = Location.list({});
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      console.log('location :>> ', result.rows);
      setLocData(result.rows);
      let temp = [];
      result.rows.forEach(el => {
        temp.push({
          value: el.loc
        });
      });
      setLocOpt(temp);
    });
  }, []);

  useEffect(() => {
    if (!id) {

      let data = Grn.getDefaultGRN();
      data.then(result => {
        console.log('result :>> ', result);
        // currencyCode: "USD";
        // currencyRate: 1;
        // entryDate: "2022-01-23T00:00:00.000+00:00";
        // entryUser: "tsagita";
        // grnNo: "GRM2022-00001";
        // recdDate: "2022-01-23T00:00:00.000+00:00";
        // statuz: "Y";
        // subType: "M"
        setGrnNo(result.grnNo);
        setCurrencyCode(result.currencyCode);
        setCurrencyRate(result.currencyRate);
        setEntryDate(result.entryDate);
        setEntryUser(result.entryUser);
        setRecdDate(result.recdDate);
        console.log('success');
      })
        .catch(err => console.log(err));
    }
  }, []);


  useEffect(() => {
    const data = Lov.getItemCategories();
    data.then(res => {
      console.log('getItemCategories :>> ', res);
      setItemCategoriesData(res);
      let temp = [];
      res.forEach(el => {
        temp.push({
          value: el.description,
          // code: el.code
        });
      });
      setItemCategoriesOpt(temp);
    });
  }, []);

  useEffect(() => {
    if (categoryCode) {
      console.log('categoryCode :>> ', categoryCode);
      const data = Lov.getSubCategories(categoryCode);
      data.then(res => {
        console.log('getSubCategories :>> ', res);
        setSubCategoriesData(res);
        let temp = [];
        res.forEach(el => {
          temp.push({
            value: el.subDescription,
            // code: el.code
          });
        });
        setSubCategoriesOpt(temp);
      });
    }
  }, [categoryCode]);

  useEffect(() => {
    if (subCategoriesData.length > 0 && id && categorySubCode) {
      subCategoriesData.forEach(el => {
        if (el.categorySubCode === categorySubCode) {
          setCategorySubCode(el.categorySubCode);
          setCategorySubCodeName(el.subDescription);
        }
      });
      setLoadingPage(false);
    }
  }, [subCategoriesData]);

  useEffect(() => {
    const data = Lov.getMsl();
    data.then(res => {
      console.log('getMsl :>> ', res);
      setMslData(res);
      let temp = [];
      res.forEach(el => {
        temp.push({
          value: el.subtypeDesc,
          // code: el.code
        });
      });
      setMslOpt(temp);
    });
  }, []);

  useEffect(() => {
    const data = Lov.getSources();
    data.then(res => {
      console.log('getSources :>> ', res);
      setSourcesData(res);
      let temp = [];
      res.forEach(el => {
        temp.push({
          value: el.codeDesc,
          // code: el.code
        });
      });
      setSourcesOpt(temp);
    });
  }, []);

  useEffect(() => {
    const data = Lov.getUOM();
    data.then(res => {
      console.log('getUOM :>> ', res);
      setUomData(res);
      let temp = [];
      res.forEach(el => {
        temp.push({
          value: el.codeDesc,
          // code: el.code
        });
      });
      setUomOpt(temp);
    });
  }, []);

  const onSelectCategoryCode = (data) => {
    itemCategoriesData.forEach(el => {
      if (el.description === data) {
        setCategoryCode(el.categoryCode);
        setCategoryName(el.description);
      }
    });
  };

  const onSelectSubCategoryCode = (data) => {
    subCategoriesData.forEach(el => {
      if (el.subDescription === data) {
        setCategorySubCode(el.categorySubCode);
        setCategorySubCodeName(el.subDescription);
      }
    });
  };

  const onSelectSource = (data) => {
    sourcesData.forEach(el => {
      if (el.codeDesc === data) {
        setSource(el.codeValue);
        setSourceName(el.codeDesc);
      }
    });
  };

  const onSelectMsl = (data) => {
    mslData.forEach(el => {
      if (el.subtypeDesc === data) {
        setMslCode(el.subType);
        setMslCodeName(el.subtypeDesc);
      }
    });
  };

  const onSelectUOM = (idx, data) => {
    uomData.forEach(el => {
      if (el.codeDesc === data) {
        setUom(el.codeValue);
        setUomName(el.codeDesc);
      }
    });
  };

  const changeDetail = (idx, field, value) => {
    console.log('idx :>> ', idx);
    console.log('field :>> ', field);
    console.log('value :>> ', value);

    let temp = [...details];
    temp[idx][field] = value;
    setDetails(temp);
    //console.log('details[idx] :>> ', details[idx]);
    //setDetails(details);
  };


  const submit = async () => {
    try {
      console.log(details);
      // const values = await form.validateFields();
      // console.log('Success:', values);
      details.map((e, i) => {
        details[i]["subType"] = "M";
        details[i]["grnNo"] = grnNo;
        details[i]["poPrice"] = parseFloat(e.recdPrice);
        details[i]["recdPrice"] = parseFloat(e.recdPrice);
        details[i]["recdDate"] = e.dueDate;
        details[i]["recdQty"] = parseInt(e.recdQty);
        details[i]["labelQty"] = parseInt(e.labelQty);
        details[i]["loc"] = e.loc;
        details[i]["seqNo"] = (i + 1);
      });

      console.log('details', details);

      let obj = {
        subType: 'M',
        grnNo,
        doNo,
        currencyCode,
        currencyRate,
        grnDetails: details
      };
      console.log('obj :>> ', obj);
      const hasil = await Grn.create(obj);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        // message.error(res.message);
        notification.error({
          message: res.message ? res.message : env.internalError,
        });
      } else {
        notification.success({
          message: 'Record successfully added',
        });
        showPrintModal();
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const addNewDetail = () => {
    let arr = [...details,
    {
      labelQty: 0.0000,
      recdPrice: 0.0000,
      recdQty: 0.0000
    }
    ];
    setDetails(arr);
  };

  const deleteDetail = (id) => {
    let arr = [...details];
    arr.splice(id, 1);
    setDetails(arr);
  };

  // const onSearchPress = () => {
  //   clearTimeout(timer);
  //   setTimer(setTimeout(getPeople, 1000));
  // }

  const onSearchPress = (idx, field, value) => {
    let tempDetails = [...details];
    console.log('idx, field, value :>> ', idx, field, value);
    clearTimeout(timer);
    tempDetails[idx]["recdQty"] = 1;
    tempDetails[idx]["labelQty"] = 1;
    tempDetails[idx][field] = value;
    // setDetails(temp);
    let body = {
      "subType": "M",
      "grnDetails": details
      // [
      // {
      //   "itemType": 0,
      //   "itemNo": "801-10033-04",
      //   "projectNo": "PR2019-00017",
      //   "poNo": "100014-2019"
      // }
      // ]
    };
    setTimer(setTimeout(() => {
      console.log('body :>> ', body);
      let data = Grn.checkNewItem(body);
      data.then(res => {
        console.log('res checkNewItem :>> ', res);
        tempDetails[idx] = {
          ...tempDetails[idx],
          ...res
        };
        setDetails(tempDetails);
      });
    }, 1500));
    // Grn.checkNewItem();
  };

  const checkRequiredDetail = idx => {
    let detail = details[idx];
    console.log('detail :>> ', detail);
    if (
      detail.recdPrice &&
      detail.recdQty &&
      detail.qtyLabel
    ) {
      console.log('sini');
      return true;
    }
    console.log('sono');

    return false;
  };

  const printReport = (key) => {
    console.log('key :>> ', key);
    let params = {};
    if (key === 'GRN') {
      params.grnNo = grnNo;
      params.subType = subType;
      params.type = 'GRN';
    } else if (key === 'pickList') {
      params.grnNo = grnNo;
      params.subType = subType;
      params.orderNo = orderNo;
      params.projectNo = projectNo;
    } else if (key === 'label') {
      params.grnNo = grnNo;
    }
    console.log(params);
    let data = key === 'GRN' ? Grn.printReportGRN(params) : key === 'pickList' ? Grn.printPickList(params) : Grn.printLabel(params);
    data.then(result => result.blob('application/pdf'))
      .then(blob => {
        return URL.createObjectURL(blob);
      })
      .then((href) => {
        console.log('href :>> ', href);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = href;
        a.download = `${ grnNo }-${ key === 'GRN' ? 'report' : key === 'pickList' ? 'picklist' : 'label' }.pdf`;
        a.click();
      })
      .catch(err => console.log('err :>> ', err));
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <span onClick={ () => printReport('GRN') }>Report GRN</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={ () => printReport('pickList') }>Pick List</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={ () => printReport('label') }>Label</span>
      </Menu.Item>
    </Menu>
  );

  const showPrintModal = () => {
    Modal.info({
      title: 'Do you want to print ?',
      content: (
        <div style={ { display: 'grid', marginLeft: '0px !important', gridTemplateRows: 'auto auto auto', gridGap: '20px' } }>
          <Button onClick={ () => printReport('GRN') } type="primary">
            Print Report GRN
          </Button>
          <Button onClick={ () => printReport('pickList') } type="primary">
            Print Pick List
          </Button>
          <Button onClick={ () => printReport('label') } type="primary">
            Print Label
          </Button>
        </div>
      ),
      okText: 'No',
      onOk: () => history.push('/grn-manuals'),
    });
  };

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
        <h2>{ `Manual GRN ${ !id ? 'Entry' : '' }` }</h2>
      </div>
      <div className="formWrapper">
        {
          loadingPage
            ?
            <div className="loading">
              <img src={ Images.loading } alt="" />
            </div>
            :
            <Form form={ form } name="control-hooks" scrollToFirstError>
              <div className="group">
                <div className="row2">
                  <Form.Item
                    name="GRN No"
                    label="GRN No"
                  >
                    <Input hidden />
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ grnNo }
                      defaultValue={ grnNo }
                      readOnly
                    />
                  </Form.Item>

                  <Form.Item
                    name="Currency Code"
                    label="Currency Code"
                  >
                    <Input hidden />
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ currencyCode }
                      defaultValue={ currencyCode }
                      readOnly
                    />
                  </Form.Item>

                  <Form.Item
                    name="Recd Date"
                    label="Recd Date"
                  >
                    <Input hidden />
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ recdDate }
                      defaultValue={ recdDate }
                      readOnly
                    />
                  </Form.Item>
                </div>

                <div className="row2">
                  <Form.Item
                    name="MSR No"
                    label="MSR No"
                  >
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ msrNo }
                      defaultValue={ msrNo }
                    />
                  </Form.Item>

                  <Form.Item
                    name="Currency Rate"
                    label="Currency Rate"
                  >
                    <Input hidden />
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ currencyRate }
                      defaultValue={ currencyRate }
                      readOnly
                    />
                  </Form.Item>

                  <Form.Item
                    name="Entry User"
                    label="Entry User"
                  >
                    <Input hidden />
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ entryUser }
                      defaultValue={ entryUser }
                      readOnly
                    />
                  </Form.Item>
                </div>

                <div className="row2">
                  <Form.Item
                    name="DO No"
                    label="DO No"
                  >
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ doNo }
                      defaultValue={ doNo }
                    />
                  </Form.Item>


                  <Form.Item></Form.Item>

                  <Form.Item
                    name="Entry Date"
                    label="Entry Date"
                  >
                    <Input hidden />
                    <Input
                      className='normal' disabled={ isDisabled }
                      value={ entryDate }
                      defaultValue={ entryDate }
                      readOnly
                    />
                  </Form.Item>
                </div>
                { id &&
                  <div className="row2">
                    <Form.Item
                      name="UpdatedBy"
                      label="Updated By"
                      initialValue={ updatedBy }
                    >
                      <Input hidden />
                      <Input
                        className='normal' disabled={ isDisabled }
                        value={ updatedBy }
                        defaultValue={ updatedBy }
                      />
                    </Form.Item>


                    <Form.Item
                      name="lastUpdatedAt"
                      label="Last Updated At"
                      initialValue={ updatedAt }
                    >
                      <Input hidden />
                      <Input
                        className='normal' disabled={ isDisabled }
                        value={ updatedAt }
                        defaultValue={ updatedAt }
                        readOnly
                      />
                    </Form.Item>
                  </div> }


              </div>

              <div className="detail-wrapper">
                {
                  details.map((el, idx) => {
                    return (
                      <GrnDetail
                        id={ id }
                        el={ el }
                        idx={ idx }
                        uomOpt={ uomOpt }
                        locOpt={ locOpt }
                        changeDetail={ changeDetail }
                        addNewDetail={ addNewDetail }
                        deleteDetail={ deleteDetail }
                        onSearchPress={ onSearchPress }
                        details={ details }
                      />
                    );
                  })
                }
              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/grn-manuals`) } type="default" htmlType="submit">
                    Back To GRN
                  </Button>
                  
                  <Divider type='vertical' />

                  {
                    (!id || isEdit) &&
                    <Button onClick={ submit } type="primary" htmlType="submit">
                      {
                        isEdit
                          ?
                          "Edit GRN"
                          :
                          "Create GRN"
                      }
                    </Button>
                  }

                  {
                    id &&
                    <Dropdown overlay={ menu } placement="topRight">
                      <Button>Print</Button>
                    </Dropdown>
                  }

                </Form.Item>
              </div>
            </Form>
        }
      </div >
    </StyledDiv >
  );
};

export default GrnManualForm;
