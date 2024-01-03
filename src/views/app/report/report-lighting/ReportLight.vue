<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="setTypeReport('REGION')"
                v-if="objectData.accessWrite === true"
              >
                <i class="fas fa-map-marked-alt"></i>
                &emsp;{{ $t("report.action.report-region") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="setTypeReport('CABINET')"
                v-if="objectData.accessWrite === true"
              >
                <i class="fas fa-coins"></i>
                &emsp;{{ $t("report.action.report-cabinet") }}
              </b-dropdown-item>
              <template v-if="typeExcel === 'REGION'">
                <export-excel
                  name="BÁO_CÁO_THEO_TUYẾN_HIỆN_TẠI"
                  :data="dataExcel"
                  :fields="fieldsExcel"
                >
                  <b-dropdown-item v-if="objectData.accessWrite === true">
                    <i class="fas fa-file-download"></i>
                    &emsp; {{ $t("report.action.download-excel") }}
                  </b-dropdown-item>
                </export-excel>
              </template>
              <template v-if="typeExcel === 'CABINET'">
                <b-dropdown-item
                  @click="handleExcelCabinet"
                  v-if="objectData.accessWrite === true"
                >
                  <i class="fas fa-file-download"></i>
                  &emsp; {{ $t("report.action.download-excel-cabinet") }}
                </b-dropdown-item>
              </template>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <template v-if="typeReport === 'REGION'">
            <report-region
              v-on:childToParent="handleChildExcel"
              :objectData="objectData"
            ></report-region>
          </template>
          <template v-if="typeReport === 'CABINET'">
            <report-cabinet
              ref="methodComponentChild"
              :objectData="objectData"
            ></report-cabinet>
          </template>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import RegionReport from "./component/RegionReport";
import CabinetReport from "./component/CabinetReport";
import systemAPI from "@/api/modules/systemAPI";

export default {
  name: "ReportLight",
  components: {
    "report-region": RegionReport,
    "report-cabinet": CabinetReport,
  },
  data() {
    return {
      menuRight: [],
      typeReport: "REGION",
      dataExcel: [],
      fieldsExcel: {},
      selectedItems: [],
      typeExcel: "REGION",
    };
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
  },
  methods: {
    handleChildExcel(data, fields) {
      this.dataExcel = data;
      this.fieldsExcel = fields;
    },
    setTypeReport(string) {
      this.typeReport = string;
      if (string === "CABINET") {
        this.typeExcel = "CABINET";
      }
      if (string === "REGION") {
        this.typeExcel = "REGION";
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
    handleExcelCabinet() {
      let idTable = "custom-table-report-cabinet";
      this.$refs.methodComponentChild.printExternalExcel(idTable);
    },
  },
  async created() {
    await this.getListMenuRight();
  },
};
</script>
