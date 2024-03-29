import env from "../env";

async function list(filterSearch) {
  return await fetch(`${env.url}/item-categories/search`, {
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
      return {ok:false, data: res.json()};
    } else {
      return res.json();
    }
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });
}

async function remove(id) {
  return await fetch(`${env.url}/item-categories/${id}`, 
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-USERNAME": env.username,
        "X-COMPANYCODE": env.companyCode,
        "X-PLANTNO": env.plantNo,
      },
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

async function create(data) {
  return await fetch(`${env.url}/item-categories`, {
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
      return {ok:false, data: res.json()};
    } else {
      return res.json();
    }
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });
}

async function edit(id, data) {
  return await fetch(`${env.url}/item-categories/${id}`, {
    method: "PUT",
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
      return {ok:false, data: res.json()};
    } else {
      return res.json();
    }
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });
}

async function view(id) {
  return await fetch(`${env.url}/item-categories/${id}`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
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

export default { list, remove, create, edit, view };
