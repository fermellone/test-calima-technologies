import { request } from "@/services/form-spree";

export function saveForm(body) {
  return request({
    url: "/f/xqkwbznb",
    body: body,
    method: "POST",
  });
}
