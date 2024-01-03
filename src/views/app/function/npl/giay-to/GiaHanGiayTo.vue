<template>
  <div>
    <FormBasicNPLcustom
      :title="'CHỌN NGHIỆP VỤ'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      :titles="[
        'đăng kiểm xe',
        'phí đường bộ',
        'bảo hiểm',
        'phù hiệu vận tải',
        'gps',
      ]"
      :componentKey="'GiaHanGiayTo'"
    >
      <template #tabTwo="slotProps">
        <div class="mt-3">
          <b-row>
            <b-col lg="2">
              <b-form-group label="Mã CT" class="has-float-label mb-4">
                <b-form-input v-model="slotProps.dataForm.ID" disabled />
              </b-form-group>
            </b-col>
            <b-col lg="2">
              <b-form-group label="Ngày CT" class="has-float-label mb-4">
                <datepicker
                  v-model="slotProps.dataForm.createDate"
                  :format="'dd/MM/yyyy'"
                  :placeholder="'DD/MM/YYYY'"
                  :bootstrap-styling="true"
                  @input="convertDate('createDate')"
                  :disabled="slotProps.isDisable"
                ></datepicker>
              </b-form-group>
            </b-col>
            <b-col lg="8"> </b-col>
            <b-col lg="12">
              <b-row>
                <b-col lg="6">
                  <b-row>
                    <b-col lg="4">
                      <b-form-group label="Số xe" class="has-float-label mb-4">
                        <b-form-input
                          v-model="slotProps.dataForm.BSX"
                          :disabled="slotProps.isDisable"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col lg="8">
                      <b-form-group label="Đơn vị" class="has-float-label mb-4">
                        <v-select
                          v-model="slotProps.dataForm.DVGH"
                          :disabled="slotProps.isDisable"
                          :options="[
                            'Công ty bảo hiểm Bảo Việt',
                            'Công ty bảo hiểm Petrolimex',
                            'Trung tâm đăng kiểm Thạnh Xuân',
                            'Trung tâm đăng kiểm Tân Tạo',
                            'Công ty cổ phần A.D.D GPS',
                          ]"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="12">
              <b-row>
                <b-col lg="6">
                  <b-row>
                    <b-col lg="4">
                      <b-row>
                        <b-col lg="6">
                          <b-form-group
                            label="Gia hạn"
                            class="has-float-label mb-4"
                          >
                            <datepicker
                              v-model="slotProps.dataForm.NgayGH"
                              :format="'dd/MM/yyyy'"
                              :placeholder="'DD/MM/YYYY'"
                              :bootstrap-styling="true"
                              @input="convertDate('createDate')"
                              :disabled="slotProps.isDisable"
                            ></datepicker>
                          </b-form-group>
                        </b-col>
                        <b-col lg="6">
                          <b-form-group
                            label="Hết hạn"
                            class="has-float-label mb-4"
                          >
                            <datepicker
                              v-model="slotProps.dataForm.NgayHH"
                              :format="'dd/MM/yyyy'"
                              :placeholder="'DD/MM/YYYY'"
                              :bootstrap-styling="true"
                              @input="convertDate('createDate')"
                              :disabled="slotProps.isDisable"
                            ></datepicker>
                          </b-form-group>
                        </b-col>
                        <b-col lg="12">
                          <b-form-group
                            label="Số seri"
                            class="has-float-label mb-4"
                          >
                            <b-form-input
                              v-model="slotProps.dataForm.SoSeri"
                              :disabled="slotProps.isDisable"
                            />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col lg="4">
                      <b-row>
                        <b-col lg="12">
                          <b-form-group
                            label="Số tiền"
                            class="has-float-label mb-4"
                          >
                            <b-form-input
                              v-model="slotProps.dataForm.SoTien"
                              :disabled="slotProps.isDisable"
                              class="text-right"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col lg="12">
                          <b-form-group
                            label="Số gia hạn"
                            class="has-float-label mb-4"
                          >
                            <b-form-input
                              v-model="slotProps.dataForm.SoGH"
                              :disabled="slotProps.isDisable"
                            />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col lg="4">
                      <b-form-group
                        label="Ghi chú"
                        class="has-float-label mb-4"
                      >
                        <b-form-textarea
                          rows="2"
                          max-rows="6"
                          v-model="slotProps.dataForm.note"
                          :disabled="slotProps.isDisable"
                          style="height: 93px"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLcustom>
  </div>
</template>

<script>
import FormBasicNPLcustom from "./component/FormBasicNPLcustom.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    FormBasicNPLcustom,
    "v-select": vSelect,
  },
  data() {
    return {
      fieldsTable: [
        {
          key: "ID",
          label: "Mã CT",
        },
        {
          key: "createDate",
          label: "Ngày CT",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "DVGH",
          label: "Đơn vị GH",
        },
        {
          key: "NgayGH",
          label: "Ngày gia hạn",
        },
        {
          key: "NgayHH",
          label: "Ngày hết hạn",
        },
        {
          key: "SoSeri",
          label: "Số Seri",
        },
        {
          key: "SoGH",
          label: "Số GH",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
        {
          key: "Status",
          label: "Trạng thái",
          typeCol: "BADGECOLOR",
        },
      ],
      dataTable: [
        {
          ID: "CT001",
          createDate: "01/12/2023",
          BSX: "59P2-40841",
          DVGH: "Công ty bảo hiểm Bảo Việt",
          NgayGH: "01/12/2023",
          NgayHH: "12/12/2024",
          SoSeri: "SR093184782",
          SoGH: "GH001",
          SoTien: "10,000,000",
          note: "...",
          Status: "Chờ khóa",
          StatusColor: "orange",
        },
        {
          ID: "CT002",
          createDate: "01/12/2023",
          BSX: "59P2-40841",
          DVGH: "Công ty bảo hiểm Petrolimex",
          NgayGH: "01/12/2023",
          NgayHH: "12/12/2024",
          SoSeri: "SR093184782",
          SoGH: "GH001",
          SoTien: "10,000,000",
          note: "...",
          Status: "Chờ khóa",
          StatusColor: "orange",
        },
        {
          ID: "CT003",
          createDate: "01/12/2023",
          BSX: "59P2-40841",
          DVGH: "Trung tâm đăng kiểm Tân Tạo",
          NgayGH: "01/12/2023",
          NgayHH: "12/12/2024",
          SoSeri: "SR093184782",
          SoGH: "GH001",
          SoTien: "10,000,000",
          note: "...",
          Status: "Đã khóa",
          StatusColor: "red",
        },
        {
          ID: "CT004",
          createDate: "01/12/2023",
          BSX: "59P2-40841",
          DVGH: "Công ty cổ phần A.D.D GPS",
          NgayGH: "01/12/2023",
          NgayHH: "12/12/2024",
          SoSeri: "SR093184782",
          SoGH: "GH001",
          SoTien: "10,000,000",
          note: "...",
          Status: "Chờ khóa",
          StatusColor: "orange",
        },
      ],
      options: {},
    };
  },
};
</script>