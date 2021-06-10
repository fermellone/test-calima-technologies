<template>
  <form class="form" @submit.prevent="save">
    <div class="form-group">
      <label for="country">País</label>
      <t-rich-select id="country" v-model="form.country" :options="countries" />
    </div>
    <div class="form-group">
      <label for="city">Ciudad</label>
      <t-rich-select id="city" v-model="form.city" :options="cities" />
    </div>
    <div class="form-group">
      <label for="fullname">Nombre completo</label>
      <t-input
        type="text"
        id="fullname"
        v-model.trim="form.fullname"
        maxlength="40"
        autocomplete="_"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">Correo electrónico</label>
      <t-input
        type="email"
        id="email"
        v-model.trim="form.email"
        title="Introduzca una dirección de correo electrónico válida"
        maxlength="255"
        autocomplete="_"
        required
      />
    </div>
    <div class="form-group">
      <label for="phone">Teléfono</label>
      <div class="flex w-full">
        <div class="w-2/5">
          <t-rich-select
            id="phone-prefix"
            v-model="form.phonePrefix"
            :options="phonePrefixes"
            value-attribute="dialCode"
            text-attribute="text"
          />
        </div>
        <div class="w-3/5">
          <t-input
            type="tel"
            id="phone"
            v-model.trim="form.phoneNumber"
            :pattern="`[0-9]{${phoneFieldMaxLength}}`"
            title="Introduzca un número de teléfono válido"
            :maxlength="phoneFieldMaxLength"
            :variant="phoneNumberVariant"
            autocomplete="_"
            required
          />
        </div>
      </div>
    </div>
    <t-button type="submit" class="button" :disabled="isSaveButtonDisabled">
      Guardar
    </t-button>
  </form>
</template>

<script>
import { getCountriesData } from "@/api/countriesNow";

const initialForm = {
  country: "",
  city: "",
  fullname: "",
  email: "",
  phoneNumber: "",
  phonePrefix: "",
};

export default {
  name: "CtForm",
  props: {
    offline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: { ...initialForm },
      countriesData: [],
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
        return [...acc, curr.name];
      }, []);
    },

    cities() {
      const country = this.getCountryByName(this.form.country);

      return country ? country.cities : [];
    },

    phonePrefixes() {
      return this.countriesData
        .filter((c) => !!c.dialCode)
        .reduce((acc, curr) => {
          return [
            ...acc,
            {
              ...curr,
              // Normalize dialCodes
              dialCode: this.normalizePhonePrefix(curr.dialCode),
            },
          ];
        }, [])
        .sort(
          (a, b) =>
            this.normalizePhonePrefix(a.dialCode) <
            this.normalizePhonePrefix(b.dialCode)
        )
        .map((c) => {
          return {
            ...c,
            text: `${c.unicodeFlag} | ${c.dialCode}`,
          };
        });
    },

    phoneFieldMaxLength() {
      const countryData = this.countriesData
        .filter(({ dialCode }) => !!dialCode)
        .find(({ dialCode }) => {
          return this.normalizePhonePrefix(dialCode) === this.form.phonePrefix;
        });

      if (countryData && this.phonesMaxLength[countryData.name.toLowerCase()]) {
        return this.phonesMaxLength[countryData.name.toLowerCase()];
      }

      return 9;
    },

    isSaveButtonDisabled() {
      const formFields = Object.entries(this.form);
      // disable no-unused-vars
      // eslint-disable-next-line
      return formFields.some(([_, value]) => !value) || this.phoneNumberVariant === "danger" || !this.isEmailValid
    },

    phoneNumberVariant() {
      return (
        (this.form.phoneNumber &&
          this.form.phoneNumber.length < this.phoneFieldMaxLength) ||
        (isNaN(this.form.phoneNumber) ? "danger" : "")
      );
    },

    isEmailValid() {
      return (
        /.*@.*[.]/g.test(this.form.email) && !this.form.email.endsWith(".")
      );
    },
  },
  methods: {
    fetchFormSelects() {
      this.form.country = this.countriesData[0].name;
      this.form.city = this.countriesData[0].cities[0];
      this.form.phonePrefix = this.normalizePhonePrefix(
        this.countriesData[0].dialCode
      );
    },
    async initialize() {
      try {
        this.countriesData = await getCountriesData();

        this.fetchFormSelects();
      } catch (error) {
        console.error(error);
        alert("Algo anda mal");
      }
    },

    getCountryByName(countryName) {
      return this.countriesData.find(({ name }) => {
        return name === countryName;
      });
    },

    normalizePhonePrefix(dialCode) {
      return `+${dialCode.replace("+", "")}`;
    },

    async save() {
      this.$emit("save", this.form);
      if (this.offline) {
        this.form = {
          ...initialForm,
        };
        this.fetchFormSelects();
      }
    },
  },

  created() {
    this.initialize();
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 40%;
  border: 1px solid lightgray;
  padding: 1.5rem 2rem;
  margin: 0 auto 2rem;
  min-width: 320px;
  &-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1.2rem 0;

    label {
      margin-bottom: 0.2rem;
      width: 100%;
      text-align: left;
    }

    .phone-input > * {
      display: inline-block;
    }

    .form-group > .relative {
      width: 100%;
    }

    #phone-prefix {
      margin-right: 0.2rem;
      color: blue;
      @media screen and (max-width: 615px) {
        margin-bottom: 0.2rem;
      }
    }
  }
  button {
    margin-top: 1.2rem;
    width: 100%;
  }
}
</style>
