export const host = "https://formspree.io";

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

  let responseJson = await response.json();

  if (responseJson.error && responseJson.errors[0].field === "email") {
    throw new Error("Insertar una direción de correo válida.");
  } else {
    return { ...responseJson, next: `${host}${responseJson.next}` };
  }
};
