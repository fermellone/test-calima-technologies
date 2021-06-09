import { request } from "@/services/formSpree";

export function saveForm(body) {
  return request({
    url: "/f/xqkwbznb",
    body: body,
    method: "POST",
  });
}
