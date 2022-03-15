import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message, Menu, Dropdown, notification, Modal, InputNumber } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import Collapsible from "react-collapsible";
import moment from 'moment';

import { Grn, Location } from '../../services';
import { StyledDiv } from './styled';
import env from '../../env';
import { Images } from '../../constant';
import { parse } from 'postcss';

const GrnWithPoForm = (props) => {
  const { TextArea } = Input;
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
  const [details, setDetails] = useState([]);
  const [tempDetails, setTempDetails] = useState([]);
  const [locData, setLocData] = useState([]);
  const [locOpt, setLocOpt] = useState([]);
  // const [itemCategoriesData, setItemCategoriesData] = useState([]);
  // const [itemCategoriesOpt, setItemCategoriesOpt] = useState([]);
  // const [subCategoriesData, setSubCategoriesData] = useState([]);
  // const [subCategoriesOpt, setSubCategoriesOpt] = useState([]);
  // const [mslData, setMslData] = useState([]);
  // const [mslOpt, setMslOpt] = useState([]);
  // const [sourcesData, setSourcesData] = useState([]);
  // const [sourcesOpt, setSourcesOpt] = useState([]);
  // const [uomData, setUomData] = useState([]);
  // const [uomOpt, setUomOpt] = useState([]);
  const [grnNo, setGrnNo] = useState('');
  const [poNo, setPoNo] = useState();
  const [supplierCode, setSupplierCode] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyRate, setCurrencyRate] = useState('');
  const [recdDate, setRecdDate] = useState('');
  const [poRemarks, setPoRemarks] = useState('');
  const [buyer, setBuyer] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [doNo, setDoNo] = useState('');
  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isDisabled, setIsDisabled] = useState(id ? true : false);
  const [poNoOpt, setPoNoOpt] = useState([]);
  const [subType, setSubType] = useState('N');
  const [orderNo, setOrderNo] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [isPoNoClosed, setIsPoNoClosed] = useState();
  const [partOpt, setPartOpt] = useState([]);
  const [itemOpt, setItemOpt] = useState([]);
  const [updatedBy, setUpdatedBy] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const [parts, setParts] = useState([]);

  /*const [balbfQty, setBalbfQty] = useState(0);
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
  const [version, setVersion] = useState(0); */

  /*useEffect(() => {
    if (
      id &&
      locData.length > 0 &&
      itemCategoriesData.length > 0 &&
      mslData.length > 0 &&
      sourcesData.length > 0 &&
      uomData.length > 0
    ) {
      const data = Item.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        // if (result.status && result.status !== 200) {
        //   message.error(result.error);
        // } else {
        result.balbfQty && setBalbfQty(result.balbfQty);
        result.categoryCode && setCategoryCode(result.categoryCode);
        if (result.categoryCode) {
          itemCategoriesData.forEach(el => {
            if (el.categoryCode === result.categoryCode) {
              setCategoryCode(el.categoryCode);
              setCategoryName(el.description);
            }
          });
        }
        result.categorySubCode && setCategorySubCode(result.categorySubCode);
        // get and set subCategories later
        result.description && setDescription(result.description);
        result.categoryCode && setCategoryCode(result.categoryCode);
        result.dimension && setDimension(result.dimension);
        // result.eoh && setEoh(result.categoryCode);
        result.issueNo && setIssueNo(result.issueNo);
        result.itemNo && setItemNo(result.itemNo);
        result.leadtime && setLeadtime(result.leadtime);
        result.loc && setLoc(result.loc);
        result.manufacturer && setManufacturer(result.manufacturer);
        result.mslCode && setMslCode(result.mslCode);
        if (result.mslCode) {
          mslData.forEach(el => {
            if (el.subType === result.mslCode) {
              setMslCode(el.subType);
              setMslCodeName(el.subtypeDesc);
            }
          });
        }
        result.orderQty && setOrderQty(result.orderQty);
        result.mslCode && setMslCode(result.mslCode);
        result.partNo && setPartNo(result.partNo);
        result.prodnResv && setProdnResv(result.prodnResv);
        result.productGroup && setProductGroup(result.productGroup);
        result.qoh && setQoh(result.qoh);
        result.refUrl && setRefUrl(result.refUrl);
        result.remarks && setRemarks(result.remarks);
        result.reorder && setReorder(result.reorder);
        result.rev && setRev(result.rev);
        result.rohsStatus && setRohsStatus(result.rohsStatus);
        result.source && setSource(result.source);
        if (result.source) {
          sourcesData.forEach(el => {
            if (el.codeValue === result.source) {
              setSource(el.codeValue);
              setSourceName(el.codeDesc);
            }
          });
        }
        result.source && setSource(result.source);
        result.status && setStatus(result.status);
        result.stdMaterial && setStdMaterial(result.stdMaterial);
        result.uom && setUom(result.uom);
        result.version && setVersion(result.version);

        if (!result.categorySubCode) {
          setLoadingPage(false);
        }


        // balbfQty: 1;
        // categoryCode: "105";
        // categorySubCode: "0";
        // description: "Test desc";
        // dimension: "100";
        // eoh: 1;
        // issueNo: "123-123";
        // itemNo: "25-25251";
        // leadtime: 1;
        // loc: "TDK";
        // manufacturer: "3M";
        // mslCode: "6";
        // orderQty: 1;
        // partNo: "MP2-HP10-51S1-TR33";
        // prodnResv: 0;
        // productGroup: "test group";
        // qoh: 0;
        // refUrl: "www.test.com";
        // remarks: "Test Remark";
        // reorder: 10;
        // rev: "tes";
        // rohsStatus: true;
        // source: "B";
        // status: "ACTIVE";
        // stdMaterial: 100;
        // uom: "CTN";
        // version: 0
        // }
      });
    }
  }, [id, locData, itemCategoriesData, mslData, sourcesData, uomData]); */

  useEffect(() => {
    let data = Location.list({});
    data.then(result => {
      console.log('location :>> ', result.rows);
      setLocData(result.rows);

      let temp = [];
      result.rows.forEach(el => {
        temp.push(<Option key={ el.loc } value={ el.loc } >{ el.loc }</Option>);
      });
      setLocOpt(temp);
    });
  }, []);

  useEffect(() => {
    if (id) {
      let data = Grn.view(id);
      data.then(result => {
        console.log('result :>> ', result);
        result.currencyCode && setCurrencyCode(result.currencyCode);
        result.currencyRate && setCurrencyRate(result.currencyRate);
        result.grnNo && setGrnNo(result.grnNo);
        result.poNo && setPoNo(result.poNo);
        result.supplierCode && setSupplierCode(result.supplierCode);
        result.subType && setSubType(result.subType);
        result.recdDate && setRecdDate(moment(result.recdDate).format('MM/DD/YYYY'));
        result.updatedBy && setUpdatedBy(result.updatedBy);
        result.updatedAt && setUpdatedAt(moment(result.updatedAt).format('MM/DD/YYYY'));

        let arr = [];
        result.grnDetails && result.grnDetails.length > 0 && result.grnDetails.forEach(el => {
          arr.push(el);
        });
        console.log('arr :>> ', arr);
        setDetails(arr);


        // createdAt: "2022-01-24T13:16:43.702248Z";
        // createdBy: "tsagita";
        // currencyCode: "USD";
        // currencyRate: 1;
        // grnDetails: [{… }];
        // grnNo: "GRN2022-00004";
        // id: 48;
        // poNo: "100044-2021";
        // status: "ACTIVE";
        // subType: "N";
        // supplierCode: "DSE01";
        // updatedAt: "2022-01-24T13:16:43.702253Z";
        // updatedBy: "tsagita";
        // version: 0
        setLoadingPage(false);
      });
    }
  }, [id]);


  useEffect(() => {
    let data = Grn.pono();
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      let temp = [];
      result.forEach(el => {
        temp.push({
          value: el.poNo
        });
      });
      setPoNoOpt(temp);
    });
  }, []);

  useEffect(async () => {
    if (poNo && !id) {
      setGrnNo('');
      setSupplierCode('');
      setCurrencyCode('');
      setCurrencyRate('');
      setRecdDate('');
      setPoRemarks('');
      setBuyer('');
      setDetails([]);
      setParts([]);
      setIsPoNoClosed(false);
      try {
        const hasil = await Grn.headerByPono(poNo);
        console.log('hasil :>> ', hasil);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          setParts([]);
          setDetails([]);
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
          console.log('res.message :>> ', res.message);
          if (res.message === 'PO already Closed, Purchase Receipt not allowed.') {
            setIsPoNoClosed(true);
            setParts([]);
            setDetails([]);
          }
          // message.error(res.message ? res.message : env.internalError);
        } else {
          hasil.grnNo && setGrnNo(hasil.grnNo);
          hasil.supplierCode && setSupplierCode(hasil.supplierCode);
          hasil.currencyCode && setCurrencyCode(hasil.currencyCode);
          hasil.currencyRate && setCurrencyRate(hasil.currencyRate);
          hasil.recdDate && setRecdDate(moment(hasil.recdDate).format('MM/DD/YYYY'));
          hasil.poRemarks && setPoRemarks(hasil.poRemarks);
          hasil.orderNo && setOrderNo(hasil.orderNo);
          hasil.buyer && setBuyer(hasil.buyer);

          try {
            const hasil2 = await Grn.partsByPono(poNo);
            if (hasil2.ok !== undefined && !hasil.ok) {
              const res = await hasil2.data;
              notification.error({
                message: res.message ? res.message : env.internalError,
              });
              // message.error(res.message ? res.message : env.internalError);
            } else {
              console.log('hasil part :>> ', hasil2);
              if (hasil2.ok === undefined) {
                let temp = [];
                let temp2 = [];
                hasil2.forEach(el => {
                  el.itemNo && temp.push(<Option key={ el.itemNo } value={ el.itemNo } >{ el.itemNo }</Option>);
                  el.partNo && temp2.push(<Option key={ el.partNo } value={ el.partNo } >{ el.partNo }</Option>);
                });
                setItemOpt(temp);
                setPartOpt(temp2);
                setParts(hasil2);
              } else {
                setParts([]);
              }
            }
          } catch (errorInfo) {
            throw errorInfo;
          }
        }
      } catch (errorInfo) {
        const temp = [];
        if (errorInfo && errorInfo.errorFields) {
          errorInfo.errorFields.map(e => {
            temp.push(e.name[0]);
          });
        }
        setErrorFields(temp);
        console.log('Failed:', errorInfo, errorFields);
      }
    }
  }, [poNo]);

  useEffect(() => {
    console.log('grnNo', grnNo);
  }, [grnNo]);

  useEffect(async () => {
    console.log('poNo :>> ', poNo);
    console.log('parts.length :>> ', parts.length);
    console.log('isPoNoClosed :>> ', isPoNoClosed);

    if (poNo && parts.length > 0 && !isPoNoClosed) {
      console.log('masuk');
      console.log('poNo :>> ', poNo);
      console.log('parts :>> ', parts);
      addNewDetail();
      /*const arr = [];
      parts.map(async (el, i) => {
        console.log('el :>> ', el);
        const hasil = await Grn.detailByPartNo(poNo, el.partNo, el.poRecSeq);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
          // message.error(res.message ? res.message : env.internalError);
        } else {
          const temp = {
            seqNo: el.seqNo,
            partNo: el.partNo,
            loc: hasil.loc,
            projectNo: hasil.projectNo,
            poRecSeq: el.poRecSeq,
            uom: hasil.uom,
            invUom: hasil.invUom,
            poPrice: hasil.poPrice,
            recdPrice: hasil.poPrice,
            stdPackQty: hasil.stdPackQty,
            remarks: hasil.remarks,
            orderQty: hasil.orderQty,
            dueDate: hasil.dueDate,
            description: hasil.description,
            recdQty: 0,
            issuedQty: 0,
            labelQty: 0,
            itemNo: hasil.itemNo,
            itemType: hasil.itemType
          };
          console.log('temp :>> ', temp);
          // arr.push(temp);
          if (!isPoNoClosed) {
            console.log('atas');
            setDetails([...arr, temp]);
          } else {
            console.log('bawah');
            setDetails([]);
          }
          setReRender(!reRender);
        }
      }); */
      // console.log('arr :>> ', arr);
      // setTempDetails([...arr]);
      // console.log('success');
    }
  }, [poNo, parts, isPoNoClosed]);

  useEffect(() => {
    if (details.length > 0) {
      console.log('details :>> ', details);
    }
  }, [details]);

  const submit = async () => {
    try {
      console.log(details);
      // const values = await form.validateFields();
      // console.log('Success:', values);
      details.map((e, i) => {
        details[i]["subType"] = "N";
        details[i]["grnNo"] = grnNo;
        details[i]["poNo"] = poNo;
        details[i]["recdDate"] = moment().format('MM/DD/YYYY');
        details[i]["uom"] = e.invUom;
        details[i]["recdQty"] = parseInt(e.recdQty);
        details[i]["issuedQty"] = parseInt(e.issuedQty);
        details[i]["labelQty"] = parseInt(e.labelQty);
        details[i]["orderQty"] = parseInt(e.orderQty);
      });

      console.log('details', details);


      let obj = {
        subType: 'N',
        grnNo,
        poNo,
        doNo,
        supplierCode,
        currencyCode,
        currencyRate,
        grnDetails: details
      };
      console.log('obj :>> ', JSON.stringify(obj));
      const hasil = await Grn.create(obj);
      console.log('hasil :>> ', hasil);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        notification.error({
          message: res.message ? res.message : env.internalError,
        });
        // message.error(res.message ? res.message : env.internalError);
      } else {
        showPrintModal();
        notification.success({
          message: 'Record successfully added',
        });
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

  const changeDetail = async (idx, field, value, trigger) => {
    details[idx][field] = value;
    if (field === 'recdQty') {
      details[idx]['issuedQty'] = value;
    }

    if (trigger) {
      parts.map(async (el, i) => {
        if (el.partNo === value || el.itemNo === value) {
          const hasil = await Grn.detailByPartNo(poNo, el.partNo, el.poRecSeq);
          if (hasil.ok !== undefined && !hasil.ok) {
            const res = await hasil.data;
            notification.error({
              message: res.message ? res.message : env.internalError,
            });
          } else {
            const temp = {
              seqNo: el.seqNo,
              partNo: el.partNo,
              loc: hasil.loc,
              projectNo: hasil.projectNo,
              poRecSeq: el.poRecSeq,
              uom: hasil.uom,
              invUom: hasil.invUom,
              poPrice: hasil.poPrice,
              recdPrice: hasil.poPrice,
              stdPackQty: hasil.stdPackQty,
              remarks: hasil.remarks,
              orderQty: hasil.orderQty,
              dueDate: hasil.dueDate,
              description: hasil.description,
              recdQty: 0,
              issuedQty: 0,
              labelQty: 0,
              itemNo: hasil.itemNo,
              itemType: hasil.itemType
            };
            details[idx] = temp;
          }
        }
      });
    }
    console.log("details changed >>", details);
    setDetails(details);
    setReRender(!reRender);
  };

  const renderDetails = () => {
    if (!isPoNoClosed) {
      return details.length > 0 &&
        details.map((el, idx) => {
          return (
            <div key={ idx } className={ `detail-card ${ id ? 'full' : '' }` }>
              <div className="border">
                <Collapsible trigger={ `Serial Number: ${ idx + 1 }` }>
                  <div className="inputs">
                    <div className="row2">
                      <div className="dual">
                        {
                          <Form.Item
                            name={ `SN[${ idx }]` }
                            label="SN"
                          >
                            {
                              id ?
                                <span>{ idx + 1 }</span>
                                :
                                <Input className='smallInput' defaultValue={ idx + 1 } value={ idx + 1 } onChange={ e => changeDetail(idx, 'sn', e.target.value) } placeholder='Type SN here...' readOnly disabled={ id } />
                            }
                          </Form.Item>
                        }

                        {
                          <Form.Item
                            name={ `Type[${ idx }]` }
                            label="Type"
                          >
                            {
                              id ?
                                <span>{ el.itemType !== undefined ? el.itemType : '-' }</span>
                                :
                                <Input className='smallInput' defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } placeholder='Insert type here...' readOnly disabled={ id } />
                            }
                          </Form.Item>
                        }
                      </div>

                      <div className="dual">
                        {
                          <Form.Item
                            name={ `UOM[${ idx }]` }
                            label="UOM"
                          >
                            {
                              id ?
                                <span>{ el.uom ? el.uom : '-' }</span>
                                :
                                <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } placeholder='Type UOM here...' readOnly disabled={ id } />
                            }
                          </Form.Item>
                        }

                        {
                          <Form.Item
                            name={ `MSL[${ idx }]` }
                            label="MSL"
                          >
                            {
                              id ?
                                <span>{ el.msl ? el.msl : '-' }</span>
                                :
                                <Input className='smallInput' defaultValue={ el.msl } value={ el.msl } onChange={ e => changeDetail(idx, 'msl', e.target.value) } placeholder='Insert MSL here...' readOnly disabled={ id } />
                            }
                          </Form.Item>
                        }
                      </div>

                      <div className="dual">
                        {
                          <Form.Item
                            name={ `UnitPrice[${ idx }]` }
                            label="Unit Price"
                          >
                            {
                              id ?
                                <span>{ el.recdPrice ? el.recdPrice : '-' }</span>
                                :
                                // <Input className='smallInput' defaultValue={ el.recdPrice } value={ el.recdPrice } onChange={ e => changeDetail(idx, 'unitPrice', e.target.value) } placeholder='Type Unit Price here...' readOnly disabled={ id } />
                                <InputNumber
                                  className='right'
                                  min={ 0 }
                                  max={ 9999999991 }
                                  step="0.0001"
                                  stringMode
                                  maxLength={ 18 }
                                  disabled={ true }
                                  defaultValue={ el.recdPrice }
                                  value={ el.recdPrice }
                                  onChange={ e => changeDetail(idx, 'recdPrice', e.target.value) }
                                />
                            }
                          </Form.Item>
                        }

                        {
                          <Form.Item
                            name={ `GRNQty[${ idx }]` }
                            label="GRN Qty"
                            initialValue={ el.recdQty }
                            rules={ [
                              {
                                required: true,
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (value > 0) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(new Error('QTY must more than 0'));
                                },
                              }),
                            ] }
                          >
                            {
                              id ?
                                <span>{ el.recdQty ? el.recdQty : '-' }</span>
                                :
                                <Input type={ 'number' } min={ 0 } className='smallInput alignRight' defaultValue={ el.recdQty } value={ el.recdQty } onChange={ e => changeDetail(idx, 'recdQty', e.target.value) } placeholder='Type GRN Qty here...' disabled={ id } />
                            }
                          </Form.Item>
                        }
                      </div>
                    </div>

                    <div className="row2">

                      {
                        <Form.Item
                          name={ `ItemNo[${ idx }]` }
                          label="Item No"
                        >
                          {
                            id ?
                              <span>{ el.itemNo ? el.itemNo : '-' }</span>
                              :
                              // <Input defaultValue={ el.itemNo } value={ el.itemNo } onChange={ e => changeDetail(idx, 'itemNo', e.target.value) } placeholder='Type item no here...' readOnly disabled={ id } />
                              <Select
                                showSearch
                                allowClear
                                // ref={ locationRef }
                                className='normal' disabled={ isDisabled }
                                defaultValue={ el.itemNo }
                                value={ el.itemNo }
                                onChange={ (value) => changeDetail(idx, 'itemNo', value, true) }
                                style={ { textTransform: 'uppercase' } }
                              // filterOption={ (input, option) =>
                              //   option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              // }
                              >
                                { itemOpt }
                              </Select>
                          }
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `Loc[${ idx }]` }
                          label="Loc"
                        >
                          {
                            id ?
                              <span>{ el.loc ? el.loc : '-' }</span>
                              :
                              // <Input
                              //   className='smallInput' disabled={ isDisabled }
                              //   defaultValue={ el.loc }
                              //   value={ el.loc }
                              //   readOnly
                              // />
                              <Select
                                showSearch
                                allowClear
                                // ref={ locationRef }
                                className='normal' disabled={ isDisabled }
                                defaultValue={ el.loc }
                                value={ el.loc }
                                onChange={ (value) => changeDetail(idx, 'loc', value) }
                                style={ { textTransform: 'uppercase' } }
                              // filterOption={ (input, option) =>
                              //   option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              // }
                              >
                                { locOpt }
                              </Select>
                          }
                        </Form.Item>
                      }

                      <div className="dual">
                        {
                          <Form.Item
                            name={ `DateCode[${ idx }]` }
                            label="Date Code"
                            rules={ [
                              {
                                required: false,
                                message: "Date Code is required"
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  // if ()
                                  if (value) {
                                    let year = "";
                                    let week = "";
                                    let maxWeek = 53;
                                    let flag = false;

                                    value.split("").forEach((elm, id) => {
                                      if (id < 2) {
                                        year += elm;
                                      } else {
                                        week += elm;
                                      }
                                    });

                                    // year = parseInt(year);
                                    // week = parseInt(week);

                                    let momentYear = "";
                                    (moment().year() + "").split("").forEach((elm, id) => {
                                      if (id > 1) {
                                        momentYear += elm;
                                      }
                                    });
                                    momentYear = parseInt(momentYear);
                                    let momentWeek = moment().week();

                                    console.log("year :>> ", year);
                                    console.log("week :>> ", week);
                                    console.log("momentYear :>> ", momentYear);
                                    console.log("momentWeek :>> ", momentWeek);

                                    if (year < momentYear) {
                                      if (week > 0 && week <= maxWeek) {
                                        flag = true;
                                      }
                                    }

                                    if (year == momentYear) {
                                      if (week > 0 && week <= momentWeek) {
                                        flag = true;
                                      }
                                    }

                                    if (!value || flag && value.length === 4) {
                                      return Promise.resolve();
                                    }

                                    return Promise.reject(new Error("Datecode not valid"));
                                  }
                                },
                              }),
                            ] }
                          >
                            {
                              id ?
                                <span>{ el.dateCode ? el.dateCode : '-' }</span>
                                :
                                <Input className='smallInput center' defaultValue={ el.dateCode } value={ el.dateCode } onChange={ e => changeDetail(idx, 'dateCode', e.target.value) } placeholder='Insert Date Code here...' disabled={ id } />
                            }
                          </Form.Item>
                        }

                        {
                          <Form.Item
                            name={ `QTYLabel[${ idx }]` }
                            label="QTY/Label"
                            initialValue={ el.labelQty }
                            rules={ [
                              {
                                required: true,
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (value > 0 && value <= getFieldValue('GRN Qty')) {
                                    return Promise.resolve();
                                  }

                                  if (!value || value === 0) {
                                    return Promise.reject(new Error('QTY/Label must more than 0'));
                                  }

                                  if (value > getFieldValue('GRN Qty')) {
                                    return Promise.reject(new Error("QTY/Label can't be more than GRN QTY"));
                                  }

                                },
                              }),
                            ] }
                          >
                            {
                              id ?
                                <span>{ el.labelQty ? el.labelQty : '-' }</span>
                                :
                                <Input type={ 'number' } min={ 0 } className='smallInput alignRight' defaultValue={ el.labelQty } value={ el.labelQty } onChange={ e => changeDetail(idx, 'labelQty', e.target.value) } placeholder='Type Qty/Label here...' disabled={ id } />
                            }
                          </Form.Item>
                        }
                      </div>
                    </div>

                    <div className="row2">
                      <div className="dual">
                        {
                          <Form.Item
                            name={ `PartNo[${ idx }]` }
                            label="Part No"
                          >
                            {
                              id ?
                                <span>{ el.partNo ? el.partNo : '-' }</span>
                                :
                                // <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' readOnly disabled={ id } />
                                <Select
                                  showSearch
                                  allowClear
                                  // ref={ locationRef }
                                  className='normal' disabled={ isDisabled }
                                  defaultValue={ el.partNo }
                                  value={ el.partNo }
                                  onChange={ (value) => changeDetail(idx, 'partNo', value, true) }
                                  style={ { textTransform: 'uppercase' } }
                                // filterOption={ (input, option) =>
                                //   option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // }
                                >
                                  { partOpt }
                                </Select>
                            }
                          </Form.Item>
                        }
                      </div>

                      <div className="dual">

                        {
                          <Form.Item
                            name={ `OrderQty[${ idx }]` }
                            label="Order Qty"
                          >
                            {
                              id ?
                                <span>{ el.orderQty ? el.orderQty : '-' }</span>
                                :
                                // <Input className='smallInput' defaultValue={ el.orderQty } value={ el.orderQty } onChange={ e => changeDetail(idx, 'orderQty', e.target.value) } placeholder='Type order qty here...' disabled={ id } readOnly />
                                <InputNumber
                                  className='right'
                                  min={ 0 }
                                  max={ 9999999991 }
                                  step="0.01"
                                  stringMode
                                  maxLength={ 18 }
                                  disabled={ true }
                                  defaultValue={ el.orderQty }
                                  value={ el.orderQty }
                                  onChange={ e => changeDetail(idx, 'orderQty', e.target.value) }
                                />
                            }
                          </Form.Item>
                        }

                        {
                          <Form.Item
                            name={ `SIVNo[${ idx }]` }
                            label="SIV No"
                          >
                            {
                              id ?
                                <span>{ el.poNo ? el.poNo : '-' }</span>
                                :
                                <Input className='smallInput' defaultValue={ el.poNo } value={ el.poNo } onChange={ e => changeDetail(idx, 'sivNo', e.target.value) } placeholder='Insert SIV No here...' disabled={ id } />
                            }
                          </Form.Item>
                        }
                      </div>

                      <div className="dual">

                        {
                          <Form.Item
                            name={ `StdPack[${ idx }]` }
                            label="Std Pack"
                          >
                            {
                              id ?
                                <span>{ el.stdPackQty ? el.stdPackQty : '-' }</span>
                                :
                                <Input className='smallInput' defaultValue={ el.stdPackQty } value={ el.stdPackQty } onChange={ e => changeDetail(idx, 'stdPackQty', e.target.value) } placeholder='Type std pack here...' readOnly disabled={ id } />
                            }
                          </Form.Item>
                        }

                        {
                          <Form.Item
                            name={ `DueDate[${ idx }]` }
                            label="Due date"
                          >
                            {
                              id ?
                                <span>{ el.dueDate ? el.dueDate : '-' }</span>
                                :
                                <Input className='smallInput' defaultValue={ el.dueDate } value={ el.dueDate } onChange={ e => changeDetail(idx, 'dueDate', e.target.value) } placeholder='Type due date here...' readOnly disabled={ id } />
                            }
                          </Form.Item>
                        }
                      </div>
                    </div>
                    <div className="row2">
                      {
                        <Form.Item
                          name={ `ProjectNo[${ idx }]` }
                          label="Project No"
                        >
                          {
                            id ?
                              <span>{ el.projectNo ? el.projectNo : '-' }</span>
                              :
                              <Input className='smallInput' defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } placeholder='Type Project No here...' readOnly disabled={ id } />
                          }
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `Description[${ idx }]` }
                          label="Description"
                        >
                          {
                            id ?
                              <p>{ el.description ? el.description : '-' }</p>
                              :
                              <Input.TextArea className='smallInput' defaultValue={ el.description } value={ el.description } onChange={ e => changeDetail(idx, 'description', e.target.value) } placeholder='Type description here...' readOnly disabled={ id } autoSize />
                          }
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `Remarks[${ idx }]` }
                          label="Remarks"
                          initialValue={el.remarks}
                        >
                          {
                            id ?
                              <p>{ el.remarks ? el.remarks : '-' }</p>
                              :
                              <Input.TextArea className='smallInput' defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } placeholder='Type remarks here...' disabled={ id } />
                          }
                        </Form.Item>
                      }

                    </div>
                  </div>

                </Collapsible>
              </div>

              {
                !id &&
                <div className="actions">
                  { details.length > 1 && (
                    <TiDelete color="red" size={ 30 } onClick={ () => deleteDetail(idx) } />
                  ) }
                  { idx === details.length - 1 && (
                    <MdAddCircle color="#1990ff" size={ 24 } onClick={ addNewDetail } />
                  ) }
                </div>
              }

            </div>
          );
        });
    } else {
      return null;
    }
  };

  const printReport = (key) => {
    console.log('key :>> ', key);
    let body = {};
    if (key === 'GRN') {
      body.grnNo = grnNo;
      body.subType = subType;
    } else if (key === 'pickList') {
      body.grnNo = grnNo;
      body.subType = subType;
    } else if (key === 'label') {
      body.grnNo = grnNo;
    }
    console.log(body);
    let data = key === 'GRN' ? Grn.printReportGRN(body) : key === 'pickList' ? Grn.printPickList(body) : Grn.printLabel(body);
    // data.then(res => {
    //   console.log('res :>> ', res);
    // });
    data.then(result => result.blob('application/pdf'))
      .then(blob => {
        console.log('blob :>> ', blob);
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
      onOk: () => history.push('/grn-with-pos'),
    });
  };

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
  };

  return (
    <StyledDiv>
      <div className="header">
        <div className="left">

        </div>
        <h2>{ `GRN ${ !id ? 'Entry ' : '' }(with PO)` }</h2>
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
                    id
                      ?
                      <Form.Item
                        name="GRN No"
                        label="GRN No"
                      >
                        <span>{ grnNo }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="GRN No"
                        label="GRN No"
                      >
                        <Input hidden />
                        <Input className='smallInput' InitialValue={ grnNo } defaultValue={ grnNo } value={ grnNo } placeholder='Type GRN here...' readOnly disabled={ isDisabled } />
                      </Form.Item>
                  }

                  {
                    id
                      ?
                      <Form.Item
                        name="PO No"
                        label="PO No"
                      >
                        <span>{ poNo }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="PO No"
                        label="PO No"
                      >
                        <Select
                          showSearch
                          allowClear
                          className='normal' disabled={ isDisabled }
                          defaultValue={ poNo }
                          value={ poNo }
                          options={ poNoOpt }
                          onSelect={ data => { setPoNo(data);  } }
                          placeholder={ "Type PO No here..." }
                          filterOption={ (inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                  }

                  {
                    id
                      ?
                      <Form.Item
                        name="Currency Code / Rate"
                        label="Currency Code / Rate"
                      >
                        <div className="currInput">
                          <span>{ currencyCode } / { currencyRate }</span>
                        </div>
                      </Form.Item>
                      :
                      <Form.Item
                        name="Currency Code / Rate"
                        label="Currency Code / Rate"
                      >
                        <div className="currInput">
                          <Input className='smallInput2' value={ currencyCode } placeholder='Type Currency code here...' readOnly disabled={ isDisabled } />
                          <span>/</span>
                          <Input style={ { width: '95%' } } className='smallInput2' value={ currencyRate } placeholder='Type rate here...' readOnly disabled={ isDisabled } />
                        </div>
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    id
                      ?
                      <Form.Item
                        name="Supplier Code"
                        label="Supplier Code"
                      >
                        <span>{ supplierCode }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="Supplier Code"
                        label="Supplier Code"
                      >
                        <Input hidden />
                        <Input className='smallInput' value={ supplierCode } placeholder='Type Supplier code here...' readOnly disabled={ isDisabled } />
                      </Form.Item>
                  }

                  {
                    id
                      ?
                      <Form.Item
                        name="Recd Date"
                        label="Recd Date"
                      >
                        <span>{ recdDate ? recdDate : '-' }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="Recd Date"
                        label="Recd Date"
                      >
                        <Input hidden />
                        <Input
                          className='normal' disabled={ isDisabled }
                          value={ recdDate }
                          placeholder={ "Type recd date here..." }
                          readOnly
                        />
                      </Form.Item>
                  }
                  {
                    id
                      ?
                      <Form.Item
                        name="Release Date"
                        label="Release Date"
                      >
                        <span>{ releaseDate ? releaseDate : '-' }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="Release Date"
                        label="Release Date"
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ releaseDate }
                          placeholder={ "Type Release Date here.." }
                          readOnly
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    id
                      ?
                      <Form.Item
                        name="Buyer"
                        label="Buyer"
                      >
                        <span>{ buyer ? buyer : '/' }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="Buyer"
                        label="Buyer"
                      >
                        <Input hidden />
                        <Input
                          className='normal' disabled={ isDisabled }
                          value={ buyer }
                          placeholder={ "Type buyer here.." }
                          readOnly
                        />
                      </Form.Item>
                  }

                  {
                    id
                      ?
                      <Form.Item
                        name="PO Remarks"
                        label="PO Remarks"
                      >
                        <p>{ poRemarks ? poRemarks : '-' }</p>
                      </Form.Item>
                      :
                      <Form.Item
                        name="PO Remarks"
                        label="PO Remarks"
                      >
                        <Input hidden />
                        <Input.TextArea onChange={ e => setPoRemarks(e.target.value) } value={ poRemarks } autoSize />
                      </Form.Item>
                  }

                  {
                    id
                      ?
                      <Form.Item
                        name="DO No"
                        label="DO No"
                        className='red'
                      >
                        <span>{ doNo ? doNo : '-' }</span>
                      </Form.Item>
                      :
                      <Form.Item
                        name="DO No"
                        label="DO No"
                        className='red'
                      >
                        <Input
                          className='normal' disabled={ isDisabled }
                          defaultValue={ doNo }
                          value={ doNo }
                          onChange={ e => setDoNo(e.target.value) }
                          placeholder={ "Type DO No here.." }
                        />
                      </Form.Item>
                  }
                </div>

                <div className="row2">
                  {
                    id &&
                    <Form.Item
                      name="Updated By"
                      label="Updated By"
                    >
                      <span>{ updatedBy }</span>
                    </Form.Item>
                  }

                  {
                    id &&
                    <Form.Item
                      name="Last Updated"
                      label="Last Updated"
                    >
                      <span>{ updatedAt }</span>
                    </Form.Item>
                  }
                </div>
              </div>

              <div className="detail-wrapper">
                {
                  reRender
                    ?
                    renderDetails()
                    :
                    renderDetails()
                }
              </div>

              {
                (!id) &&
                <div className="submit">
                  <Form.Item>
                    <Button onClick={ submit } type="primary" htmlType="submit">
                      Create GRN
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
                    <Button onClick={ () => history.push(`/grn-with-pos`) } type="default" htmlType="submit">
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

export default GrnWithPoForm;
