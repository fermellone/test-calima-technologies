const host = "https://formspree.io";

export default {
  request: async ({ url = "", method = "GET", body = {} }) => {
    const response = await fetch(`${host}${url}`, {
      method: method.toUpperCase(),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    });

    let data = await response.json();

    if (data.error && data.errors[0].field === "email") {
      throw new Error("Insertar una direción de correo válida.");
    } else {
      return { ...data, next: `${host}${data.next}` };
    }
  },
};
