export const host = "https://countries-now-clone.herokuapp.com";

export const request = async ({ url = "", method = "GET", body = {} }) => {
  let options = {
    method: method.toUpperCase(),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (["POST", "PATCH"].includes(method)) {
    options = {
      ...options,
      body: JSON.stringify(body),
    };
  }

  const response = await fetch(`${host}${url}`, options);

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error("Error en la matrix");
  } else {
    return responseJson.data;
  }
};
