<template>
  <div>
    <div class="pb-3" v-if="dataDashboard && dataDashboard.length > 0">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
        <div
          class="w-100 w-lg-50 bg-primary-wind position-relative box-shadow-custom"
        >
          <div class="p-3 py-lg-5 px-lg-4">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title text-uppercase text-white mb-0">
                  {{ $t("report.location") }}
                </h6>
                <span class="font-md font-weight-bold text-white">{{
                  dataDashboard[0].LocationTotal
                }}</span>
              </div>

              <div>
                <div
                  class="ic on icon-shape text-white rounded-circle shadow bg-gradient-red"
                  style="width: 3rem; height: 3rem; position: relative"
                >
                  <i
                    class="fal fa-map-marker-alt box-center-wind"
                    style="font-size: 24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-100 w-lg-50 bg-primary-wind position-relative box-shadow-custom"
        >
          <div class="p-3 py-lg-5 px-lg-4">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title text-uppercase text-white mb-0">
                  {{ $t("form.camera-device") }}
                </h6>
                <div class="d-flex align-items-center mr-2">
                  <div class="font-md font-weight-bold text-white">
                    {{ dataDashboard[0].CameraTotal }} &nbsp;
                  </div>
                  <p class="mb-0 text-sm text-white">
                    (
                    <span class="text-white mr-1">{{
                      dataDashboard[0].CameraDisconnected
                    }}</span>
                    <span class="text-nowrap">{{
                      $t("dashboards.disconnect")
                    }}</span>
                    )
                  </p>
                </div>
              </div>

              <div>
                <div
                  class="ic on icon-shape text-white rounded-circle shadow bg-gradient-orange"
                  style="width: 3rem; height: 3rem; position: relative"
                >
                  <i
                    class="fal fa-cctv box-center-wind"
                    style="font-size: 24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <virtual-list
      :data-key="'id'"
      :data-sources="dataCameras"
      :data-component="item"
      :estimate-size="360"
      :keeps="4"
      :wrap-class="'row-virtual'"
      :item-class="'item-virtual'"
      class="wrap-virtual"
      :page-mode="true"
      ref="virtual"
    />
  </div>
</template>

<script>
import windAPI from "@/api/modules/windAPI";
import MainCCTV from "@/views/app/dashboards/cctv/MainCCTV.vue";
import handling from "@/constants/handling";

export default {
  async created() {
    await this.getDataDashboardCCTV();
  },
  data() {
    return {
      dataDashboard: [],
      dataCameras: [],
      item: MainCCTV,
      pageMode: true,
    };
  },
  mounted() {},
  methods: {
    getDataDashboardCCTV() {
      windAPI
        .windDashboardCCTV()
        .then((val) => {
          this.dataDashboard = val.status ? val.data?.Dashboards : [];
          this.dataCameras = val.status
            ? handling.convertDataBitToBoolean(val.data.Cameras)
            : [];
          // handle
          let start = 0;
          let end = 3;
          let result = [];
          let active = true;
          this.dataCameras.forEach((x) => {
            if (active === false) return;
            if (
              this.dataCameras.slice(start, end).length === 3 &&
              active === true
            ) {
              result.push(this.dataCameras.slice(start, end));
              start += 3;
              end += 3;
            } else {
              if (this.dataCameras.slice(start, end).length !== 0) {
                result.push(this.dataCameras.slice(start, end));
              }
              active = false;
            }
          });

          this.dataCameras = result.map((x, index) => {
            return {
              id: index,
              children: x,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-gradient-red {
  background: linear-gradient(87deg, #f5365c, #f56036) !important;
}

.bg-gradient-orange {
  background: linear-gradient(87deg, #fb6340, #fbb140) !important;
}

.bg-gradient-green {
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
}

.bg-gradient-info {
  background: linear-gradient(87deg, #11cdef, #1171ef) !important;
}
.box-center-wind {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box-shadow-custom {
  box-shadow: 0 1px 15px RGB(0 0 0 / 4%), 0 1px 6px RGB(0 0 0 / 4%);
}

.gap-4 {
  gap: 1rem;
}

.col-4-custom {
}

.border-color-custom {
  border-color: 1px solid #d7d7d7;
}

.connected {
  background-color: #120c6e !important;
  color: white;
}
.disconnected {
  background-color: #f5365c !important;
  color: white;
}

.bg-color-footer {
  background-color: #d3d3d3;
}

.font-size-custom {
  font-size: 16px;
}

.active {
  background-color: #d3d3d3;
  padding: 4px;
  border-radius: 4px;
}

.hover-bg:hover {
  background-color: #d1d1d1;
}

.display-stream {
  background-color: black;
}

.bg-primary-wind {
  background-image: linear-gradient(to right top, #104978, #3582b2, #3693ce);
  border-radius: 4px;
}

.bg-gradient-red {
  background: linear-gradient(87deg, #f5365c, #f56036) !important;
}

.bg-gradient-orange {
  background: linear-gradient(87deg, #fb6340, #fbb140) !important;
}

.font-md {
  font-size: 1.5rem;
}
</style>
