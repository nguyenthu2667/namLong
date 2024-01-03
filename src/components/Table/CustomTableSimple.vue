<template>
  <div>
    <div v-if="typeShowTable === 'DISCONNECT-LIGHT'">
      <b-row class="mb-4">
        <b-colxx md="8" class="mt-2">
          <span>
            {{ $t("form.total") }}:
            <strong>{{ totalRows }}</strong>
            {{ $t("form.result").toLowerCase() }}
          </span>
        </b-colxx>
        <b-colxx md="4">
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
                style="border-radius: 20px"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-colxx>
      </b-row>
      <b-table-simple
        ref="custom-table-simple"
        :id="idTable"
        selectedVariant="primary"
        class="text-center cusBorderTable"
        hover
        small
        caption-top
        responsive
        :filter="filter"
        :bordered="true"
      >
        <b-thead>
          <b-tr>
            <template v-for="(rowHead, i) in fieldTable">
              <b-th
                style="padding: 0.75rem"
                class="text-center cusBorder"
                :key="i"
              >
                {{ rowHead.label }}
              </b-th>
            </template>
          </b-tr>
        </b-thead>
        <b-tbody>
          <template v-if="dataTablePage && dataTablePage.length > 0">
            <template v-for="(row, index) in dataTablePage">
              <b-tr :key="index">
                <!--                <template v-if="row.CabinetInfo">-->
                <!--                  <b-td class="align-middle cusBorder" :rowspan="row.rowspan">-->
                <!--                    <div>{{ row.CabinetInfo[0] }}</div>-->
                <!--                    <div>{{ row.CabinetInfo[1] }}</div>-->
                <!--                  </b-td>-->
                <!--                </template>-->
                <template v-if="index === 0">
                  <template v-if="row.CabinetInfo">
                    <b-td class="align-middle cusBorder" :rowspan="row.rowspan">
                      <div>{{ row.CabinetInfo[0] }}</div>
                      <div>{{ row.CabinetInfo[1] }}</div>
                    </b-td>
                  </template>
                </template>
                <td class="cusBorder">{{ row.Lamp }}</td>
                <td class="cusBorder">{{ row.AddressLamp }}</td>
                <td class="cusBorder">
                  {{ convertDateTime(row.LastTimeErrorLamp) }}
                </td>
                <td class="cusBorder">{{ row.TimeError }}</td>
                <td class="cusBorder">{{ row.CountTimeError }}</td>
                <td class="cusBorder">{{ row.SumTimeError }}</td>
              </b-tr>
            </template>
          </template>
        </b-tbody>
      </b-table-simple>
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
    </div>
    <div v-if="typeShowTable === 'LAMP-ERROR-LIGHT'">
      <b-row class="mb-4">
        <b-colxx md="8" class="mt-2">
          <span>
            {{ $t("form.total") }}:
            <strong>{{ totalRows }}</strong>
            {{ $t("form.result").toLowerCase() }}
          </span>
        </b-colxx>
        <b-colxx md="4">
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
                style="border-radius: 20px"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-colxx>
      </b-row>
      <b-table-simple
        ref="custom-table-simple"
        :id="idTable"
        selectedVariant="primary"
        class="text-center cusBorderTable"
        hover
        small
        caption-top
        responsive
        :filter="filter"
        :bordered="true"
      >
        <b-thead>
          <b-tr>
            <template v-for="(rowHead, i) in fieldTable">
              <b-th
                style="padding: 0.75rem"
                class="text-center cusBorder"
                :key="i"
              >
                {{ rowHead.label }}
              </b-th>
            </template>
          </b-tr>
        </b-thead>
        <b-tbody>
          <template v-if="dataTablePage && dataTablePage.length > 0">
            <template v-for="(row, index) in dataTablePage">
              <b-tr :key="index">
                <!--                <template v-if="row.CabinetInfo">-->
                <!--                  <b-td class="align-middle cusBorder" :rowspan="row.rowspan">-->
                <!--                    <div>{{ row.CabinetInfo[0] }}</div>-->
                <!--                    <div>{{ row.CabinetInfo[1] }}</div>-->
                <!--                  </b-td>-->
                <!--                </template>-->
                <template v-if="index === 0">
                  <template v-if="row.CabinetInfo">
                    <b-td class="align-middle cusBorder" :rowspan="row.rowspan">
                      <div>{{ row.CabinetInfo[0] }}</div>
                      <div>{{ row.CabinetInfo[1] }}</div>
                    </b-td>
                  </template>
                </template>
                <td class="cusBorder">{{ row.Lamp }}</td>
                <td class="cusBorder">{{ row.AddressLamp }}</td>
                <td class="cusBorder">
                  {{ convertDateFullTime(row.TimeError) }}
                </td>
                <td class="cusBorder">{{ row.CountTimeError }}</td>
                <td class="cusBorder">{{ row.ConnectTypeName }}</td>
                <td class="cusBorder">{{ row.PowerTypeName }}</td>
              </b-tr>
            </template>
          </template>
        </b-tbody>
      </b-table-simple>
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
    </div>
    <div v-if="typeShowTable === 'MOVED-LIGHT'">
      <b-row class="mb-4">
        <b-colxx md="8" class="mt-2">
          <span>
            {{ $t("form.total") }}:
            <strong>{{ totalRows }}</strong>
            {{ $t("form.result").toLowerCase() }}
          </span>
        </b-colxx>
        <b-colxx md="4">
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
                style="border-radius: 20px"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-colxx>
      </b-row>
      <b-table-simple
        ref="custom-table-simple"
        :id="idTable"
        selectedVariant="primary"
        class="text-center cusBorderTable"
        hover
        small
        caption-top
        responsive
        :filter="filter"
        :bordered="true"
      >
        <b-thead>
          <b-tr>
            <template v-for="(rowHead, i) in fieldTable">
              <b-th
                style="padding: 0.75rem"
                class="text-center cusBorder"
                :key="i"
              >
                {{ rowHead.label }}
              </b-th>
            </template>
          </b-tr>
        </b-thead>
        <b-tbody>
          <template v-if="dataTablePage && dataTablePage.length > 0">
            <template v-for="(row, index) in dataTablePage">
              <b-tr :key="index">
                <!--                <template v-if="row.CabinetInfo">-->
                <!--                  <b-td class="align-middle cusBorder" :rowspan="row.rowspan">-->
                <!--                    <div>{{ row.CabinetInfo[0] }}</div>-->
                <!--                    <div>{{ row.CabinetInfo[1] }}</div>-->
                <!--                  </b-td>-->
                <!--                </template>-->
                <template v-if="index === 0">
                  <template v-if="row.CabinetInfo">
                    <b-td class="align-middle cusBorder" :rowspan="row.rowspan">
                      <div>{{ row.CabinetInfo[0] }}</div>
                      <div>{{ row.CabinetInfo[1] }}</div>
                    </b-td>
                  </template>
                </template>
                <td class="cusBorder">{{ row.Lamp }}</td>
                <td class="cusBorder">{{ row.AddressLamp }}</td>
                <td class="cusBorder">
                  {{ row.TimeError }}
                </td>
                <td class="cusBorder">{{ row.CountTimeError }}</td>
              </b-tr>
            </template>
          </template>
        </b-tbody>
      </b-table-simple>
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
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["dataTable", "fieldTable", "idTable", "typeShowTable"],
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      search_title: this.$t("form.search-invalid"),
      filter: "",
      totalRows: 0,
      dataTablePage: [],
    };
  },
  watch: {
    filter: function () {
      if (this.filter === "") {
        this.dataTablePage = [];
        this.dataTablePage = JSON.parse(
          JSON.stringify(this.dataTable.slice(0, 20))
        );
        this.dataTablePage = this.convertData(this.dataTablePage);
        this.currentPage = 1;
        this.totalRows = this.dataTable.length;
      }
      if (this.filter) {
        // this.dataTablePage = []
        let arr = [];
        let newArr = [];
        this.dataTable.forEach((i) => {
          let status = false;
          Object.keys(i).forEach((j) => {
            if (j !== "CabinetID" && j !== "rowspan") {
              if (j === "CabinetInfo") {
                i[j].forEach((k) => {
                  if (
                    k
                      .toString()
                      .toLowerCase()
                      .indexOf(this.filter.toLowerCase()) > -1
                  ) {
                    status = true;
                  }
                });
              } else if (j === "LastTimeErrorLamp") {
                if (
                  this.convertDateTime(i[j])
                    .toLowerCase()
                    .indexOf(this.filter.toLowerCase()) > -1
                ) {
                  status = true;
                }
              } else {
                if (
                  i[j]
                    .toString()
                    .toLowerCase()
                    .indexOf(this.filter.toLowerCase()) > -1
                ) {
                  status = true;
                }
              }
            }
          });
          if (status) {
            newArr.push(i);
          }
        });
        // let newArr = this.dataTable.filter(
        //   (i) =>
        //     i.Lamp.toLowerCase().includes(this.filter.toLowerCase()) ||
        //     i.AddressLamp.toLowerCase().includes(this.filter.toLowerCase()) ||
        //     i.LastTimeErrorLamp.toLowerCase().includes(
        //       this.filter.toLowerCase(),
        //     ),
        // )
        if (newArr.length > 0) {
          arr = JSON.parse(JSON.stringify(newArr));
          // this.dataTablePage = JSON.parse(JSON.stringify(newArr))
          this.convertData(this.dataTablePage);
          // if (this.dataTablePage.length > 10) {
          //   this.perPage = this.dataTablePage.length
          // }
          this.totalRows = arr.length;
          this.dataTablePage = JSON.parse(JSON.stringify(arr.slice(0, 20)));
          this.currentPage = 1;
        } else {
          // this.dataTablePage = JSON.parse(
          //   JSON.stringify(this.dataTable.slice(0, 10)),
          // )
          this.dataTablePage = [];
          this.totalRows = arr.length;
          this.currentPage = 1;
        }
      }
    },
    currentPage: function () {
      if (this.currentPage === 1) {
        this.dataTablePage = [];
        this.dataTablePage = JSON.parse(
          JSON.stringify(this.dataTable.slice(0, 20))
        );
        this.dataTablePage = this.convertData(this.dataTablePage);
      } else {
        this.dataTablePage = [];
        this.dataTablePage = JSON.parse(
          JSON.stringify(
            this.dataTable.slice(
              (this.currentPage - 1) * this.perPage,
              (this.currentPage - 1) * this.perPage + 20
            )
          )
        );
        this.dataTablePage = this.convertData(this.dataTablePage);
      }
    },
  },
  created() {
    if (this.dataTable && this.dataTable.length > 0) {
      this.dataTablePage = JSON.parse(
        JSON.stringify(this.dataTable.slice(0, 20))
      );
    }
  },
  mounted() {
    setTimeout(() => {
      this.dataTablePage = this.convertData(this.dataTablePage);
      if (this.dataTable) {
        this.totalRows = this.dataTable.length;
      }
    }, 500);
  },
  // updated() {
  // if (this.filter === '') {
  //   this.totalRows = this.dataTable.length
  // }
  // else {
  //   this.totalRows = this.dataTablePage.length
  // }
  // },
  methods: {
    convertData(data) {
      if (this.typeShowTable === "DISCONNECT-LIGHT") {
        let arrayResult = [];
        let result = [];
        let arrID = data.map((item) => item.CabinetID);

        const uniqueSet = new Set(arrID);
        arrID = [...uniqueSet];

        arrID.forEach((id) => {
          let arrGroup = data.filter((item) => item.CabinetID === id);
          let getObjByID = this.dataTable.find((item) => item.CabinetID === id);
          arrGroup[0].CabinetInfo = getObjByID.CabinetInfo;
          arrGroup[0].rowspan = arrGroup.length;
          result.push(arrGroup);
        });
        result.forEach((arrItem) => {
          arrItem.forEach((item) => {
            arrayResult.push(item);
          });
        });
        return arrayResult;
      }
      if (this.typeShowTable === "LAMP-ERROR-LIGHT") {
        let arrayResult = [];
        let result = [];
        let arrID = data.map((item) => item.CabinetID);

        const uniqueSet = new Set(arrID);
        arrID = [...uniqueSet];

        arrID.forEach((id) => {
          let arrGroup = data.filter((item) => item.CabinetID === id);
          let getObjByID = this.dataTable.find((item) => item.CabinetID === id);
          arrGroup[0].CabinetInfo = getObjByID.CabinetInfo;
          arrGroup[0].rowspan = arrGroup.length;
          result.push(arrGroup);
        });
        result.forEach((arrItem) => {
          arrItem.forEach((item) => {
            arrayResult.push(item);
          });
        });
        return arrayResult;
      }
      if (this.typeShowTable === "MOVED-LIGHT") {
        let arrayResult = [];
        let result = [];
        let arrID = data.map((item) => item.CabinetID);

        const uniqueSet = new Set(arrID);
        arrID = [...uniqueSet];

        arrID.forEach((id) => {
          let arrGroup = data.filter((item) => item.CabinetID === id);
          let getObjByID = this.dataTable.find((item) => item.CabinetID === id);
          arrGroup[0].CabinetInfo = getObjByID.CabinetInfo;
          arrGroup[0].rowspan = arrGroup.length;
          result.push(arrGroup);
        });
        result.forEach((arrItem) => {
          arrItem.forEach((item) => {
            arrayResult.push(item);
          });
        });
        return arrayResult;
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
    statusEdit(items) {
      this.$emit("status-edit", items);
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm DD/MM/YYYY");
    },
    convertDateFullTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
  },
};
</script>
