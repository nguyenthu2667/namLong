<template>
  <div>
    <b-row v-if="resultSocket && resultSocket.length > 0">
      <b-col xl="4" class="mb-4">
        <b-card :title="$t('cards.deploy-info')">
          <div class="mb-4">
            <p class="mb-2">
              {{ typeOption.filter((x) => x.value === "ALL")[0].label }}
              <template v-if="typeShow === 'ALL'">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="listStation('ALL', resultSocket)"
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="listStation('ALL', resultSocket)"
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ resultSocket.length }}/{{ resultSocket.length }}
              </span>
            </p>
            <b-progress
              :value="(resultSocket.length / resultSocket.length) * 100"
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ typeOption.filter((x) => x.value === "CONNECT")[0].label }}
              <template v-if="typeShow === 'CONNECT'">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      'CONNECT',
                      filterDataToType('CONNECT', resultSocket)
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      'CONNECT',
                      filterDataToType('CONNECT', resultSocket)
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ filterDataToType("CONNECT", resultSocket).length }}/{{
                  resultSocket.length
                }}
              </span>
            </p>
            <b-progress
              :value="
                (filterDataToType('CONNECT', resultSocket).length /
                  resultSocket.length) *
                100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ typeOption.filter((x) => x.value === "DISCONNECT")[0].label }}
              <template v-if="typeShow === 'DISCONNECT'">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      'DISCONNECT',
                      filterDataToType('DISCONNECT', resultSocket)
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      'DISCONNECT',
                      filterDataToType('DISCONNECT', resultSocket)
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ filterDataToType("DISCONNECT", resultSocket).length }}/{{
                  resultSocket.length
                }}
              </span>
            </p>
            <b-progress
              :value="
                (filterDataToType('DISCONNECT', resultSocket).length /
                  resultSocket.length) *
                100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ typeOption.filter((x) => x.value === "WARNING")[0].label }}
              <template v-if="typeShow === 'WARNING'">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      'WARNING',
                      filterDataToType('WARNING', resultSocket)
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      'WARNING',
                      filterDataToType('WARNING', resultSocket)
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ filterDataToType("WARNING", resultSocket).length }}/{{
                  resultSocket.length
                }}
              </span>
            </p>
            <b-progress
              :value="
                (filterDataToType('WARNING', resultSocket).length /
                  resultSocket.length) *
                100
              "
            ></b-progress>
          </div>
          <div class="mb-4">
            <p class="mb-2">
              {{ typeOption.filter((x) => x.value === "DANGER")[0].label }}
              <template v-if="typeShow === 'DANGER'">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      'DANGER',
                      filterDataToType('DANGER', resultSocket)
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      'DANGER',
                      filterDataToType('DANGER', resultSocket)
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ filterDataToType("DANGER", resultSocket).length }}/{{
                  resultSocket.length
                }}
              </span>
            </p>
            <b-progress
              :value="
                (filterDataToType('DANGER', resultSocket).length /
                  resultSocket.length) *
                100
              "
            ></b-progress>
          </div>
          <div>
            <p class="mb-2">
              {{ typeOption.filter((x) => x.value === "ERROR")[0].label }}
              <template v-if="typeShow === 'ERROR'">
                <i
                  class="btn-i-custom fad fa-eye ml-2"
                  @click="
                    listStation(
                      'ERROR',
                      filterDataToType('ERROR', resultSocket)
                    )
                  "
                ></i>
              </template>
              <template v-else>
                <i
                  class="btn-i-custom fad fa-eye-slash ml-2"
                  @click="
                    listStation(
                      'ERROR',
                      filterDataToType('ERROR', resultSocket)
                    )
                  "
                ></i>
              </template>
              <span class="float-right text-muted">
                {{ filterDataToType("ERROR", resultSocket).length }}/{{
                  resultSocket.length
                }}
              </span>
            </p>
            <b-progress
              :value="
                (filterDataToType('ERROR', resultSocket).length /
                  resultSocket.length) *
                100
              "
            ></b-progress>
          </div>
        </b-card>
      </b-col>
      <b-col xl="8" class="mb-4">
        <b-card :title="$t('dashboards.history-station')" style="height: 416px">
          <b-row>
            <b-colxx lg="12">
              <template v-if="itemsHis && itemsHis.length > 0">
                <b-table
                  :responsive="true"
                  :sticky-header="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="itemsHis"
                  :fields="fieldsHis"
                  head-variant="light"
                  class="text-center text-small mb-0"
                  style="max-height: 305px"
                >
                  <template v-slot:cell(_updateTime)="slot">
                    <p class="p-0 m-0 text-small">
                      {{ convertDateTime(slot.item.UpdateTime) }}
                    </p>
                  </template>
                </b-table>
              </template>
              <template v-else>
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </b-colxx>
          </b-row>
        </b-card>
      </b-col>
      <b-col xl="12">
        <h5 class="text-muted">
          <strong>{{
            typeOption
              .filter((x) => x.value === typeShow)[0]
              .label.toUpperCase()
          }}</strong>
        </h5>
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
            <div class="d-block d-md-inline-block pt-1">
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
          <b-row v-if="displayMode === 'thumb'" key="thumb">
            <b-colxx
              xxs="12"
              class="mb-3"
              v-for="(item, index) in convertItems"
              :key="index"
              :id="item.StationID"
            >
              <list-item
                :key="item.StationID"
                :data="item"
                :time="timeSocket"
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
  </div>
</template>
<script>
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { BASE_API } from "@/constants/config";
import ListItem from "./component/ListItem";
import handling from "@/constants/handling";

export default {
  components: {
    "list-item": ListItem,
  },
  data() {
    return {
      private: "NamLong2020",
      language: localStorage.getItem("currentLanguage"),
      connection: null,
      resultSocket: null,
      timeSocket: handling.getDateTimeNow(),
      displayMode: "thumb",
      page: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      items: null,
      itemsHis: null,
      filterItems: null,
      convertItems: null,
      typeShow: "ALL",
      typeOption: [
        {
          value: "ALL",
          label: "Tất cả trạm",
        },
        {
          value: "CONNECT",
          label: "Đang kết nối",
        },
        {
          value: "DISCONNECT",
          label: "Đã ngắt điện",
        },
        {
          value: "WARNING",
          label: "Cảnh báo nhẹ",
        },
        {
          value: "DANGER",
          label: "Cảnh báo nặng",
        },
        {
          value: "ERROR",
          label: "Lỗi thiết bị/ Lỗi cảm biến",
        },
      ],
      fieldsHis: [
        {
          key: "StationName",
          label: this.$t("dashboards.aqua-name"),
          tdClass: "text-left font-weight-bold pl-3",
        },
        {
          key: "ContentValue",
          label: this.$t("report.warning"),
          tdClass: "font-weight-bold text-muted",
        },
        {
          key: "_updateTime",
          label: this.$t("dashboards.timer"),
          tdClass: "text-muted",
        },
      ],
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
    listStation(type, array) {
      this.search = "";
      this.items = array;
      this.convertItems =
        array.length > 0
          ? this.paginationData(this.page, this.perPage, array)
          : null;
      this.totalRows = array.length > 0 ? array.length : 0;
      this.typeShow = type;
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "StationName") {
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
    listenData(data) {
      this.resultSocket =
        data.statusCode === 200 && data.errorCode === "0" ? data.result : null;
      this.items = this.filterDataToType(this.typeShow, this.resultSocket);
      if (this.search.length > 0) {
        let newArr = this.searchData(this.items, this.search);
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
    },
    filterDataToType(type, array) {
      let _array = [];
      switch (type) {
        case "ALL":
          _array = array;
          break;
        case "CONNECT":
          _array = array.filter((x) => parseInt(x.CUTPOW) === 0);
          break;
        case "DISCONNECT":
          _array = array.filter((x) => parseInt(x.CUTPOW) === 1);
          break;
        case "WARNING":
          _array = array.filter(
            (x) =>
              x.Indicators.filter((y) => parseInt(y.IsWarning) === 2).length > 0
          );
          break;
        case "DANGER":
          _array = array.filter(
            (x) =>
              x.Indicators.filter((y) => parseInt(y.IsWarning) === 2).length > 0
          );
          break;
        case "ERROR":
          _array = array.filter(
            (x) =>
              Object.keys(x)
                .filter(
                  (y) =>
                    y.toUpperCase().indexOf("PIN") > -1 &&
                    y.toUpperCase().indexOf("CP") > -1
                )
                .filter((z) => x[z] === -1).length > 0 ||
              x.Indicators.filter((y) => parseInt(y.IsWarning) === -1).length >
                0
          );
          break;
      }
      return _array;
    },
    funcExec(privateKey, languageKey) {
      if (this.connection.state === "Connected") {
        this.connection
          .invoke("GetWorkTask", languageKey, privateKey)
          .catch((err) => {
            console.log(err);
          });
        this.timeSocket = handling.getDateTimeNow();
      }
      setTimeout(() => {
        this.funcExec(privateKey, languageKey);
      }, 1000);
    },
    startSocket() {
      let startedPromise = this.connection.start().catch((err) => {
        return new Promise((resolve, reject) =>
          setTimeout(() => this.startSocket().then(resolve).catch(reject), 5000)
        );
      });
      return startedPromise;
    },
  },
  created() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${BASE_API}/WorkStep`)
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on("ReceiveMessage", (data) => {
      this.listenData(data);
    });
    // this.connection.onclose(() => this.start());
    this.startSocket();
  },
  mounted() {
    this.funcExec(this.private, this.language);
  },
  beforeDestroy() {
    this.connection.stop();
  },
};
</script>
<style></style>
