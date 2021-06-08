<template>
  <form class="form">
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
        <template v-for="city in cities">
          <option :value="city" :key="`city-${city}`">
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
            >
              {{ prefix.unicodeFlag | decode }} | {{ prefix.dialCode }}
            </option>
          </template>
        </select>
        <input
          type="tel"
          id="phone"
          v-model="form.phoneNumber"
          :maxlength="phonesMaxLength[form.country.toLowerCase()]"
          autocomplete="_"
        />
      </div>
    </div>
    <button type="button">Guardar</button>
  </form>
</template>

<script>
const countriesData = require("@/mocks/countries_data.json");

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
        afghanistan: 8,
        albania: 7,
      },
    };
  },
  watch: {
    "form.country"(newVal) {
      const country = this.getCountryByName(newVal);
      this.form.city = country.cities[0];
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
    countryFlag() {
      const { country, flag } = this.countriesData.find(({ dialCode }) => {
        return this.normalizePhonePrefix(dialCode) === this.form.phonePrefix;
      });

      return { country, flag };
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
