import env from "../env";

async function list(filterSearch) {
  return await fetch(`${env.url}/locations/search`, {
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

async function remove(loc) {
  return await fetch(`${env.url}/locations/${loc}`, 
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
  return await fetch(`${env.url}/locations`, {
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

async function edit(loc, data) {
  return await fetch(`${env.url}/locations/${loc}`, {
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
  return await fetch(`${env.url}/locations/${id}`, {
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
