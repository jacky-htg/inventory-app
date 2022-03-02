import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, Checkbox, AutoComplete, message } from 'antd';
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

  const [balbfQty, setBalbfQty] = useState(0);
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
  const [sourceName, setSourceName] = useState();
  const [status, setStatus] = useState('ACTIVE');
  const [stdMaterial, setStdMaterial] = useState(0);
  const [storageShelf, setStorageShelf] = useState('');
  const [uom, setUom] = useState('');
  const [uomName, setUomName] = useState();
  const [version, setVersion] = useState(0);

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
  }, [id, locData, itemCategoriesData, mslData, sourcesData, uomData]);

  useEffect(() => {
    let data = Location.list({});
    data.then(result => {
      console.log('location :>> ', result.rows);
      setLocData(result.rows);

      let temp = [];
      result.rows.forEach(el => {
        temp.push(<Option key={ el.loc } value={ el.loc } >{ el.loc }</Option>);
      });

      /*result.rows.forEach(el => {
        temp.push({
          value: el.loc
        });
      });*/
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
        /*temp.push({
          value: el.description,
          // code: el.code
        });*/
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
        /*temp.push({
          value: el.subtypeDesc,
          // code: el.code
        });*/
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
        /*temp.push({
          value: el.codeDesc,
          // code: el.code
        });*/
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
        /*temp.push({
          value: el.codeDesc,
          // code: el.code
        });*/
        temp.push(<Option key={ el.codeDesc } value={ el.codeDesc } >{ el.codeDesc }</Option>);
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
      // let obj = {
      //   balbfQty: 0,
      //   categoryCode: "string",
      //   categorySubCode: "string",
      //   description: "string",
      //   dimension: "string",
      //   issueNo: "string",
      //   itemNo: "string",
      //   leadtime: 0,
      //   loc: "string",
      //   manufacturer: "string",
      //   mslCode: "string",
      //   obsoleteCode: "OBSOLETE",
      //   obsoleteItem: "string",
      //   openClose: "CLOSED",
      //   orderQty: 0,
      //   partNo: "string",
      //   prodnResv: 0,
      //   productGroup: "string",
      //   qoh: 0,
      //   qryObsItem: "string",
      //   refUrl: "string",
      //   remarks: "string",
      //   reorder: 0,
      //   requestor: "string",
      //   rev: "string",
      //   rohsStatus: true,
      //   source: "string",
      //   status: "ACTIVE",
      //   stdMaterial: 0,
      //   storageShelf: "string",
      //   uom: "string",
      //   version: 0
      // };
      console.log('obj :>> ', obj);
      if (isEdit) {
        obj.version = parseInt(version);
        const hasil = await Item.edit(id, obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message);
        }
      } else {
        const hasil = await Item.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          message.error(res.message);
        }
      }
      history.push('/items');
    } catch (errorInfo) {
      const temp = [];
      errorInfo.errorFields.map(e => {
        temp.push(e.name[0]);
      });
      setErrorFields(temp);
      console.log('Failed:', errorInfo, errorFields);
    }
  };

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
            <Form onFinish={ submit } onFinishFailed={ formFailedSubmit } form={ form } name="control-hooks" scrollToFirstError>
              <div className="group">
                <div className="row">
                  {
                    !itemNo && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="Item No"
                        label="Item No"
                        initialValue={ itemNo }
                        normalize={ value => (value || '').toUpperCase() }
                        rules={ [
                          {
                            required: true,
                            message: 'Item No Can Not be Blank !'
                          },
                        ] }
                      >
                        <Input
                          autoFocus={ true }
                          maxLength={ 15 }
                          ref={ itemNoRef }
                          normalize={ value => (value || '').toUpperCase() }
                          className='normal'
                          disabled={ isDisabled }
                          defaultValue={ itemNo }
                          value={ itemNo }
                          onChange={ e => setItemNo(e.target.value.toUpperCase()) }
                          placeholder='Type item no here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <Form.Item
                        name="rohs"
                        label='RoHS Status'
                      >
                        <Input className='normal' disabled={ isDisabled } defaultValue={ rohsStatus ? 'True' : 'False' } />
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
                  {
                    !loc && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="Location"
                        label="Location"
                        initialValue={ loc }
                        rules={ [
                          {
                            required: true,
                            message: 'Location Can Not be Blank !'
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
                          placeholder="Please select"
                          onChange={ (value) => setLoc(value) }
                          filterOption={ (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          { locOpt }
                        </Select>
                      </Form.Item>
                  }

                  {
                    !categoryName && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="catCode"
                        label="Category Code"
                        initialValue={ categoryName }
                        rules={ [
                          {
                            required: true,
                            message: 'Category Code Can Not be Blank !'
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
                          placeholder="Please select"
                          onChange={ (value) => onSelectCategoryCode(value) }
                          filterOption={ (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          { itemCategoriesOpt }
                        </Select>
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !sourceName && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="source"
                        label="Source"
                        initialValue={ sourceName }
                        rules={ [
                          {
                            required: true,
                            message: 'Source Can Not be Blank !'
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
                          placeholder="Please select"
                          onChange={ (value) => onSelectSource(value) }
                          filterOption={ (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          { sourcesOpt }
                        </Select>
                      </Form.Item>
                  }

                  {
                    !categorySubCodeName && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="catSubCode"
                        label="Category Sub Code"
                        initialValue={ categorySubCodeName }
                        rules={ [
                          {
                            required: true,
                            message: 'Category Sub Code Can Not be Blank !'
                          },
                        ] }
                      >
                        <AutoComplete
                          ref={ catSubCodeRef }
                          disabled={ isDisabled || !categoryCode }
                          defaultValue={ categorySubCodeName }
                          value={ categorySubCodeName }
                          options={ subCategoriesOpt }
                          onSelect={ onSelectSubCategoryCode }
                          placeholder={ "Type sub category here..." }
                          filterOption={ (inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !partNo && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="partNum"
                        label="Part No"

                      >
                        <Input
                          className='normal'
                          maxLength={ 60 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ partNo }
                          value={ partNo }
                          onChange={ e => setPartNo(e.target.value.toUpperCase()) }
                          placeholder='Type part no here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="alternate"
                        label="Alternate"
                      >
                        <Input disabled />
                      </Form.Item>
                  }
                </div>

                <div className="row">
                  {
                    !mslCodeName && id && !isEdit
                      ?
                      <></>
                      :
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
                          placeholder="Please select"
                          onChange={ (value) => onSelectMsl(value) }
                          filterOption={ (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          { mslOpt }
                        </Select>
                      </Form.Item>
                  }

                  {
                    !openClose && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="closure"
                        label="Closure"

                      >
                        <Select
                          className='normal' disabled={ isDisabled }
                          placeholder="Select an option"
                          defaultValue={ openClose }
                          value={ openClose }
                          onChange={ value => setOpenClose(value) }
                          allowClear
                        >
                          <Option value="CLOSED">Closed</Option>
                        </Select>
                      </Form.Item>
                  }

                </div>

                <div className="row">
                  {
                    !refUrl && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="refUrl"
                        label="Reference Url"

                      >
                        <Input
                          className='normal'
                          maxLength={ 200 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ refUrl }
                          value={ refUrl }
                          onChange={ e => setRefUrl(e.target.value.toUpperCase()) }
                          placeholder='Type refUrl here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
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
                  }
                </div>

                {
                  !description && id && !isEdit
                    ?
                    <></>
                    :
                    <Form.Item
                      name="desc"
                      label="Description"
                    >
                      <Input
                        className='normal'
                        maxLength={ 100 }
                        normalize={ value => (value || '').toUpperCase() }
                        disabled={ isDisabled }
                        defaultValue={ description }
                        value={ description }
                        onChange={ e => setDescription(e.target.value.toUpperCase) }
                        placeholder='Type description here...'
                      />
                    </Form.Item>
                }

              </div>

              <div className="group">
                {
                  !manufacturer && id && !isEdit
                    ?
                    <></>
                    :
                    <Form.Item
                      name="manufacturer"
                      label="Manufacturer"
                    >
                      <Input
                        className='normal'
                        maxLength={ 30 }
                        normalize={ value => (value || '').toUpperCase() }
                        disabled={ isDisabled }
                        defaultValue={ manufacturer }
                        value={ manufacturer }
                        onChange={ e => setManufacturer(e.target.value.toUpperCase) }
                        placeholder='Type manufacturer here...'
                      />
                    </Form.Item>
                }

                <div className="row">
                  {
                    !uomName && id && !isEdit
                      ?
                      <></>
                      :
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
                          placeholder="Please select"
                          onChange={ (value) => onSelectUOM(value) }
                          filterOption={ (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          { uomOpt }
                        </Select>
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="replace"
                        label="Replace"
                      // rules={ [
                      //   {
                      //     required: true,
                      //   },
                      // ] }
                      >
                        <Input className='normal' disabled={ isDisabled } />
                      </Form.Item>
                  }
                </div>

                <div className="row">
                  {
                    !productGroup && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="productGroup"
                        label="Product Group"

                      >
                        <Input
                          className='normal'
                          maxLength={ 10 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ productGroup }
                          value={ productGroup }
                          onChange={ e => setProductGroup(e.target.value.toUpperCase()) }
                          placeholder='Type product group here...'
                        />
                      </Form.Item>
                  }

                  {
                    !obsoleteCode && id && !isEdit
                      ?
                      <></>
                      :
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
                          placeholder="Select an option"
                          defaultValue={ obsoleteCode }
                          value={ obsoleteCode }
                          onChange={ value => setObsoleteCode(value) }
                          allowClear
                        >
                          <Option value="OBSOLETE">Obsolete</Option>
                        </Select>
                      </Form.Item>
                  }

                </div>

                <div className="row">
                  {
                    !issueNo && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="issueNo"
                        label="Issue No"
                      >
                        <Input
                          className='normal'
                          maxLength={ 30 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ issueNo }
                          value={ issueNo }
                          onChange={ e => setIssueNo(e.target.value.toUpperCase()) }
                          placeholder='Type issue no here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="obsoletedDate"
                        label="Obsoleted Date"
                      >
                        <Input disabled />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !rev && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="revisionNum"
                        label="Revision No"
                      >
                        <Input
                          className='normal'
                          maxLength={ 3 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ rev }
                          value={ rev }
                          onChange={ e => setRev(e.target.value.toUpperCase()) }
                          placeholder='Type revision no here...'
                        />
                      </Form.Item>
                  }
                </div>
              </div>

              <div className="group">
                {
                  !dimension && id && !isEdit
                    ?
                    <></>
                    :
                    <Form.Item
                      name="boardSize"
                      label="Board Size"
                    >
                      <Input
                        className='normal'
                        maxLength={ 60 }
                        normalize={ value => (value || '').toUpperCase() }
                        disabled={ isDisabled }
                        defaultValue={ dimension }
                        value={ dimension }
                        onChange={ e => setDimension(e.target.value.toUpperCase()) }
                        placeholder='Type board size here...'
                      />
                    </Form.Item>
                }

                {
                  !remarks && id && !isEdit
                    ?
                    <></>
                    :
                    <Form.Item
                      name="remark"
                      label="Remark"
                    >
                      <Input
                        className='normal'
                        maxLength={ 2000 }
                        normalize={ value => (value || '').toUpperCase() }
                        disabled={ isDisabled }
                        defaultValue={ remarks }
                        value={ remarks }
                        onChange={ e => setRemarks(e.target.value.toUpperCase()) }
                        placeholder='Type remark here...'
                      />
                    </Form.Item>
                }

                <div className="row">
                  {
                    !stdMaterial && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="stdMaterialPrice"
                        label="Std Material Price"
                      >
                        <InputNumber
                          min={ 0 }
                          max={ 9999999991 }
                          step="0.0001"
                          stringMode
                          maxLength={ 18 }
                          disabled={ true }
                          defaultValue={ stdMaterial }
                          value={ stdMaterial }
                          onChange={ e => setStdMaterial(e.target.value) }
                          placeholder='Type Std Material Price here...' />
                      </Form.Item>
                  }

                  {
                    !storageShelf && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="storageLoc"
                        label="Storage Location"
                      >
                        <Input
                          className='normal'
                          maxLength={ 15 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ storageShelf }
                          value={ storageShelf }
                          onChange={ e => setStorageShelf(e.target.value.toUpperCase()) }
                          placeholder='Type storage location here...'
                        />
                      </Form.Item>
                  }
                </div>
              </div>

              <div className="group">
                <div className="row">
                  {
                    !balbfQty && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="balBFQty"
                        label="Bal BF Qty"

                      >
                        <InputNumber
                          min={ 0 }
                          max={ 9999999991 }
                          step="0.0001"
                          stringMode
                          maxLength={ 18 }
                          className='normal'
                          disabled={ isDisabled }
                          defaultValue={ balbfQty }
                          value={ balbfQty }
                          onChange={ e => setBalbfQty(e.target.value) }
                          placeholder='Type bal bf qty here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="QtyOnHand"
                        label="QTY On Hand +"
                      >
                        <Input disabled={ true } />
                      </Form.Item>
                  }

                </div>
                <div className="row">
                  {
                    !reorder && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="reorderQty"
                        label="Reorder Qty"

                      >
                        <InputNumber
                          min={ 0 }
                          max={ 9999999991 }
                          step="0.0001"
                          stringMode
                          maxLength={ 18 }
                          className='normal'
                          disabled={ isDisabled }
                          defaultValue={ reorder }
                          value={ reorder }
                          onChange={ e => setReorder(e.target.value) }
                          placeholder='Type reorder qty here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="reservedQty"
                        label="Reserved QTY -"
                      >
                        <Input disabled={ true } />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !leadtime && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="leadTime"
                        label="Lead Time"

                      >
                        <InputNumber
                          min={ 0 }
                          max={ 9999 }
                          stringMode
                          maxLength={ 4 }
                          className='normal'
                          disabled={ isDisabled }
                          defaultValue={ leadtime }
                          value={ leadtime }
                          onChange={ e => setLeadtime(e.target.value) }
                          placeholder='Type lead time here...'
                        />
                      </Form.Item>
                  }

                  {
                    !orderQty && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="orderQty"
                        label="Order QTY +"
                      >
                        <Input type='number' min={ 0 } disabled={ true } defaultValue={ orderQty } value={ orderQty } onChange={ e => setOrderQty(e.target.value) } placeholder='Type order qty here...' />
                      </Form.Item>
                  }
                </div>
                <div className="row">
                  {
                    !requestor && id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="Requestor"
                        label="Requestor"
                      >
                        <Input
                          className='normal'
                          maxLength={ 30 }
                          normalize={ value => (value || '').toUpperCase() }
                          disabled={ isDisabled }
                          defaultValue={ requestor }
                          value={ requestor }
                          onChange={ e => setRequestor(e.target.value.toUpperCase()) }
                          placeholder='Type requestor here...'
                        />
                      </Form.Item>
                  }

                  {
                    id && !isEdit
                      ?
                      <></>
                      :
                      <Form.Item
                        name="EOH ="
                        label="EOH ="
                      >
                        <Input disabled={ true } />
                      </Form.Item>
                  }
                </div>
                {
                  id &&
                  <div className="row">
                    <Form.Item
                      name="Last Modified Date"
                      label="Last Modified Date"
                    >
                      <Input disabled />
                    </Form.Item>
                  </div>
                }
                <div className="row">
                  <Form.Item
                    name={ isEdit ? "Edit User" : "Entry User" }
                    label={ isEdit ? "Edit User" : "Entry User" }
                  >
                    <Input disabled />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name={ isEdit ? "Edit Date" : "Entry Date" }
                    label={ isEdit ? "Edit Date" : "Entry Date" }
                  >
                    <Input disabled />
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
                          "Edit Item"
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
