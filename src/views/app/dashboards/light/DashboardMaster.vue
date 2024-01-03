<template>
  <div>
    <b-row>
      <template v-if="selectedData">
        <b-col lg="12" class="mb-2">
          <b-dropdown
            id="dropdown-form"
            ref="dropdown"
            left
            variant="empty"
            toggle-class="p-0"
            no-caret
          >
            <template slot="button-content">
              <span v-b-toggle.collapse-header>
                <i class="fad fa-cog pt-1" style="font-size: 18px"></i>
              </span>
            </template>
            <b-dropdown-form>
              <b-form-input
                class="mt-1"
                id="search-input"
                type="search"
                size="sm"
                v-model="searchText"
                :placeholder="$t('panel.search-input-monitor')"
                style="min-width: 200px"
              ></b-form-input>
              <template v-if="searchText && searchText !== ''">
                <template v-if="optionSearch(searchText).length > 0">
                  <p class="mt-3 mb-0 text-muted font-italic text-small">
                    {{ $t("panel.total") }}
                    {{ optionSearch(searchText).length }}
                    {{ $t("panel.result") }}
                  </p>
                </template>
                <template v-else>
                  <p class="mt-3 mb-0 text-muted font-italic text-small">
                    {{ $t("panel.non-data") }}
                  </p>
                </template>
              </template>
              <template v-else>
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t("panel.total") }} {{ dataList.length }}
                  {{ $t("panel.result") }}
                </p>
              </template>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <vue-perfect-scrollbar
              class="list-item-station-option"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
            >
              <template v-if="searchText && searchText !== ''">
                <b-dropdown-item
                  v-for="(station, index) in optionSearch(searchText)"
                  :key="index"
                  @click="changeStation(station)"
                >
                  <span class="item-station-option">
                    {{ station.RegionName }}
                  </span>
                </b-dropdown-item>
              </template>
              <template v-else>
                <b-dropdown-item
                  v-for="(station, index) in dataList"
                  :key="index"
                  @click="changeStation(station)"
                >
                  <span class="item-station-option">
                    {{ station.RegionName }}
                  </span>
                </b-dropdown-item>
              </template>
            </vue-perfect-scrollbar>
          </b-dropdown>
          <template v-if="selectedData">
            <span class="ml-2 h6 text-muted">
              <strong>{{ selectedData.RegionName.toUpperCase() }}</strong>
            </span>
          </template>
        </b-col>
        <!-- content -->
        <b-col lg="2" class="mb-4">
          <b-card style="height: 385px; overflow: auto">
            <div class="text-left mb-2">
              <strong>{{
                $t("dashboards.equipment-synthesis").toUpperCase()
              }}</strong>
            </div>
            <div class="item-card mb-4">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-receipt mr-2"></i>
                  {{ selectedData.CabinetTotal_Description }}
                </div>
                <div>
                  {{ selectedData.CabinetTotal }}
                </div>
              </div>
              <b-progress
                :value="selectedData.CabinetTotal"
                :max="selectedData.CabinetTotal"
                animated
              ></b-progress>
            </div>

            <div class="item-card mb-4">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-check-circle mr-2"></i>
                  {{ selectedData.CabinetNormal_Description }}
                </div>
                <div>
                  {{ selectedData.CabinetNormal }} /
                  {{ selectedData.CabinetTotal }}
                </div>
              </div>
              <b-progress
                :value="
                  (selectedData.CabinetNormal * selectedData.CabinetTotal) /
                  selectedData.CabinetTotal
                "
                :max="selectedData.CabinetTotal"
              ></b-progress>
            </div>

            <div class="item-card mb-4">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-exclamation-circle mr-2"></i>
                  {{ selectedData.CabinetError_Description }}
                </div>
                <div>
                  {{ selectedData.CabinetError }} /
                  {{ selectedData.CabinetTotal }}
                </div>
              </div>
              <b-progress
                :value="
                  (selectedData.CabinetError * selectedData.CabinetTotal) /
                  selectedData.CabinetTotal
                "
                :max="selectedData.CabinetTotal"
              ></b-progress>
            </div>

            <div class="item-card mb-4">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-hand-paper mr-2"></i>
                  {{ selectedData.CabinetDirect_Description }}
                </div>
                <div>
                  {{ selectedData.CabinetDirect }}
                </div>
              </div>
              <b-progress
                :value="selectedData.CabinetDirect / selectedData.CabinetTotal"
                :max="selectedData.CabinetTotal"
              ></b-progress>
            </div>

            <div class="item-card mb-3">
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fas fa-calendar mr-2"></i>
                  {{ selectedData.CabinetSchedule_Description }}
                </div>
                <div>
                  {{ selectedData.CabinetSchedule }}
                </div>
              </div>
              <b-progress
                :value="
                  (selectedData.CabinetSchedule * selectedData.CabinetTotal) /
                  selectedData.CabinetTotal
                "
                :max="selectedData.CabinetTotal"
              ></b-progress>
            </div>
          </b-card>
        </b-col>

        <b-col lg="3" class="mb-4">
          <weather-city :title="'Phan Rang - Tháp Chàm'"></weather-city>
        </b-col>

        <b-col lg="7" class="mb-4">
          <b-card style="height: 385px !important">
            <div class="text-left">
              <strong>{{
                $t("dashboards.history-control").toUpperCase()
              }}</strong>
            </div>
            <div>
              <template v-if="selectedData.WarningProperties.length > 0">
                <b-table
                  :responsive="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="selectedData.WarningProperties"
                  :fields="fields"
                  :per-page="perPage"
                  :current-page="pageHistory"
                  head-variant="light"
                  class="text-center lighting-sticky-header"
                  @row-clicked="flyToMiniMap"
                  @row-dblclicked="showModalDetail"
                  sticky-header="true"
                >
                  <template
                    v-for="(field, index) in fields"
                    v-slot:[`cell(${field.key})`]="row"
                  >
                    <template v-if="field.typeCol.toUpperCase() == 'ISCHECK'">
                      <span
                        :key="index"
                        v-if="
                          row.item[`${field.key}`] == 1 ||
                          row.item[`${field.key}`] == true
                        "
                        style="color: limegreen"
                        >✔
                      </span>
                      <span :key="index" v-else style="color: red">✗ </span>
                    </template>
                    <template v-else>
                      <div :key="index">
                        {{ row.item[`${field.key}`] }}
                      </div>
                    </template>
                  </template>
                  <template #empty>
                    <div class="text-left font-italic text-muted">
                      {{ $t("panel.non-data") }}
                    </div>
                  </template>
                  <template #emptyfiltered>
                    <div class="text-left font-italic text-muted">
                      {{ $t("panel.non-result") }}
                    </div>
                  </template>
                </b-table>
                <b-pagination
                  size="sm"
                  align="center"
                  :total-rows="selectedData.WarningProperties.length"
                  :per-page="perPage"
                  v-model="pageHistory"
                >
                  <template v-slot:next-text>
                    <i class="simple-icon-arrow-right" />
                  </template>
                  <template v-slot:prev-text>
                    <i class="simple-icon-arrow-left" />
                  </template>
                  <template v-slot:first-text>
                    <i class="simple-icon-control-start" />
                  </template>
                  <template v-slot:last-text>
                    <i class="simple-icon-control-end" />
                  </template>
                </b-pagination>
              </template>
              <template v-else>
                <div class="text-center text-muted">
                  <strong> {{ $t("panel.non-data") }}</strong>
                </div>
              </template>
            </div>
          </b-card>
        </b-col>

        <b-col lg="2" class="mb-4">
          <b-card>
            <div class="text-left">
              <strong>{{
                $t("dashboards.synthesize-information").toUpperCase()
              }}</strong>
            </div>
            <b-row>
              <b-col lg="12">
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <b-img
                        :src="require('@/assets/img/light-lamp-icon/total.svg')"
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampTotal_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampTotal }}
                    </div>
                  </div>
                  <b-progress
                    variant="blue"
                    :value="selectedData.LampTotal"
                    :max="selectedData.LampTotal"
                    class="mt-2"
                    animated
                  ></b-progress>
                </div>

                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <b-img
                        :src="
                          require('@/assets/img/light-lamp-icon/disconnect.svg')
                        "
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampDisconnect_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampDisconnect }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (selectedData.LampDisconnect * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>

                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <b-img
                        :src="require('@/assets/img/light-lamp-icon/open.svg')"
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampOn_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampOn }} / {{ selectedData.LampTotal }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (selectedData.LampOn * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>

                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <b-img
                        :src="
                          require('@/assets/img/light-lamp-icon/light_off.svg')
                        "
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampOff_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampOff }} / {{ selectedData.LampTotal }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (selectedData.LampOff * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>
              </b-col>
              <b-col lg="12">
                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <b-img
                        :src="require('@/assets/img/light-lamp-icon/error.svg')"
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampError_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampError }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (selectedData.LampError * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>

                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <b-img
                        :src="require('@/assets/img/light-lamp-icon/moved.svg')"
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampMoved_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampMoved }}
                    </div>
                  </div>
                  <b-progress
                    animated
                    :value="
                      (selectedData.LampMoved * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>

                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="text-eclipse">
                      <b-img
                        :src="require('@/assets/img/fire-icon/battery.svg')"
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampLowPin_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampLowPin }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (selectedData.LampLowPin * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>

                <div class="item-card mb-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <b-img
                        :src="require('@/assets/img/light-icon/green.svg')"
                        style="height: 28px"
                        class="mr-1"
                      ></b-img>
                      {{ selectedData.LampOpen_Description }}
                    </div>
                    <div>
                      {{ selectedData.LampOpen }}
                    </div>
                  </div>
                  <b-progress
                    :value="
                      (selectedData.LampOpen * selectedData.LampTotal) /
                      selectedData.LampTotal
                    "
                    :max="selectedData.LampTotal"
                    class="mt-2"
                  ></b-progress>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col lg="5" class="mb-4">
          <b-card>
            <div class="d-flex justify-content-between">
              <strong class="pt-1">{{
                $t("tabs.title.analysis-chart")?.toUpperCase()
              }}</strong>
              <div>
                <b-dropdown
                  :text="selectChartOption.label"
                  size="xs"
                  variant="outline-secondary"
                  class="float-right float-none-xs"
                >
                  <b-dropdown-item
                    v-for="(item, index) in optionChart"
                    @click="changeChartOption(item)"
                    :key="index"
                  >
                    {{ item.label }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="chart card-body pt-1">
              <template v-if="showChart">
                <multi-area-shadow-chart
                  :labelDate="labelChart"
                  :data="dataChart"
                  :height="417"
                />
              </template>
              <template v-else>
                <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
              </template>
            </div>
          </b-card>
        </b-col>

        <b-col lg="5" class="mb-4">
          <b-card style="height: 483px; overflow: auto">
            <div class="text-left">
              <strong>{{ $t("modal.schedules-control").toUpperCase() }}</strong>
            </div>
            <div>
              <custom-table
                :data-table="itemsSchedule"
                :field-table="fieldsSchedule"
                :column-show="listColumnShowSchedule"
                @row-dblclicked="dbClickedSchedule"
                :row-page="5"
                :pIsTotal="false"
                :pIsSearch="false"
                :no-data="$t('panel.non-data-control-calendar')"
                :bordered="true"
              ></custom-table>
            </div>
          </b-card>
        </b-col>

        <b-col lg="4" class="mb-4">
          <b-card style="height: 350px; overflow: auto">
            <div class="text-left">
              <strong>{{
                $t("report.light.observation-map").toUpperCase()
              }}</strong>
            </div>
            <div style="height: 300px">
              <multi-map-mini
                ref="multiMapMini"
                :data-map-now="dataMapNow"
                :object-data="objectData"
                :type="'Light'"
              ></multi-map-mini>
            </div>
          </b-card>
        </b-col>

        <b-col lg="8" class="mb-4">
          <b-card style="height: 350px; overflow: auto">
            <div class="text-left">
              <strong>{{ $t("dashboards.cabinet-name").toUpperCase() }}</strong>
            </div>
            <div>
              <custom-table
                :data-table="selectedData.TotalProperties"
                :field-table="fieldsMonitor"
                :column-show="listColumnShowMonitor"
                @row-dblclicked="dbClickedMonitor"
                :no-data="$t('panel.non-data-control-cabinet')"
                :bordered="true"
              ></custom-table>
            </div>
          </b-card>
        </b-col>
      </template>
    </b-row>
    <!-- Detail Light -->
    <b-modal
      size="xl"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
      :id="`modal-detail-${dataModal.CabinetID}-check`"
      v-if="dataModal"
    >
      <light-cabinet-popup
        :data-parent="dataModal"
        :dataHistory="dataModal"
        :object-data="objectData"
        :dataMapNow="dataMapNow"
        @reload-data="reloaddata"
      ></light-cabinet-popup>
    </b-modal>

    <!-- Detail Schedule -->
    <b-modal
      :id="`modal-schedule-${dataForm.ScheduleID}`"
      :title="titleForm"
      @hidden="resetModal"
      ok-only
      scrollable
      class="text-center"
      size="lg"
      v-if="dataForm"
    >
      <b-overlay :show="loadingForm" rounded="sm">
        <modal-schedules
          ref="formSchedules"
          :dataForm="dataForm"
          :typeForm="typeForm"
          :LightID="dataFormOptions.LightID"
          :ActionID="dataFormOptions.ActionID"
          :CustomAction="dataFormOptions.CustomAction"
          :isPagination="true"
          :disabled="true"
        ></modal-schedules>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "./component/CustomTables";
import { timer } from "@/constants/config";
import handling from "@/constants/handling";
import lightAPI from "@/api/modules/lightAPI";
import MultiLocationComponent from "./component/MultiLocationComponent";
import AreaChartApex from "@/components/Charts/LineChartDashed";
import FollowStation from "./component/FollowStation";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import ListItem from "./component/ListItem";
import systemAPI from "@/api/modules/systemAPI";
import DynamicTable from "@/components/Table/DynamicTable";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import MultiMapMini from "@/components/Map/MultiMapMini.vue";
import LightCabinet from "@/views/app/map/popup-modals/LightCabinet.vue";
import moment from "moment";
import ModalSchedules from "@/views/app/function/light/component/ModalSchedules";
import WeatherCity from "@/components/Cards/Weather";

export default {
  components: {
    "multi-location-component": MultiLocationComponent,
    "area-chart-apex": AreaChartApex,
    "follow-station": FollowStation,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "list-item": ListItem,
    "dynamic-table": DynamicTable,
    "multi-area-shadow-chart": MultiAreaShadowChart,
    "multi-map-mini": MultiMapMini,
    "custom-table": CustomTables,
    "light-cabinet-popup": LightCabinet,
    "modal-schedules": ModalSchedules,
    "weather-city": WeatherCity,
  },
  data() {
    return {
      labelChart: null,
      listColumnShow: null,
      listColumnShowMonitor: null,
      typeForm: "",
      listColumnShowSchedule: null,
      objectKey: null,
      objectKeyMonitor: null,
      objectKeySchedule: null,
      itemsTable: null,
      items: null,
      itemsMonitor: null,
      itemsSchedule: null,
      dataMapNow: null,
      lightOption: [],
      cabinetOption: [],
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      menuRight: [],
      timer,
      dataList: null,
      selectedData: null,
      searchText: "",
      latLng: [],
      typeLoadData: "WEEK",
      dataChart: null,
      titleForm: null,
      dataForm: null,
      displayMode: "thumb",
      search: "",
      filterItems: null,
      convertItems: null,
      page: 1,
      pageHistory: 1,
      perPage: 10,
      loadingForm: false,
      totalRows: 0,
      fieldsLight: [
        {
          key: "StationName",
          label: this.$t("dashboards.admin-name"),
          tdClass: "text-left font-weight-bold pl-3",
        },
        {
          key: "StationAddress",
          label: this.$t("dashboards.cabinet-name"),
          tdClass: "font-weight-bold text-muted",
        },
        {
          key: "StatusName",
          label: this.$t("modal.action"),
          tdClass: "font-weight-bold text-muted",
        },
      ],
      selectChartOption: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionChart: [
        {
          label: this.$t("modal.this-week"),
          value: "WEEK",
        },
        {
          label: this.$t("modal.this-month"),
          value: "MONTH",
        },
        {
          label: this.$t("modal.this-year"),
          value: "YEAR",
        },
      ],
      showChart: false,
      dataModal: null,
      dataTemperatures: null,
      dayNow: moment(new Date()).format("YYYY-MM-DD"),
      idClick: null,
      dataFormOptions: {
        ActionID: [],
        LightID: [],
        SelectID: [],
        CustomAction: [],
      },
      totalProperties: null,
    };
  },
  watch: {
    search(to, from) {
      if (this.items.length > 0) {
        this.page = 1;
        if (to.length > 0) {
          let newArr = this.searchData(this.items, to);
          if (newArr.length > 0) {
            this.filterItems = newArr;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              newArr
            );
            this.totalRows = newArr.length;
          } else {
            this.filterItems = null;
            this.convertItems = null;
            this.totalRows = 0;
          }
        } else {
          this.filterItems = null;
          this.convertItems = this.paginationData(
            this.page,
            this.perPage,
            this.items
          );
          this.totalRows = this.items.length;
        }
      }
    },
    page(to, from) {
      if (this.filterItems) {
        this.convertItems = this.paginationData(
          to,
          this.perPage,
          this.filterItems
        );
        this.totalRows = this.filterItems.length;
      } else {
        this.convertItems = this.items
          ? this.paginationData(to, this.perPage, this.items)
          : null;
        this.totalRows = this.items.length;
      }
    },
  },
  methods: {
    async reloaddata() {
      await this.getDataRegion();
      await this.getDataSchedules();
    },
    // lịch điều khiển
    getOptionSelectType() {
      lightAPI
        .lightCabinetSchedulesSelectTable()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.SelectID = [];
              let array = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].SelectName,
                  value: val.data[i].SelectID,
                };
                array.push({
                  id: val.data[i].SelectID,
                  enable: val.data[i].SelectEnable,
                  option: val.data[i].SelectOption,
                });
                this.dataFormOptions.SelectID.push(obj);
              }
              this.days = array;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionActionType() {
      lightAPI
        .lightCabinetActionList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ActionID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].ActionName,
                  value: val.data[i].ID,
                };
                // if (obj.value !== 5) {
                //ẩn-1option
                this.dataFormOptions.ActionID.push(obj);
                // }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getOptionLightType() {
      lightAPI
        .lightLevelList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.LightID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].LightName,
                    value: val.data[i].LightID,
                  };
                  this.dataFormOptions.LightID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionSchedule() {
      lightAPI
        .scheduleOptionList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CustomAction = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].ScheduleOptionName,
                  value: val.data[i].ScheduleOptionID,
                };
                this.dataFormOptions.CustomAction.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    dbClickedSchedule(row) {
      this.idClick = row.ScheduleID;
      let body = {
        ID: row.ScheduleID,
      };
      lightAPI.lightCabinetSchedulesByID(body).then((val) => {
        if (val.status) {
          let obj = val.data ? val.data : null;
          this.dataForm = obj;
          this.titleForm = this.$t("dashboards.view-detail").toUpperCase();
          this.sizeModal = "xl";
          setTimeout(() => {
            this.$bvModal.show(`modal-schedule-${this.dataForm.ScheduleID}`);
          }, 500);
        }
      });
    },
    getDataSchedules() {
      lightAPI
        .lightCabinetSchedulesListActive()
        .then((val) => {
          this.itemsSchedule = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.objectKeySchedule = val.status ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getColumnSchedule(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowSchedule = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      this.dataModal = null;
    },
    dbClickedMonitor(data) {
      this.dataModal = data;
      setTimeout(() => {
        this.$bvModal.show(`modal-detail-${this.dataModal.CabinetID}-check`);
      }, 500);
    },
    changeChartOption(item) {
      this.selectChartOption = item;
      this.showChart = false;
      this.areaCharts = [];
      this.getDataChart();
    },
    convertDataChartMultiAreaShadow(data) {
      //contructor
      let labelDate = [];
      let result = [
        {
          label: data[0].IndicatorName,
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          backgroundColor: this.gradient,
          data: [],
        },
        {
          label: data[1].IndicatorName,
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        {
          label: data[2].IndicatorName,
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },

        // {
        //   label: data[3].IndicatorName,
        //   borderColor: '#c7e8ea',
        //   pointBorderColor: '#c7e8ea',
        //   pointHoverBackgroundColor: '#c7e8ea',
        //   pointHoverBorderColor: 'black',
        //   pointBackgroundColor: '#c7e8ea',
        //   pointBorderColor: '#c7e8ea',
        //   borderWidth: 2,
        //   backgroundColor: this.gradient2,
        //   data: [],
        // },
      ];

      //data-custom
      data.forEach((item) => {
        item.ChartDetailList.forEach((itemchil) => {
          if (itemchil.IndicatorCode === "CMC") {
            result[0].data.push(itemchil.IndicatorValue);
            labelDate.push(itemchil.ItemDate.split("-")[1]);
          } else if (itemchil.IndicatorCode === "COC") {
            result[1].data.push(itemchil.IndicatorValue);
          } else {
            result[2].data.push(itemchil.IndicatorValue);
          }
        });
      });
      this.labelChart = labelDate;
      this.dataChart = result;
      setTimeout(() => {
        this.showChart = true;
      }, 50);
    },
    showModalDetail(item) {
      this.$refs.multiMapMini.showModal(item);
    },
    flyToMiniMap(item) {
      this.$refs.multiMapMini.flyToPoint(item);
    },
    getColumnMonitor(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          let newArr = [];
          val.data.forEach((item) => {
            if (item.ClName.toUpperCase() !== "LAMPTOTAL") {
              newArr.push(item);
            }
          });
          this.listColumnShowMonitor = newArr;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status
            ? val.data.map((item) => {
                if (
                  item.ClName === "LampMoved" ||
                  item.ClName === "LampOpen" ||
                  item.ClName === "LampOff" ||
                  item.ClName === "LampOn" ||
                  item.ClName === "LampTotal" ||
                  item.ClName === "LampError" ||
                  item.ClName === "LampLowPin" ||
                  item.ClName === "LampTotal" ||
                  item.ClName === "LampDisconnect"
                ) {
                  return { ...item, custom: "custom" };
                }
                return { ...item };
              })
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadCabinetOption() {
      lightAPI
        .mapCabinetActionList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.cabinetOption = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].ActionName,
                  value: val.data[i].ID,
                };
                this.cabinetOption.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadLightOption() {
      lightAPI
        .lightLevelList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.lightOption = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].LightName,
                    value: val.data[i].LightID,
                  };
                  this.lightOption.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "Name") {
            if (
              i[j].toString().toLowerCase().indexOf(string.toLowerCase()) > -1
            ) {
              status = true;
            }
          }
        });
        if (status) {
          newArr.push(i);
        }
      });
      return newArr;
    },
    paginationData(page, perPage, array) {
      let newArray = [];
      array.forEach((val, index) => {
        if (page === 1) {
          if (index < perPage) {
            newArray.push(val);
          }
        } else {
          if (index >= perPage * (page - 1) && index < perPage * page) {
            newArray.push(val);
          }
        }
      });
      return newArray;
    },
    flyToPoint(items) {
      this.$refs.formMapMultiPoint.flyPoint(items.Lat, items.Long);
    },
    showListStationConnect(id) {
      document.getElementById(id).classList.toggle("show-list-custom");
    },
    changeStation(station) {
      this.selectedData = station;
      this.getData(this.selectedData);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.dataList.forEach((val) => {
          if (val.RegionName.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    getDataRegion() {
      lightAPI
        .lightDashboardTest()
        .then((val) => {
          this.dataList = val.status ? val.data : [];
          this.objectKeyMonitor = val.status
            ? Object.keys(val.data[0].TotalProperties[0])
            : [];
          this.selectedData = this.dataList[0];
          this.totalProperties = { ...this.selectedData.TotalProperties };
          this.getData(this.selectedData);
          this.getDataChart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(selected) {
      if (selected) {
        this.dataMapNow = this.selectedData
          ? [
              {
                DataTypeName: "LIGHT",
                DataProperties: this.selectedData.TotalProperties,
              },
            ]
          : [];
        this.itemsTable = this.selectedData
          ? this.selectedData.TotalProperties
          : [];
        if (this.selectedData?.WarningProperties.length > 0) {
          this.objectKey = this.selectedData
            ? Object.keys(this.selectedData?.WarningProperties[0])
            : [];
        }
        if (
          this.selectedData.TotalProperties &&
          this.selectedData.TotalProperties.length > 0
        ) {
          this.selectedData.TotalProperties.forEach((val) => {
            this.latLng.push([val.Lat, val.Long, val.StatusColor]);
          });
        }
        //search-pagination
        this.items = this.selectedData.TotalProperties;
        this.totalRows = this.selectedData.TotalProperties.length;
        this.convertItems = this.paginationData(
          this.page,
          this.perPage,
          this.selectedData.TotalProperties
        );
      }
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataChart() {
      let body = {
        Type: this.selectChartOption.value,
        RegionID: "" + this.selectedData.RegionID,
      };

      lightAPI
        .lightChartRegion(body)
        .then((val) => {
          if (val.data && val.data.length > 0) {
            this.convertDataChartMultiAreaShadow(val.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getDataRegion();
    await this.loadCabinetOption();
    await this.loadLightOption();
    await this.getListMenuRight();
    await this.getColumn("LightScheduleDashboards");
    await this.getColumnMonitor("LightMonitor");
    await this.getColumnSchedule("CabinetSchedules");
    await this.getDataSchedules();

    await this.getOptionActionType();
    await this.getOptionLightType();
    await this.getOptionSelectType();
    await this.getOptionSchedule();
    this.interval = setInterval(async () => {
      await this.getDataRegion();
      await this.getDataSchedules();
    }, 30000);
  },
  computed: {
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
    fields: function () {
      let newFields = handling.mergeKeyDynamic(
        this.objectKey,
        this.listColumnShow
      );
      return newFields;
    },
    fieldsMonitor: function () {
      return handling.mergeTableAndData(
        this.objectKeyMonitor,
        this.listColumnShowMonitor
      );
    },
    fieldsSchedule: function () {
      return handling.mergeTableAndData(
        this.objectKeySchedule,
        this.listColumnShowSchedule
      );
    },
  },
};
</script>

<style>
.tabs-custom-light .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  font-weight: 900 !important;
}

.lighting-sticky-header > table > thead > tr > th.position-relative {
  position: sticky !important;
}
</style>
<style scoped>
.lighting-sticky-header {
  height: 280px;
}

.dynamic-table .table th {
  white-space: nowrap;
}

.card-custom-map-mini-two .card-body {
  padding: 0;
}

.border-map-mini-two {
  width: 100%;
  height: 385px;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.history-control-station {
  height: 385px;
}

.history-control-station .card-body {
  padding: 0;
}

.history-control-station .card-body .custom-title-control {
  font-size: 15px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #d7d7d7;
  width: 100%;
  font-weight: bold;
}

.history-control-station .card-body .custom-body-control {
  height: 338px;
}

.custom-list-collapse {
  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-list-collapse-label {
  display: block;
  cursor: pointer;
  padding: 0.75rem;
  border-bottom: none;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  margin-bottom: 0;
}

.custom-list-collapse-label:hover {
  background: #d7d7d7;
}

.custom-list-collapse-label.last {
  /*border-bottom: 1px solid #fff;*/
}

input[type="checkbox"] {
  position: absolute;
  left: -9999px;
}

input[type="checkbox"] ~ .cabinet-control {
  height: 0;
  transform: scaleY(0);
}

input[type="checkbox"]:checked ~ .cabinet-control {
  height: 100%;
  transform-origin: top;
  transition: transform 0.2s ease-out;
  transform: scaleY(1);
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}

input[type="checkbox"]:checked + .custom-list-collapse-label {
  background: #d7d7d7;
  /*border-bottom: 1px solid #fff;*/
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  top: 100px;
  left: 0;
  width: 100%;
}

#dropConnect {
  background-color: #e7f2e8;
  border: 1px solid #88cf8f;
}

#dropDisconnect {
  background-color: #fcdfe0;
  border: 1px solid #db888b;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.show-list-custom {
  display: block;
}

.none-click {
  pointer-events: none;
}

.button-wrapper .custom-type-load-label {
  font-size: 10px;
  padding: 5px 10px;
}

.button-wrapper .custom-type-load-li {
  height: 26px;
}

.button-wrapper .custom-type-load-li:first-child {
  margin-left: 0;
}

.button-wrapper .custom-type-load-li {
  margin-left: 20px;
}

.follow-list-station {
  height: 684px;
}

.fz-medium {
  font-size: 18px;
}

.fz-small {
  font-size: 16px;
}

.fz-large {
  font-size: 20px;
}
</style>
