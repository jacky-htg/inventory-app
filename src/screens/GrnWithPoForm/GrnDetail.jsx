import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message, Menu, Dropdown, notification, Modal, InputNumber } from 'antd';
import { MdAddCircle } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import Collapsible from "react-collapsible";
import moment from 'moment';

const GrnDetail = (props) => {
  const {
    id,
    idx,
    el,
    changeDetail,
    deleteDetail,
    addNewDetail,
    details,
    locOpt,
    partOpt,
    itemOpt,
    isDisabled,
    form
  } = props;
  // const { TextArea } = Input;

  // const [form] = Form.useForm();

  const [recdQty, setRecdQty] = useState(0);
  const [labelQty, setLabelQty] = useState(0);
  const [dateCode, setDateCode] = useState('');



  useEffect(() => {
    if (el) {
      console.log('el :>> ', el);
      setRecdQty(el.recdQty);
      setLabelQty(el.labelQty);
      setDateCode(el.dateCode);
      // let obj = {};
      // obj[`labelQty[${ idx }]`] = el.labelQty || 1;
      // obj[`datecode[${ idx }]`] = el.datecode || '';
      // obj[`recdQty[${ idx }]`] = el.recdQty || 1;
      // console.log('obj :>> ', obj);
      // form.setFieldsValue(obj);
    }
  }, [el]);

  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    if (!this.toString().split(".")[1]) {
      return parseInt(this.toString().split("-")[1]);
    }
    return this.toString().split(".")[1].length || 0;
  };

  return (
    <div key={ idx } className={ `detail-card ${ id ? 'full' : '' }` }>
      <div className="border">
        <Collapsible trigger={ `Serial Number: ${ idx + 1 }` } open={ true }>
          <div name={ `detail-${ idx + 1 }` } className="inputs">
            <div className="row2">
              <div className="dual">
                {
                  <Form.Item
                    name={ `SN[${ idx }]` }
                    label="SN"
                  >
                    <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ idx + 1 } value={ idx + 1 } onChange={ e => changeDetail(idx, 'sn', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `Type[${ idx }]` }
                    label="Type"
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }
              </div>

              <div className="dual">
                {
                  <Form.Item
                    name={ `UOM[${ idx }]` }
                    label="UOM"
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `MSL[${ idx }]` }
                    label="MSL"
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.msl } value={ el.msl } onChange={ e => changeDetail(idx, 'msl', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }
              </div>

              <div className="dual">
                {
                  <Form.Item
                    name={ `UnitPrice[${ idx }]` }
                    label="Unit Price"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(el.recdPrice)) {
                            return Promise.reject(new Error('Unit Price format mask is 9999999990.0000'));
                          }
                          if (Number(el.recdPrice).countDecimals() > 4) {
                            return Promise.reject(new Error('Unit Price decimal length must be less than 4 digits : 9999999990.0000'));
                          }
                          if (Number(el.recdPrice) < 0) {
                            return Promise.reject(new Error('Unit Price cannot be negative : 9999999990.0000'));
                          }
                          if (Number(el.recdPrice) > 9999999990) {
                            return Promise.reject(new Error('Unit Price max 9999999990.0000'));
                          }

                          return Promise.resolve();
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input
                      className={ id ? 'normal right' : 'right' }
                      disabled={ true }
                      defaultValue={ el.recdPrice }
                      value={ el.recdPrice }
                      onChange={ e => changeDetail(idx, 'recdPrice', e.target.value) }
                    />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `recdQty[${ idx }]` }
                    label="GRN Qty"
                    className='required'
                    initialValue={ el.recdQty }
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (recdQty > 0) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('QTY must more than 0'));
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput alignRight' : 'smallInput alignRight' } defaultValue={ recdQty } value={ recdQty } onChange={ e => { setRecdQty(e.target.value); changeDetail(idx, 'recdQty', e.target.value); } } disabled={ id } />

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
                  <Input hidden />
                  <Input className='normal' disabled={ isDisabled } readOnly={ true }
                    defaultValue={ el.itemNo }
                    value={ el.itemNo }
                  />
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Loc[${ idx }]` }
                  label="Loc"
                >
                  <Input hidden />
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
                </Form.Item>
              }

              <div className="dual">
                {
                  <Form.Item
                    name={ `dateCode[${ idx }]` }
                    label="Date Code"
                    initialValue={ el.dateCode }
                    rules={ [
                      {
                        required: false,
                        message: "Date Code is required"
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (isNaN(dateCode)) {
                            return Promise.reject(new Error("Datecode not valid"));
                          }
                          if (dateCode) {
                            let stringify = dateCode + '';
                            let year = "";
                            let week = "";
                            let maxWeek = 53;
                            let flag = false;

                            stringify.split("").forEach((elm, id) => {
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

                            if (!dateCode || flag && stringify.length === 4) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error("Datecode not valid"));
                          }
                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput center' : 'smallInput center' } maxLength={ 4 } defaultValue={ dateCode } value={ dateCode } onChange={ e => { setDateCode(e.target.value); changeDetail(idx, 'dateCode', e.target.value); } } disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `labelQty[${ idx }]` }
                    label="QTY/Label"
                    initialValue={ el.labelQty }
                    className="required"
                    rules={ [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (labelQty > 0 && labelQty <= recdQty) {
                            return Promise.resolve();
                          }

                          if (!labelQty || labelQty === 0) {
                            return Promise.reject(new Error('QTY/Label must more than 0'));
                          }

                          if (labelQty > recdQty) {
                            return Promise.reject(new Error("QTY/Label can't be more than GRN QTY"));
                          }

                        },
                      }),
                    ] }
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput alignRight' : 'smallInput alignRight' } defaultValue={ labelQty } value={ labelQty } onChange={ e => { setLabelQty(e.target.value); changeDetail(idx, 'labelQty', e.target.value); } } disabled={ id } />
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
                    <Input hidden />
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
                  </Form.Item>
                }
              </div>

              <div className="dual">

                {
                  <Form.Item
                    name={ `OrderQty[${ idx }]` }
                    label="Order Qty"
                  >
                    <Input hidden />
                    <Input
                      className={ id ? 'normal right' : 'right' }
                      min={ 0 }
                      max={ 9999999990 }
                      step="0.01"
                      stringMode
                      maxLength={ 18 }
                      disabled={ true }
                      defaultValue={ el.orderQty }
                      value={ el.orderQty }
                      onChange={ e => changeDetail(idx, 'orderQty', e.target.value) }
                    />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `SIVNo[${ idx }]` }
                    label="SIV No"
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput' : 'smalllInput' } defaultValue={ el.poNo } value={ el.poNo } onChange={ e => changeDetail(idx, 'sivNo', e.target.value) } disabled={ id } />
                  </Form.Item>
                }
              </div>

              <div className="dual">

                {
                  <Form.Item
                    name={ `StdPack[${ idx }]` }
                    label="Std Pack"
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.stdPackQty } value={ el.stdPackQty } onChange={ e => changeDetail(idx, 'stdPackQty', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `DueDate[${ idx }]` }
                    label="Due date"
                  >
                    <Input hidden />
                    <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.dueDate } value={ el.dueDate } onChange={ e => changeDetail(idx, 'dueDate', e.target.value) } readOnly disabled={ id } />
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
                  <Input hidden />
                  <Input className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } readOnly disabled={ id } />
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Description[${ idx }]` }
                  label="Description"
                >
                  <Input hidden />
                  <Input.TextArea className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.description } value={ el.description } onChange={ e => changeDetail(idx, 'description', e.target.value) } readOnly disabled={ id } autoSize />
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Remarks[${ idx }]` }
                  label="Remarks"
                  initialValue={ el.remarks }
                >
                  <Input hidden />
                  <Input.TextArea className={ id ? 'normal smallInput' : 'smallInput' } defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } disabled={ id } />
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
};

export default GrnDetail;
