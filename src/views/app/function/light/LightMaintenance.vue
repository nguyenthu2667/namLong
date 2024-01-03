<template>
  <div v-if="objectData">
    <b-row v-if="data">
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
                    {{ data.Dashboard.Total }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.TotalDescription }}
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
                    {{ data.Dashboard.RegionCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.RegionCountDescription }}
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
                    {{ data.Dashboard.MaintenanceTotal }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceTotalDescription }}
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
                    {{ data.Dashboard.GroupNumber }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.GroupNumberDescription }}
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
                    {{ data.Dashboard.MaintenanceCompletePercent }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceCompletePercentDescription }} (%)
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
                    :src="require('@/assets/img/light-icon/capnhat.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.Dashboard.MaintenanceUpdate }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceUpdateDescription }}
              </div>
            </b-card>
          </b-col>
          <b-col class="mb-4">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/light-icon/daduyet.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.Dashboard.MaintenanceApproval }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceApprovalDescription }}
              </div>
            </b-card>
          </b-col>
          <b-col class="mb-4">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/light-icon/choduyet.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.Dashboard.MaintenanceComplete }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceCompleteDescription }}
              </div>
            </b-card>
          </b-col>
          <b-col class="mb-4">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/light-icon/trave.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.Dashboard.MaintenanceReturn }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceReturnDescription }}
              </div>
            </b-card>
          </b-col>
          <!-- // -->
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
                    {{ data.Dashboard.MaintenanceRemain }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.Dashboard.MaintenanceRemainDescription }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="7" class="mb-4">
        <b-row>
          <!-- <b-col sm="12" md="12" lg="12" class="mb-4">
            <b-card class="dashboard-link-list" style="height: 390px;" no-body>
              <b-card-body>
                <div class="d-flex justify-content-between mb-4">
                  <div class="float-left float-none-xs">
                    <div class="d-inline-block">
                      <h4 class="d-inline">
                        {{ $t('dashboards.collect-detail') }}
                      </h4>
                      <span class="text-muted text-small d-block">
                        {{ ' (' + $t('dashboards.sum-tree-by-type') + ')' }}
                      </span>
                    </div>
                  </div>
                </div>
                <template v-if="data">
                  <vue-perfect-scrollbar
                    class="scroll dashboard-list-with-thumbs"
                    :settings="{
                      suppressScrollX: true,
                      wheelPropagation: false,
                    }"
                    style="height: 285px;"
                  >
                    <b-row>
                      <template v-for="(it, i) in data.Maintained">
                        <b-col :key="i" lg="6">
                          <div
                            class="list_item d-flex justify-content-between mb-2"
                          >
                            <strong>{{ it.TreeName }}</strong>
                            <strong>{{ it.CountMaintenance }}</strong>
                          </div>
                        </b-col>
                      </template>
                    </b-row>
                  </vue-perfect-scrollbar>
                </template>
                <template v-else>
                  <p class="text-center text-muted text-small font-italic">
                    {{ $t('map.no-data') }}
                  </p>
                </template>
              </b-card-body>
            </b-card>
          </b-col> -->
        </b-row>
        <b-card style="height: 540px" no-body>
          <b-card-body>
            <div class="d-flex justify-content-between mb-4">
              <div class="float-left float-none-xs">
                <div class="d-inline-block">
                  <h4 class="d-inline">
                    {{ $t("dashboards.collection-statisticslight") }}
                  </h4>
                  <span class="text-muted text-small d-block">
                    {{
                      " (" +
                      $t("dashboards.unit") +
                      ": " +
                      $t("dashboards.light").toLowerCase() +
                      ")"
                    }}
                  </span>
                </div>
              </div>
              <b-dropdown
                :text="selectChart.label"
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
                <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
              </template>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="5" class="mb-4">
        <b-card :title="$t('dashboards.recent-collect')">
          <template
            v-if="data && data.ListHistories && data.ListHistories.length > 0"
          >
            <vue-perfect-scrollbar
              class="scroll dashboard-list-with-thumbs"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
              style="height: 430px"
            >
              <recent-order-items
                v-for="(item, index) in data.ListHistories.filter(
                  (x, i) => i < 30
                )"
                :clickHandle="handleClick"
                :key="index"
                :item="item"
                :imgs="item.Images"
                :title="item.ReferenceName"
                :textStatus="item.StatusName"
                :statusColor="item.StatusColor"
                :employer="item.EmployerName"
                :address="item.ReferenceAddress"
                :datetime="item.StatusTime"
                :notes="[
                  item.NoteAccept,
                  item.NoteSolution,
                  item.NoteResult,
                  item.NoteReturn,
                ]"
              />
            </vue-perfect-scrollbar>
          </template>
          <template v-else>
            <p class="text-center text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </template>
        </b-card>
      </b-col>
      <b-col xl="12">
        <b-row>
          <b-col>
            <h5 class="text-muted mb-0">
              <strong>
                {{ $t("list-request-maintenace").toUpperCase() }}
              </strong>
            </h5>
          </b-col>
          <b-col class="text-right">
            <div class="top-right-button-container">
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
                      objectData.accessWrite === true &&
                      isStart !== 1
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
                      objectData.accessWrite === true &&
                      isStart !== 1
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
        </b-row>
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
            <div class="d-block d-md-inline-block" style="margin-top: -1rem">
              <div
                class="search-sm d-inline-block float-md-left mr-1 align-top"
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
      <template v-if="convertItems && convertItems.length > 0">
        <b-col lg="12" class="mb-4">
          <b-row>
            <b-colxx
              xxs="12"
              class="mb-3"
              v-for="(item, index) in convertItems"
              :key="index"
              :id="item.MaintenanceID"
            >
              <list-item
                :key="item.MaintenanceID"
                :data="item"
                :accessWrite="objectData.accessWrite"
                :selected-data="handleSelect"
                :handleDataModal="handleDataModal"
                :statusEdit="statusEdit"
              />
            </b-colxx>
          </b-row>
          <b-row>
            <b-colxx xxs="12">
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
            </b-colxx>
          </b-row>
        </b-col>
      </template>
      <template v-else>
        <b-col lg="12" class="mb-4">
          <p class="text-muted text-small font-italic">
            {{ $t("map.no-data") }}
          </p>
        </b-col>
      </template>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :body-form-default="bodyFormDefault"
      :data-form="dataForm"
      :state-form="stateForm"
      :type-form="typeForm"
      :data-form-option="dataFormOptions"
      :dataTableDetail="dataTableDetail"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      v-if="dataModal"
      id="modal-detail-light"
      class="text-center"
      size="xl"
      centered
      hide-header
      hide-footer
      scrollable
      ok-only
      @hide="resetModalDetail"
    >
      <detail :dataModal="dataModal" :objectData="objectData" />
    </b-modal>
    <b-modal
      v-if="dataTableDetailMaintaince"
      id="modal-table-detail-light"
      class="text-center"
      size="xl"
      centered
      hide-header
      hide-footer
      scrollable
      ok-only
      @hide="resetModalDetail"
    >
      <custom-table
        :select-mode="selectMode"
        :data-table="dataTableDetailMaintaince"
        :field-table="fieldsTableDetail"
        :column-show="listColumnShowModal"
        :access-write="objectData.accessWrite"
        @row-selected="rowSelectedTableDetail"
      ></custom-table>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/LightMaintenanceForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";
import groupAPI from "@/api/modules/groupAPI";
import RecentOrderItems from "./component/RecentOrderItems";
import ListItem from "./component/ListItem";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";
import Detail from "./component/DetailLightMaintenance";

export default {
  name: "LightMaintenance",
  components: {
    "custom-table": CustomTables,
    "list-item": ListItem,
    "custom-form": CustomForm,
    "recent-order-items": RecentOrderItems,
    "multi-area-shadow-chart": MultiAreaShadowChart,
    detail: Detail,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      dataFormOptions: {},
      optionRoute: null,
      data: null,
      page: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      filterItems: null,
      convertItems: null,
      selectChart: {
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
      dataModal: null,
      history: null,
      isStart: null,
      selectMode: "single",
      dataTableDetail: null,
      fieldsTableDetail: null,
      dataTableDetailMaintaince: null,
      selectedItemTableDetail: null,
      gradient: null,
      gradient2: ["rgba(89, 224, 197, 1)", "rgba(89, 224, 197, 0.25)"],
    };
  },
  methods: {
    resetModalDetail() {
      this.dataModal = null;
      this.selectedItemTableDetail = null;
    },
    handleDataModal(item) {
      this.getDataDetail(item[0].MaintenanceID);
      setTimeout(() => {
        this.$bvModal.show("modal-table-detail-light");
      }, timer);
    },
    getDataChartMaintenance(type) {
      let body = {
        DateType: type,
      };
      lightAPI
        .lightingChartMaintenance(body)
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
    convertDataChartMultiAreaShadow(data) {
      //contructor
      this.showChartCollect = false;
      let labelDate = [];
      let result = [
        {
          label:
            "Đã Hoàn thành" +
            " (" +
            this.$t("dashboards.light").toLowerCase() +
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
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemHH.split("-")[1]);
        for (const key in item) {
          if (key === "MaintenanceSum") {
            result[0].data.push(item[key]);
          }
        }
      });
      this.labelChart = labelDate;
      this.dataChart = result;
      setTimeout(() => {
        this.showChartCollect = true;
      }, 200);
    },
    changeChartCollect(items) {
      this.selectChart = items;
      this.getDataChartMaintenance(this.selectChart.value);
    },
    handleSelect(value, IsStart) {
      this.isStart = IsStart;
      this.selectedItems = this.items.filter(
        (item) => item.MaintenanceID === value
      );
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "MaintenanceID") {
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
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
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
      this.apiForm = "/api/LightingMaintenances/Add";
      this.bodyFormDefault = {
        UserIDCurent: this.userID,
      };
      this.dataForm["OID"][1] = "AUTO";

      this.dataForm.MaintenanceDetails = [];
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("Maintenances");
          this.getKeyTable();
          this.getData();
          this.getDataChartMaintenance(this.selectChart.value);
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
          this.getDataChartMaintenance(this.selectChart.value);
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
        this.getDataChartMaintenance(this.selectChart.value);
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
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].MaintenanceID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/LightingMaintenances/Edit";
        this.bodyFormDefault = {
          OID: items[0].MaintenanceID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        this.dataForm.MaintenanceDetails = [...this.dataTableDetail];
        setTimeout(() => {
          if (this.dataForm.MaintenanceDetails) {
            this.$bvModal.show(this.nameForm);
          }
        }, this.timer);
      }, 1000);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") + items[0].MaintenanceID + "?",
          {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("form.yes"),
            cancelTitle: this.$t("form.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].MaintenanceID);
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
      lightAPI
        .maintenanceRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length > 0) {
              this.getColumn("Maintenances");
              this.getKeyTable();
              this.getData();
              this.getDataChartMaintenance(this.selectChart.value);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              this.getDataChartMaintenance(this.selectChart.value);
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
            this.getDataChartMaintenance(this.selectChart.value);
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    rowSelectedTableDetail(data) {
      this.getDataEditDetails(data[0].ID);
    },
    handleShowInfo(item) {
      this.dataModal = item;
      setTimeout(() => {
        this.$bvModal.show("modal-detail-light");
      }, timer);
    },
    handleClick(item) {
      this.getDataEditDetails(item.ID);
    },
    statusEdit(data) {
      let body = {
        OID: data[0].MaintenanceID,
        IsClose: handling.convertBooleanToBit(!data[0].IsClose),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .isRequest(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
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
    getDataByID(id) {
      let body = {
        OID: id,
      };
      lightAPI
        .maintenanceByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
          this.dataTableDetail = this.dataByID.MaintenanceDetails;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataDetail(id) {
      let body = {
        MaintenanceID: id,
      };
      lightAPI
        .lightingGetDetails(body)
        .then((val) => {
          this.dataTableDetailMaintaince = val.status ? val.data : [];
          if (
            this.dataTableDetailMaintaince &&
            this.dataTableDetailMaintaince.length > 0
          ) {
            let keysBefore = Object.keys(this.dataTableDetailMaintaince[0]);
            this.fieldsTableDetail = handling.mergeTableAndData(
              keysBefore,
              this.listColumnShowModal
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataEditDetails(id) {
      let body = {
        ID: id,
      };
      lightAPI
        .lightingGetEditDetails(body)
        .then((val) => {
          val.status ? this.handleShowInfo(val.data) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      lightAPI
        .maintenanceDashboard()
        .then((val) => {
          this.data = val.status ? val.data : [];
        })
        .then((val) => {
          this.items =
            this.data.ListMaintenances?.length > 0
              ? handling.convertDataBitToBoolean(this.data.ListMaintenances)
              : [];

          if (this.search.length > 0) {
            let newArr = [];
            this.items.forEach((item) => {
              this.filterItems.forEach((ele) => {
                if (item.MaintenanceID === ele.MaintenanceID) {
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
    getKeyTable() {
      lightAPI
        .maintenanceList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
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
    formatPercentMaintenance(str, start, end) {
      const arrStr = str.split(")");
      return arrStr[0].slice(start, end);
    },
    getOptionRoute() {
      // lấy địa chỉ
      lightAPI.areaLightingMaintenancesList().then((val) => {
        let array = val.status
          ? // ẩn hiện column
            handling.convertDataBitToBoolean(val.data)
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
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          RegionID: item["RegionID"],
          RegionName: item["RegionName"],
          RegionParentID: item["RegionParentID"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
      });
    },
    showDataFormOptionRoute(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter(
          (x) => x.RegionParentID !== id && x.RegionID !== id
        );
      } else {
        _array = array;
      }
      let newArray = [];
      handling.recursiveRegionParent(_array, 0, newArray, 0);
      this.dataFormOptions.RegionID = newArray;
    },
    getOptionMaintenanceAreaLight() {
      lightAPI.areaLightingMaintenancesList().then((val) => {
        if (val.status) {
          if (val.data.length > 0) {
            this.dataFormOptions.RegionID = [];
            for (let i = 0; i < val.data.length; i++) {
              let obj = {
                text: val.data[i].RegionName,
                value: val.data[i].RegionID,
              };
              this.dataFormOptions.RegionID.push(obj);
            }
          }
        }
      });
    },
    getOptionGroup() {
      groupAPI
        .groupEmployerListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.GroupEmployerID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].GroupName,
                  value: val.data[i].GroupID,
                };
                this.dataFormOptions.GroupEmployerID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnModalTableDetail(string) {
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("MaintenanceLightings");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("MaintenanceLightings");
    await this.getDataChartMaintenance(this.selectChart.value);
    await this.getOptionMaintenanceAreaLight();
    await this.getOptionGroup();
    await this.getOptionRoute();
    await this.getColumnModalTableDetail("LightingMaintenanceDetails");
  },
  watch: {
    items() {
      this.getColumn("MaintenanceLightings");
      this.getKeyTable();
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
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
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
  mounted() {
    setTimeout(() => {
      if (this.columnAdd) {
        let obj = {};
        for (let i = 0; i < this.columnAdd.length; i++) {
          let key = this.columnAdd[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateForm = obj;
      }
    }, 500);
  },
};
</script>
<style>
.box_header .card-body {
  padding: 10px;
}
</style>
<style scoped>
.box_header-icon {
  width: 80px;
  height: 70px;
}
.box_header-value {
  color: hsl(185 31% 15%);
  font-size: 40px;
  font-weight: 700;
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
