import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, Checkbox, AutoComplete, message, notification } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Lov, Location, Item } from '../../services';

import { StyledDiv } from './styled';
import env from '../../env';
import { Images } from '../../constant';
import { parse } from 'postcss';
import { formFailedSubmit } from '../../helpers';

const FormPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
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

  const [balbfQty, setBalbfQty] = useState(parseFloat(0.0000));
  const [qtyOnHand, setQtyOnHand] = useState(parseFloat(0.0000));
  const [qtyReserved, setQtyReserved] = useState(parseFloat(0.0000));
  const [categoryCode, setCategoryCode] = useState('');
  const [categoryName, setCategoryName] = useState();
  const [categorySubCode, setCategorySubCode] = useState('');
  const [categorySubCodeName, setCategorySubCodeName] = useState('');
  const [description, setDescription] = useState('');
  const [dimension, setDimension] = useState('');
  const [issueNo, setIssueNo] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [leadtime, setLeadtime] = useState(0);
  const [loc, setLoc] = useState();
  const [manufacturer, setManufacturer] = useState('');
  const [mslCode, setMslCode] = useState('');
  const [mslCodeName, setMslCodeName] = useState();
  const [obsoleteCode, setObsoleteCode] = useState();
  const [obsoleteItem, setObsoleteItem] = useState('');
  const [openClose, setOpenClose] = useState();
  const [orderQty, setOrderQty] = useState(parseFloat(0.0000));
  const [partNo, setPartNo] = useState('');
  const [prodnResv, setProdnResv] = useState(0);
  const [productGroup, setProductGroup] = useState('');
  const [qoh, setQoh] = useState(0);
  const [qryObsItem, setQryObsItem] = useState('');
  const [refUrl, setRefUrl] = useState('');
  const [remarks, setRemarks] = useState('');
  const [reorder, setReorder] = useState(0.0000);
  const [requestor, setRequestor] = useState('');
  const [rev, setRev] = useState('');
  const [rohsStatus, setRohsStatus] = useState(false);
  const [source, setSource] = useState('');
  const [sourceName, setSourceName] = useState();
  const [status, setStatus] = useState('ACTIVE');
  const [stdMaterial, setStdMaterial] = useState(0);
  const [storageShelf, setStorageShelf] = useState('');
  const [uom, setUom] = useState('');
  const [replace, setReplace] = useState('');
  const [uomName, setUomName] = useState();
  const [version, setVersion] = useState(0);
  const [entryUser, setEntryUser] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [lastModified, setLastModified] = useState('');


  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
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
        result.balbfQty && setBalbfQty(parseFloat(result.balbfQty));
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
        result.leadtime && setLeadtime(parseInt(result.leadtime));
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
        result.requestor && setRequestor(result.requestor);
        result.reorder && setReorder(parseFloat(result.reorder));
        result.rev && setRev(result.rev);
        result.rohsStatus && setRohsStatus(result.rohsStatus);
        result.source && setSource(result.source);
        result.updatedBy && setEntryUser(result.updatedBy);
        result.updatedAt && setLastModified(result.updatedAt);
        result.createdAt && setEntryDate(result.createdAt);
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
        if (result.uom) {
          uomData.forEach(el => {
            if (el.codeValue === result.uom) {
              setUomName(el.codeDesc);
            }
          });
        }
        result.version && setVersion(result.version);
        result.obsoleteItem && setObsoleteCode(result.obsoleteItem);
        result.storageShelf && setStorageShelf(result.storageShelf);

        if (!result.categorySubCode) {
          setLoadingPage(false);
        }
      });
    }
  }, [id, locData, itemCategoriesData, mslData, sourcesData, uomData]);

  useEffect(() => {
    let data = Location.list({});
    data.then(result => {
      console.log('location :>> ', result.rows);
      setLocData(result.rows);

      let temp = [];
      result.rows.forEach(el => {
        temp.push(<Option key={ el.loc } value={ el.loc } >{ el.loc }: { el.description }</Option>);
      });
      setLocOpt(temp);
    });
  }, []);

  useEffect(() => {
    const data = Lov.getItemCategories();
    data.then(res => {
      console.log('getItemCategories :>> ', res);
      setItemCategoriesData(res);
      let temp = [];
      res.forEach(el => {
        temp.push(<Option key={ el.description } value={ el.description } >{ el.description }</Option>);
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
          temp.push(<Option key={ el.subDescription } value={ el.subDescription } >{ el.subDescription }</Option>);
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
        temp.push(<Option key={ el.subtypeDesc } value={ el.subtypeDesc } >{ el.subtypeDesc }</Option>);
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
        temp.push(<Option key={ el.codeDesc } value={ el.codeDesc } >{ el.codeDesc }</Option>);
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
        temp.push(<Option key={ el.codeDesc } value={ el.codeDesc } >{ el.codeDesc }</Option>);
      });
      setUomOpt(temp);
    });
  }, []);

  const onSelectCategoryCode = (data) => {
    if (!data) {
      setCategoryCode('');
      setCategoryName('');
    } else {
      itemCategoriesData.forEach(el => {
        if (el.description === data) {
          setCategoryCode(el.categoryCode);
          setCategoryName(el.description);
        }
      });
    }
    form.setFieldsValue({
      catSubCode: null
    });
  };

  const onSelectSubCategoryCode = (data) => {
    if (!data) {
      setCategorySubCode('');
      setCategorySubCodeName('');
    } else {
      subCategoriesData.forEach(el => {
        if (el.subDescription === data) {
          setCategorySubCode(el.categorySubCode);
          setCategorySubCodeName(el.subDescription);
        }
      });
    }
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
  };

  const submit = async () => {
    try {
      if (!isEdit) {
        const values = await form.validateFields();
        console.log('Success:', values);
      }
      let obj = {
        balbfQty: parseFloat(balbfQty),
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
        obsoleteCode,
        obsoleteItem,
        openClose,
        orderQty: parseInt(orderQty),
        partNo,
        prodnResv: parseInt(prodnResv),
        productGroup,
        qoh: parseInt(qoh),
        qryObsItem,
        refUrl,
        remarks,
        reorder: parseFloat(reorder),
        requestor,
        rev,
        rohsStatus,
        source,
        // status,
        stdMaterial: parseInt(stdMaterial),
        storageShelf,
        uom,
        // version: parseInt(version),
      };

      if (isEdit) {
        obj.version = parseInt(version);
        const hasil = await Item.edit(id, obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          // message.error(res.message ? res.message : env.internalError);
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
        } else {
          if (hasil.message) {
            notification.info({
              message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
              description: hasil.message
            });
          } else {
            // message.success(`Record successfully ${ isEdit ? 'updated' : 'added' }`);
            notification.success({
              message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
            });
          }
          history.push('/items');
        }
      } else {
        const hasil = await Item.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          // message.error(res.message ? res.message : env.internalError);
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
        } else {
          console.log('hasil :>> ', hasil);
          // console.log('res :>> ', res);
          if (hasil.message) {
            notification.info({
              message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
              description: hasil.message
            });
          } else {
            // message.success(`Record successfully ${ isEdit ? 'updated' : 'added' }`);
            notification.success({
              message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
            });
          }
          history.push('/items');
        }
      }
    } catch (errorInfo) {
      const temp = [];
      errorInfo.errorFields.map(e => {
        temp.push(e.name[0]);
      });
      setErrorFields(temp);
      console.log('Failed:', errorInfo, errorFields);
    }
  };

  useEffect(() => {
    console.log('description :>> ', description);
  }, [description]);


  const itemNoRef = useRef();
  const locationRef = useRef();
  const catCodeRef = useRef();
  const sourceRef = useRef();
  const catSubCodeRef = useRef();

  useEffect(() => {
    console.log('errrr', errorFields);
    if (errorFields.includes("Item No")) {
      itemNoRef.current.focus();
    } else if (errorFields.includes("Location")) {
      locationRef.current.focus();
    } else if (errorFields.includes("catCode")) {
      catCodeRef.current.focus();
    } else if (errorFields.includes("source")) {
      sourceRef.current.focus();
    } else if (errorFields.includes("catSubCode")) {
      catSubCodeRef.current.focus();
    }
  }, [errorFields, itemNoRef, locationRef, catCodeRef, sourceRef, catSubCodeRef]);

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
  };

  return (
    <StyledDiv>
      <div className="header">
        <h2></h2>
        <h2>Item Master Maintenance</h2>
      </div>
      <div className="formWrapper">
        {
          loadingPage
            ?
            <div className="loading">
              <img src={ Images.loading } alt="" />
            </div>
            :
            <Form onFinish={ submit } onFinishFailed={ data => formFailedSubmit(data, setErrorFields) } form={ form } name="control-hooks" scrollToFirstError>
              <div className="group">
                <div className="row">
                  <Form.Item
                    name="Item No"
                    label="Item No"
                    initialValue={ itemNo }
                    rules={ [
                      {
                        required: true,
                        message: 'Item No cannot be blank!'
                      },
                    ] }
                  >
                    <Input
                      autoFocus={ true }
                      maxLength={ 15 }
                      ref={ itemNoRef }
                      style={ { textTransform: 'uppercase' } }
                      className='normal'
                      disabled={ isDisabled || id }
                      defaultValue={ itemNo }
                      value={ itemNo }
                      onChange={ e => setItemNo(e.target.value.toUpperCase()) }
                    />
                  </Form.Item>

                  {
                    id && !isEdit
                      ?
                      <Form.Item
                        name="rohs"
                        label='RoHS Status'
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ rohsStatus ? 'Yes' : 'No' } />
                      </Form.Item>
                      :
                      <Form.Item
                        name="rohs"
                      >
                        <Checkbox checked={ rohsStatus } onChange={ e => setRohsStatus(e.target.checked) }>RoHS Status</Checkbox>
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  <Form.Item
                    name="Location"
                    label="Location"
                    initialValue={ loc }
                    rules={ [
                      {
                        required: true,
                        message: 'Location cannot be blank!'
                      },
                    ] }
                  >
                    <Select
                      showSearch
                      allowClear
                      ref={ locationRef }
                      className='normal' disabled={ isDisabled }
                      defaultValue={ loc }
                      value={ loc }
                      onChange={ (value) => setLoc(value) }
                      style={ { textTransform: 'uppercase' } }
                    // filterOption={ (input, option) =>
                    //   option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    >
                      { locOpt }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="catCode"
                    label="Category Code"
                    initialValue={ categoryName }
                    rules={ [
                      {
                        required: true,
                        message: 'Category Code cannot be blank!'
                      },
                    ] }
                  >
                    <Select
                      showSearch
                      allowClear
                      ref={ catCodeRef }
                      className='normal' disabled={ isDisabled }
                      defaultValue={ categoryName }
                      value={ categoryName }
                      onChange={ (value) => onSelectCategoryCode(value) }
                      filterOption={ (input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      { itemCategoriesOpt }
                    </Select>
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="source"
                    label="Source"
                    initialValue={ sourceName }
                    rules={ [
                      {
                        required: true,
                        message: 'Source cannot be blank!'
                      },
                    ] }
                  >
                    <Select
                      showSearch
                      allowClear
                      ref={ sourceRef }
                      className='normal' disabled={ isDisabled }
                      defaultValue={ sourceName }
                      value={ sourceName }
                      onChange={ (value) => onSelectSource(value) }
                      filterOption={ (input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      { sourcesOpt }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="catSubCode"
                    label="Category Sub Code"
                    initialValue={ categorySubCodeName }
                    rules={ [
                      {
                        required: true,
                        message: 'Category Sub Code cannot be blank!'
                      },
                    ] }
                  >
                    <Select
                      showSearch
                      allowClear
                      disabled={ isDisabled || !categoryCode }
                      ref={ catSubCodeRef }
                      className='normal'
                      defaultValue={ categorySubCodeName }
                      value={ categorySubCodeName }
                      onChange={ (value) => onSelectSubCategoryCode(value) }
                      filterOption={ (input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      { subCategoriesOpt }
                    </Select>
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="partNum"
                    label="Part No"

                  >
                    <Input
                      className='normal'
                      maxLength={ 60 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ partNo }
                      value={ partNo }
                      onChange={ e => setPartNo(e.target.value.toUpperCase()) }
                      placeholder='Type part no here...'
                    />
                  </Form.Item>

                  <Form.Item
                    name="alternate"
                    label="Alternate"
                  >
                    <Input disabled />
                  </Form.Item>
                </div>

                <div className="row">
                  <Form.Item
                    name="moistureLevel"
                    label="Moisture Sensitivity Level"

                  >
                    <Select
                      showSearch
                      allowClear
                      className='normal' disabled={ isDisabled }
                      defaultValue={ mslCodeName }
                      value={ mslCodeName }
                      onChange={ (value) => onSelectMsl(value) }
                      filterOption={ (input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      { mslOpt }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="closure"
                    label="Closure"

                  >
                    <Select
                      className='normal' disabled={ isDisabled }

                      defaultValue={ openClose }
                      value={ openClose }
                      onChange={ value => setOpenClose(value) }
                      allowClear
                    >
                      <Option value="CLOSED">Closed</Option>
                    </Select>
                  </Form.Item>

                </div>

                <div className="row">
                  <Form.Item
                    name="refUrl"
                    label="Reference Url"

                  >
                    <Input
                      className='normal'
                      maxLength={ 200 }
                      // style={ { textTransform: 'uppercase' } }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ refUrl }
                      value={ refUrl }
                      onChange={ e => setRefUrl(e.target.value.toUpperCase()) }

                    />
                  </Form.Item>

                  <Form.Item
                    name="closedDate"
                    label="Closed Date"
                  // rules={ [
                  //   {
                  //     required: true,
                  //   },
                  // ] }
                  >
                    <Input disabled />
                  </Form.Item>
                </div>

                <Form.Item
                  name="desc"
                  label="Description"
                >
                  <Input
                    className='normal'
                    maxLength={ 100 }
                    style={ { textTransform: 'uppercase' } }
                    disabled={ isDisabled }
                    defaultValue={ description }
                    value={ description }
                    onChange={ e => setDescription(e.target.value.toUpperCase()) }

                  />
                </Form.Item>

              </div>

              <div className="group">
                <Form.Item
                  name="manufacturer"
                  label="Manufacturer"
                >
                  <Input
                    className='normal'
                    maxLength={ 30 }
                    style={ { textTransform: 'uppercase' } }
                    disabled={ isDisabled }
                    defaultValue={ manufacturer }
                    value={ manufacturer }
                    onChange={ e => setManufacturer(e.target.value.toUpperCase()) }
                  />
                </Form.Item>

                <div className="row">
                  <Form.Item
                    name="uom"
                    label="UOM"
                  >
                    <Select
                      showSearch
                      allowClear
                      className='normal' disabled={ isDisabled }
                      defaultValue={ uomName }
                      value={ uomName }

                      onChange={ (value) => onSelectUOM(value) }
                      filterOption={ (input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      { uomOpt }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="replace"
                    label="Replace"
                  // rules={ [
                  //   {
                  //     required: true,
                  //   },
                  // ] }
                  >
                    <Input
                      className='normal'
                      maxLength={ 15 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ obsoleteItem }
                      value={ obsoleteItem }
                      onChange={ e => setObsoleteItem(e.target.value.toUpperCase()) }
                    />
                  </Form.Item>
                </div>

                <div className="row">
                  <Form.Item
                    name="productGroup"
                    label="Product Group"

                  >
                    <Input
                      className='normal'
                      maxLength={ 10 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ productGroup }
                      value={ productGroup }
                      onChange={ e => setProductGroup(e.target.value.toUpperCase()) }

                    />
                  </Form.Item>

                  <Form.Item
                    name="Obsolescent"
                    label="Obsolescent"
                  // rules={ [
                  //   {
                  //     required: true,
                  //   },
                  // ] }
                  >
                    <Select
                      className='normal' disabled={ isDisabled }
                      defaultValue={ obsoleteCode }
                      value={ obsoleteCode }
                      onChange={ value => { setObsoleteCode(value); setObsoleteItem(value); } }
                      allowClear
                    >
                      <Option value="OBSOLETE">Obsolete</Option>
                    </Select>
                  </Form.Item>

                </div>

                <div className="row">
                  <Form.Item
                    name="issueNo"
                    label="Issue No"
                  >
                    <Input
                      className='normal'
                      maxLength={ 30 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ issueNo }
                      value={ issueNo }
                      onChange={ e => setIssueNo(e.target.value.toUpperCase()) }

                    />
                  </Form.Item>

                  <Form.Item
                    name="obsoletedDate"
                    label="Obsoleted Date"
                  >
                    <Input disabled />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="revisionNum"
                    label="Revision No"
                  >
                    <Input
                      className='normal'
                      maxLength={ 3 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ rev }
                      value={ rev }
                      onChange={ e => setRev(e.target.value.toUpperCase()) }

                    />
                  </Form.Item>
                </div>
              </div>

              <div className="group">
                <Form.Item
                  name="boardSize"
                  label="Board Size"
                >
                  <Input
                    className='normal'
                    maxLength={ 60 }
                    style={ { textTransform: 'uppercase' } }
                    disabled={ isDisabled }
                    defaultValue={ dimension }
                    value={ dimension }
                    onChange={ e => setDimension(e.target.value.toUpperCase()) }

                  />
                </Form.Item>

                <Form.Item
                  name="remark"
                  label="Remark"
                >
                  <Input
                    className='normal'
                    maxLength={ 2000 }
                    style={ { textTransform: 'uppercase' } }
                    disabled={ isDisabled }
                    defaultValue={ remarks }
                    value={ remarks }
                    onChange={ e => setRemarks(e.target.value.toUpperCase()) }

                  />
                </Form.Item>

                <div className="row">
                  <Form.Item
                    name="stdMaterialPrice"
                    label="Std Material Price"
                  >
                    <InputNumber
                      className='right'
                      min={ 0 }
                      max={ 9999999991 }
                      step="0.0001"
                      stringMode
                      maxLength={ 18 }
                      disabled={ true }
                      defaultValue={ stdMaterial }
                      value={ stdMaterial }
                      onChange={ e => setStdMaterial(e.target.value) }
                    />
                  </Form.Item>

                  <Form.Item
                    name="storageLoc"
                    label="Storage Location"
                  >
                    <Input
                      className='normal'
                      maxLength={ 15 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ storageShelf }
                      value={ storageShelf }
                      onChange={ e => setStorageShelf(e.target.value.toUpperCase()) }

                    />
                  </Form.Item>
                </div>
              </div>

              <div className="group">
                <div className="row">
                  <Form.Item
                    name="balBFQty"
                    label="Bal BF Qty"
                    initialValue={ balbfQty }
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (Number(balbfQty).countDecimals() > 4) {
                            return Promise.reject(new Error('Bal BF Qty decimal length must be less than 4 digits '));
                          } else if (Number(balbfQty) < 0) {
                            return Promise.reject(new Error('Bal BF Qty cannot be negative'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <InputNumber
                      min={ 0 }
                      max={ 9999999991 }
                      step="0.0001"
                      maxLength={ 18 }
                      className='normal right'
                      readOnly
                      disabled={ isDisabled }
                      defaultValue={ balbfQty }
                      value={ balbfQty }
                      onChange={ e => { console.log('e :>> ', e); setBalbfQty(parseFloat(e)); } }

                    />
                  </Form.Item>

                  <Form.Item
                    name="QtyOnHand"
                    label="QTY On Hand +"
                    initialValue={ qtyOnHand }
                  >
                    <InputNumber
                      step="0.0001"
                      className='normal right'
                      readOnly
                      disabled={ true }
                      defaultValue={ qtyOnHand }
                      value={ qtyOnHand }
                    />
                  </Form.Item>

                </div>
                <div className="row">
                  <Form.Item
                    name="reorderQty"
                    label="Reorder Qty"
                    initialValue={ reorder }
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (Number(reorder).countDecimals() > 4) {
                            return Promise.reject(new Error('Decimal length must be less than 4 digits '));
                          } else if (Number(reorder) < 0) {
                            return Promise.reject(new Error('Cannot be negative'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <InputNumber
                      min={ 0 }
                      max={ 9999999990 }
                      step="0.0001"
                      maxLength={ 18 }
                      className='normal right'
                      disabled={ isDisabled }
                      defaultValue={ reorder }
                      value={ reorder }
                      onChange={ e => setReorder(parseFloat(e)) }
                    />
                  </Form.Item>

                  <Form.Item
                    name="reservedQty"
                    label="Reserved QTY -"
                  >
                    <InputNumber
                      step="0.0001"
                      className='normal right'
                      readOnly
                      disabled={ true }
                      defaultValue={ qtyReserved }
                      value={ qtyReserved }
                    />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="leadTime"
                    label="Lead Time"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (Number(leadtime) < 0) {
                            return Promise.reject(new Error('Cannot be negative'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <InputNumber
                      min={ 0 }
                      max={ 9999 }
                      stringMode
                      maxLength={ 4 }
                      className='normal right'
                      disabled={ isDisabled }
                      defaultValue={ leadtime }
                      value={ leadtime }
                      onChange={ e => setLeadtime(e) }

                    />
                  </Form.Item>

                  <Form.Item
                    name="orderQty"
                    label="Order QTY +"
                  >
                    <InputNumber className='right' step="0.0001" min={ 0 } disabled={ true } defaultValue={ orderQty } value={ orderQty } onChange={ e => setOrderQty(e.target.value) } placeholder='Type order qty here...' />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="Requestor"
                    label="Requestor"
                  >
                    <Input
                      className='normal'
                      maxLength={ 30 }
                      style={ { textTransform: 'uppercase' } }
                      disabled={ isDisabled }
                      defaultValue={ requestor }
                      value={ requestor }
                      onChange={ e => setRequestor(e.target.value.toUpperCase()) }

                    />
                  </Form.Item>

                  <Form.Item
                    name="EOH ="
                    label="EOH ="
                  >
                    <Input disabled={ true } className='right' />
                  </Form.Item>
                </div>
                {
                  id &&
                  <div className="row">
                    <Form.Item
                      name="Last Modified Date"
                      label="Last Modified Date"
                    >
                      <Input defaultValue={ lastModified } value={ lastModified } disabled />
                    </Form.Item>
                  </div>
                }
                <div className="row">
                  <Form.Item
                    name={ isEdit ? "Edit User" : "Entry User" }
                    label={ isEdit ? "Edit User" : "Entry User" }
                  >
                    <Input defaultValue={ entryUser } value={ entryUser } disabled />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name={ isEdit ? "Edit Date" : "Entry Date" }
                    label={ isEdit ? "Edit Date" : "Entry Date" }
                  >
                    <Input defaultValue={ entryDate } value={ entryDate } disabled />
                  </Form.Item>
                </div>
              </div>

              {
                (!id || isEdit) &&
                <div className="submit">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {
                        isEdit
                          ?
                          "Update Item"
                          :
                          "Create Item"
                      }
                    </Button>
                  </Form.Item>
                </div>
              }

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/items`) } type="primary" htmlType="submit">
                    Back To Items
                  </Button>
                </Form.Item>
              </div>
            </Form>
        }
      </div >
    </StyledDiv >
  );
};

export default FormPage;
