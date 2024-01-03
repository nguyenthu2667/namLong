<template>
  <b-card
    style="background: linear-gradient(#43afd1, #41b1cd); color: white"
    :style="`height: ${pHeight}px`"
  >
    <div class="text-center">
      <div class="mb-2 fz-medium">
        {{ getDayWeekYear }}
      </div>
      <div class="mb-2 fz-small">
        {{ getTime }}
      </div>
      <div class="mb-2 fz-small">
        <!-- {{ getCityDynamic }} -->
      </div>
      <div class="mb-2 fz-small">
        <div>
          <b-img
            class="image"
            :src="srcImage"
            fluid
            style="max-height: 80px"
          ></b-img>
        </div>
      </div>
      <div class="mb-2 fz-small">
        <!-- {{ getTitleCloud }} -->
        {{ title }}
      </div>
      <div class="mb-2">
        <div
          class="d-flex justify-content-center box_header-bottom-temperature"
        >
          <div class="">
            {{ temperatureBienHoa }}
          </div>
          <span class="">°C</span>
        </div>
      </div>
      <div style="height: 2px; background-color: white"></div>
      <div v-if="dataTemperatures">
        <div class="d-flex justify-content-between mt-3">
          <div>
            <i class="fad fa-humidity mr-2"></i>
            <strong>
              {{ $t("dashboards.humidity") }}:
              {{ dataTemperatures.main.humidity }}
              <span>%</span></strong
            >
          </div>
          <div class="">
            <i class="fad fa-wind mr-1"></i>
            <strong
              >{{ $t("dashboards.wind") }}:
              {{ (dataTemperatures.wind.speed * 3.6).toFixed(2) }}
              <span>km/h</span></strong
            >
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <div>
            <i class="fad fa-location mr-2"></i>
            <strong>
              {{ $t("map.lng") }}:
              {{ dataTemperatures.coord.lon }}
            </strong>
          </div>
          <div class="">
            <i class="fas fa-map-marker-alt mr-2"></i>
            <strong
              >{{ $t("map.lat") }}:
              {{ dataTemperatures.coord.lat }}
            </strong>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex justify-content-between mt-3">
          <div>
            <i class="fad fa-humidity mr-2"></i>
            <strong> {{ $t("dashboards.humidity") }}: 61 <span>%</span></strong>
          </div>
          <div class="">
            <i class="fad fa-wind mr-1"></i>
            <strong>{{ $t("dashboards.wind") }}: 3.71 <span>km/h</span></strong>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <div>
            <i class="fad fa-location mr-2"></i>
            <strong> {{ $t("map.lng") }}: 106.6724396 </strong>
          </div>
          <div class="">
            <i class="fas fa-map-marker-alt mr-2"></i>
            <strong>{{ $t("map.lat") }}: : 10.7941878 </strong>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      default: "SaiGon",
    },
    pHeight: {
      type: Number,
      default: 385,
    },
    title: {
      type: String,
      default: "Hồ Chí Minh",
    },
  },
  async created() {
    await this.getTemperature();
    this.interval = setInterval(async () => {
      await this.getTemperature();
    }, 30000);
    this.time = this.getCurrentLanguage({ timeStyle: "short" });
    this.intervalTime = setInterval(() => {
      this.time = this.getCurrentLanguage({ timeStyle: "short" });
    }, 1000);
  },
  data() {
    return {
      dataTemperatures: null,
      time: null,
      intervalTime: null,
      interval: null,
      srcImage: "",
      apiKeyWeather: `7332304f45b419ee8c65c1d452a83349`,
    };
  },
  computed: {
    getTitleCloud() {
      let obj = {
        ["clear sky"]: this.$t("weather.clear-sky"),
        ["few clouds"]: this.$t("weather.few-clouds"),
        ["overcast clouds"]: this.$t("weather.overcast-clouds"),
        ["drizzle"]: this.$t("weather.drizzle"),
        ["rain"]: this.$t("weather.rain"),
        ["shower rain"]: this.$t("weather.shower-rain"),
        ["thunderstorm"]: this.$t("weather.thunderstorm"),
        ["snow"]: this.$t("weather.snow"),
        ["mist"]: this.$t("weather.mist"),
        ["broken clouds"]: this.$t("weather.broken-clouds"),
      };

      return obj[this.dataTemperatures?.weather[0].description];
    },

    getCityDynamic() {
      let obj = {
        ["SaiGon"]: this.$t("weather.city.ho-chi-minh"),
        ["DaNang"]: this.$t("weather.city.da-nang"),
        ["Can Tho"]: this.$t("weather.city.can-tho"),
      };
      return obj[this.city];
    },
    getSunrise() {
      let currentLanguage = localStorage.getItem("currentLanguage");
      let formatLanguageVi = currentLanguage === "en" ? "en" : "vi";
      let formatLanguage = currentLanguage === "en" ? "US" : "VN";
      return new Date(this.dataTemperatures.sys.sunrise).toLocaleString(
        `${formatLanguageVi}-${formatLanguage}`,
        {
          timeStyle: "short",
        }
      );
    },
    getSunset() {
      let currentLanguage = localStorage.getItem("currentLanguage");
      let formatLanguageVi = currentLanguage === "en" ? "en" : "vi";
      let formatLanguage = currentLanguage === "en" ? "US" : "VN";
      return new Date(this.dataTemperatures.sys.sunset).toLocaleString(
        `${formatLanguageVi}-${formatLanguage}`,
        {
          timeStyle: "short",
        }
      );
    },
    getDayWeekYear() {
      return (
        this.getCurrentLanguage({ weekday: "long" }) +
        `, ${this.getCurrentLanguage({ dateStyle: "long" })}`
      );
    },
    getTime() {
      return this.time;
    },
    temperatureBienHoa() {
      if (this.dataTemperatures) {
        const temperature = Math.round(this.dataTemperatures.main?.temp);
        return temperature;
      }
      return 32;
    },
  },
  methods: {
    getCurrentLanguage(options) {
      let currentLanguage = localStorage.getItem("currentLanguage");
      let formatLanguageVi = currentLanguage === "en" ? "en" : "vi";
      let formatLanguage = currentLanguage === "en" ? "US" : "VN";
      return new Date().toLocaleString(
        `${formatLanguageVi}-${formatLanguage}`,
        options
      );
    },
    async getTemperature() {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKeyWeather}&units=metric`;
      fetch(url).then((response) => {
        response
          .json()
          .then((data) => {
            this.dataTemperatures = data ? data : {};
            this.srcImage = this.dataTemperatures
              ? `http://openweathermap.org/img/wn/${this.dataTemperatures?.weather[0].icon}@2x.png`
              : "http://openweathermap.org/img/wn/10d@2x.png";
          })
          .catch((error) => console.log(error));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fz-medium {
  font-size: 18px;
}

.fz-small {
  font-size: 16px;
}

.fz-large {
  font-size: 20px;
}

.box_header-bottom-temperature {
  font-size: 36px;
  font-weight: 700;
}

.title-temperature {
  font-size: 17px;
  font-weight: 600;
}

.subtitle-temperature {
  font-size: 14px;
  font-weight: 700;
  color: #70757a;
}
</style>
