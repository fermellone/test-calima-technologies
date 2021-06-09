import { request } from "../services/countriesNow";

export function getCountriesData() {
  return request({ url: "/countries" });
}
