import env from "../env";

async function list(filterSearch) {
  return await fetch(`${env.url}/grns/search`, {
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
  return await fetch(`${env.url}/grns`, {
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
  return await fetch(`${env.url}/grns/${id}`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  })
    .then((res) => {
      console.log("res", res);
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

async function pono() {
  return await fetch(`${env.url}/grns/pono`, {
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

async function headerByPono(poNo) {
  return await fetch(`${env.url}/grns/header?poNo=${poNo}`, {
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

async function partsByPono(poNo) {
  return await fetch(`${env.url}/grns/partno?poNo=${poNo}&partNo=&itemNo=`, {
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

async function detailByPartNo(poNo, partNo, poReqSeq) {
  return await fetch(
    `${env.url}/grns/detail?poNo=${poNo}&itemNo=&partNo=${partNo}&poRecSeq=${poReqSeq}`,
    {
      method: "GET",
      headers: {
        "X-USERNAME": env.username,
        "X-COMPANYCODE": env.companyCode,
        "X-PLANTNO": env.plantNo,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log("err :>> ", err));
}

async function getDefaultGRN() {
  return await fetch(`${env.url}/grns/default-value`, {
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

async function checkNewItem(body) {
  return await fetch(`${env.url}/grns/check-next-item`, {
    method: "POST",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log("err :>> ", err));
}

async function printLabel(body) {
  console.log("masuk");
  console.log("body", body);
  return await fetch(`${env.url}/grns/label`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => console.log("err :>> ", err));
}

async function printPickList(body) {
  return await fetch(`${env.url}/grns/picked-list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => console.log("err :>> ", err));
}

async function printReportGRN(body) {
  return await fetch(`${env.url}/grns/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => console.log("err :>> ", err));
}

export default {
  list,
  create,
  view,
  pono,
  headerByPono,
  partsByPono,
  detailByPartNo,
  getDefaultGRN,
  checkNewItem,
  printLabel,
  printPickList,
  printReportGRN,
};
