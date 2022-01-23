import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  AutoComplete,
  message,
} from "antd";
import { MdAddCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import moment from "moment";

function GrnDetail(props) {
  let { el, idx, uomOpt, changeDetail, addNewDetail, deleteDetail, onSearchPress, details } = props;

  return (
    <div key={ idx } className="detail-card">
      <div className="border">
        <div className="row2">
          <div className="dual">
            {
              <Form.Item name="SN" label="SN">
                <Input
                  className="smallInput"
                  defaultValue={ idx + 1 }
                  value={ idx + 1 }
                  onChange={ (e) => changeDetail(idx, "sn", e.target.value) }
                  placeholder="Type SN here..."
                />
              </Form.Item>
            }

            {
              <Form.Item name="Type" label="Type">
                <Select
                  className="smallInput"
                  style={ { width: "70px" } }
                  onChange={ (value) => changeDetail(idx, "itemType", value) }
                  placeholder="..."
                >
                  <Option value={ 0 }>0</Option>
                  <Option value={ 1 }>1</Option>
                </Select>
              </Form.Item>
            }
          </div>

          <div className="dual">
            {
              <Form.Item name="UOM" label="UOM">
                <AutoComplete
                  className="smallInput"
                  // defaultValue={ el.uom }
                  value={ el.uom }
                  options={ uomOpt }
                  onSelect={ (data) => changeDetail(idx, "uom", data) }
                  placeholder={ "Select UOM.." }
                  filterOption={ (inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            }

            {
              <Form.Item name="MSL" label="MSL">
                <Input
                  disabled
                  className="smallInput"
                  defaultValue={ el.msl }
                  value={ el.msl }
                  onChange={ (e) => changeDetail(idx, "msl", e.target.value) }
                  placeholder="Insert MSL here..."
                />
              </Form.Item>
            }
          </div>

          <div className="dual">
            {
              <Form.Item
                name="Recd Price"
                label="Recd Price"
                rules={ [
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value > 0) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Price must be more than 0")
                      );
                    },
                  }),
                ] }
              >
                <Input
                  type="number"
                  className="smallInput"
                  defaultValue={ el.recdPrice }
                  value={ el.recdPrice }
                  onChange={ (e) =>
                    changeDetail(idx, "recdPrice", parseFloat(e.target.value))
                  }
                  placeholder="Type Recd Price here..."
                />
              </Form.Item>
            }

            {
              <Form.Item
                name="Recd Qty"
                label="Recd Qty"
                rules={ [
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value > 0) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("QTY must be more than 0")
                      );
                    },
                  }),
                ] }
              >
                <Input
                  type={ "number" }
                  className="smallInput"
                  defaultValue={ el.recdQty }
                  value={ el.recdQty }
                  onChange={ (e) =>
                    changeDetail(idx, "recdQty", parseFloat(e.target.value))
                  }
                  placeholder="Type Recd Qty here..."
                />
              </Form.Item>
            }
          </div>
        </div>

        <div className="row2">
          {
            <Form.Item name="Item No" label="Item No">
              <Input
                defaultValue={ el.itemNo }
                value={ el.itemNo }
                onChange={ (e) => onSearchPress(idx, "itemNo", e.target.value) }
                placeholder="Type item no here..."
              />
            </Form.Item>
          }

          {
            <Form.Item name="Loc" label="Loc">
              <AutoComplete
                disabled
                defaultValue={ el.loc }
                value={ el.loc }
                options={ [] }
                // onSelect={ (data) => setLoc(data) }
                placeholder={ "Select loc.." }
                filterOption={ (inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          }

          <div className="dual">
            {
              <Form.Item
                name="QTY/Label"
                label="QTY/Label"
                rules={ [
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value > 0 && value <= getFieldValue("Recd Qty")) {
                        return Promise.resolve();
                      }

                      if (!value || value === 0) {
                        return Promise.reject(
                          new Error("QTY/Label must more than 0")
                        );
                      }

                      if (value > getFieldValue("GRN Qty")) {
                        return Promise.reject(
                          new Error("QTY/Label can't be more than Recd QTY")
                        );
                      }
                    },
                  }),
                ] }
              >
                <Input
                  type="number"
                  className="smallInput"
                  defaultValue={ el.qtyLabel }
                  value={ el.qtyLabel }
                  onChange={ (e) =>
                    changeDetail(idx, "qtyLabel", parseFloat(e.target.value))
                  }
                  placeholder="Type Qty/Label here..."
                />
              </Form.Item>
            }

            {
              <Form.Item
                name="Date Code"
                label="Date Code"
                rules={ [
                  {
                    required: false,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      // if ()
                      if (value) {
                        let year = "";
                        let week = "";
                        let maxWeek = 53;
                        let flag = false;

                        value.split("").forEach((el, id) => {
                          if (id < 2) {
                            year += el;
                          } else {
                            week += el;
                          }
                        });

                        // year = parseInt(year);
                        // week = parseInt(week);

                        let momentYear = "";
                        (moment().year() + "").split("").forEach((el, id) => {
                          if (id > 1) {
                            momentYear += el;
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

                        if (!value || flag) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error("Datecode not valid"));
                      }
                    },
                  }),
                ] }
              >
                <Input
                  className="smallInput"
                  defaultValue={ el.dateCode }
                  value={ el.dateCode }
                  onChange={ (e) =>
                    changeDetail(idx, "dateCode", e.target.value)
                  }
                  placeholder="Insert Date Code here..."
                />
              </Form.Item>
            }
          </div>
        </div>

        <div className="row2">
          {
            <Form.Item name="Part No" label="Part No">
              <Input
                className="smallInput"
                defaultValue={ el.partNo }
                value={ el.partNo }
                onChange={ (e) => onSearchPress(idx, "partNo", e.target.value) }
                placeholder="Type Part No here..."
              />
            </Form.Item>
          }

          <div className="dual">
            {
              <Form.Item name="Project No" label="Project No">
                <Input
                  className="smallInput"
                  defaultValue={ el.projectNo }
                  value={ el.projectNo }
                  onChange={ (e) =>
                    changeDetail(idx, "projectNo", e.target.value)
                  }
                  placeholder="Type Project No here..."
                />
              </Form.Item>
            }

            {
              <Form.Item name="PO No" label="PO No">
                <Input
                  className="smallInput"
                  defaultValue={ el.poNo }
                  value={ el.poNo }
                  onChange={ (e) => changeDetail(idx, "poNo", e.target.value) }
                  placeholder="Insert PO No here..."
                />
              </Form.Item>
            }
          </div>
        </div>
        <div className="row">
          {
            <Form.Item name="Description" label="Description">
              <Input
                className="smallInput"
                defaultValue={ el.description }
                value={ el.description }
                onChange={ (e) =>
                  changeDetail(idx, "description", e.target.value)
                }
                placeholder="Type description here..."
              />
            </Form.Item>
          }

          {
            <Form.Item name="Remarks" label="Remarks">
              <Input
                className="smallInput"
                defaultValue={ el.remarks }
                value={ el.remarks }
                onChange={ (e) => changeDetail(idx, "remarks", e.target.value) }
                placeholder="Type remarks here..."
              />
            </Form.Item>
          }
        </div>
      </div>

      <div className="actions">
        { details.length > 1 && (
          <TiDelete color="red" size={ 30 } onClick={ () => deleteDetail(idx) } />
        ) }
        { idx === details.length - 1 && (
          <MdAddCircle color="#1990ff" size={ 24 } onClick={ addNewDetail } />
        ) }
      </div>
    </div>
  );
}

export default GrnDetail;
