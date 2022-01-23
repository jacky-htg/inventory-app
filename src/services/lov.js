import env from "../env";

async function getItemCategories() {
  return await fetch(`${env.url}/lov/item-categories`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  }).then((res) => res.json());
}

async function getSubCategories(categoryCode) {
  return await fetch(
    `${env.url}/lov/sub-categories?categoryCode=${categoryCode}`,
    {
      method: "GET",
      headers: {
        "X-USERNAME": env.username,
        "X-COMPANYCODE": env.companyCode,
        "X-PLANTNO": env.plantNo,
      },
    }
  ).then((res) => res.json());
}

async function getMsl() {
  return await fetch(`${env.url}/lov/msl`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  }).then((res) => res.json());
}

async function getSources() {
  return await fetch(`${env.url}/lov/sources`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  }).then((res) => res.json());
}

async function getUOM() {
  return await fetch(`${env.url}/lov/uom`, {
    method: "GET",
    headers: {
      "X-USERNAME": env.username,
      "X-COMPANYCODE": env.companyCode,
      "X-PLANTNO": env.plantNo,
    },
  }).then((res) => res.json());
}

async function getCategoryGroups() {
  return await fetch(`${env.url}/lov/category-groups`, {
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

export default {
  getItemCategories,
  getSubCategories,
  getMsl,
  getSources,
  getUOM,
  getCategoryGroups,
};
