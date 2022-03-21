import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
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

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
  };

  return (
    <div className={ `detail-card ${ id ? 'full' : '' }` }>
      <div className="border">
        <Collapsible trigger={ `Serial Number: ${ idx + 1 }` } open={true}>
          <div className="inputs">
            <div className="row2">
              <div className="dual">
                {
                  <Form.Item name={ `sn[${ idx }]` } label="SN">
                    <Input hidden />
                    <Input
                      readOnly
                      disabled={ id }
                      className={id?"normal smallInput":"smallInput"}
                      defaultValue={ idx + 1 }
                      value={ idx + 1 }
                      onChange={ (e) => changeDetail(idx, "seqNo", e.target.value) }
                    />
                  </Form.Item>
                }

                {
                  <Form.Item name={ `type[${ idx }]` } label="Type">
                    <Input hidden />
                    <Select
                      disabled={ id }
                      className={id?"normal smallInput":"smallInput"}
                      style={ { width: "70px" } }
                      onChange={ (value) => changeDetail(idx, "itemType", value) }
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
                    <Input hidden />
                    <Select
                          disabled={ id }
                          showSearch
                          allowClear
                          className='normal smallInput'
                          defaultValue={ el.uom }
                          value={ el.uom }
                          options={ uomOpt }
                          onSelect={ (data) => changeDetail(idx, "uom", data) }
                          filterOption={ (inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                          style={ { width: 'auto' } }
                        />
                  </Form.Item>
                }

                {
                  <Form.Item name={ `msl[${ idx }]` } label="MSL">
                    <Input hidden />
                    <Input
                      disabled
                      className={id?"normal smallInput":"smallInput"}
                      defaultValue={ el.msl }
                      value={ el.msl }
                      onChange={ (e) => changeDetail(idx, "msl", e.target.value) }
                    />
                  </Form.Item>
                }
              </div>

              <div className="dual">
                {
                  <Form.Item
                    name={ `recdPrice[${ idx }]` }
                    label="Recd Price"
                    className="required"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(el.recdPrice)) {
                            return Promise.reject(new Error('Recd Price format mask is 999990.0000'));
                          }
                          if (Number(el.recdPrice).countDecimals() > 4) {
                            return Promise.reject(new Error('Recd Price decimal length must be less than 4 digits '));
                          } 
                          if (Number(el.recdPrice) <= 0) {
                            return Promise.reject(new Error('Recd Price must be more than 0'));
                          }
                          if (Number(el.recdPrice) > 999990) {
                            return Promise.reject(new Error('Recd Price max 999990.0000'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input
                      disabled={ id }
                      className="normal smallInput"
                      defaultValue={ el.recdPrice || 0.0000 }
                      onChange={ (e) =>
                        changeDetail(idx, "recdPrice", e.target.value)
                      }
                    />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `recdQty[${ idx }]` }
                    label="Recd Qty"
                    className="required"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(el.recdQty)) {
                            return Promise.reject(new Error('Recd Qty must be number'));
                          }
                          if (Number(el.recdQty) <= 0) {
                            return Promise.reject(new Error('Recd Qty must be more than 0'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input className='normal smallInput alignRight' defaultValue={ el.recdQty || 0 } onChange={ e => changeDetail(idx, 'recdQty', e.target.value) } disabled={ id } />
                  </Form.Item>
                }
              </div>
            </div>

            <div className="row2">
              {
                <Form.Item name={ `itemNo[${ idx }]` } label="Item No">
                  <Input hidden />
                  <Input
                    className="normal"
                    disabled={ id }
                    defaultValue={ el.itemNo }
                    value={ el.itemNo }
                    onChange={ (e) => onSearchPress(idx, "itemNo", e.target.value) }
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
                    className="required"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(el.labelQty)) {
                            return Promise.reject(new Error('QTY/Label must be number'));
                          }
                          if (Number(el.labelQty) <= 0) {
                            return Promise.reject(new Error('QTY/Label must be more than 0'));
                          } 
                          if (el.labelQty > getFieldValue("GRN Qty")) {
                            return Promise.reject(
                              new Error("QTY/Label can't be more than Recd QTY")
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input className='normal smallInput alignRight' defaultValue={ el.labelQty } onChange={ e => changeDetail(idx, 'labelQty', e.target.value) } disabled={ id } />
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
                    <Input hidden />
                    <Input
                      disabled={ id }
                      className="normal smallInput center"
                      defaultValue={ el.dateCode }
                      value={ el.dateCode }
                      onChange={ (e) =>
                        changeDetail(idx, "dateCode", e.target.value)
                      }
                    />
                  </Form.Item>
                }
              </div>
            </div>

            <div className="row2">
              {
                <Form.Item name={ `partNo[${ idx }]` } label="Part No">
                  <Input hidden />
                  <Input
                        disabled={ id }
                        className="normal smallInput"
                        defaultValue={ el.partNo }
                        value={ el.partNo }
                        onChange={ (e) => onSearchPress(idx, "partNo", e.target.value) }
                      />
                </Form.Item>
              }

              <div className="dual">
                {
                  <Form.Item name={ `projectNo[${ idx }]` } label="Project No">
                    <Input hidden />
                    <Input
                      disabled={ id }
                      className="normal smallInput"
                      defaultValue={ el.projectNo }
                      value={ el.projectNo }
                      onChange={ (e) =>
                        changeDetail(idx, "projectNo", e.target.value)
                      }
                    />
                  </Form.Item>
                }

                {
                  <Form.Item name={ `poNo[${ idx }]` } label="PO No">
                    <Input hidden />
                    <Input
                      disabled={ id }
                      className="normal smallInput"
                      defaultValue={ el.poNo }
                      value={ el.poNo }
                      onChange={ (e) => changeDetail(idx, "poNo", e.target.value) }
                    />
                  </Form.Item>
                }
              </div>
            </div>
            <div className="row">
              {
                <Form.Item name={ `description[${ idx }]` } label="Description">
                  <Input hidden />
                  <Input.TextArea
                    disabled={ id }
                    className="normal smallInput"
                    defaultValue={ el.description }
                    value={ el.description }
                    onChange={ (e) =>
                      changeDetail(idx, "description", e.target.value)
                    }
                  />
                </Form.Item>
              }

              {
                <Form.Item name={ `remarks[${ idx }]` } label="Remarks">
                  <Input hidden />
                  <Input.TextArea
                    disabled={ id }
                    className="normal smallInput"
                    defaultValue={ el.remarks }
                    value={ el.remarks }
                    onBlur={ (e) => changeDetail(idx, "remarks", e.target.value) }
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
