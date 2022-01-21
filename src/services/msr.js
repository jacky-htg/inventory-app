import env from "../env";

async function list(filterSearch) {
  return await fetch(`${env.url}/msr/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
    body: JSON.stringify(filterSearch),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("err :>> ", err);
      message.error(JSON.stringify(err));
    });
}

async function create(data) {
  console.log(`JSON.stringify(data)`, JSON.stringify(data));
  return await fetch(`${env.url}/msr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res :>> ", res);
    })
    .catch((err) => {
      console.log("err :>> ", err);
      message.error(JSON.stringify(err));
    });
}

async function view(id) {
  return await fetch(`${env.url}/msr/${id}`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("err :>> ", err));
}

export default { list, create, view };
