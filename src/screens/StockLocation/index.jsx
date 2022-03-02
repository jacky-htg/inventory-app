import React, {useEffect, useState } from 'react';
import { Select } from 'antd';
import { Country, Location } from '../../services';
import PageList from '../../components/PageList';

function Page() {
  const { Option } = Select;
      
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);

  const setupFields = () => {
    setFields([
      {label: 'Loc', field: 'loc', default: true, filter: true}, 
      {label: 'Description', field: 'description', default: true, filter: true}, 
      {label: 'Address', field: 'address1', default: true, filter: true}, 
      {label: 'Country Code', field: 'countryCode', default: true, filter: true, lookup: countries}, 
      {label: 'Person In Charge', field: 'personInCharge', default: true, filter: true}
    ]);
  };

  useEffect(() => {
    let data = Country.list();
    data.then(result => {
      // if (result.status && result.status !== 200) {
      //   message.error(result.error);
      // }
      let temp = [];
      for (const country of result) {
        temp.push(<Option key={ country.countryCode } value={ country.countryCode } >{ country.countryCode}: { country.description }</Option>);
      }
      setCountries(temp);
    });
  }, []);

  useEffect(() => {
    setupFields();
  }, [countries]); 

  return (
    <PageList 
      filter={true}
      fields={fields} 
      title="Stock Location" 
      url="stock-locations" 
      data = {Location} 
      id={['id']} 
      actions={['view', 'edit', 'delete']} />
  );
}

export default Page;
