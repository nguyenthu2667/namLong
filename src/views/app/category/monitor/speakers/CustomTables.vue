<template>
  <div>
    <template v-if="dataTable && dataTable.length > 0">
      <b-row class="mb-4">
        <b-colxx :md="colSearch ? 12 - colSearch : 7" class="mt-2">
          <span>
            {{ $t("form.total") }}:
            <strong>{{ totalRows }}</strong>
            {{ $t("form.result").toLowerCase() }}
          </span>
        </b-colxx>
        <b-colxx :md="colSearch ? colSearch : 5">
          <b-form-group
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                :placeholder="search_title"
                style="
                  border-bottom-left-radius: 20px;
                  border-top-left-radius: 20px;
                  font-size: 12px;
                  height: 31px;
                  padding-left: 1rem;
                "
              ></b-form-input>
              <b-input-group-append>
                <b-dropdown
                  :text="$t('cards.find-text')"
                  right
                  variant="primary"
                  size="sm"
                  no-caret
                  style="height: 31px;"
                >
                  <b-form-checkbox-group
                    v-model="filterOn"
                    class="ml-3 mt-1 mr-3 mb-1"
                    style="width: 160px;"
                  >
                    <template v-for="(item, key) in fieldTable">
                      <b-form-checkbox :value="item.key" :key="key">
                        <span class="text-small font-weight-bold">
                          {{ item.label }}
                        </span>
                      </b-form-checkbox>
                      <br />
                    </template>
                  </b-form-checkbox-group>
                </b-dropdown>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-colxx>
      </b-row>
      <b-table
        ref="custom-table"
        :id="idTable"
        sort-by="title"
        sort-desc.sync="false"
        @row-selected="rowSelected"
        selectable
        :select-mode="selectMode"
        :current-page="currentPage"
        :per-page="perPage"
        selectedVariant="primary"
        :fields="fieldTable"
        :items="dataTable"
        class="text-center"
        @filtered="onFiltered"
        :filter="filter"
        :filter-included-fields="filterOn"
        responsive
        :tbody-tr-class="rowClass"
        @row-clicked="emitClicked"
        @row-dblclicked="emitRowDblclicked"
        :bordered="borderedCurrent"
        :head-variant="headVariantCurrent"
      >
        <template
          v-slot:[`cell(${objKey.ClName})`]="row"
          v-for="(objKey, key) in columnShow"
        >
          <template v-if="objKey.TypeCol.toUpperCase() === 'MUTEDBIT'">
            <template
              v-if="
                row.item[objKey.ClName] === true ||
                  row.item[objKey.ClName] === 1
              "
            >
              <span style="color: limegreen;">✔</span>
            </template>
            <template v-else>
              <span style="color: red;">✘</span>
            </template>
          </template>
          <template
            v-else-if="
              objKey.TypeCol.toUpperCase() === 'BIT' ||
                objKey.TypeCol.toUpperCase() === 'CHECK' ||
                objKey.TypeCol.toUpperCase() === 'ALERT'
            "
          >
            <!-- custom UI with Fields by BIT,CHECK,ALERT -->
            <template v-if="objKey.ClName === 'SideType'">
              <span :key="key" v-if="row.item[objKey.ClName] == 1"
                >Bên phải</span
              >
              <span :key="key" v-else>Bên trái</span>
            </template>
            <template v-else-if="objKey.ClName === 'IsSend'">
              <template v-if="row.item[objKey.ClName] == 1">
                <b-form-checkbox
                  :key="key"
                  @change="handleIsSend(row.item)"
                  switch
                  size="md"
                ></b-form-checkbox>
              </template>
              <span :key="key" v-else>✔️</span>
            </template>
            <template v-else-if="objKey.ClName === 'IsSpeaker'">
              <span
                :key="key"
                v-if="
                  row.item[objKey.ClName] == 1 ||
                    row.item[objKey.ClName] === true
                "
              >
                <i
                  style="font-size: 20px; color: green;"
                  class="fad fa-volume"
                ></i>
              </span>
              <span :key="key" v-else>
                <!-- <i
                  style="font-size: 20px; color: red;"
                  class="fad fa-volume-mute"
                ></i> -->
              </span>
            </template>
            <template v-else-if="objKey.ClName === 'SpeakerStatus'">
              <b-form-checkbox
                v-if="accessWrite === true"
                :key="key"
                v-model="row.item[objKey.ClName]"
                disabled="true"
                size="md"
              ></b-form-checkbox>
            </template>
            <template v-else>
              <b-form-checkbox
                v-if="accessWrite === true"
                :key="key"
                v-model="row.item[objKey.ClName]"
                @change="statusEdit(row.item, objKey.ClName)"
                switch
                size="md"
              ></b-form-checkbox>
              <b-form-checkbox
                v-else
                :key="key"
                v-model="row.item[objKey.ClName]"
                switch
                size="md"
                disabled
              ></b-form-checkbox>
            </template>
          </template>
          <template
            v-else-if="
              objKey.TypeCol.toUpperCase().search('FLOAT') > -1 ||
                objKey.TypeCol.toUpperCase().search('MONEY') > -1
            "
          >
            <span :key="key">
              {{ convertFloat(row.item[objKey.ClName]) }}
            </span>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'DATE'">
            <span :key="key" class="text-muted">
              {{ convertDate(row.item[objKey.ClName]) }}
            </span>
          </template>
          <template v-else-if="objKey.ClName.toUpperCase() === 'LINK'">
            <div :key="key" class="d-flex justify-content-center">
              <button
                v-if="row.item[objKey.ClName] != '#'"
                :key="key"
                class="button"
                @click="handleDownload(row.item[objKey.ClName], row.item)"
              >
                <div class="icon">
                  <div class="arrow"></div>
                  <svg class="line" viewBox="0 0 24 24"></svg>
                </div>
                <template v-if="isLoading && keyLoading == row.item['DataID']">
                  <div class="loader loader--style3" title="2">
                    <svg
                      version="1.1"
                      id="loader-1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="20px"
                      height="20px"
                      viewBox="0 0 50 50"
                      style="enable-background: new 0 0 50 50;"
                      xml:space="preserve"
                    >
                      <path
                        fill="#000"
                        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                      >
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                </template>
                <template v-else>
                  {{ $t("download") }}
                </template>
              </button>
              <span v-else class="font-italic">{{ $t("cards.no-data") }}</span>
            </div>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'DATETIME'">
            <span class="text-muted">
              {{ convertDateTime(row.item[objKey.ClName]) }}
            </span>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'STRING-TREE'">
            <template
              v-if="
                objKey.ClName.toUpperCase() === 'FIRELOCATIONNAME' &&
                  row.item.Key == 1
              "
            >
              <i
                style="font-size: 17px;"
                :key="key"
                v-if="row.item.isParentCollapse"
                class="fad fa-chevron-up"
                @click.stop="handleCollase(row.item)"
              ></i>
              <i
                style="font-size: 17px;"
                :key="key"
                v-else
                class="fad fa-chevron-down"
                @click.stop="handleCollase(row.item)"
              ></i>
            </template>
            <template v-if="row.item['Key'] > 0">
              <template v-for="index in row.item['Key']">
                <span :key="index">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </template>
            </template>
            {{ row.item[objKey.ClName] }}
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'SMALL-IMAGE'">
            <template v-if="!exportStatus">
              <b-img
                :src="row.item[objKey.ClName]"
                :id="'image_small_' + row.item[objKey.ClName]"
                fluid
                :alt="'image_small'"
                style="width: 50px; height: 50px;"
                @click="
                  openFullscreen('image_small_' + row.item[objKey.ClName])
                "
              ></b-img>
            </template>
            <template v-else>
              <template v-if="exportStatus === 'close'">
                <b-img
                  :src="row.item[objKey.ClName]"
                  :id="'image_small_' + row.item[objKey.ClName]"
                  fluid
                  :alt="'image_small'"
                  style="width: 50px; height: 50px;"
                  @click="
                    openFullscreen('image_small_' + row.item[objKey.ClName])
                  "
                ></b-img>
              </template>
              <template v-else>
                <b-link :href="row.item[objKey.ClName]">Image</b-link>
              </template>
            </template>
          </template>
          <template
            v-else-if="
              objKey.TypeCol.toUpperCase() === 'NORMAL-IMAGE' ||
                objKey.TypeCol.toUpperCase() === 'IMAGE'
            "
          >
            <template v-if="!exportStatus">
              <b-img
                :src="row.item[objKey.ClName]"
                :id="'image_normal_' + row.item[objKey.ClName]"
                fluid
                :alt="'image_normal'"
                style="width: 100px; height: 50px;"
                @click="
                  openFullscreen('image_normal_' + row.item[objKey.ClName])
                "
              ></b-img>
            </template>
            <template v-else>
              <template v-if="exportStatus === 'close'">
                <b-img
                  :src="row.item[objKey.ClName]"
                  :id="'image_normal_' + row.item[objKey.ClName]"
                  fluid
                  :alt="'image_normal'"
                  style="width: 100px; height: 50px;"
                  @click="
                    openFullscreen('image_normal_' + row.item[objKey.ClName])
                  "
                ></b-img>
              </template>
              <template v-else>
                <b-link :href="row.item[objKey.ClName]">Image</b-link>
              </template>
            </template>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'PROCESS'">
            <template v-if="row.item[objKey.ClName] === 1">
              <i class="fad fa-eye-slash mr-2" style="color: green;"></i>
              <strong style="color: green;">
                {{ row.item[objKey.TypeCol + "Name"] }}
              </strong>
            </template>
            <template v-if="row.item[objKey.ClName] === 2">
              <i class="fad fa-eye mr-2" style="color: black;"></i>
              <strong style="color: black;">
                {{ row.item[objKey.TypeCol + "Name"] }}
              </strong>
            </template>
            <template v-if="row.item[objKey.ClName] === 3">
              <i class="fad fa-check mr-2" style="color: blue;"></i>
              <strong style="color: blue;">
                {{ row.item[objKey.TypeCol + "Name"] }}
              </strong>
            </template>
            <template v-if="row.item[objKey.ClName] === 4">
              <i class="fad fa-undo-alt mr-2" style="color: red;"></i>
              <strong style="color: red;">
                {{ row.item[objKey.TypeCol + "Name"] }}
              </strong>
            </template>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'VALUE-LED'">
            <template
              v-if="
                row.item[objKey.ClName.split('Description')[0]] === null ||
                  row.item[objKey.ClName.split('Description')[0]] ===
                    undefined ||
                  row.item[objKey.ClName.split('Description')[0]] < 0
              "
            >
              <a class="danger_class text-light" style="font-size: 12px;">
                {{ row.item[objKey.ClName] }}
              </a>
            </template>
            <template v-else>
              <p class="pt-1 mb-0">{{ row.item[objKey.ClName] }}</p>
            </template>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'PROCESS-LED'">
            <template
              v-if="
                row.item[objKey.ClName.split('Description')[0]] === null ||
                  row.item[objKey.ClName.split('Description')[0]] ===
                    undefined ||
                  row.item[objKey.ClName.split('Description')[0]] < 0 ||
                  row.item[objKey.ClName.split('Description')[0]] == 2 // fix
              "
            >
              <a class="danger_class text-light" style="font-size: 12px;">
                {{ row.item[objKey.ClName] }}
              </a>
            </template>
            <template
              v-else-if="row.item[objKey.ClName.split('Description')[0]] === 1"
            >
              <a class="warning_class text-dark" style="font-size: 12px;">
                {{ row.item[objKey.ClName] }}
              </a>
            </template>
            <template v-else>
              <a class="success_class text-dark" style="font-size: 12px;">
                {{ row.item[objKey.ClName] }}
              </a>
            </template>
          </template>
          <template
            v-else-if="
              objKey.TypeCol.split('-')[0].toUpperCase() === 'PROCESSCSS'
            "
          >
            <a
              class="process_css float-left"
              :style="{
                'background-color': row.item[objKey.ClName],
                color: 'black',
                'font-size': '12px'
              }"
            >
              {{ row.item[objKey.TypeCol.split("-")[1]] }}
            </a>
          </template>
          <!-- -------------------------------------------------------STRING -->
          <template v-else>
            <!-- EXPORT-MANAGER -->
            <template v-if="objKey.ClName.toUpperCase() === 'EXPORTSTATUS'">
              <b-badge
                :key="key"
                v-if="row.item['Status'] == 0"
                :style="
                  'background:' +
                    'orange' +
                    '!important;font-size:88%;color:black'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
              <b-badge
                :key="key"
                v-else-if="row.item['Status'] == 2"
                :style="
                  'background:' +
                    'rgb(224, 236, 248)' +
                    '!important;font-size:88%;color:black'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
              <b-badge
                :key="key"
                v-else-if="row.item['Status'] == 3"
                :style="
                  'background:' +
                    '#ff7675' +
                    '!important;font-size:88%;color:black'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
              <b-badge
                :key="key"
                v-else
                :style="
                  'background:' +
                    'rgb(130, 195, 65)' +
                    '!important;font-size:88%;color:black'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <!-- GAS-MODULE -->
            <template
              v-else-if="objKey.ClName.toUpperCase() === 'CONNECTSTATUS'"
            >
              <b-badge
                :style="
                  'background:' +
                    row.item['ConnectStatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template v-else-if="objKey.ClName.toUpperCase() === 'ISDETECTOR'">
              <b-badge
                :style="
                  'background:' +
                    row.item['IsDetectorStatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template v-else-if="objKey.ClName.toUpperCase() === 'GASPERCENT'">
              <b-badge
                :style="
                  'background:' +
                    row.item['GasPercentStatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template v-else-if="objKey.ClName.toUpperCase() === 'STATUSNAME'">
              <b-badge
                :style="
                  'background:' +
                    row.item['StatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template v-else-if="objKey.ClName.toUpperCase() === 'ATM1'">
              <b-badge
                :style="
                  'background:' +
                    row.item['ATM1StatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template v-else-if="objKey.ClName.toUpperCase() === 'ATM2'">
              <b-badge
                :style="
                  'background:' +
                    row.item['ATM2StatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template
              v-else-if="objKey.ClName.toUpperCase() === 'DETECTORWARNING'"
            >
              <b-badge
                :style="
                  'background:' +
                    row.item['DetectorWarningStatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template
              v-else-if="objKey.ClName.toUpperCase() === 'GASUSINGWARNING'"
            >
              <b-badge
                :style="
                  'background:' +
                    row.item['GasUsingWarningStatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <template
              v-else-if="objKey.ClName.toUpperCase() === 'GASUSINGSTATUS'"
            >
              <b-badge
                :style="
                  'background:' +
                    row.item['GasUsingStatusColor'] +
                    '!important;font-size:88%;'
                "
              >
                {{ row.item[objKey.ClName] }}
              </b-badge>
            </template>
            <!-- END-GAS-MODULE -->
            <template
              v-else-if="objKey.ClName.toUpperCase() === 'SCHEDULELISTS'"
            >
              <b-badge class="view-detail" pill>
                <strong
                  @click.stop.prevent="handleClick(row.item[objKey.ClName])"
                >
                  {{ $t("dashboards.view-detail") }}
                </strong>
              </b-badge>
            </template>
            <template
              v-else-if="
                objKey.ClName === 'T2' ||
                  objKey.ClName === 'T3' ||
                  objKey.ClName === 'T4' ||
                  objKey.ClName === 'T5' ||
                  objKey.ClName === 'T6' ||
                  objKey.ClName === 'T7' ||
                  objKey.ClName === 'CN'
              "
            >
              <template
                v-if="
                  row.item[objKey.ClName] &&
                    parseInt(row.item[objKey.ClName]) === 1
                "
              >
                <span style="color: limegreen;">✔</span>
              </template>
            </template>
            <template
              v-else-if="
                objKey.ClName.toUpperCase() === 'DESCRIPTIONWARNING' ||
                  objKey.ClName.toUpperCase() === 'CONNECTSTATUS'
              "
            >
              <template v-if="row.item.StatusColor">
                <b-badge
                  pill
                  :style="
                    'background-color:' +
                      row.item.StatusColor +
                      '!important;font-size: 88%;'
                  "
                >
                  <span>
                    {{ row.item[objKey.ClName] }}
                  </span>
                </b-badge>
              </template>
              <template v-else>
                <span>
                  {{ row.item[objKey.ClName] }}
                </span>
              </template>
            </template>
            <template v-else>
              <template v-if="objKey.TypeCol.toUpperCase() !== 'MUTEDBIT'">
                <template
                  v-if="
                    row.item.IsDetail == 1 &&
                      objKey.TypeCol.toUpperCase() == 'STRINGDETAIL'
                  "
                >
                  <span class="pl-1">{{ row.item[objKey.ClName] }}</span>
                </template>
                <template v-else>
                  {{ row.item[objKey.ClName] }}
                </template>
              </template>
            </template>
          </template>
        </template>
      </b-table>
      <b-pagination
        size="sm"
        align="center"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
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
      <span class="font-italic">{{ $t("cards.no-data") }}</span>
    </template>
  </div>
</template>

<script>
import handling from "@/constants/handling";

export default {
  props: [
    "id",
    "dataTable",
    "fieldTable",
    "columnShow",
    "selectedItems",
    "accessWrite",
    "selectMode",
    "dataFormOption",
    "rowPage",
    "exportStatus",
    "keyRowClass",
    "bordered",
    "headVariant",
    "colSearch"
  ],
  data() {
    return {
      idTable: this.id ? this.id : "custom-table",
      currentPage: 1,
      perPage: this.rowPage ? this.rowPage : 20,
      search_title: this.$t("form.search-invalid"),
      filter: "",
      totalRows: 0,
      filterOn: [],
      isLoading: false,
      keyLoading: null,
      borderedCurrent: this.bordered ? this.bordered : false,
      headVariantCurrent: this.headVariant ? this.headVariant : null
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.dataTable) {
        this.totalRows = this.dataTable.length;
      }
    }, 500);
  },
  updated() {
    if (this.dataTable && this.filter === "") {
      this.totalRows = this.dataTable.length;
    }
  },
  methods: {
    handleCollase(item) {
      this.$emit("row-clicked", item);
    },
    emitClicked(item) {
      console.log("emitClicked");
    },
    emitRowDblclicked(item) {
      this.$emit("row-dblclicked", item);
    },
    handleDownload(link, item) {
      this.isLoading = true;
      this.keyLoading = item.DataID;
      setTimeout(() => {
        window.location.href = link;
        this.isLoading = false;
        this.keyLoading = null;
      }, 500);
    },
    handleClick(item) {
      this.$emit("click-handle", item);
    },
    rowClass(item, type) {
      if (
        this.keyRowClass === "WATERWAYDISTANCE" ||
        this.keyRowClass === "WATERWAYLAMPERROR"
      ) {
        if (item.IsDetail == 0) return "table-secondary";
      }
    },
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    rowSelected(items) {
      this.$emit("row-selected", items);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    statusEdit(items, field) {
      this.$emit("status-edit", items, field);
    },
    handleIsSend(items) {
      this.$emit("change-isSend", items);
    },
    convertBooleanToBit(value) {
      return value == 1 ? true : false;
    },
    convertFloat(string) {
      return handling.convertFloat(string);
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    }
  }
};
</script>
<style>
.view-detail {
  background: #145388 !important;
  font-size: 88%;
}
.view-detail:hover {
  background: #2175bd !important;
}

.table-success {
  background: #00ff00;
}
.btn-sm,
.btn-group-sm > .btn {
  line-height: 1;
}
.success_class {
  background-color: #00ff00;
  -webkit-border-radius: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

@-webkit-keyframes glowingsss {
  0% {
    background-color: #01df3a;
    -webkit-box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    -webkit-box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    -webkit-box-shadow: 0 0 3px #01df3a;
  }
}

@-moz-keyframes glowingsss {
  0% {
    background-color: #01df3a;
    -moz-box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    -moz-box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    -moz-box-shadow: 0 0 3px #01df3a;
  }
}

@-o-keyframes glowingsss {
  0% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
}

@keyframes glowingsss {
  0% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
}

.success_class {
  -webkit-animation: glowingsss 1500ms infinite;
  -moz-animation: glowingsss 1500ms infinite;
  -o-animation: glowingsss 1500ms infinite;
  animation: glowingsss 1500ms infinite;
}

.danger_class {
  background-color: #ff0000;
  -webkit-border-radius: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

@-webkit-keyframes glowing {
  0% {
    background-color: #ad0000;
    -webkit-box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    -webkit-box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    -webkit-box-shadow: 0 0 3px #ad0000;
  }
}

@-moz-keyframes glowing {
  0% {
    background-color: #ad0000;
    -moz-box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    -moz-box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    -moz-box-shadow: 0 0 3px #ad0000;
  }
}

@-o-keyframes glowing {
  0% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
}

@keyframes glowing {
  0% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
}

.danger_class {
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
}

.warning_class {
  background-color: #ffee00;
  -webkit-border-radius: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

@-webkit-keyframes glowings {
  0% {
    background-color: #ffbb00;
    -webkit-box-shadow: 0 0 3px #ffbb00;
  }
  50% {
    background-color: #ffee00;
    -webkit-box-shadow: 0 0 10px #ffee00;
  }
  100% {
    background-color: #ffbb00;
    -webkit-box-shadow: 0 0 3px #ffbb00;
  }
}

@-moz-keyframes glowings {
  0% {
    background-color: #ffbb00;
    -moz-box-shadow: 0 0 3px #ffbb00;
  }
  50% {
    background-color: #ffee00;
    -moz-box-shadow: 0 0 10px #ffee00;
  }
  100% {
    background-color: #ffbb00;
    -moz-box-shadow: 0 0 3px #ffbb00;
  }
}

@-o-keyframes glowings {
  0% {
    background-color: #ffbb00;
    box-shadow: 0 0 3px #ffbb00;
  }
  50% {
    background-color: #ffee00;
    box-shadow: 0 0 10px #ffee00;
  }
  100% {
    background-color: #ffbb00;
    box-shadow: 0 0 3px #ffbb00;
  }
}

@keyframes glowings {
  0% {
    background-color: #ffbb00;
    box-shadow: 0 0 3px #ffbb00;
  }
  50% {
    background-color: #ffee00;
    box-shadow: 0 0 10px #ffee00;
  }
  100% {
    background-color: #ffbb00;
    box-shadow: 0 0 3px #ffbb00;
  }
}

.warning_class {
  -webkit-animation: glowings 1500ms infinite;
  -moz-animation: glowings 1500ms infinite;
  -o-animation: glowings 1500ms infinite;
  animation: glowings 1500ms infinite;
}

.process_css {
  -webkit-border-radius: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  /* width: 100%; */
}
</style>
<style scoped>
/* custom Link-button */
.button {
  --background: #2b3044;
  --background-hover: #1e2235;
  --text: #fff;
  --icon: #fff;
  --particle: #fff;
  display: flex;
  outline: none;
  cursor: pointer;
  border: 0;
  min-width: 109px;
  padding: 2px 12px 2px 2px;
  border-radius: 11px;
  line-height: 24px;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  color: var(--text);
  background: var(--b, var(--background));
  transition: transform 0.3s, background 0.4s;
  transform: scale(var(--scale, 1)) translateZ(0);
}
.button:active {
  --scale: 0.95;
}
.button:hover {
  --b: var(--background-hover);
}
.button .icon {
  --arrow-y: 0;
  --arrow-rotate: 135;
  --arrow-top: 10px;
  width: 24px;
  height: 24px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-right: 8px;
  pointer-events: none;
}
.button .icon .dot {
  border-radius: 50%;
  background: #fff;
  background: var(--particle);
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 4px;
}
.button .icon .arrow,
.button .icon .line {
  position: absolute;
  z-index: 1;
}
.button .icon .arrow {
  left: 11px;
  top: 4px;
  width: 2px;
  height: 12px;
  border-radius: 1px;
  background: var(--icon);
  transform: translateY(calc(var(--arrow-y) * 1px)) translateZ(0);
}
.button .icon .arrow:before,
.button .icon .arrow:after {
  content: "";
  width: 2px;
  height: 7px;
  position: absolute;
  left: 0;
  top: var(--arrow-top);
  border-radius: 1px;
  background: inherit;
  transform-origin: 1px 1px;
  transform: rotate(var(--r, calc(var(--arrow-rotate) * 1deg)));
}
.button .icon .arrow:after {
  --r: calc(var(--arrow-rotate) * -1deg);
}
.button .icon .line {
  width: 24px;
  height: 24px;
  display: block;
  left: 0;
  top: 7px;
  fill: none;
  stroke: var(--icon);
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.button.upload .icon {
  --arrow-rotate: 45;
  --arrow-top: 0;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
}
*:before,
*:after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  display: flex;
  font-family: "Inter", Arial;
  justify-content: center;
  align-items: center;
  background: #e4ecfa;
}
body .upload {
  margin-left: 24px;
}
body .dribbble {
  position: fixed;
  display: block;
  right: 20px;
  bottom: 20px;
}
body .dribbble img {
  display: block;
  height: 28px;
}
body .twitter {
  position: fixed;
  display: block;
  right: 64px;
  bottom: 14px;
}
body .twitter svg {
  width: 32px;
  height: 32px;
  fill: #1da1f2;
}
.loader {
  text-align: center;
  margin: 0 auto;
  display: inline-block;
  vertical-align: top;
}

/*
  Set the color of the icon
*/
svg path,
svg rect {
  fill: #ff6700;
}
</style>
