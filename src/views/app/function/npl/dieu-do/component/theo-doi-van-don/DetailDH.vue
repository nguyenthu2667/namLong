<template>
  <div>
    <b-row>
      <b-col lg="10">
        <b-row>
          <b-col lg="12"
            ><div class="header mt-2">
              <b-row>
                <b-col lg="6">
                  <b-row>
                    <b-col lg="4">
                      <b-form-group label="Mã vận đơn" class="has-float-label">
                        <b-form-input value="VD001" disabled></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Ngày VĐ" class="has-float-label">
                        <b-form-input
                          value="16/12/2022"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Loại hàng" class="has-float-label">
                        <b-form-input value="Hàng rời" disabled></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Số xe" class="has-float-label">
                        <b-form-input
                          value="59P1-88943"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Tài xế" class="has-float-label">
                        <b-form-input
                          value="Nguyễn văn A"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Điện thoại" class="has-float-label">
                        <b-form-input
                          value="0961421396"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Ghi chú" class="has-float-label">
                    <b-form-textarea
                      disabled
                      rows="3"
                      max-rows="6"
                      style="height: 88px"
                      value="..."
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
                <b-col lg="3" class="has-float-label">
                  <b-row>
                    <b-col lg="6">
                      <b-form-group label="DK ETD" class="has-float-label">
                        <b-form-input
                          value="18:00 15/12/2022"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="6">
                      <b-form-group label="DK ETA" class="has-float-label">
                        <b-form-input
                          value="19:00 15/12/2022"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Quá ETD" class="has-float-label">
                        <div
                          style="
                            height: 37px;
                            background: #e9ecef;
                            border: 0.5px solid #d7d7d7;
                          "
                          class="text-center pt-2"
                        >
                          <i
                            class="fad fa-exclamation-triangle text-danger"
                          ></i>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Quá ETA" class="has-float-label">
                        <div
                          style="
                            height: 37px;
                            background: #e9ecef;
                            border: 0.5px solid #d7d7d7;
                          "
                          class="text-center pt-2"
                        >
                          <i
                            class="fad fa-exclamation-triangle text-danger"
                          ></i>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group label="Quá tải" class="has-float-label">
                        <div
                          style="
                            height: 37px;
                            background: #e9ecef;
                            border: 0.5px solid #d7d7d7;
                          "
                          class="text-center pt-2"
                        >
                          <i
                            class="fad fa-exclamation-triangle text-danger"
                          ></i>
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="2">
        <b-row class="mt-2">
          <b-col lg="12">
            <b-row>
              <b-col lg="12">
                <b-form-group label="Trình trạng" class="has-float-label">
                  <b-form-input
                    class="text-success"
                    value="Đang đi giao"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Sai tuyến" class="has-float-label">
              <div
                style="
                  height: 37px;
                  background: #e9ecef;
                  border: 0.5px solid #d7d7d7;
                "
                class="text-center pt-2"
              >
                <i class="fad fa-exclamation-triangle text-danger"></i>
              </div>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Chứng từ" class="has-float-label">
              <div
                style="
                  height: 37px;
                  background: #e9ecef;
                  border: 0.5px solid #d7d7d7;
                "
                class="text-center pt-2"
              >
                <i class="fas fa-file-alt text-primary"></i>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-colxx lg="8"
        ><div style="height: 200px">
          <ContentHR v-if="type == 'HR'"></ContentHR>
          <ContentCN v-if="type == 'CN'"></ContentCN>
          <ContentCX v-if="type == 'CX'"></ContentCX>
        </div>
        <b-row :class="mt4 ? mt4 : null">
          <b-colxx lg="12">
            <div class="cpps">
              <div class="mb-1 d-flex justify-content-between">
                <div>
                  <strong>CHI PHÍ PHÁT SINH </strong>
                  <b-button
                    class="ml-1"
                    squared
                    :variant="`outline-primary`"
                    size="sm"
                    style="
                      height: 24px;
                      padding: 1px;
                      padding-left: 3px;
                      padding-right: 3px;
                    "
                    @click="showModalCppsDtps('CPPS')"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
                <div class="text-right pt-1">
                  <strong
                    ><span class="text-muted">Tổng cộng : </span>300,000
                  </strong>
                </div>
              </div>
              <b-table bordered :fields="fieldsCPPS" :items="dataCPPS">
                <template #cell(Status)="row">
                  <div :style="`color:${row.item.StatusColor}`">
                    {{ row.item.Status }}
                  </div>
                </template>
              </b-table>
            </div>
          </b-colxx>
          <b-col lg="12">
            <div class="dtps">
              <div class="mb-1 d-flex justify-content-between">
                <div>
                  <strong>DOANH THU PHÁT SINH</strong>
                  <b-button
                    class="ml-1"
                    squared
                    :variant="`outline-primary`"
                    size="sm"
                    style="
                      height: 24px;
                      padding: 1px;
                      padding-left: 3px;
                      padding-right: 3px;
                    "
                    @click="showModalCppsDtps('CPPS')"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </div>
                <div class="text-right mr-2 pt-1">
                  <strong
                    ><span class="text-muted">Tổng cộng : </span>700,000</strong
                  >
                </div>
              </div>
              <b-table bordered :fields="fieldsCPPS" :items="dataDTPS">
                <template #cell(Status)="row">
                  <div :style="`color:${row.item.StatusColor}`">
                    {{ row.item.Status }}
                  </div>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
      </b-colxx>
      <b-col lg="4">
        <div class="d-flex">
          <div>
            <strong>LỘ TRÌNH</strong>
          </div>
          <div class="text-right">
            <strong
              ><span class="text-muted ml-2"
                ><span class="text-danger">50Km(2h30p) - 19:00 21/11/2022</span>
              </span>
            </strong>
          </div>
        </div>
        <div class="box-map">
          <MapLive></MapLive>
        </div>
      </b-col>
    </b-row>
    <b-modal
      :id="`modal-them-cpps`"
      title="THÊM CHI PHÍ PHÁT SINH"
      size="lg"
      centered
      body-class="pt-4"
      @ok="showNotify"
    >
      <b-row>
        <b-col lg="6">
          <b-form-group label="Mục phí">
            <v-select
              v-model="dataFormCppsDtps"
              label="Name"
              :options="optionCppsDtps"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group label="Số tiền">
            <b-form-input
              v-model.number="dataFormCppsDtps.Money"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group :label="'Hình ảnh đính kèm (Nếu có)'">
            <b-form-file
              :placeholder="'Xin mời chọn...'"
              v-model="dataFormCppsDtps.files"
              multiple
              accept="/*"
              :browse-text="'Chọn Tệp'"
            ></b-form-file>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Ghi chú">
            <b-form-textarea
              rows="2"
              max-rows="6"
              v-model="dataFormCppsDtps.note"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import MapLive from "./MapLive.vue";
import ContentHR from "./ContentHR.vue";
import ContentCN from "./ContentCN.vue";
import ContentCX from "./ContentCX.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  props: ["type", "mt4"],
  components: {
    "v-select": vSelect,
    MapLive,
    ContentHR,
    ContentCN,
    ContentCX,
  },
  data() {
    return {
      optionCppsDtps: [
        {
          label: "Bốc xếp",
          Name: "Bốc xếp",
          Money: "100,000",
          Status: "Chờ duyệt",
          note: "",
        },
        {
          label: "Neo xe",
          Name: "Neo xe",
          Money: "200,000",
          Status: "Chờ duyệt",
          note: "",
        },
      ],
      dataFormCppsDtps: {
        Name: null,
        Money: null,
        Status: null,
        note: null,
      },
      //
      fieldsCPPS: [
        {
          key: "Name",
          label: "Mục phí",
        },
        {
          key: "Money",
          label: "ST đề xuất",
          tdClass: "text-right",
        },
        {
          key: "STPD",
          label: "ST Phê duyệt",
          tdClass: "text-right",
        },
        {
          key: "NDPD",
          label: "ND Phê duyệt",
          tdClass: "text-left",
        },
        {
          key: "TGPD",
          label: "Tgian phê duyệt",
          tdClass: "text-left",
        },
        {
          key: "Status",
          label: "Trạng thái",
          tdClass: "text-center",
        },
      ],
      dataCPPS: [
        {
          Name: "Bốc xếp",
          Money: "100,000",
          Status: "Đã duyệt",
          STPD: "50,000",
          NDPD: "Thủ kho báo 50k",
          TGPD: "19:00 20/11/2022",
          StatusColor: "green",
        },
        {
          Name: "Thủ kho",
          Money: "200,000",
          STPD: "50,000",
          NDPD: "Thủ kho báo 50k",
          TGPD: "19:00 20/11/2022",
          Status: "Chờ duyệt",
          StatusColor: "orange",
        },
      ],
      dataDTPS: [
        {
          Name: "Neo xe",
          Money: "600,000",
          STPD: "50,000",
          NDPD: "Thủ kho báo 50k",
          TGPD: "19:00 20/11/2022",
          Status: "Đã duyệt",
          StatusColor: "green",
        },
        {
          Name: "Bốc xếp",
          Money: "100,000",
          STPD: "50,000",
          NDPD: "Sếp bảo miễn phí",
          TGPD: "19:00 20/11/2022",
          Status: "Từ chối",
          StatusColor: "red",
        },
      ],
    };
  },
  methods: {
    showNotify() {
      this.$notify("success", "THÀNH CÔNG", "Đã xử lí thành công !");
    },
    showModalCppsDtps(key) {
      this.typeModal = key;
      setTimeout(() => {
        this.$bvModal.show(`modal-them-cpps`);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-map {
  height: 521px;
  background: lightblue;
}
</style>