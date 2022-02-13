import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message, Collapse, Menu, Dropdown } from 'antd';
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
    {}
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
  const [subType, setSubType] = useState(null);
  const [orderNo, setOrderNo] = useState(null);
  const [projectNo, setProjectNo] = useState(null);

  const [timer, setTimer] = useState(null);


  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyRate, setCurrencyRate] = useState('');
  const [recdDate, setRecdDate] = useState('');
  const [entryUser, setEntryUser] = useState('');
  const [entryDate, setEntryDate] = useState('');

  useEffect(() => {
    if (id) {
      let data = Grn.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        setLoadingPage(false);
        result.grnNo && setGrnNo(result.grnNo);
        result.currencyRate && setCurrencyRate(result.currencyRate);
        result.currencyCode && setCurrencyCode(result.currencyCode);
        result.createdAt && setEntryDate(result.createdAt);
        result.updatedAt && setRecdDate(result.updatedAt);
        result.entryUser && setEntryUser(result.entryUser);
        result.subType && setSubType(result.subType);
        result.orderNo && setOrderNo(result.orderNo);
        result.projectNo && setProjectNo(result.projectNo);
        let arr = [];
        result.grnDetails && result.grnDetails.length > 0 && result.grnDetails.forEach(el => {
          arr.push(el);
        });
        console.log('arr :>> ', arr);
        setDetails([...arr]);
      });
    }
  }, [id]);

  useEffect(() => {
    console.log('details :>> ', details);
  }, [details]);



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


  /*const submit = async () => {
    try {
      if (!isEdit) {
        const values = await form.validateFields();
        console.log('Success:', values);
      }
      let obj = {
        balbfQty: parseInt(balbfQty),
        categoryCode,
        categorySubCode,
        description,
        dimension,
        issueNo,
        itemNo,
        leadtime: parseInt(leadtime),
        loc,
        manufacturer,
        mslCode,
        // obsoleteCode,
        obsoleteItem,
        // openClose,
        orderQty: parseInt(orderQty),
        partNo,
        prodnResv: parseInt(prodnResv),
        productGroup,
        qoh: parseInt(qoh),
        qryObsItem,
        refUrl,
        remarks,
        reorder: parseInt(reorder),
        // requestor,
        rev,
        rohsStatus,
        source,
        // status,
        stdMaterial: parseInt(stdMaterial),
        storageShelf,
        uom,
        // version: parseInt(version),
      };
      console.log('obj :>> ', obj);
      if (isEdit) {
        obj.version = parseInt(version);
        Item.edit(id, obj);
      } else {
        Item.create(obj);
      }
      history.push('/grn-manuals');
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };*/

  const submit = async () => {
    try {
      console.log(details);
      // const values = await form.validateFields();
      // console.log('Success:', values);
      details.map((e, i) => {
        details[i]["subType"] = "M";
        details[i]["grnNo"] = grnNo;
        details[i]["poPrice"] = e.recdPrice;
        details[i]["recdDate"] = e.dueDate;
        details[i]["loc"] = "TE";
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
        message.error(res.message);
      }

      history.push('/grn-manuals');
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

  // const onSearchPress = () => {
  //   clearTimeout(timer);
  //   setTimer(setTimeout(getPeople, 1000));
  // }

  const onSearchPress = (idx, field, value) => {
    console.log('idx, field, value :>> ', idx, field, value);
    clearTimeout(timer);
    let temp = [...details];
    temp[idx][field] = value;
    setDetails(temp);
    let body = {
      "msrNo": msrNo,
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
                  {
                    !grnNo && id && !isEdit
                      ?
                      <></>
                      :
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
                  }

                  {
                    !currencyCode && id && !isEdit
                      ?
                      <></>
                      :
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
                  }

                  {
                    !recdDate && id && !isEdit
                      ?
                      <></>
                      :
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
                  }
                </div>

                <div className="row2">
                  {
                    !msrNo && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="MSR No"
                        label="MSR No"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          value={ msrNo }
                          defaultValue={ msrNo }
                          placeholder='Type MSR No here...'
                        />
                      </Form.Item>
                  }

                  {
                    !currencyRate && id && !isEdit
                      ?
                      <></>
                      :
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
                  }

                  {
                    !currencyCode && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="Entry User"
                        label="Entry User"
                      >
                        <Input hidden />
                        <Input
                          className='normal' disabled={ isDisabled }
                          value={ currencyCode }
                          defaultValue={ currencyCode }
                          readOnly
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    !doNo && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="DO No"
                        label="DO No"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          value={ doNo }
                          defaultValue={ doNo }
                          placeholder='Type Do No here...'
                        />
                      </Form.Item>
                  }


                  <Form.Item></Form.Item>

                  {
                    !entryDate && id && !isEdit
                      ?
                      <></>
                      :
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
                  }
                </div>
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

              {
                (!id || isEdit) &&
                <div className="submit">
                  <Form.Item>
                    <Button onClick={ submit } type="primary" htmlType="submit">
                      {
                        isEdit
                          ?
                          "Edit GRN"
                          :
                          "Create GRN"
                      }
                    </Button>
                  </Form.Item>
                </div>
              }

              {
                id &&
                <div className="submit">
                  <Form.Item>
                    <Dropdown overlay={ menu } placement="topRight">
                      <Button>Print</Button>
                    </Dropdown>
                  </Form.Item>
                </div>
              }

              {
                <div className="submit">
                  <Form.Item>
                    <Button onClick={ () => history.push(`/grn-manuals`) } type="default" htmlType="submit">
                      Back To GRN
                    </Button>
                  </Form.Item>
                </div>
              }
            </Form>
        }
      </div >
    </StyledDiv >
  );
};

export default GrnManualForm;
