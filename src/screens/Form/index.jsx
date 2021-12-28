import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Country } from '../../services';

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
  const [isEdit, setIsEdit] = useState(query.get("edit") ? query.get('edit') === 'true' : false);


  const submit = () => {
    let obj = {
      balbfQty: 0,
      categoryCode: "string",
      categorySubCode: "string",
      description: "string",
      dimension: "string",
      issueNo: "string",
      itemNo: "string",
      leadtime: 0,
      loc: "string",
      manufacturer: "string",
      mslCode: "string",
      obsoleteCode: "OBSOLETE",
      obsoleteItem: "string",
      openClose: "CLOSED",
      orderQty: 0,
      partNo: "string",
      prodnResv: 0,
      productGroup: "string",
      qoh: 0,
      qryObsItem: "string",
      refUrl: "string",
      remarks: "string",
      reorder: 0,
      requestor: "string",
      rev: "string",
      rohsStatus: true,
      source: "string",
      status: "ACTIVE",
      stdMaterial: 0,
      storageShelf: "string",
      uom: "string",
      version: 0
    };
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
                name="itemNum"
                label="Item No"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                <Checkbox>RoHS Status</Checkbox>
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="loc"
                label="Location"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a location"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="catCode"
                label="Category Code"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a category"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="source"
                label="Source"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a source"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="catSubCode"
                label="Category Sub Code"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a category"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="source"
                label="Source"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a source"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="catSubCode"
                label="Category Sub Code"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a category sub"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="partNum"
                label="Part No"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select a level"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="closure"
                label="Closure"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select an option"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="row">
              <Form.Item
                name="refUrl"
                label="Reference Url"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
              <Input />
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
              <Input />
            </Form.Item>

            <div className="row">
              <Form.Item
                name="uom"
                label="UOM"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Select
                  placeholder="Select an option"
                  // onChange={  }
                  allowClear
                >
                  <Option value="male">value 1</Option>
                  <Option value="female">value 2</Option>
                  <Option value="other">value 3</Option>
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
                <Input />
              </Form.Item>
            </div>

            <div className="row">
              <Form.Item
                name="issueNo"
                label="Issue No"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                <Input />
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
              <Input />
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
              <Input />
            </Form.Item>

            <div className="row">
              <Form.Item
                name="stdMaterialPrice"
                label="Std Material Price"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="storageLoc"
                label="Storage Location"
              // rules={ [
              //   {
              //     required: true,
              //   },
              // ] }
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className="group">
            <div className="row">
              <Form.Item
                name="balBFQty"
                label="Bal BF Qty"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                name="loadTime"
                label="Load Time"
                rules={ [
                  {
                    required: true,
                  },
                ] }
              >
                <Input />
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
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Requestor"
                label="Requestor"
              >
                <Input />
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
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Entry User"
                label="Entry User"
              >
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="Entry Date"
                label="Entry Date"
              >
                <Input />
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
      </div>
    </StyledDiv>
  );
};

export default FormPage;
