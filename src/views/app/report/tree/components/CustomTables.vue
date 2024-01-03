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
                  style="height: 31px"
                >
                  <b-form-checkbox-group
                    v-model="filterOn"
                    class="ml-3 mt-1 mr-3 mb-1"
                    style="width: 160px"
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
        <template #cell(DataName)="row">
          <div
            v-if="row.item.Key"
            :style="{ marginLeft: `${row.item.Key * 20}px` }"
          >
            {{ row.item.DataName }}
          </div>
          <div v-else>
            {{ row.item.DataName }}
          </div>
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
    "colSearch",
    "clickHandle",
    "keyCollapse",
    "newFields",
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
      headVariantCurrent: this.headVariant ? this.headVariant : null,
    };
  },
  updated() {
    if (this.dataTable && this.filter === "") {
      this.totalRows = this.dataTable.length;
    }
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
      if (this.clickHandle) {
        this.clickHandle(item);
      }
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
    },
  },
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
