import env from '../env';

async function list() {
  return await fetch(`${env.url}/lov/countries`,
    {
      method: 'GET',
      headers: {
        'X-USERNAME': env.username,
        'X-COMPANYCODE': env.companyCode,
        'X-PLANTNO': env.plantNo
      }
    })
    .then((res) => {
      if (!res.ok) {
        return {ok:false, data: res.json()};
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

export default {list}