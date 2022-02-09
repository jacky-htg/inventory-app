import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message, Dropdown, Menu } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import Collapsible from "react-collapsible";

import { Grn } from '../../services';
import { StyledDiv } from './styled';
import env from '../../env';
import { Images } from '../../constant';
import { parse } from 'postcss';
import TextArea from 'antd/lib/input/TextArea';

const GrnWithPoForm = (props) => {
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
  /*const [locData, setLocData] = useState([]);
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
  const [uomOpt, setUomOpt] = useState([]); */
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
  const [subType, setSubType] = useState(null);
  const [orderNo, setOrderNo] = useState(null);
  const [reRender, setReRender] = useState(false);

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
        let arr = [];
        result.grnDetails && result.grnDetails.length > 0 && result.grnDetails.forEach(el => {
          arr.push(el);
        });
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

  useEffect(() => {
    if (poNo && !id) {
      let data = Grn.headerByPono(poNo);
      console.log('data :>> ', data);
      data.then(result => {
        console.log('result :>> ', result);
        // if (result.status && result.status !== 200) {
        //   message.error(result.error);
        // }
        result.grnNo && setGrnNo(result.grnNo);
        result.supplierCode && setSupplierCode(result.supplierCode);
        result.currencyCode && setCurrencyCode(result.currencyCode);
        result.currencyRate && setCurrencyRate(result.currencyRate);
        result.recdDate && setRecdDate(result.recdDate);
        result.poRemarks && setPoRemarks(result.poRemarks);
        result.orderNo && setOrderNo(result.orderNo);
        result.buyer && setBuyer(result.buyer);
      });

      let detailPart = Grn.partsByPono(poNo);
      detailPart.then(result => {
        console.log('result part :>> ', result);
        setParts(result);
      });
    } else if (!poNo && !id) {
      setGrnNo('');
      setSupplierCode('');
      setCurrencyCode('');
      setCurrencyRate('');
      setRecdDate('');
      setPoRemarks('');
      setBuyer('');
    }
  }, [poNo]);

  useEffect(() => {
    console.log('grnNo', grnNo);
  }, [grnNo]);

  useEffect(() => {
    if (poNo && parts.length > 0) {
      console.log('masuk');
      console.log('poNo :>> ', poNo);
      console.log('parts :>> ', parts);
      const arr = [];
      parts.map((el, i) => {
        let data = Grn.detailByPartNo(poNo, el.partNo, el.poRecSeq);
        data.then(result => {
          const temp = {
            seqNo: el.seqNo,
            partNo: el.partNo,
            loc: result.loc,
            projectNo: result.projectNo,
            poRecSeq: el.poRecSeq,
            uom: result.uom,
            invUom: result.invUom,
            poPrice: result.poPrice,
            recdPrice: result.poPrice,
            stdPackQty: result.stdPackQty,
            remarks: result.remarks,
            recdQty: result.orderQty,
            dueDate: result.dueDate,
            description: result.description,
            issuedQty: 1,
            labelQty: 1,
            itemNo: null,
            itemType: 0
          };
          console.log('temp :>> ', temp);
          // arr.push(temp);
          setDetails([...arr, temp]);
          setReRender(!reRender);
        });
      });
      // console.log('arr :>> ', arr);
      // setTempDetails([...arr]);
      // console.log('success');
    }
  }, [poNo, parts]);

  useEffect(() => {
    if (details.length > 0) {
      console.log('details :>> ', details);
    }
  }, [details]);


  /*useEffect(() => {
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
  }, []); */

  /*useEffect(() => {
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
  }, [categoryCode]);*/

  /*useEffect(() => {
    if (subCategoriesData.length > 0 && id && categorySubCode) {
      subCategoriesData.forEach(el => {
        if (el.categorySubCode === categorySubCode) {
          setCategorySubCode(el.categorySubCode);
          setCategorySubCodeName(el.subDescription);
        }
      });
      setLoadingPage(false);
    }
  }, [subCategoriesData]);*/

  /*useEffect(() => {
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
  }, []);*/

  /*useEffect(() => {
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
  }, []);*/

  /*useEffect(() => {
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
  }, []);*/

  /*const onSelectCategoryCode = (data) => {
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

  const onSelectUOM = (data) => {
    uomData.forEach(el => {
      if (el.codeDesc === data) {
        setUom(el.codeValue);
        setUomName(el.codeDesc);
      }
    });
  };*/

  const submit = async () => {
    try {
      console.log(details);
      // const values = await form.validateFields();
      // console.log('Success:', values);
      details.map((e, i) => {
        details[i]["subType"] = "N";
        details[i]["grnNo"] = grnNo;
        details[i]["poNo"] = poNo;
        details[i]["recdDate"] = e.dueDate;
        details[i]["uom"] = e.invUom;
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
      console.log('obj :>> ', obj);
      const hasil = await Grn.create(obj);
      if (hasil.ok !== undefined && !hasil.ok) {
        const res = await hasil.data;
        message.error(res.message);
      }

      history.push('/grn-with-pos');
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

  const changeDetail = (idx, field, value) => {
    details[idx][field] = value;
    setDetails(details);
  };

  const renderDetails = () => {
    return details.length > 0 &&
      details.map((el, idx) => {
        return (
          <div key={ idx } className="detail-card">
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
                          <Input className='smallInput' defaultValue={ idx + 1 } value={ idx + 1 } onChange={ e => changeDetail(idx, 'sn', e.target.value) } placeholder='Type SN here...' readOnly disabled={ id } />
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `Type[${ idx }]` }
                          label="Type"
                        >
                          <Input className='smallInput' defaultValue={ el.type } value={ el.type } onChange={ e => changeDetail(idx, 'type', e.target.value) } placeholder='Insert type here...' readOnly disabled={ id } />
                        </Form.Item>
                      }
                    </div>

                    <div className="dual">
                      {
                        <Form.Item
                          name={ `UOM[${ idx }]` }
                          label="UOM"
                        >
                          <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } placeholder='Type UOM here...' readOnly disabled={ id } />
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `MSL[${ idx }]` }
                          label="MSL"
                        >
                          <Input className='smallInput' defaultValue={ el.msl } value={ el.msl } onChange={ e => changeDetail(idx, 'msl', e.target.value) } placeholder='Insert MSL here...' readOnly disabled={ id } />
                        </Form.Item>
                      }
                    </div>

                    <div className="dual">
                      {
                        <Form.Item
                          name={ `UnitPrice[${ idx }]` }
                          label="Unit Price"
                        >
                          <Input className='smallInput' defaultValue={ el.recdPrice } value={ el.recdPrice } onChange={ e => changeDetail(idx, 'unitPrice', e.target.value) } placeholder='Type Unit Price here...' readOnly disabled={ id } />
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `GRNQty[${ idx }]` }
                          label="GRN Qty"
                          initialValue={ el.issuedQty }
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
                          <Input type={ 'number' } className='smallInput' defaultValue={ el.issuedQty } value={ el.issuedQty } onChange={ e => changeDetail(idx, 'grnQty', e.target.value) } placeholder='Type GRN Qty here...' disabled={ id } />
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
                        <Input defaultValue={ el.itemNo } value={ el.itemNo } onChange={ e => changeDetail(idx, 'itemNo', e.target.value) } placeholder='Type item no here...' readOnly disabled={ id } />
                      </Form.Item>
                    }

                    {
                      <Form.Item
                        name={ `Loc[${ idx }]` }
                        label="Loc"
                      >
                        <Input
                          className='smallInput' disabled={ isDisabled }
                          defaultValue={ el.loc }
                          value={ el.loc }
                          readOnly
                        />
                      </Form.Item>
                    }

                    <div className="dual">
                      {
                        <Form.Item
                          name={ `DateCode[${ idx }]` }
                          label="Date Code"
                        >
                          <Input className='smallInput' defaultValue={ el.dateCode } value={ el.dateCode } onChange={ e => changeDetail(idx, 'dateCode', e.target.value) } placeholder='Insert Date Code here...' readOnly disabled={ id } />
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
                          <Input type={ 'number' } className='smallInput' defaultValue={ el.labelQty } value={ el.labelQty } onChange={ e => changeDetail(idx, 'labelQty', e.target.value) } placeholder='Type Qty/Label here...' disabled={ id } />
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
                          <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' readOnly disabled={ id } />
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `ProjectNo[${ idx }]` }
                          label="Project No"
                        >
                          <Input className='smallInput' defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } placeholder='Type Project No here...' readOnly disabled={ id } />
                        </Form.Item>
                      }
                    </div>

                    <div className="dual">

                      {
                        <Form.Item
                          name={ `OrderQty[${ idx }]` }
                          label="Order Qty"
                        >
                          <Input className='smallInput' defaultValue={ el.recdQty } value={ el.recdQty } onChange={ e => changeDetail(idx, 'recdQty', e.target.value) } placeholder='Type order qty here...' readOnly disabled={ id } />
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `SIVNo[${ idx }]` }
                          label="SIV No"
                        >
                          <Input className='smallInput' defaultValue={ el.poNo } value={ el.poNo } onChange={ e => changeDetail(idx, 'sivNo', e.target.value) } placeholder='Insert SIV No here...' readOnly disabled={ id } />
                        </Form.Item>
                      }
                    </div>

                    <div className="dual">

                      {
                        <Form.Item
                          name={ `StdPack[${ idx }]` }
                          label="Std Pack"
                        >
                          <Input className='smallInput' defaultValue={ el.stdPackQty } value={ el.stdPackQty } onChange={ e => changeDetail(idx, 'stdPackQty', e.target.value) } placeholder='Type std pack here...' readOnly disabled={ id } />
                        </Form.Item>
                      }

                      {
                        <Form.Item
                          name={ `DueDate[${ idx }]` }
                          label="Due date"
                        >
                          <Input className='smallInput' defaultValue={ el.dueDate } value={ el.dueDate } onChange={ e => changeDetail(idx, 'dueDate', e.target.value) } placeholder='Type due date here...' readOnly disabled={ id } />
                        </Form.Item>
                      }
                    </div>



                  </div>
                  <div className="row">
                    {
                      <Form.Item
                        name={ `Description[${ idx }]` }
                        label="Description"
                      >
                        <Input className='smallInput' defaultValue={ el.description } value={ el.description } onChange={ e => changeDetail(idx, 'description', e.target.value) } placeholder='Type description here...' readOnly disabled={ id } />
                      </Form.Item>
                    }

                    {
                      <Form.Item
                        name={ `Remarks[${ idx }]` }
                        label="Remarks"
                      >
                        <Input className='smallInput' defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } placeholder='Type remarks here...' disabled={ id } />
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
              {/* <MdAddCircle color='#1990ff' size={ 24 } onClick={ addNewDetail } /> */ }
            </div>

          </div>
        );
      });
  };

  const printReport = (key) => {
    console.log('key :>> ', key);
    let body = {

    };
    if (key === 'GRN') {
      body.grnNo = grnNo;
      body.subType = subType;
      body.type = subType;
    } else if (key === 'pickList') {
      body.grnNo = grnNo;
      body.orderNo = orderNo;
      body.projectNo = projectNo;
    } else if (key === 'label') {
      body.grnNo = grnNo;
    }
    console.log(body);
    let data = key === 'GRN' ? Grn.printReportGRN(body) : key === 'pickList' ? Grn.printPickList(body) : Grn.printLabel(body);
    data.then(result => {
      console.log('result :>> ', result);
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
        <div className="left">

        </div>
        <h2>GRN Entry (with PO)</h2>
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
                <div className="row">
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
                        <Input className='smallInput' InitialValue={ grnNo } defaultValue={ grnNo } value={ grnNo } placeholder='Type Currency code here...' readOnly disabled={ isDisabled } />
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
                          <Input className='smallInput' value={ currencyCode } placeholder='Type Currency code here...' readOnly disabled={ isDisabled } />
                          <span>/</span>
                          <Input className='smallInput' value={ currencyRate } placeholder='Type rate here...' readOnly disabled={ isDisabled } />
                        </div>
                      </Form.Item>
                  }
                </div>

                <div className="row">
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
                          onSelect={ data => setPoNo(data) }
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
                </div>

                <div className="row">
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
                </div>

                <div className="row">
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
                        <Input.TextArea rows={ 4 } readOnly value={ poRemarks } />
                      </Form.Item>
                  }

                  <div className="column">

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
