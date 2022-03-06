import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Select, Checkbox, AutoComplete, message, Divider, notification } from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { Country, Location } from '../../services';
import { StyledDiv } from './styled';
import env from '../../env';
import { Images } from '../../constant';
import { formFailedSubmit } from '../../helpers';


const StockLocationForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [form] = Form.useForm();
  const [countriesData, setCountriesData] = useState([]);
  const [countriesOpt, setCountriesOpt] = useState([]);
  const [loadingPage, setLoadingPage] = useState(id ? true : false);
  const [isEdit, setIsEdit] = useState(query.get("edit") ? query.get('edit') === 'true' : false);
  const [isDisabled, setIsDisabled] = useState(id && !isEdit ? true : false);

  const [loc, setLoc] = useState('');
  const [description, setDescription] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [address4, setAddress4] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryName, setCountryName] = useState();
  const [countryCode, setCountryCode] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [telNum, setTelNum] = useState('');
  const [faxNum, setFaxNum] = useState('');
  const [pic, setPic] = useState('');
  const [remarks, setRemarks] = useState('');
  const [version, setVersion] = useState(0);
  const [companyCode, setCompanyCode] = useState(env.companyCode);
  const [plantNumber, setPlantNumber] = useState(env.plantNo);

  const [errorFields, setErrorFields] = useState([]);

  const locRef = useRef();
  const countryRef = useRef();

  useEffect(() => {
    const data = Country.list();
    data.then(res => {
      setCountriesData(res);
      let temp = [];
      res.forEach(el => {
        /*temp.push({
          value: el.description,
          // code: el.code
        });*/
        temp.push(<Option key={ el.description } value={ el.description } >{ el.description }</Option>);
      });
      setCountriesOpt(temp);
      if (id) {
        const data = Location.view(id);
        data.then(result => {
          result.address1 && setAddress1(result.address1);
          result.address2 && setAddress2(result.address2);
          result.address3 && setAddress3(result.address3);
          result.address4 && setAddress4(result.address4);
          result.cityCode && setCityCode(result.cityCode);
          result.companyCode && setCompanyCode(result.companyCode);
          result.countryCode && setCountryCode(result.countryCode);
          if (result.countryCode) {
            res.forEach(el => {
              if (el.countryCode === result.countryCode) {
                setCountryName(el.description);
              }
            });
          }
          result.description && setDescription(result.description);
          result.faxNo && setFaxNum(result.faxNo);
          result.loc && setLoc(result.loc);
          result.pcode && setPostalCode(result.pcode);
          result.personInCharge && setPic(result.personInCharge);
          result.plantNo && setPlantNumber(result.plantNo);
          result.regionCode && setRegionCode(result.regionCode);
          result.remarks && setRemarks(result.remarks);
          result.stateCode && setStateCode(result.stateCode);
          result.telNo && setTelNum(result.telNo);
          result.version && setVersion(result.version);
          let obj = {
            "address1": address1,
            "address2": address2,
            "address3": address3,
            "address4": address4,
            "cityCode": cityCode,
            "companyCode": companyCode,
            "countryCode": countryCode,
            "description": description,
            "faxNo": faxNum,
            "loc": loc,
            "pcode": postalCode,
            "personInCharge": pic,
            "plantNo": plantNumber,
            "regionCode": regionCode,
            "remarks": remarks,
            "stateCode": stateCode,
            "telNo": telNum,
            "version": version,
          };
          setLoadingPage(false);
        });
      }
    });
  }, []);

  const onSelectCountry = (data) => {
    countriesData.forEach(el => {
      if (el.description === data) {
        setCountryCode(el.countryCode);
        setCountryName(el.description);
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
        "address1": address1,
        "address2": address2,
        "address3": address3,
        "address4": address4,
        "cityCode": cityCode,
        "companyCode": companyCode,
        "countryCode": countryCode,
        "description": description,
        "faxNo": faxNum,
        "loc": loc,
        "pcode": postalCode,
        "personInCharge": pic,
        "plantNo": plantNumber,
        "regionCode": regionCode,
        "remarks": remarks,
        "stateCode": stateCode,
        "telNo": telNum,
        "version": version,
      };
      console.log('obj :>> ', obj);
      if (isEdit) {
        const hasil = await Location.edit(id, obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
          // message.error(res.message ? res.message : env.internalError);
        } else {
          notification.success({
            message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
          });
          // message.success('Record successfully updated');
          history.push('/stock-locations');
        }
      } else {
        const hasil = await Location.create(obj);
        if (hasil.ok !== undefined && !hasil.ok) {
          const res = await hasil.data;
          notification.error({
            message: res.message ? res.message : env.internalError,
          });
          // message.error(res.message ? res.message : env.internalError);
        } else {
          notification.success({
            message: `Record successfully ${ isEdit ? 'updated' : 'added' }`,
          });
          // message.success('Record successfully added');
          history.push('/stock-locations');
        }
      }

    } catch (errorInfo) {
      const temp = [];
      if (errorInfo && errorInfo.errorFields) {
        errorInfo.errorFields.map(e => {
          temp.push(e.name[0]);
        });
      }
      setErrorFields(temp);
      console.log('Failed:', errorInfo, errorFields);
    }

  };

  useEffect(() => {
    console.log('errrr', errorFields);
    if (errorFields.includes("Loc")) {
      locRef.current.focus();
    } else if (errorFields.includes("Country Name")) {
      countryRef.current.focus();
    }
  }, [errorFields, locRef, countryRef]);

  return (
    <StyledDiv>
      <div className="header">
        <h2></h2>
        <h2>Stock Locations</h2>
      </div>
      <div className="formWrapper">
        {
          loadingPage
            ?
            <div className="loading">
              <img src={ Images.loading } alt="" />
            </div>
            :
            <Form onFinish={ submit } onFinishFailed={ data => formFailedSubmit(data, setErrorFields) } form={ form } name="control-hooks">
              <div className="group">
                <Form.Item
                  name="Loc"
                  label="Loc"
                  initialValue={ loc }
                  rules={ [
                    {
                      required: true,
                      message: 'Loc cannot be blank!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (/^\s+$/.test(value)) {
                          return Promise.reject(new Error('Loc cannot be blank!'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ] }
                >
                  <Input ref={ locRef } maxLength={ 5 } style={ { textTransform: 'uppercase' } } readOnly={ isEdit ? true : false } disabled={ isDisabled } defaultValue={ loc } value={ loc } onChange={ e => setLoc(e.target.value.toUpperCase()) } placeholder={ id ? '' : 'Type loc here...' } />
                </Form.Item>

                <Form.Item
                  name="Description"
                  label="Description"
                >
                  <Input maxLength={ 60 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ description } value={ description } onChange={ e => setDescription(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type descripction here...' } />
                </Form.Item>


                <Form.Item
                  name="Address 1"
                  label="Address 1"
                >
                  <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ address1 } value={ address1 } onChange={ e => setAddress1(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type address here...' } />
                </Form.Item>

                <Form.Item
                  name="Address 2"
                  label="Address 2"
                >
                  <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ address2 } value={ address2 } onChange={ e => setAddress2(e.target.value.toUpperCase()) } />
                </Form.Item>

                <Form.Item
                  name="Address 3"
                  label="Address 3"
                >
                  <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ address3 } value={ address3 } onChange={ e => setAddress3(e.target.value.toUpperCase()) } />
                </Form.Item>

                <Form.Item
                  name="Address 4"
                  label="Address 4"
                >
                  <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ address4 } value={ address4 } onChange={ e => setAddress4(e.target.value.toUpperCase()) } />
                </Form.Item>

                <Form.Item
                  name="Postal Code"
                  label="Postal Code"
                >
                  <Input maxLength={ 15 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ postalCode } value={ postalCode } onChange={ e => setPostalCode(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type postal code here...' } />
                </Form.Item>

                <Form.Item
                  name="Country Name"
                  label="Country Name"
                  initialValue={ countryName }
                  rules={ [
                    {
                      required: true,
                      message: 'Country Name cannot be blank!'
                    },
                  ] }
                >
                  <Select
                    ref={ countryRef }
                    showSearch
                    allowClear
                    className='normal' disabled={ isDisabled }
                    defaultValue={ countryName }
                    value={ countryName }
                    placeholder="Please select"
                    onChange={ (value) => onSelectCountry(value) }
                    filterOption={ (input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    { countriesOpt }
                  </Select>
                </Form.Item>

                <Form.Item
                  name="Region Code"
                  label="Region Code"
                >
                  <Input maxLength={ 30 } disabled={ isDisabled } defaultValue={ regionCode } value={ regionCode } onChange={ e => setRegionCode(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type region code here...' } />
                </Form.Item>

                <Form.Item
                  name="State Code"
                  label="State Code"
                >
                  <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ stateCode } value={ stateCode } onChange={ e => setStateCode(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type state code here...' } />
                </Form.Item>

                <Form.Item
                  name="City Code"
                  label="City Code"
                >
                  <Input maxLength={ 30 } disabled={ isDisabled } defaultValue={ cityCode } value={ cityCode } onChange={ e => setCityCode(e.target.value) } placeholder={ id && !isEdit ? '' : 'Type city code here...' } />
                </Form.Item>

                <Form.Item
                  name="Telephone No"
                  label="Telephone No"
                >
                  <Input maxLength={ 15 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ telNum } value={ telNum } onChange={ e => setTelNum(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type telephone number here...' } />
                </Form.Item>

                <Form.Item
                  name="Fax No"
                  label="Fax No"
                >
                  <Input maxLength={ 15 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ faxNum } value={ faxNum } onChange={ e => setFaxNum(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type fax number here...' } />
                </Form.Item>

                <Form.Item
                  name="Person In Charge"
                  label="Person In Charge"
                >
                  <Input maxLength={ 45 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ pic } value={ pic } onChange={ e => setPic(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type Person In Charge here...' } />
                </Form.Item>

                <Form.Item
                  name="Remarks"
                  label="Remarks"
                >
                  <Input maxLength={ 30 } style={ { textTransform: 'uppercase' } } disabled={ isDisabled } defaultValue={ remarks } value={ remarks } onChange={ e => setRemarks(e.target.value.toUpperCase()) } placeholder={ id && !isEdit ? '' : 'Type remarks here...' } />
                </Form.Item>

              </div>

              <div className="submit">
                <Form.Item>
                  <Button onClick={ () => history.push(`/stock-locations`) } type="default" htmlType="submit">
                    Back To Stock Locations
                  </Button>
                  { (!id || isEdit) && <Divider type='vertical' /> }
                  {
                    (!id || isEdit) &&
                    <Button type="primary" htmlType="submit">
                      {
                        isEdit
                          ?
                          "Update Stock Locations"
                          :
                          "Create Stock Locations"
                      }
                    </Button>


                  }
                </Form.Item>
              </div>

            </Form>
        }
      </div>
    </StyledDiv >
  );
};

export default StockLocationForm;
