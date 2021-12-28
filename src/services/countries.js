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
    }).then(res => res.json());
}

export default {list}