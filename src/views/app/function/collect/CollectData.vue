<template>
  <div v-if="objectData">
    <b-row v-if="data">
      <b-card style="width: 100%" class="m-3">
        <b-col lg="12">
          <b-row>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/yeucau.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalCollect }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalCollectDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/khuvuc.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.RouteTotal }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.RouteTotalDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/nguoithuthap.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalEmloyer }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalEmloyerDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/tongthuthap.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalQtty }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalQttyDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/tientrinh.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.PercentComptete }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.PercentCompteteDescription }} (%)
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="12">
          <b-row>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/dacapnhat.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalUpdate }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalUpdateDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/daduyet.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalApproval }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalApprovalDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/choduyet.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalWaiting }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalWaitingDescription }}
                </div>
              </b-card>
            </b-col>

            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/trave.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalReturn }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalReturnDescription }}
                </div>
              </b-card>
            </b-col>
            <b-col class="mb-4">
              <b-card class="box_header">
                <div class="d-flex">
                  <span class="box_header-icon">
                    <b-img
                      :src="require('@/assets/img/tree-icon/conlai.png')"
                      style="height: 100%"
                    ></b-img>
                  </span>
                  <span class="box_header-value">
                    <div class="text-center mt-2">
                      {{ data.TotalRemain }}
                    </div>
                  </span>
                </div>
                <div class="box_header-bottom">
                  {{ data.TotalRemainDescription }}
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-card>

      <b-col lg="9" class="mb-4">
        <b-row>
          <b-col lg="8">
            <b-card style="height: 430px" no-body>
              <b-card-body>
                <div class="d-flex justify-content-between mb-4">
                  <div class="float-left float-none-xs">
                    <div class="d-inline-block">
                      <h4 class="d-inline">
                        {{ $t("dashboards.collection-statistics") }}
                      </h4>
                      <span class="text-muted text-small d-block">
                        {{
                          " (" +
                          $t("dashboards.unit") +
                          ": " +
                          $t("dashboards.tree").toLowerCase() +
                          ")"
                        }}
                      </span>
                    </div>
                  </div>
                  <b-dropdown
                    :text="selectChartCollect.label"
                    size="xs"
                    variant="outline-secondary"
                  >
                    <b-dropdown-item
                      v-for="(item, index) in optionChartCollect"
                      @click="changeChartCollect(item)"
                      :key="index"
                    >
                      {{ item.label }}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div>
                  <template v-if="showChartCollect">
                    <multi-area-shadow-chart
                      :labelDate="labelChart"
                      :data="dataChart"
                      :height="320"
                    />
                  </template>
                  <template v-else>
                    <p class="font-italic mt-4">
                      {{ $t("cards.no-data") }}
                    </p>
                  </template>
                </div>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="4">
            <b-card class="dashboard-link-list-tree" no-body>
              <b-card-body>
                <div class="d-flex justify-content-between mb-4">
                  <div class="float-left float-none-xs">
                    <div class="d-inline-block">
                      <h4 class="d-inline">
                        {{ $t("dashboards.collect-detail") }}
                      </h4>
                      <span class="text-muted text-small d-block">
                        {{ " (" + $t("dashboards.sum-tree-by-type") + ")" }}
                      </span>
                    </div>
                  </div>
                </div>
                <template v-if="data">
                  <b-row>
                    <template v-if="data.TotalTrees.length > 0">
                      <template v-for="(it, i) in data.TotalTrees">
                        <b-col :key="i" lg="6">
                          <div
                            class="list_item d-flex justify-content-between mb-2"
                          >
                            <strong>{{ it.TreeName }}</strong>
                            <strong>{{ it.SL }}</strong>
                          </div>
                        </b-col>
                      </template>
                    </template>
                    <template v-else>
                      <b-col lg="12" class="mb-4">
                        <p class="text-muted text-small font-italic">
                          {{ $t("map.no-data") }}
                        </p>
                      </b-col>
                    </template>
                  </b-row>
                </template>
                <template v-else>
                  <p class="text-center text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col>
            <h5 class="text-muted mb-0">
              <strong>
                {{ $t("dashboards.collection-order-list").toUpperCase() }}
              </strong>
            </h5>
          </b-col>
          <b-col class="text-right">
            <div class="top-right-button-container mt-1">
              <b-button-group>
                <b-dropdown
                  right
                  :text="$t('dropdown.action')"
                  style="background: #60aaff; border: none; border-radius: 20px"
                >
                  <b-dropdown-item
                    @click="addModal()"
                    v-if="objectData.accessWrite === true"
                  >
                    <i class="fad fa-plus"></i>
                    &emsp;{{ $t("pages.add") }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="editModal(selectedItems)"
                    v-if="
                      selectedItems.length === 1 &&
                      objectData.accessWrite === true
                    "
                  >
                    <i class="fad fa-edit"></i>
                    &emsp;{{ $t("pages.edit") }}
                  </b-dropdown-item>
                  <b-dropdown-item v-else disabled>
                    <i class="fad fa-edit"></i>
                    &emsp;{{ $t("pages.edit") }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="deleteModal(selectedItems)"
                    v-if="
                      selectedItems.length === 1 &&
                      objectData.accessWrite === true
                    "
                  >
                    <i class="fad fa-trash-alt"></i>
                    &emsp;{{ $t("pages.delete") }}
                  </b-dropdown-item>
                  <b-dropdown-item v-else disabled>
                    <i class="fad fa-trash-alt"></i>
                    &emsp;{{ $t("pages.delete") }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-button-group>
            </div>
          </b-col>
          <b-col xl="12">
            <div class="mb-2">
              <b-button
                variant="empty"
                class="pt-0 pl-0 d-inline-block d-md-none"
                v-b-toggle.displayOptions
              >
                <i class="simple-icon-arrow-down align-middle" />
              </b-button>
              <b-collapse id="displayOptions" class="d-md-block">
                <div
                  class="d-block d-md-inline-block"
                  style="margin-top: -1rem; width: 40%"
                >
                  <div
                    class="search-sm d-inline-block float-md-left mr-1 align-top"
                    style="width: 100%"
                  >
                    <b-input
                      :placeholder="$t('form.customer-name')"
                      v-model="search"
                    />
                  </div>
                </div>
              </b-collapse>
            </div>
            <div class="separator mb-3" />
          </b-col>
          <b-col lg="12">
            <template v-if="convertItems && convertItems.length > 0">
              <div>
                <template
                  xxs="12"
                  class="mt-3"
                  v-for="(item, index) in convertItems"
                >
                  <list-item
                    :key="index"
                    :data="item"
                    :accessWrite="objectData.accessWrite"
                    :selected-data="handleSelect"
                    :statusEdit="statusEdit"
                    :listDataModal="listDataModal"
                  />
                </template>
              </div>
              <div>
                <b-pagination
                  :total-rows="totalRows"
                  v-model="page"
                  :per-page="perPage"
                  size="sm"
                  align="center"
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
              </div>
            </template>
            <template v-else>
              <b-col lg="12" class="mt-4">
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </b-col>
            </template>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="3" class="mb-4">
        <b-card :title="$t('dashboards.recent-collect')" style="height: 100%">
          <template
            v-if="data && data.TreeHistories && data.TreeHistories.length > 0"
          >
            <div
              style="max-height: 870px; overflow-x: hidden; overflow-y: auto"
            >
              <recent-order-item
                v-for="(order, index) in data.TreeHistories.filter(
                  (x, i) => i < 30
                )"
                :order="order"
                :key="index"
                :clickHandle="handleClick"
              />
            </div>
          </template>
          <template v-else>
            <p class="text-center text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <custom-form
      v-if="typeForm !== 'COLLECT-TREE'"
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :state-form="stateForm"
      :id-form="idForm"
      :type-form="typeForm"
      :menu-current="objectData.menuIDCurrent"
      :data-form-option="dataFormOptions"
      :body-form-default="bodyFormDefault"
      :key-show="keyShow"
      @handle-submit="handleSubmit"
      :pisBranchNode="true"
    ></custom-form>
    <b-modal
      class="text-center"
      centered
      id="collect-tree-modal"
      hide-header
      ok-only
      @hidden="resetModalCollectTree"
      scrollable
      size="xl"
    >
      <h1>
        <strong>{{ OIDCollectTree }}</strong>
      </h1>
      <div class="top-right-button-container"></div>
      <div class="separator mb-5"></div>
      <template v-if="dataCollectTree && _fields">
        <custom-table
          :data-table="dataCollectTree"
          :field-table="_fields"
          :column-show="listColumnShowModal"
          :access-write="objectData.accessWrite"
          :select-mode="selectMode"
          @row-selected="rowSelected"
          @status-edit="statusEdit"
        ></custom-table>
      </template>
      <template v-else>
        <span class="font-italic">{{ $t("cards.no-data") }}</span>
      </template>
    </b-modal>
    <b-modal
      v-if="typeForm === 'COLLECT-TREE'"
      :id="nameForm"
      :title="titleForm"
      @hidden="resetModal"
      hide-footer
      body-class="body-custom-tree-modal"
      header-class="header-custom-tree-modal"
      hide-header
      size="xl"
    >
      <tree-detail
        :name-form="nameForm"
        :title-form="titleForm"
        :api-form="apiForm"
        :data-parent="dataForm"
        :state-form="stateForm"
        :id-form="idForm"
        :type-form="typeForm"
        @emitGetTreeAndChart="emitGetTreeAndChart"
        @updateViewTree="updateViewTree"
      ></tree-detail>
    </b-modal>
    <b-modal
      id="modal-accept"
      ref="modal-accept"
      :title="
        accept
          ? $t('pages.confirm-tree').toUpperCase() +
            ' ' +
            $t('dashboards.tree').toUpperCase()
          : $t('dashboards.return').toUpperCase()
      "
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalAccept"
      @ok="handleOkAccept"
      title-class="font-weight-bolder"
      v-if="acceptItem"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitAccept">
        <h3>
          {{
            accept
              ? $t("form.question-confirm") + acceptItem.TreeName[1] + "?"
              : $t("form.question-return") + acceptItem.TreeName[1] + "?"
          }}
        </h3>
        <b-form-group
          v-show="accept"
          :label="$t('condition-of-the-tree') + ': '"
          v-if="acceptItem.TreeTypeID[1] === 1"
        >
          <b-form-select
            class="text-left"
            v-model="treeType"
            :options="treeTypeActiveOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group v-show="accept" :label="$t('unit-manager') + ':'">
          <b-form-select
            class="text-left"
            v-model="unitManager"
            :options="unitManagerOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          :state="acceptState"
          :label="
            accept
              ? $t('dashboards.note') +
                '(' +
                $t('dashboards.if-any').toLowerCase() +
                '):'
              : $t('dashboards.reason') +
                '(' +
                $t('dashboards.required').toLowerCase() +
                '):'
          "
          label-for="note-accept-input"
          :invalid-feedback="$t('dashboards.cannot-be-left-blank')"
        >
          <b-form-input
            id="note-accept-input"
            v-model="acceptNote"
            :state="acceptState"
            :required="accept ? false : true"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import moment from "moment";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import RecentOrderItem from "@/components/Listing/RecentOrderItem";
import TwoColumnList from "@/components/Listing/TreeTwoColumnList";
import CustomTables from "@/components/Table/CustomTables";
import CustomTableReports from "@/components/Table/CustomTableReports";
import CustomForm from "./component/CustomForm";
import TreeDetail from "@/views/app/map/popup-modals/TreeDetail";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import wfs from "@/constants/wfs";
import { defaultMapType, defaultRegionCode } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import collectAPI from "@/api/modules/collectAPI";
import treeAPI from "@/api/modules/treeAPI";
import groupAPI from "@/api/modules/groupAPI";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import ListItem from "./component/ListItem";
import Card from "@/components/Cards/CardDoupleValue";
import AreaShadowChart from "@/components/Charts/AreaShadow";
import { ThemeColors } from "@/utils";

const colors = ThemeColors();

export default {
  components: {
    "multi-area-shadow-chart": MultiAreaShadowChart,
    "two-column-list": TwoColumnList,
    "recent-order-item": RecentOrderItem,
    "custom-table": CustomTables,
    "custom-table-report": CustomTableReports,
    "custom-form": CustomForm,
    "tree-detail": TreeDetail,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "list-item": ListItem,
    "area-shadow-chart": AreaShadowChart,
    card: Card,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      bodyFormDefault: null,
      defaultRegionCode,
      defaultMapType,
      selectMode: "single",
      listColumnShow: null,
      listColumnShowModal: null,
      objectKey: null,
      menuRight: [],
      historySelectedItemsID: null,
      selectedItems: [],
      selectedItemsDetail: [],
      beforeSelectedItems: null,
      data: null,
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      dataForm: null,
      dataFormOptions: {
        CollectTypeID: [],
        RouteID: [],
        TreeID: [],
        GroupID: [],
      },
      idForm: null,
      typeForm: "",
      stateForm: {
        OName: null,
        TotalQuantity: null,
      },
      optionRoute: null,
      keyShow: 0,
      dataByID: null,
      dataCollectTreeByID: null,
      columnAdd: null,
      OIDCollectTree: null,
      dataCollectTree: null,
      objectKeyCollectTree: null,
      keyOption: ["ProcessID"],
      totalCollect: null,
      processCollects: null,
      completeCollects: null,
      fieldsHistory: [
        {
          key: "EmployerName",
          label: this.$t("dashboards.employer-collect"),
          tdClass: "text-center",
        },
        {
          key: "OID",
          label: this.$t("dashboards.tree-collect"),
          tdClass: "text-center",
        },

        {
          key: "TreeName",
          label: this.$t("dashboards.data-collect"),
          tdClass: "text-center",
        },
        {
          key: "ProcessName",
          label: this.$t("dashboards.status-collect"),
          tdClass: "text-center",
        },
        {
          key: "UpdateTime",
          label: this.$t("dashboards.update-time"),
          tdClass: "text-center",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      page: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      filterItems: null,
      convertItems: null,
      selectChartCollect: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionChartCollect: [
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
      showChartCollect: false,
      dataChart: null,
      labelChart: null,
      accept: null,
      acceptItem: null,
      acceptNote: "",
      acceptState: null,
      unitManager: null,
      unitManagerOptions: null,
      treeType: null,
      treeTypeActiveOptions: null,
      gradient: null,
      gradient2: ["rgba(89, 224, 197, 1)", "rgba(89, 224, 197, 0.25)"],
      typeView: false,
    };
  },
  computed: {
    _fields: function () {
      let field = handling.mergeTableAndData(
        this.objectKeyCollectTree,
        this.listColumnShowModal
      );
      if (field) {
        //min->max
        field.sort((a, b) => {
          return a.sortNum - b.sortNum;
        });
      }

      return field;
    },
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
  },

  methods: {
    async emitGetTreeAndChart(v) {
      await this.getData();
      await this.getDataChartCollect(v);
    },
    getOptionRoute() {
      collectAPI.collectTreeRouteList().then((val) => {
        let array = val.status
          ? handling.convertDataBitToBoolean(val.data)
          : [];
        if (array.length > 0) {
          let arrTable = [];
          this.convertKeyTableData(array, 0, arrTable, 0);
          this.optionRoute = arrTable;
        } else {
          this.optionRoute = [];
        }
      });
    },
    getOptionCollectType() {
      collectAPI
        .collectTypeListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CollectTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                // if (val.data[i].IsActive === 1) {
                let obj = {
                  text: val.data[i].CollectTypeName,
                  value: val.data[i].CollectTypeID,
                };
                this.dataFormOptions.CollectTypeID.push(obj);
                // }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionTree() {
      treeAPI
        .treeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.TreeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].TreeName,
                    value: val.data[i].TreeID,
                  };
                  this.dataFormOptions.TreeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionGroup() {
      groupAPI
        .groupEmployerListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.GroupID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].GroupName,
                  value: val.data[i].GroupID,
                };
                this.dataFormOptions.GroupID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(item) {
      this.infoModalCollectTree(item);
    },
    submitAcceptOK(note, item, accept) {
      if (accept) {
        this.updateConfirmTree(item, note);
      } else {
        this.updateReturnTree(item, note);
      }
    },
    handleSubmitAccept() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitAcceptOK(this.acceptNote, this.acceptItem, this.accept);
        this.$bvModal.hide("modal-accept");
      });
    },
    handleOkAccept(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitAccept();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.acceptState = valid;
      return valid;
    },
    resetModal() {
      this.dataForm = null;
    },
    resetModalAccept() {
      this.accept = null;
      this.acceptItem = null;
      this.acceptState = null;
      this.acceptNote = "";
    },
    getOptionUnitManager() {
      treeAPI
        .managementUnitListActive()
        .then((val) => {
          this.unitManagerOptions = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              if (val.data[i].IsActive === 1) {
                let obj = {
                  text: val.data[i].ManagementUnitName,
                  value: val.data[i].ManagementUnitID,
                };
                this.unitManagerOptions.push(obj);
              }
            }
            this.unitManager = this.unitManagerOptions[0].value;
          }
        })
        .catch((err) => console.log(err));
    },
    getOptionTreeTypeActive() {
      treeAPI
        .getTreeType()
        .then((val) => {
          this.treeTypeActiveOptions = [];
          if (val.status && val.data.length > 0) {
            for (let i = 0; i < val.data.length; i++) {
              let obj = {
                text: val.data[i].TreeTypeName,
                value: val.data[i].TreeTypeID,
              };
              this.treeTypeActiveOptions.push(obj);
            }
            this.treeType = this.treeTypeActiveOptions[0].value;
          }
        })
        .catch((err) => console.log(err));
    },
    acceptModal(items, accept) {
      this.getOptionUnitManager();
      if (items.TreeTypeID[1] === 1) {
        this.getOptionTreeTypeActive();
        setTimeout(() => {
          this.makeToast(
            "warning",
            this.$t("form.warning").toUpperCase(),
            this.$t("tree-type-not-updated")
          );
        }, this.timer);
      }
      this.accept = accept;
      this.acceptItem = items;
      setTimeout(() => {
        this.$bvModal.show("modal-accept");
      }, 200);
    },
    convertDataChartMultiAreaShadow(data) {
      //contructor
      this.showChartCollect = false;
      let labelDate = [];
      let result = [
        {
          label:
            this.$t("dashboards.collect.total-collect") +
            " (" +
            this.$t("dashboards.tree").toLowerCase() +
            ")",
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
          label:
            this.$t("dashboards.collect.acceptance") +
            " (" +
            this.$t("dashboards.tree").toLowerCase() +
            ")",
          borderColor: "rgba(89, 224, 197, 1)",
          pointBorderColor: "rgba(89, 224, 197, 1)",
          pointHoverBackgroundColor: "rgba(89, 224, 197, 1)",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "rgba(89, 224, 197, 1)",
          pointBorderColor: "rgba(89, 224, 197, 1)",
          borderWidth: 2,
          backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemHH.split("-")[1]);
        for (const key in item) {
          if (key === "ItemQtty") {
            result[0].data.push(item[key]);
          }
          if (key === "ItemQtty_Approval") {
            result[1].data.push(item[key]);
          }
        }
      });
      this.labelChart = labelDate;
      this.dataChart = result;
      setTimeout(() => {
        this.showChartCollect = true;
      }, 200);
    },
    sumArrays(...arrays) {
      const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
      );
    },
    getDataChartCollect(type) {
      let body = {
        Type: type,
      };
      collectAPI
        .getCollectChart(body)
        .then((val) => {
          let data = val.status ? val.data : null;
          if (data?.length > 0) {
            this.convertDataChartMultiAreaShadow(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeChartCollect(items) {
      this.selectChartCollect = items;
      this.getDataChartCollect(this.selectChartCollect.value);
    },
    rowSelected(data) {
      if (data?.length > 0) {
        this.typeView = true;
        this.infoModalCollectTree(data[0]);
      }
    },
    handleSelect(value) {
      this.selectedItems = this.items.filter((item) => item.OID === value);
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "OID") {
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

    infoModalCollectTree(items) {
      this.getDataCollectTreeByID(items.ID);
      setTimeout(() => {
        // console.log(this.dataCollectTreeByID);
        this.dataForm = this.dataCollectTreeByID;
        this.nameForm = "collect-tree-modal-confirm";
        // this.titleForm = this.$t("form.title-confirm-tree").toUpperCase();
        this.typeForm = "COLLECT-TREE";
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    updateViewTree(id) {
      let body = {
        ID: id,
      };
      collectAPI
        .collectDataTreeUpdateView(body)
        .then((val) => {
          if (val.status) {
            if (this.typeView) {
              this.getListDataCollectDetailByOID(this.OIDCollectTree);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateConfirmTree(items, note) {
      let body = {
        ManagementUnitID: this.unitManager,
        ID: items.ID[1],
        Note: note,
        TreeTypeID:
          items.TreeTypeID[1] === 1 ? this.treeType : items.TreeTypeID[1],
      };
      collectAPI
        .collectDataTreeUpdateApproval(body)
        .then((val) => {
          if (val.status) {
            this.getDataCollectTreeByID(items.ID[1]);
            setTimeout(() => {
              this.dataForm = handling.showExtensionFormEdit(
                this.dataCollectTreeByID
              );
              this.getListDataCollectDetailByOID(this.OIDCollectTree);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
              this.$bvModal.hide(this.nameForm);
            }, this.timer);
            let treeNumber;
            switch (items.TreeNumber[1].toString().length) {
              case 1:
                treeNumber = "00" + items.TreeNumber[1].toString();
                break;
              case 2:
                treeNumber = "0" + items.TreeNumber[1].toString();
                break;
              case 3:
                treeNumber = items.TreeNumber[1].toString();
                break;
              default:
                treeNumber = items.TreeNumber[1].toString();
                break;
            }
            let dataFormWFS = {
              StationID: parseInt(items.TreeID[1].toString() + treeNumber),
              Lat: items.Lat[1],
              Long: items.Long[1],
              StationName: items.TreeName[1],
              StationAddress: items.FullAddress[1],
            };
            let objectDataWFS = wfs.getDataTypeTable(dataFormWFS, "Tree");
            wfs
              .insertPoint(
                objectDataWFS.url,
                objectDataWFS.workspace,
                objectDataWFS.urlWorkspace,
                objectDataWFS.data,
                objectDataWFS.type
              )
              .then((val) => {
                if (val !== true) {
                  console.log("Không thêm được dữ liệu");
                }
              });
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.nameForm = null;
          this.titleForm = null;
          this.apiForm = null;
          this.idForm = null;
          this.bodyFormDefault = null;
          this.typeForm = "";
          this.getData();
          this.getDataChartCollect(this.selectChartCollect.value);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReturnTree(items, note) {
      let body = {
        // ManagementUnitID: this.unitManager,
        ID: items.ID[1],
        Note: note,
      };
      collectAPI
        .collectDataTreeUpdateReturn(body)
        .then((val) => {
          if (val.status) {
            this.getDataCollectTreeByID(items.ID[1]);
            setTimeout(() => {
              this.dataForm = handling.showExtensionFormEdit(
                this.dataCollectTreeByID
              );
              this.getListDataCollectDetailByOID(this.OIDCollectTree);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
              this.$bvModal.hide(this.nameForm);
            }, this.timer);
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.nameForm = null;
          this.titleForm = null;
          this.apiForm = null;
          this.idForm = null;
          this.bodyFormDefault = null;
          this.typeForm = "";
          this.getData();
          this.getDataChartCollect(this.selectChartCollect.value);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModalCollectTree() {
      this.OIDCollectTree = null;
      this.dataCollectTree = null;
      this.objectKeyCollectTree = null;
      this.selectedItemsDetail = this.beforeSelectedItems;
      this.$nextTick(() => {
        this.beforeSelectedItems = null;
      });
      this.historySelectedItemsID = null;
    },
    listDataModal(items) {
      this.getListDataCollectDetailByOID(items[0].OID);
      this.OIDCollectTree = items[0].OID;
      this.beforeSelectedItems = this.selectedItemsDetail;
      setTimeout(() => {
        this.selectedItems = [];
        this.historySelectedItemsID = items[0].OID;
        this.$bvModal.show("collect-tree-modal");
      }, this.timer / 2);
    },
    getListDataCollectDetailByOID(id) {
      let body = {
        OID: id,
      };
      collectAPI
        .collectDataTreeByOID(body)
        .then((val) => {
          this.dataCollectTree = val.status ? val.data : [];
          this.objectKeyCollectTree =
            val.status && val.data.length ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addModal() {
      this.showDataFormOptionRoute(this.optionRoute);
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/collect/AddCollect";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("Collects");
          this.getData();
          this.getDataChartCollect(this.selectChartCollect.value);
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData();
          this.getDataChartCollect(this.selectChartCollect.value);
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        }
      } else {
        this.$bvModal.hide(this.nameForm);
        this.getData();
        this.getDataChartCollect(this.selectChartCollect.value);
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.idForm = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].OID);
      this.showDataFormOptionRoute(this.optionRoute);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        for (let i = 0; i < this.optionRoute.length; i++) {
          if (this.optionRoute[i].TreeRouteID === items[0].RouteID) {
            this.keyShow = this.optionRoute[i].Key;
          }
        }
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/collect/EditCollect";
        this.idForm = items[0].OID;
        this.bodyFormDefault = {
          MenuIDCurent: this.objectData.menuIDCurrent,
          UserIDCurent: this.userID,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].OID + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].OID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        OID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      collectAPI
        .collectDataRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("Collects");
              this.getData();
              this.getDataChartCollect(this.selectChartCollect.value);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              this.getDataChartCollect(this.selectChartCollect.value);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData();
            this.getDataChartCollect(this.selectChartCollect.value);
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    statusEdit(data) {
      let isBool = !data[0].IsClose;
      let body = {
        OID: data[0].OID,
        IsClose: handling.convertBooleanToBit(isBool),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      collectAPI
        .collectDataClose(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.getDataChartCollect(this.selectChartCollect.value);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
              this.getDataChartCollect(this.selectChartCollect.value);
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    showDataFormOptionRoute(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter((x) => x.ParentID !== id && x.TreeRouteID !== id);
      } else {
        _array = array;
      }
      let newArray = [];
      handling.recursiveTreeSelectRoute(_array, "0", newArray, 0);
      this.dataFormOptions.RouteID = newArray;
    },
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != parentID) {
          return;
        }
        let obj = {
          TreeRouteID: item["TreeRouteID"],
          TreeRouteName: item["TreeRouteName"],
          ParentID: item["ParentID"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["TreeRouteID"], arrayTable, i + 1);
      });
    },
    getFormAddShow(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataCollectTreeByID(id) {
      let body = {
        ID: id,
      };
      collectAPI
        .collectDataTreeDetailByID(body)
        .then((val) => {
          this.dataCollectTreeByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        OID: id,
      };
      collectAPI
        .collectDataByOID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleHeaderData(data) {
      this.totalCollect = data.length;
      this.processCollects = this.items.filter(
        (item) => item.CompletePercent < 100
      );
      this.completeCollects = this.items.filter(
        (item) => item.CompletePercent > 99
      );
    },
    getData() {
      collectAPI
        .getDashboard()
        .then((val) => {
          this.data = val.status ? val.data : [];
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data.Collects)
            : [];
          this.handleHeaderData(this.items);
          if (this.search.length > 0) {
            let newArr = [];
            this.items.forEach((item) => {
              this.filterItems.forEach((ele) => {
                if (item.OID === ele.OID) {
                  newArr.push(item);
                }
              });
              this.convertItems = newArr;
            });
          } else {
            this.filterItems = null;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.items
            );
            this.totalRows = this.items.length;
          }
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
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnModal(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowModal = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
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
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY/MM/DD");
      return date.format("DD/MM/YYYY");
    },
    convertDateTimeYear(string) {
      return handling.convertDateTimeYear(string);
    },
    timerLoadDashboard(time) {
      this.getData();
      this.getDataChartCollect(this.selectChartCollect.value);
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("Collects");
    await this.getFormAddShow("Collects");
    await this.getOptionCollectType();
    await this.getOptionRoute();
    await this.getOptionTree();
    await this.getOptionGroup();
    await this.getColumnModal("CollectDataApproval");
    await this.timerLoadDashboard(this.timer * 240);
  },
  watch: {
    items() {
      this.getColumn("Collects");
    },
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
};
</script>
<style>
.box_header .card-body {
  padding: 10px;
}
</style>
<style scoped>
.dashboard-link-list-tree {
  height: 430px;
  max-height: 430px;
  overflow-y: auto;
}

.box_header-icon {
  width: 80px;
  height: 70px;
}
.box_header-value {
  color: hsl(185 31% 15%);
  font-size: 40px;
  font-weight: 700;
  line-height: ;
  text-align: center;
}
.box_header-bottom {
  color: hsl(185 31% 15%);
  font-size: 14px;
  font-weight: 700;
  line-height: ;
  text-align: center;
}
.list_item {
  padding: 10px;
  background: #f3f3f3;
  font-size: 15px;
  border-radius: 5px;
}
</style>
