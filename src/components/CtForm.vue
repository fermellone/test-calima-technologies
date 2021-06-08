<template>
  <form class="form" @submit.prevent="save">
    <div class="form-group">
      <label for="country">País</label>
      <select id="country" v-model="form.country">
        <template v-for="country in countries">
          <option :value="country" :key="`country-${country}`">
            {{ country }}
          </option>
        </template>
      </select>
    </div>
    <div class="form-group">
      <label for="city">Ciudad</label>
      <select id="city" v-model="form.city">
        <template v-for="(city, index) in cities">
          <option :value="city" :key="`city-${city}-${index}`">
            {{ city }}
          </option>
        </template>
      </select>
    </div>
    <div class="form-group">
      <label for="fullname">Nombre completo</label>
      <input
        type="text"
        id="fullname"
        v-model="form.fullname"
        maxlength="40"
        autocomplete="_"
      />
    </div>
    <div class="form-group">
      <label for="email">Correo electrónico</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        title="Introduzca una dirección de correo electrónico válida"
        maxlength="255"
        autocomplete="_"
      />
    </div>
    <div class="form-group">
      <label for="phone">Teléfono</label>
      <div class="phone-input">
        <select id="phone-prefix" v-model="form.phonePrefix">
          <template v-for="prefix in phonePrefixes">
            <option
              :value="prefix.dialCode"
              :key="`phone-prefix-${prefix.dialCode}`"
              :title="prefix.country"
            >
              {{ prefix.unicodeFlag | decode }} | {{ prefix.dialCode }}
            </option>
          </template>
        </select>
        <input
          type="tel"
          id="phone"
          v-model="form.phoneNumber"
          :pattern="`[0-9]{${phoneFieldMaxLength}}`"
          title="Introduzca un número de teléfono válido"
          :maxlength="phoneFieldMaxLength"
          autocomplete="_"
        />
      </div>
    </div>
    <button type="submit" :disabled="isSaveButtonDisabled">Guardar</button>
  </form>
</template>

<script>
const countriesData = require("@/mocks/countries_data.json");

import formSpreeService from "@/services/form-spree";

export default {
  name: "CtForm",
  data() {
    return {
      form: {
        country: "",
        city: "",
        fullname: "",
        email: "",
        phoneNumber: "",
        phonePrefix: "",
      },
      countriesData: countriesData,
      phonesMaxLength: {
        colombia: 8,
        spain: 9,
      },
    };
  },
  watch: {
    "form.country"(newVal) {
      const country = this.getCountryByName(newVal);
      this.form.city = country.cities[0];
    },

    phoneFieldMaxLength(newVal) {
      this.form.phoneNumber = this.form.phoneNumber.substring(0, newVal);
    },
  },
  computed: {
    countries() {
      return this.countriesData.reduce((acc, curr) => {
        return [...acc, curr.country];
      }, []);
    },

    cities() {
      const country = this.getCountryByName(this.form.country);

      return country.cities || [];
    },

    phonePrefixes() {
      return this.countriesData.reduce((acc, curr) => {
        return [
          ...acc,
          {
            ...curr,
            // Normalize dialCodes
            dialCode: this.normalizePhonePrefix(curr.dialCode),
          },
        ];
      }, []);
    },

    phoneFieldMaxLength() {
      const countryData = this.countriesData.find(
        ({ dialCode }) =>
          this.normalizePhonePrefix(dialCode) === this.form.phonePrefix
      );

      if (
        countryData &&
        this.phonesMaxLength[countryData.country.toLowerCase()]
      ) {
        return this.phonesMaxLength[countryData.country.toLowerCase()];
      }

      return 9;
    },

    countryFlag() {
      const { country, flag } = this.countriesData.find(({ dialCode }) => {
        return this.normalizePhonePrefix(dialCode) === this.form.phonePrefix;
      });

      return { country, flag };
    },

    isSaveButtonDisabled() {
      const formFields = Object.entries(this.form);
      // disable no-unused-vars
      // eslint-disable-next-line
      return formFields.some(([_, value]) => !value);
    },
  },
  methods: {
    fetchFormSelects() {
      this.form.country = this.countriesData[0].country;
      this.form.city = this.countriesData[0].cities[0];
      this.form.phonePrefix = this.normalizePhonePrefix(
        this.countriesData[0].dialCode
      );
    },

    getCountryByName(countryName) {
      return this.countriesData.find(({ country }) => {
        return country === countryName;
      });
    },

    normalizePhonePrefix(dialCode) {
      return `+${dialCode.replace("+", "")}`;
    },

    async postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    },

    async save() {
      try {
        const result = await formSpreeService.request({
          url: "/f/xqkwbznb",
          body: this.form,
          method: "POST",
        });
        window.location.href = result.next;
      } catch (error) {
        console.error(error);
        alert(error);
      }
    },
  },

  created() {
    this.fetchFormSelects();
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 40%;
  border: 1px solid lightgray;
  padding: 1.5rem 2rem;
  margin: 0 auto;
  &-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 1.2rem 0;

    label {
      margin-bottom: 0.2rem;
    }

    .phone-input > * {
      display: inline-block;
    }

    #phone-prefix {
      margin-right: 0.2rem;
      @media screen and (max-width: 615px) {
        margin-bottom: 0.2rem;
      }
    }
  }
  button {
    margin-top: 1.2rem;
  }
}
</style>
