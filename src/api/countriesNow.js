import { request } from "../services/countriesNow";

export function getCountriesData() {
  return request({
    url: "/api/v0.1/countries/info?returns=unicodeFlag,dialCode,cities",
  });
}
