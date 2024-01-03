<template>
  <div>
    <b-row class="m-0">
      <b-colxx md="12" style="padding-top: 0.75rem" class="d-flex">
        <button @click.prevent.stop="emitShowMenu" class="mr-1 btn-toggle">
          <i class="fad fa-exchange-alt p-1"></i>
        </button>
        <b-form-input
          id="search-input-chilren"
          type="search"
          size="sm"
          v-model="searchText"
          :placeholder="$t('map.search-input-map')"
        ></b-form-input>
      </b-colxx>
      <b-colxx md="12">
        <div class="text-muted font-italic text-small text-center mt-1">
          {{ $t("map.total") }} {{ listShowChilren.length }}
          {{ $t("map.result") }}
        </div>
      </b-colxx>
      <template v-if="listShowChilren && listShowChilren.length > 0">
        <b-colxx md="12">
          <!-- t2 -->
          <vue-perfect-scrollbar
            class="scroll list-station-data"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
            style="cursor: pointer; width: 100%"
          >
            <template v-for="(value, index) in listShowChilren">
              <div
                class="d-flex flex-row mb-3 load-item-custom"
                :key="index"
                @click="emitFlyToPoint({ lat: value.Lat, lng: value.Long })"
              >
                <span class="d-block position-relative">
                  <template v-if="value.TreeImage">
                    <b-img
                      :src="value.TreeImage"
                      :alt="'image_' + value.StationID"
                      style="height: 80px; width: 80px"
                    />
                  </template>
                </span>
                <div class="load-text-custom pl-3 pb-2 pr-2">
                  <span>
                    <div class="load-text-custom-over">
                      {{ value.StationName }}
                    </div>
                    <div>
                      <p
                        class="load-text-custom-over text-muted mb-1 text-small"
                      >
                        {{ value.FullAddress }}
                      </p>
                    </div>
                    <div
                      class="
                        load-text-custom-over
                        text-primary text-small
                        font-weight-medium
                        d-none d-sm-block
                      "
                    >
                      {{ convertDateTime(value.UpdateTime) }}
                    </div>
                    <div v-if="value.StatusName">
                      <b-badge
                        variant="primary"
                        :style="
                          'font-weight: 600;background:' +
                          value.StatusColor +
                          '!important'
                        "
                      >
                        {{ value.StatusName }}</b-badge
                      >
                    </div>
                  </span>
                </div>
              </div>
            </template>
          </vue-perfect-scrollbar>
        </b-colxx>
      </template>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["listShowChilren"],
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    emitFlyToPoint() {
      console.log("emitFlyToPoint");
    },
    emitShowMenu() {
      this.$emit("show-menu", false);
    },
  },
};
</script>

<style lang="scss" scoped>
#search-input-chilren {
  height: 2rem;
}
#search-input-chilren:before {
  background-color: white;
}
.load-item-custom {
  height: 80px;
}
.load-item-custom:hover {
  background-color: #dfdfdf;
}
.btn-toggle {
  border: 1.2px solid #b8b8b8;
}
.btn-toggle:hover {
  background: #d7d7d7;
}
</style>