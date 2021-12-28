import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Lov, Location, Item } from '../../services';

import { StyledDiv } from './styled';
import env from '../../env';
import { Images } from '../../constant';

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

  useEffect(() => {
    let data = Location.list({});
    data.then(result => {
      if (result.status && result.status !== 200) {
        message.error(result.error);
      }
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
        balbfQty,
        categoryCode,
        categorySubCode,
        description,
        dimension,
        issueNo,
        itemNo,
        leadtime,
        loc,
        manufacturer,
        mslCode,
        obsoleteCode,
        obsoleteItem,
        openClose,
        orderQty,
        partNo,
        prodnResv,
        productGroup,
        qoh,
        qryObsItem,
        refUrl,
        remarks,
        reorder,
        requestor,
        rev,
        rohsStatus,
        source,
        status,
        stdMaterial,
        storageShelf,
        uom,
        version,
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
      Item.create(obj)
        .then(res => {
          history.push('/items');
        });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <StyledDiv>
      <div className="header">
        <h2>{ id ? id : "FORM_ID" }</h2>
        <h2>Item Master Maintenance</h2>
      </div>
      <div className="formWrapper">
        <Form form={ form } name="control-hooks">
          <div className="group">
            <div className="row">
              <Form.Item
                name="Item No"
                label="Item No"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input disabled={ isDisabled } defaultValue={ itemNo } value={ itemNo } onChange={ e => setItemNo(e.target.value) } placeholder='Type item no here...' />
              </Form.Item>
              <Form.Item
                name="rohs"
              // label="RoHS Status"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Checkbox checked={ rohsStatus } onChange={ e => setRohsStatus(e.target.checked) }>RoHS Status</Checkbox>
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Location"
                label="Location"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <AutoComplete
                  disabled={ isDisabled }
                  defaultValue={ loc }
                  value={ loc }
                  options={ locOpt }
                  onSelect={ data => setLoc(data) }
                  placeholder={ "Type loc here..." }
                  filterOption={ (inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item
                name="catCode"
                label="Category Code"
              >
                <AutoComplete
                  disabled={ isDisabled }
                  defaultValue={ categoryName }
                  value={ categoryName }
                  options={ itemCategoriesOpt }
                  onSelect={ onSelectCategoryCode }
                  placeholder={ "Type category code here..." }
                  filterOption={ (inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="source"
                label="Source"

              >
                <AutoComplete
                  disabled={ isDisabled }
                  defaultValue={ sourceName }
                  value={ sourceName }
                  options={ sourcesOpt }
                  onSelect={ onSelectSource }
                  placeholder={ "Type source here..." }
                  filterOption={ (inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item
                name="catSubCode"
                label="Category Sub Code"

              >
                <AutoComplete
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
            </div>
            <div className="row">
              <Form.Item
                name="partNum"
                label="Part No"

              >
                <Input disabled={ isDisabled } defaultValue={ partNo } value={ partNo } onChange={ e => setPartNo(e.target.value) } placeholder='Type part no here...' />
              </Form.Item>

              <Form.Item
                name="alternate"
                label="Alternate"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input disabled />
              </Form.Item>
            </div>

            <div className="row">
              <Form.Item
                name="moistureLevel"
                label="Moisture Sensitivity Level"

              >
                <AutoComplete
                  disabled={ isDisabled }
                  defaultValue={ mslCodeName }
                  value={ mslCodeName }
                  options={ mslOpt }
                  onSelect={ onSelectMsl }
                  placeholder={ "Type the level here..." }
                  filterOption={ (inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item
                name="closure"
                label="Closure"

              >
                <Select
                  placeholder="Select an option"
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
                <Input disabled={ isDisabled } defaultValue={ refUrl } value={ refUrl } onChange={ e => setRefUrl(e.target.value) } placeholder='Type refUrl here...' />
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
            // rules={ [
            //   {
            //     required: true,
            //   },
            // ] }
            >
              <Input disabled={ isDisabled } defaultValue={ description } value={ description } onChange={ e => setDescription(e.target.value) } placeholder='Type description here...' />
            </Form.Item>
          </div>

          <div className="group">
            <Form.Item
              name="manufacturer"
              label="Manufacturer"
            // rules={ [
            //   {
            //     required: true,
            //   },
            // ] }
            >
              <Input disabled={ isDisabled } defaultValue={ manufacturer } value={ manufacturer } onChange={ e => setManufacturer(e.target.value) } placeholder='Type manufacturer here...' />
            </Form.Item>

            <div className="row">
              <Form.Item
                name="uom"
                label="UOM"
              >
                <AutoComplete
                  disabled={ isDisabled }
                  defaultValue={ uomName }
                  value={ uomName }
                  options={ uomOpt }
                  onSelect={ onSelectUOM }
                  placeholder={ "Type uom here..." }
                  filterOption={ (inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
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
                <Input />
              </Form.Item>
            </div>

            <div className="row">
              <Form.Item
                name="productGroup"
                label="Product Group"

              >
                <Input disabled={ isDisabled } defaultValue={ productGroup } value={ productGroup } onChange={ e => setProductGroup(e.target.value) } placeholder='Type product group here...' />
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
                  placeholder="Select an option"
                  defaultValue={ obsoleteCode }
                  value={ obsoleteCode }
                  onChange={ value => setObsoleteCode(value) }
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
                <Input disabled={ isDisabled } defaultValue={ issueNo } value={ issueNo } onChange={ e => setIssueNo(e.target.value) } placeholder='Type issue no here...' />
              </Form.Item>

              <Form.Item
                name="obsoletedDate"
                label="Obsoleted Date"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input disabled />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="revisionNum"
                label="Revision No"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input disabled={ isDisabled } defaultValue={ rev } value={ rev } onChange={ e => setRev(e.target.value) } placeholder='Type revision no here...' />
              </Form.Item>
            </div>
          </div>

          <div className="group">
            <Form.Item
              name="boardSize"
              label="Board Size"
            // rules={ [
            //   {
            //     required: true,
            //   },
            // ] }
            >
              <Input disabled={ isDisabled } defaultValue={ dimension } value={ dimension } onChange={ e => setDimension(e.target.value) } placeholder='Type board size here...' />
            </Form.Item>

            <Form.Item
              name="remark"
              label="Remark"
            // rules={ [
            //   {
            //     required: true,
            //   },
            // ] }
            >
              <Input disabled={ isDisabled } defaultValue={ remarks } value={ remarks } onChange={ e => setRemarks(e.target.value) } placeholder='Type remark here...' />
            </Form.Item>

            <div className="row">
              <Form.Item
                name="stdMaterialPrice"
                label="Std Material Price"

              >
                <Input type='number' min={ 0 } disabled={ isDisabled } defaultValue={ stdMaterial } value={ stdMaterial } onChange={ e => setStdMaterial(e.target.value) } placeholder='Type Std Material Price here...' />
              </Form.Item>

              <Form.Item
                name="storageLoc"
                label="Storage Location"
              >
                <Input disabled={ isDisabled } defaultValue={ storageShelf } value={ storageShelf } onChange={ e => setStorageShelf(e.target.value) } placeholder='Type storage location here...' />
              </Form.Item>
            </div>
          </div>

          <div className="group">
            <div className="row">
              <Form.Item
                name="balBFQty"
                label="Bal BF Qty"

              >
                <Input type='number' min={ 0 } disabled={ isDisabled } defaultValue={ balbfQty } value={ balbfQty } onChange={ e => setBalbfQty(e.target.value) } placeholder='Type bal bf qty here...' />
              </Form.Item>

              <Form.Item
                name="QtyOnHand"
                label="QTY On Hand +"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="reorderQty"
                label="Reorder Qty"

              >
                <Input type='number' min={ 0 } disabled={ isDisabled } defaultValue={ reorder } value={ reorder } onChange={ e => setReorder(e.target.value) } placeholder='Type reorder qty here...' />
              </Form.Item>

              <Form.Item
                name="reservedQty"
                label="Reserved QTY -"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="leadTime"
                label="Lead Time"

              >
                <Input type='number' min={ 0 } disabled={ isDisabled } defaultValue={ leadtime } value={ leadtime } onChange={ e => setLeadtime(e.target.value) } placeholder='Type lead time here...' />
              </Form.Item>

              <Form.Item
                name="orderQty"
                label="Order QTY +"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input type='number' min={ 0 } disabled={ isDisabled } defaultValue={ orderQty } value={ orderQty } onChange={ e => setOrderQty(e.target.value) } placeholder='Type order qty here...' />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Requestor"
                label="Requestor"
              >
                <Input disabled={ isDisabled } defaultValue={ requestor } value={ requestor } onChange={ e => setRequestor(e.target.value) } placeholder='Type requestor here...' />
              </Form.Item>
              <Form.Item
                name="EOH ="
                label="EOH ="
              >
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Last Modified Date"
                label="Last Modified Date"
              >
                <Input disabled />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Entry User"
                label="Entry User"
              >
                <Input disabled />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Entry Date"
                label="Entry Date"
              >
                <Input disabled />
              </Form.Item>
            </div>
          </div>

          {
            (!id || isEdit) &&
            <div className="submit">
              <Form.Item>
                <Button onClick={ submit } type="primary" htmlType="submit">
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
        </Form>
      </div >
    </StyledDiv >
  );
};

export default FormPage;
