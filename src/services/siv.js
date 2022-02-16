import env from "../env";

async function list(filterSearch) {
  return await fetch(`${env.url}/siv/search`, {
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
  return await fetch(`${env.url}/siv`, {
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
  return await fetch(`${env.url}/siv/${id}`, {
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

async function getDefaultValue(params) {
  return await fetch(`${env.url}/siv/default-value?subType=${params.subType}`, {
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

async function getProjectNo() {
  return await fetch(`${env.url}/siv/project-no`, {
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

async function getSivNo(body) {
  console.log("body", body);
  return await fetch(`${env.url}/siv/siv-no`, {
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

async function populateDetail(body) {
  console.log("body", body);
  return await fetch(
    `${env.url}/siv/populate-detail?projectNo=${body.projectNo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-USERNAME": env.username,
        "X-COMPANYCODE": env.companyCode,
        "X-PLANTNO": env.plantNo,
      },
    }
  )
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

export default {
  list,
  create,
  view,
  getDefaultValue,
  getProjectNo,
  getSivNo,
  populateDetail,
};
