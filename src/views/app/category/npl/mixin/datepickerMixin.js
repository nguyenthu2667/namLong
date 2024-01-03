import { en, vi } from "vuejs-datepicker/dist/locale";
export default {
  data() {
    return {
      locale: this.$t('language') == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
    }
  },
  created() {
    this.locale = this.$i18n.locale === 'vn' ? vi : en
  },
  watch: {
    "$i18n.locale"() {
      this.locale = this.$i18n.locale === 'vn' ? vi : en
    }
  }
}