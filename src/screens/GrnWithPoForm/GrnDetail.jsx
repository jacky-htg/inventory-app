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
    isDisabled
  } = props;
  // const { TextArea } = Input;

  const [form] = Form.useForm();

  useEffect(() => {
    if (el) {
      console.log('el :>> ', el);
      // description: "TIM, 99.99IN 3.74\" X 0.048\" X 0.006\" W/AL CLAD";
      // dueDate: "2018-06-30T00:00:00.000+00:00";
      // invUom: "PKT";
      // issuedQty: 0;
      // itemNo: "301-90005-01";
      // itemType: 0;
      // labelQty: 0;
      // loc: "TE";
      // orderQty: 1;
      // partNo: "301-90005-01";
      // poPrice: 2401.25;
      // poRecSeq: 1;
      // projectNo: "S20180002KT";
      // recdPrice: 2401.25;
      // recdQty: 0;
      // remarks: "TIM, 99.99IN 3.74\" X 0.048\" X 0.006\" W/AL CLAD";
      // seqNo: 1;
      // stdPackQty: 1;
      // uom: "PACKET"
      form.setFieldsValue({
        description: el.description,
        // dueDate: el.dueDate,
        // invUom: el.invUom,
        // issuedQty: el.issuedQty,
        // itemNo: el.itemNo,
        // itemType: el.itemType,
        // labelQty: el.labelQty,
        // loc: el.loc,
        // orderQty: el.orderQty,
        // partNo: el.partNo,
        // poPrice: el.poPrice,
        // poRecSeq: el.poRecSeq,
        // projectNo: el.projectNo,
        // recdPrice: el.recdPrice,
        // recdQty: el.recdQty,
        // remarks: el.remarks,
        // seqNo: el.seqNo,
        // stdPackQty: el.stdPackQty,
        // uom: el.uom
      });
    }
  }, [el]);

  return (
    <div key={ idx } className={ `detail-card ${ id ? 'full' : '' }` }>
      <div className="border">
        <Collapsible trigger={ `Serial Number: ${ idx + 1 }` } open={true}>
          <Form form={ form } name={ `detail-${ idx + 1 }` } className="inputs">
            <div className="row2">
              <div className="dual">
                {
                  <Form.Item
                    name={ `SN[${ idx }]` }
                    label="SN"
                  >
                    <Input className={id?'normal smallInput':'smallInput'} defaultValue={ idx + 1 } value={ idx + 1 } onChange={ e => changeDetail(idx, 'sn', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `Type[${ idx }]` }
                    label="Type"
                  >
                    <Input hidden />
                    <Input className={id?'normal smallInput':'smallInput'} defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } readOnly disabled={ id } />
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
                    <Input className={id?'normal smallInput':'smallInput'} defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `MSL[${ idx }]` }
                    label="MSL"
                  >
                    <Input hidden />
                    <Input className={id?'normal smallInput':'smallInput'} defaultValue={ el.msl } value={ el.msl } onChange={ e => changeDetail(idx, 'msl', e.target.value) } readOnly disabled={ id } />
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
                      className={id?'normal right':'right'}
                      disabled={ true }
                      defaultValue={ el.recdPrice }
                      value={ el.recdPrice }
                      onChange={ e => changeDetail(idx, 'recdPrice', e.target.value) }
                    />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `GRNQty[${ idx }]` }
                    label="GRN Qty"
                    className='required'
                    initialValue={ el.recdQty }
                    rules={ [
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
                    <Input hidden />
                    <Input className={id?'normal smallInput alignRight':'smallInput alignRight'} defaultValue={ el.recdQty } onChange={ e => changeDetail(idx, 'recdQty', e.target.value) } disabled={ id } />
                    
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
                  <Input className='normal' disabled={ isDisabled } readOnly={true}
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
                    <Input hidden />
                    <Input className={id?'normal smallInput center':'smallInput center'} defaultValue={ el.dateCode } value={ el.dateCode } onChange={ e => changeDetail(idx, 'dateCode', e.target.value) } disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `QTYLabel[${ idx }]` }
                    label="QTY/Label"
                    initialValue={ el.labelQty }
                    className="required"
                    rules={ [
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
                    <Input hidden />
                    <Input className={id?'normal smallInput alignRight':'smallInput alignRight'} defaultValue={ el.labelQty } onChange={ e => changeDetail(idx, 'labelQty', e.target.value) } disabled={ id } />
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
                      className={id?'normal right':'right'}
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
                    <Input className={id?'normal smallInput':'smalllInput'} defaultValue={ el.poNo } value={ el.poNo } onChange={ e => changeDetail(idx, 'sivNo', e.target.value) } disabled={ id } />
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
                    <Input className={id?'normal smallInput':'smallInput'} defaultValue={ el.stdPackQty } value={ el.stdPackQty } onChange={ e => changeDetail(idx, 'stdPackQty', e.target.value) } readOnly disabled={ id } />
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `DueDate[${ idx }]` }
                    label="Due date"
                  >
                    <Input hidden />
                    <Input className={id?'normal smallInput':'smallInput'} defaultValue={ el.dueDate } value={ el.dueDate } onChange={ e => changeDetail(idx, 'dueDate', e.target.value) } readOnly disabled={ id } />
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
                  <Input className={id?'normal smallInput':'smallInput'} defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } readOnly disabled={ id } />
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Description[${ idx }]` }
                  label="Description"
                >
                  <Input hidden />
                  <Input.TextArea className={id?'normal smallInput':'smallInput'} defaultValue={ el.description } value={ el.description } onChange={ e => changeDetail(idx, 'description', e.target.value) } readOnly disabled={ id } autoSize />
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Remarks[${ idx }]` }
                  label="Remarks"
                  initialValue={ el.remarks }
                >
                  <Input hidden />
                  <Input.TextArea className={id?'normal smallInput':'smallInput'} defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } disabled={ id } />
                </Form.Item>
              }

            </div>
          </Form>

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
