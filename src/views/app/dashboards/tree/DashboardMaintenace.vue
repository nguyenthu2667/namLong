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
                    :src="require('@/assets/img/tree-icon/khuvuc.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.TreeRouteMaintenanceCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.TreeRouteMaintenanceDescription }}
              </div>
            </b-card>
          </b-col>
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
                    {{ data.TreeCategoriesCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.TreeCategoriesDescription }}
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
                    {{ data.ManagementUnitCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.ManagementUnitDescription }}
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
                    {{ data.TreeTypesCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.TreeTypesDescription }}
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
                    {{ data.TreeStatusCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">
                {{ data.TreeStatusDescription }}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="5">
        <b-card class="box_card">
          <h5 class="text-muted">
            <b>{{ $t("region-line").toUpperCase() }}</b>
          </h5>
          <template v-if="items && fields">
            <div>
              <custom-table
                :data-table="items"
                :field-table="fields"
                :column-show="listColumnShow"
                :access-write="objectData.accessWrite"
                :select-mode="selectMode"
                :rowPage="5"
                :bordered="true"
                :headVariant="'light'"
                @row-selected="rowSelected"
                :colSearch="7"
                :isSearch="false"
              ></custom-table>
            </div>
          </template>
          <template v-else>
            <div class="text-left font-italic text-muted">
              {{ $t("panel.non-data") }}
            </div>
          </template>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card class="box_card">
          <h5 class="text-muted">
            <b>{{ $t("unit-manager").toUpperCase() }}</b>
          </h5>
          <div class="d-flex align-items-center h-100" v-if="managementUnit">
            <pie-chart-color
              :data="managementUnit"
              :height="300"
              style="width: 100%"
            />
            <div class="d-none" style="width: 50%">
              <template v-for="(color, index) in managementUnit.colors">
                <strong :key="index" class="mr-1">
                  <i :style="'color:' + color" class="fas fa-circle"></i>
                  {{ managementUnit.labels[index] }} ({{
                    managementUnit.series[index]
                  }})
                </strong>
                <br :key="index + 'b'" />
              </template>
            </div>
          </div>
          <div v-else>
            <div class="text-left font-italic text-muted">
              {{ $t("panel.non-data") }}
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card class="box_card">
          <h5 class="text-muted">
            <b>{{ $t("list-of-tree").toUpperCase() }}</b>
          </h5>
          <div class="d-flex align-items-center h-100" v-if="treeCategories">
            <pie-chart-color
              :data="treeCategories"
              :height="300"
              style="width: 100%"
            />
            <div class="d-none" style="width: 50%">
              <template v-for="(color, index) in treeCategories.colors">
                <strong :key="index" class="mr-1">
                  <i :style="'color:' + color" class="fas fa-circle"></i>
                  {{ treeCategories.labels[index] }} ({{
                    treeCategories.series[index]
                  }})
                </strong>
                <br :key="index + 'b'" />
              </template>
            </div>
          </div>
          <div class="text-left font-italic text-muted" v-else>
            {{ $t("panel.non-data") }}
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card class="box_card">
          <h5 class="text-muted">
            <b>{{ $t("dashboards.tree-group") }}</b>
          </h5>
          <div class="d-flex align-items-center h-100" v-if="treeGroups">
            <pie-chart-color
              :data="treeGroups"
              :height="300"
              style="width: 100%"
            />
            <div class="d-none" style="width: 50%">
              <template v-for="(color, index) in treeGroups.colors">
                <strong :key="index" class="mr-1">
                  <i :style="'color:' + color" class="fas fa-circle"></i>
                  {{ treeGroups.labels[index] }} ({{
                    treeGroups.series[index]
                  }})
                </strong>
                <br :key="index + 'b'" />
              </template>
            </div>
          </div>
          <div class="text-left font-italic text-muted" v-else>
            {{ $t("panel.non-data") }}
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card class="box_card">
          <h5 class="text-muted">
            <b>{{ $t("dashboards.tree-status").toUpperCase() }}</b>
          </h5>
          <div class="d-flex align-items-center h-100" v-if="treeStatus">
            <pie-chart-color
              :data="treeStatus"
              :height="300"
              style="width: 100%"
            />
            <div class="d-none" style="width: 50%">
              <template v-for="(color, index) in treeStatus.colors">
                <strong :key="index" class="mr-1">
                  <i :style="'color:' + color" class="fas fa-circle"></i>
                  {{ treeStatus.labels[index] }} ({{
                    treeStatus.series[index]
                  }})
                </strong>
                <br :key="index + 'b'" />
              </template>
            </div>
          </div>
          <div class="text-left font-italic text-muted" v-else>
            {{ $t("panel.non-data") }}
          </div>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card class="box_card">
          <h5 class="text-muted">
            <b>{{ $t("type-tree").toUpperCase() }}</b>
          </h5>
          <div class="d-flex align-items-center h-100" v-if="treeTypes">
            <pie-chart-color
              :data="treeTypes"
              :height="300"
              style="width: 100%"
            />
            <div class="d-none" style="width: 50%">
              <template v-for="(color, index) in treeTypes.colors">
                <strong :key="index" class="mr-1">
                  <i :style="'color:' + color" class="fas fa-circle"></i>
                  {{ treeTypes.labels[index] }} ({{ treeTypes.series[index] }})
                </strong>
                <br :key="index + 'b'" />
              </template>
            </div>
          </div>
          <div class="text-left font-italic text-muted" v-else>
            {{ $t("panel.non-data") }}
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="modal-list-tree"
      name="modal-list-tree"
      hide-header
      hide-footer
      size="lg"
      ><div style="min-height: 60vh; max-height: 90vh; overflow: auto">
        <div style="padding-top: 0.75rem">
          <b-form-input
            id="search-input-chilren"
            type="search"
            size="sm"
            v-model="searchTextNavChilren"
            :placeholder="$t('panel.search-input-map')"
          ></b-form-input>
        </div>
        <div>
          <br />
          <p class="text-muted font-italic text-small">
            {{ $t("panel.total") }} {{ listShowChilren.length }}
            {{ $t("panel.result") }}
          </p>
        </div>
        <b-row>
          <template v-for="(value, i) in listShowChilren">
            <b-col
              lg="4"
              :key="i"
              class="d-flex justify-content-between mb-2"
              @click="showModalInfo(value)"
            >
              <div style="width: 100px; height: 80px">
                <img
                  :src="value.StationImage"
                  style="width: 100%; height: 100%; background: gray"
                />
              </div>
              <div class="p-1 content-item" style="width: 100%">
                <span>
                  <div class="load-text-custom-over">
                    <strong>{{ value.StationName }}</strong>
                  </div>
                  <div>
                    <p class="load-text-custom-over text-muted mb-1 text-small">
                      {{ value.FullAddress }}
                    </p>
                  </div>
                  <div
                    class="load-text-custom-over text-primary text-small font-weight-medium d-none d-sm-block"
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
            </b-col>
          </template>
        </b-row>
      </div>
    </b-modal>
    <b-modal
      id="modal-item"
      v-if="dataModal"
      hide-header
      size="xl"
      ok-only
      centered
      scrollable
    >
      <tree-detail :data-parent="dataModal" :keyComponent="'MAP'"></tree-detail>
    </b-modal>
  </div>
</template>
<script>
import moment from "moment";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import { defaultMapType, defaultRegionCode } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import { ThemeColors } from "@/utils";
import treeAPI from "@/api/modules/treeAPI";
import PieChartColor from "@/components/Charts/PieChartColor";
import CustomTables from "@/components/Table/CustomTables";
import TreeDetail from "@/views/app/map/popup-modals/TreeDetail";

const colors = ThemeColors();

export default {
  components: {
    "pie-chart-color": PieChartColor,
    "custom-table": CustomTables,
    "tree-detail": TreeDetail,
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
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      data: null,
      items: null,
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
      lightcolors: [
        "#FFDAB9",
        "#90EE90",
        "#66CDAA",
        "#00FFFF",
        "#00BFFF",
        "#F4A460",
        "#EE82EE",
      ],
      preColor: "#7f8c8d",
      trees: [],
      searchTextNavChilren: "",
      listShowChilren: [],
      dataModal: null,
      pShow: false,
    };
  },
  computed: {
    managementUnit() {
      return this.convertDataChart(this.data.ManagementUnit);
    },
    treeCategories() {
      return this.convertDataChart(this.data.TreeCategories);
    },
    treeGroups() {
      return this.convertDataChart(this.data.TreeGroups);
    },
    treeStatus() {
      return this.convertDataChart(this.data.TreeStatus);
    },
    treeTypes() {
      return this.convertDataChart(this.data.TreeTypes);
    },

    fields: function () {
      let field = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
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
    showModalInfo(obj) {
      this.dataModal = obj;
      setTimeout(() => {
        this.$bvModal.show("modal-item");
      }, this.timer);
    },
    showModal(items) {
      if (items?.length > 0) {
        let body = {
          RouteID: `${items[0].ID}`,
        };
        treeAPI
          .treeDataByRouteID(body)
          .then((val) => {
            this.listShowChilren = val.status ? [...val.data] : [];
            this.trees = val.status ? [...val.data] : [];
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // this.trees = []
        // this.makeToast('danger', 'THẤT BẠI', 'Không tìm thấy dữ liệu!')
      }
      setTimeout(() => {
        this.$bvModal.show("modal-list-tree");
      }, this.timer);
    },
    convertDataChart(array) {
      let result = {
        series: [],
        labels: [],
        colors: [],
      };
      if (array?.length > 0) {
        array.forEach((it) => {
          result.series.push(it.Value);
          let color = this.returnRandomColor();
          result.colors.push(color);
          for (let key in it) {
            if (
              key == "ManagementUnitName" ||
              key == "TreeCategorieName" ||
              key == "TreeGroupName" ||
              key == "TreeStatusName" ||
              key == "TreeTypeName"
            ) {
              result.labels.push(it[key] + " (" + it.Value + ")");
            }
          }
        });
        return result;
      } else {
        return null;
      }
    },
    returnRandomColor() {
      let result =
        this.lightcolors[Math.floor(Math.random() * this.lightcolors.length)];
      return result;
    },
    sumArrays(...arrays) {
      const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
      const result = Array.from({ length: n });
      return result.map((_, i) =>
        arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0)
      );
    },
    changeChartCollect(items) {
      this.selectChartCollect = items;
    },
    rowSelected(data) {
      this.selectedItems = data;
      this.showModal(data);
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

    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 2000,
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

    getData() {
      treeAPI
        .currentDashboard()
        .then((val) => {
          this.data = val.status ? val.data : [];
          if (this.data && this.data.TreeRoute) {
            let array = this.data.TreeRoute;
            this.objectKey = Object.keys(this.data.TreeRoute[0]);
            if (array.length > 0) {
              let arrTable = [];
              this.convertKeyTableData(array, 0, arrTable, 0);
              this.items = arrTable;
            } else {
              this.items = [];
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, ParentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != ParentID) {
          return;
        }
        let obj = {
          ID: item["TreeRouteID"],
          ParentID: item["ParentID"],
          Level: item["Level"],
          TreeRouteID: item["TreeRouteID"],
          TreeRouteName: item["TreeRouteName"],
          Sort: item["Sort"],
          TotalAccomplished: item["TotalAccomplished"],
          TotalAcquiescent: item["TotalAcquiescent"],
          TotalMaintenance: item["TotalMaintenance"],
          TotalProcess: item["TotalProcess"],
          TotalQuantity: item["TotalQuantity"],
          TotalReprocess: item["TotalReprocess"],
          TotalUpdate: item["TotalUpdate"],
          ValueCount: item["ValueCount"],
          Trees: item["Trees"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["TreeRouteID"], arrayTable, i + 1);
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
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY/MM/DD");
      return date.format("DD/MM/YYYY");
    },
    timerLoadDashboard(time) {
      this.getData();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("ReportTreeRoute");
    await this.timerLoadDashboard(this.timer * 240);
  },
  watch: {
    searchTextNavChilren(to, from) {
      if (to && to !== "") {
        let array = [];
        let regex = new RegExp(to, "i");
        this.listShowChilren.forEach((val) => {
          if (
            val.StationName.search(regex) !== -1 ||
            val.FullAddress.search(regex) !== -1 ||
            val.StationAddress.search(regex) !== -1
          ) {
            array.push(val);
          }
        });
        this.listShowChilren = array;
      }
      if (to === "" || to === " ") {
        this.listShowChilren = [...this.trees];
      }
    },
    items() {
      this.getColumn("ReportTreeRoute");
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
  /* line-height: ; */
  text-align: center;
}
.list_item {
  padding: 10px;
  background: #f3f3f3;
  font-size: 15px;
  border-radius: 5px;
}
.box_card {
  margin-bottom: 30px;
  overflow: hidden;
  height: 450px;
}
.content-item:hover {
  cursor: pointer;
  background: #f3f3f3;
}
</style>
