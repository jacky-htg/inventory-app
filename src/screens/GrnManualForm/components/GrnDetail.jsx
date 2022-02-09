import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  AutoComplete,
  message,
  Collapse
} from "antd";
import { MdAddCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import moment from "moment";
import Collapsible from "react-collapsible";

function GrnDetail(props) {
  const { Panel } = Collapse;
  let { id, el, idx, uomOpt, changeDetail, addNewDetail, deleteDetail, onSearchPress, details, locOpt } = props;
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    console.log('el :>> ', el);
  }, [el]);


  const onSearchPress2 = field => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      let value = el[field];
      console.log('value :>> ', value);
    }
      , 1000));
  };

  return (
    <div className="detail-card">
      <div className="border">
        <Collapsible trigger={ `Serial Number: ${ idx + 1 }` }>
          <div className="inputs">
            <div className="row2">
              <div className="dual">
                {
                  <Form.Item name={ `sn[${ idx }]` } label="SN">
                    <Input
                      readOnly
                      disabled={ id }
                      className="smallInput"
                      defaultValue={ idx + 1 }
                      value={ idx + 1 }
                      onChange={ (e) => changeDetail(idx, "seqNo", e.target.value) }
                      placeholder="Type SN here..."
                    />
                  </Form.Item>
                }

                {
                  <Form.Item name={ `type[${ idx }]` } label="Type">
                    <Select
                      disabled={ id }
                      className="smallInput"
                      style={ { width: "70px" } }
                      onChange={ (value) => changeDetail(idx, "itemType", value) }
                      placeholder="..."
                      defaultValue={ el.itemType }
                    >
                      <Option value={ 0 }>0</Option>
                      <Option value={ 1 }>1</Option>
                    </Select>
                  </Form.Item>
                }
              </div>

              <div className="dual">
                {
                  <Form.Item name={ `uom[${ idx }]` } label="UOM">
                    <Select
                      disabled={ id }
                      showSearch
                      allowClear
                      className='normal smallInput'
                      defaultValue={ el.uom }
                      value={ el.uom }
                      options={ uomOpt }
                      onSelect={ (data) => changeDetail(idx, "uom", data) }
                      placeholder={ "Choose UOM..." }
                      filterOption={ (inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                      style={ { width: 'auto' } }
                    />
                    {/* <AutoComplete
                      className="smallInput"
                      style={{width: '125px'}}
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
                    /> */}
                  </Form.Item>
                }

                {
                  <Form.Item name={ `msl[${ idx }]` } label="MSL">
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
                    name={ `recdPrice[${ idx }]` }
                    label="Recd Price"
                    rules={ [
                      {
                        required: true,
                        message: "Price is required"
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
                      disabled={ id }
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
                    name={ `recdQty[${ idx }]` }
                    label="Recd Qty"
                    rules={ [
                      {
                        required: true,
                        message: "Recd Qty is required"
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
                      disabled={ id }
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
                <Form.Item name={ `itemNo[${ idx }]` } label="Item No">
                  <Input hidden />

                  <Input
                    disabled={ id }
                    defaultValue={ el.itemNo }
                    value={ el.itemNo }

                    onChange={ (e) => onSearchPress(idx, "itemNo", e.target.value) }
                    placeholder="Type item no here..."
                  />
                </Form.Item>
              }

              {
                <Form.Item name={ `loc[${ idx }]` } label="Loc">
                  <Input hidden />

                  <Select
                    disabled={ id }
                    showSearch
                    allowClear
                    className='normal smallInput'
                    defaultValue={ el.loc }
                    value={ el.loc }
                    options={ locOpt }
                    onSelect={ (data) => changeDetail(idx, "loc", data) }
                    placeholder={ "Choose Loc..." }
                    filterOption={ (inputValue, option) =>
                      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                  // style={ { width: 'auto' } }
                  />

                  {/* <AutoComplete
                    disabled
                    defaultValue={ el.loc }
                    value={ el.loc }
                    options={ [] }
                    onSelect={ (e) => changeDetail(idx, "loc", e.target.value) }
                    placeholder={ "Select loc.." }
                    filterOption={ (inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  /> */}
                </Form.Item>
              }

              <div className="dual">
                {
                  <Form.Item
                    name={ `qtyLabel[${ idx }]` }
                    label="QTY/Label"
                    rules={ [
                      {
                        required: true,
                        message: "QTY/Label is required"
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
                    <Input hidden />
                    <Input
                      disabled={ id }
                      type="number"
                      className="smallInput"
                      defaultValue={ el.labelQty }
                      value={ el.labelQty }
                      onChange={ (e) =>
                        changeDetail(idx, "labelQty", parseFloat(e.target.value))
                      }
                      placeholder="Type Qty/Label here..."
                    />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `dateCode[${ idx }]` }
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
                      disabled={ id }
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
                <Form.Item name={ `partNo[${ idx }]` } label="Part No">
                  <Input
                    disabled={ id }
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
                  <Form.Item name={ `projectNo[${ idx }]` } label="Project No">
                    <Input
                      disabled={ id }
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
                  <Form.Item name={ `poNo[${ idx }]` } label="PO No">
                    <Input
                      disabled={ id }
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
                <Form.Item name={ `description[${ idx }]` } label="Description">
                  <Input
                    disabled={ id }
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
                <Form.Item name={ `remarks[${ idx }]` } label="Remarks">
                  <Input
                    disabled={ id }
                    className="smallInput"
                    defaultValue={ el.remarks }
                    value={ el.remarks }
                    onBlur={ (e) => changeDetail(idx, "remarks", e.target.value) }
                    placeholder="Type remarks here..."
                  />
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
}

export default GrnDetail;
