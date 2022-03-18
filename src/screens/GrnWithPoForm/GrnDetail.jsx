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
        <Collapsible trigger={ `Serial Number: ${ idx + 1 }` }>
          <Form form={ form } name={ `detail-${ idx + 1 }` } className="inputs">
            <div className="row2">
              <div className="dual">
                {
                  <Form.Item
                    name={ `SN[${ idx }]` }
                    label="SN"
                  >
                    {
                      id ?
                        <span>{ idx + 1 }</span>
                        :
                        <Input className='smallInput' defaultValue={ idx + 1 } value={ idx + 1 } onChange={ e => changeDetail(idx, 'sn', e.target.value) } placeholder='Type SN here...' readOnly disabled={ id } />
                    }
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `Type[${ idx }]` }
                    label="Type"
                  >
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.itemType !== undefined ? el.itemType : '-' }</span>
                        :
                        <Input className='smallInput' defaultValue={ el.itemType } value={ el.itemType } onChange={ e => changeDetail(idx, 'itemType', e.target.value) } placeholder='Insert type here...' readOnly disabled={ id } />
                    }
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
                    {
                      id ?
                        <span>{ el.uom ? el.uom : '-' }</span>
                        :
                        <Input className='smallInput' defaultValue={ el.uom } value={ el.uom } onChange={ e => changeDetail(idx, 'uom', e.target.value) } placeholder='Type UOM here...' readOnly disabled={ id } />
                    }
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `MSL[${ idx }]` }
                    label="MSL"
                  >
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.msl ? el.msl : '-' }</span>
                        :
                        <Input className='smallInput' defaultValue={ el.msl } value={ el.msl } onChange={ e => changeDetail(idx, 'msl', e.target.value) } placeholder='Insert MSL here...' readOnly disabled={ id } />
                    }
                  </Form.Item>
                }
              </div>

              <div className="dual">
                {
                  <Form.Item
                    name={ `UnitPrice[${ idx }]` }
                    label="Unit Price"
                  >
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.recdPrice ? el.recdPrice : '-' }</span>
                        :
                        // <Input className='smallInput' defaultValue={ el.recdPrice } value={ el.recdPrice } onChange={ e => changeDetail(idx, 'unitPrice', e.target.value) } placeholder='Type Unit Price here...' readOnly disabled={ id } />
                        <InputNumber
                          className='right'
                          min={ 0 }
                          max={ 9999999991 }
                          step="0.0001"
                          stringMode
                          maxLength={ 18 }
                          disabled={ true }
                          defaultValue={ el.recdPrice }
                          value={ el.recdPrice }
                          onChange={ e => changeDetail(idx, 'recdPrice', e.target.value) }
                        />
                    }
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `GRNQty[${ idx }]` }
                    label="GRN Qty"
                    initialValue={ el.recdQty }
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
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.recdQty ? el.recdQty : '-' }</span>
                        :
                        <Input type={ 'number' } min={ 0 } className='smallInput alignRight' defaultValue={ el.recdQty } value={ el.recdQty } onChange={ e => changeDetail(idx, 'recdQty', e.target.value) } placeholder='Type GRN Qty here...' disabled={ id } />
                    }
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
                  {
                    id ?
                      <span>{ el.itemNo ? el.itemNo : '-' }</span>
                      :
                      // <Input defaultValue={ el.itemNo } value={ el.itemNo } onChange={ e => changeDetail(idx, 'itemNo', e.target.value) } placeholder='Type item no here...' readOnly disabled={ id } />
                      <Select
                        showSearch
                        allowClear
                        // ref={ locationRef }
                        className='normal' disabled={ isDisabled }
                        defaultValue={ el.itemNo }
                        value={ el.itemNo }
                        onChange={ (value) => changeDetail(idx, 'itemNo', value, true) }
                        style={ { textTransform: 'uppercase' } }
                      // filterOption={ (input, option) =>
                      //   option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                      >
                        { itemOpt }
                      </Select>
                  }
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Loc[${ idx }]` }
                  label="Loc"
                >
                  <Input hidden />
                  {
                    id ?
                      <span>{ el.loc ? el.loc : '-' }</span>
                      :
                      // <Input
                      //   className='smallInput' disabled={ isDisabled }
                      //   defaultValue={ el.loc }
                      //   value={ el.loc }
                      //   readOnly
                      // />
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
                  }
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
                    {
                      id ?
                        <span>{ el.dateCode ? el.dateCode : '-' }</span>
                        :
                        <Input className='smallInput center' defaultValue={ el.dateCode } value={ el.dateCode } onChange={ e => changeDetail(idx, 'dateCode', e.target.value) } placeholder='Insert Date Code here...' disabled={ id } />
                    }
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
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.labelQty ? el.labelQty : '-' }</span>
                        :
                        <Input type={ 'number' } min={ 0 } className='smallInput alignRight' defaultValue={ el.labelQty } value={ el.labelQty } onChange={ e => changeDetail(idx, 'labelQty', e.target.value) } placeholder='Type Qty/Label here...' disabled={ id } />
                    }
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
                    {
                      id ?
                        <span>{ el.partNo ? el.partNo : '-' }</span>
                        :
                        // <Input className='smallInput' defaultValue={ el.partNo } value={ el.partNo } onChange={ e => changeDetail(idx, 'partNo', e.target.value) } placeholder='Type Part No here...' readOnly disabled={ id } />
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
                    }
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
                    {
                      id ?
                        <span>{ el.orderQty ? el.orderQty : '-' }</span>
                        :
                        // <Input className='smallInput' defaultValue={ el.orderQty } value={ el.orderQty } onChange={ e => changeDetail(idx, 'orderQty', e.target.value) } placeholder='Type order qty here...' disabled={ id } readOnly />
                        <InputNumber
                          className='right'
                          min={ 0 }
                          max={ 9999999991 }
                          step="0.01"
                          stringMode
                          maxLength={ 18 }
                          disabled={ true }
                          defaultValue={ el.orderQty }
                          value={ el.orderQty }
                          onChange={ e => changeDetail(idx, 'orderQty', e.target.value) }
                        />
                    }
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `SIVNo[${ idx }]` }
                    label="SIV No"
                  >
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.poNo ? el.poNo : '-' }</span>
                        :
                        <Input className='smallInput' defaultValue={ el.poNo } value={ el.poNo } onChange={ e => changeDetail(idx, 'sivNo', e.target.value) } placeholder='Insert SIV No here...' disabled={ id } />
                    }
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
                    {
                      id ?
                        <span>{ el.stdPackQty ? el.stdPackQty : '-' }</span>
                        :
                        <Input className='smallInput' defaultValue={ el.stdPackQty } value={ el.stdPackQty } onChange={ e => changeDetail(idx, 'stdPackQty', e.target.value) } placeholder='Type std pack here...' readOnly disabled={ id } />
                    }
                  </Form.Item>
                }

                {
                  <Form.Item
                    name={ `DueDate[${ idx }]` }
                    label="Due date"
                  >
                    <Input hidden />
                    {
                      id ?
                        <span>{ el.dueDate ? el.dueDate : '-' }</span>
                        :
                        <Input className='smallInput' defaultValue={ el.dueDate } value={ el.dueDate } onChange={ e => changeDetail(idx, 'dueDate', e.target.value) } placeholder='Type due date here...' readOnly disabled={ id } />
                    }
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
                  {
                    id ?
                      <span>{ el.projectNo ? el.projectNo : '-' }</span>
                      :
                      <Input className='smallInput' defaultValue={ el.projectNo } value={ el.projectNo } onChange={ e => changeDetail(idx, 'projectNo', e.target.value) } placeholder='Type Project No here...' readOnly disabled={ id } />
                  }
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Description[${ idx }]` }
                  label="Description"
                >
                  <Input hidden />
                  {
                    id ?
                      <p>{ el.description ? el.description : '-' }</p>
                      :
                      <Input.TextArea className='smallInput' defaultValue={ el.description } value={ el.description } onChange={ e => changeDetail(idx, 'description', e.target.value) } placeholder='Type description here...' readOnly disabled={ id } autoSize />
                  }
                </Form.Item>
              }

              {
                <Form.Item
                  name={ `Remarks[${ idx }]` }
                  label="Remarks"
                  initialValue={ el.remarks }
                >
                  <Input hidden />
                  {
                    id ?
                      <p>{ el.remarks ? el.remarks : '-' }</p>
                      :
                      <Input.TextArea className='smallInput' defaultValue={ el.remarks } value={ el.remarks } onChange={ e => changeDetail(idx, 'remarks', e.target.value) } placeholder='Type remarks here...' disabled={ id } />
                  }
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
