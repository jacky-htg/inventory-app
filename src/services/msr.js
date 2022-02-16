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
    .then((res) => {
      if (!res.ok) {
        return { ok: false, data: res.json() };
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
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
      if (!res.ok) {
        return { ok: false, data: res.json() };
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
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
    .then((res) => {
      if (!res.ok) {
        return { ok: false, data: res.json() };
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

async function getMsrNo() {
  return await fetch(`${env.url}/msr/msr-no`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return { ok: false, data: res.json() };
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

async function getSupplierByGrnNo(grnNo) {
  return await fetch(`${env.url}/msr/suppliers?grnNo=${grnNo}`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return { ok: false, data: res.json() };
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}
export default { list, create, view, getMsrNo, getSupplierByGrnNo };
