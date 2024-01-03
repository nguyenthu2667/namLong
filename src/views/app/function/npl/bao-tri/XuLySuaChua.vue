<template>
  <div>
    <FormBasicNPLcustom
      :title="'Xử Lý Sửa Chữa'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      @currentTitle="handleChangeTitle"
      :componentKey="'XuLyYeuCau'"
    >
      <template #tabTwo="slotProps">
        <div class="mt-2">
          <b-row>
            <b-col lg="4">
              <div class="mb-2">
                <strong
                  ><i class="fas fa-info-square mr-1"></i>THÔNG TIN YÊU CẦU BẢO
                  DƯỠNG</strong
                >
              </div>
              <div>
                <b-row>
                  <b-col lg="4">
                    <b-form-group label="Mã" class="has-float-label mb-4">
                      <b-form-input v-model="slotProps.dataForm.ID" disabled />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="Ngày yêu cầu"
                      class="has-float-label mb-4"
                    >
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
                </b-row>
                <b-row>
                  <b-col lg="4">
                    <b-form-group label="Số xe" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.BSX"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group label="Tài xế" class="has-float-label mb-4">
                      <v-select
                        v-model="slotProps.dataForm.TaiXe"
                        :options="[
                          'Nguyễn Văn A',
                          'Nguyễn Văn B',
                          'Nguyễn Văn C',
                        ]"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="Điện thoại"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.SDT"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="4">
                    <b-form-group label="TG sự cố" class="has-float-label mb-4">
                      <datepicker
                        v-model="slotProps.dataForm.TGSC"
                        :format="'13:00 dd/MM/yyyy'"
                        :placeholder="'DD/MM/YYYY'"
                        :bootstrap-styling="true"
                        :disabled="slotProps.isDisable"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="8">
                    <b-form-group
                      label="Loại sự cố"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.LoaiSuCo"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <b-form-group
                      label="Yêu cầu khác"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.YCK"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>

                  <!-- <b-col lg="8">
                    <b-form-group label="Vị trí" class="has-float-label mb-4">
                      <b-form-input
                        v-model="slotProps.dataForm.ViTri"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col> -->
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        v-model="slotProps.dataForm.note"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <strong class="text-muted"
                      >Vị trí ({{ slotProps.dataForm.ViTri }})</strong
                    >
                    <div style="height: 280px">
                      <MapViTri />
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="4">
              <div class="mb-2">
                <strong
                  ><i class="fas fa-info-square mr-1"></i>THÔNG TIN SỬA CHỮA
                </strong>
              </div>
              <div class="d-flex text-muted mb-2">
                <strong>TIẾP NHẬN </strong>
              </div>
              <div>
                <b-row>
                  <b-col lg="4">
                    <b-form-group
                      label="Thời gian tiếp nhận"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TGTN"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-form-group
                      label="Dự kiến hoàn thành"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.DKHT"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-button squared :variant="`success`" size="sm">
                      <b
                        ><i class="far fa-check-circle mr-1"></i>Xác nhận tiếp
                        nhận</b
                      >
                    </b-button>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Tình trạng tiếp nhận"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TTTN"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Phương án xử lý"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.PAXL"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <div style="margin-top: -10px" class="d-flex mb-2">
                      <div><strong>Sửa chữa tại</strong></div>
                      <div class="d-flex ml-4" style="margin-top: -2px">
                        <b-form-radio
                          :disabled="slotProps.isDisable"
                          class="mr-4"
                          v-model="radioGara"
                          name="some-radios"
                          value="NPL"
                          >nPL</b-form-radio
                        >
                        <b-form-radio
                          :disabled="slotProps.isDisable"
                          v-model="radioGara"
                          name="some-radios"
                          value="TN"
                          >Thuê ngoài</b-form-radio
                        >
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" v-show="radioGara == 'TN'">
                    <b-form-group
                      label="Chọn Gara thuê ngoài"
                      class="has-float-label mb-4"
                    >
                      <v-select
                        v-model="slotProps.dataForm.Gara"
                        :disabled="slotProps.isDisable"
                        :options="[
                          'Gara Cát Lái',
                          'Gara Tú Trần',
                          'Gara Hai Bánh',
                        ]"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
              <hr class="m-0 p-0 mb-2" />
              <div class="d-flex text-muted mb-2">
                <strong>BÀN GIAO </strong>
              </div>
              <div>
                <b-row>
                  <b-col lg="8">
                    <b-form-group
                      label="Thời gian bàn giao"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TGHT"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="4">
                    <b-button squared :variant="`success`" size="sm">
                      <b
                        ><i class="far fa-check-circle mr-1"></i> Xác nhận bàn
                        giao
                      </b>
                    </b-button>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Tình trạng bàn giao"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.TTBG"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group
                      label="Công việc chưa xử lý"
                      class="has-float-label mb-4"
                    >
                      <b-form-input
                        v-model="slotProps.dataForm.CVCXL"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group label="Ghi chú" class="has-float-label mb-4">
                      <b-form-textarea
                        v-model="slotProps.dataForm.note"
                        :disabled="slotProps.isDisable"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col lg="4">
              <div class="d-flex justify-content-between mb-2">
                <div>
                  <strong>
                    <i class="fas fa-info-square mr-1"></i>
                    THÔNG TIN CÔNG VIỆC VÀ VẬT TƯ
                    <b-button
                      class="ml-1 mb-1"
                      squared
                      :variant="`outline-primary`"
                      size="sm"
                      style="
                        height: 24px;
                        padding: 1px;
                        padding-left: 3px;
                        padding-right: 3px;
                      "
                      @click="showModalCVVT"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm </b>
                    </b-button>
                  </strong>
                </div>
                <div>
                  <strong>
                    <span class="text-muted">Tổng tiền: </span>
                    500,000
                  </strong>
                </div>
              </div>
              <div>
                <b-table
                  :fields="fCVVT"
                  :items="tCVVT"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(actions)>
                    <div class="text-center" style="cursor: pointer">
                      <i class="fas fa-trash-alt text-danger mr-2"></i>
                      <i class="fas fa-edit text-warning"></i>
                    </div>
                  </template>
                </b-table>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <div>
                  <strong
                    ><i class="fas fa-info-square mr-1"></i>CHI PHÍ SỬA CHỮA
                    <b-button
                      class="ml-1 mb-1"
                      squared
                      :variant="`outline-primary`"
                      size="sm"
                      style="
                        height: 24px;
                        padding: 1px;
                        padding-left: 3px;
                        padding-right: 3px;
                      "
                      @click="showModalBD"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm </b>
                    </b-button>
                  </strong>
                </div>
                <div>
                  <strong
                    ><span class="text-muted">Tổng tiền: </span
                    >1,500,000</strong
                  >
                </div>
              </div>
              <div>
                <b-table
                  :fields="fCPSC"
                  :items="tCPSC"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(actions)>
                    <div class="text-center" style="cursor: pointer">
                      <i class="fas fa-trash-alt text-danger mr-2"></i>
                      <i class="fas fa-edit text-warning"></i>
                    </div> </template
                ></b-table>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <div>
                  <strong
                    ><i class="fas fa-info-square mr-1"></i>THÔNG TIN CỨU XE BÊN
                    NGOÀI
                    <b-button
                      class="ml-1 mb-1"
                      squared
                      :variant="`outline-primary`"
                      size="sm"
                      style="
                        height: 24px;
                        padding: 1px;
                        padding-left: 3px;
                        padding-right: 3px;
                      "
                      @click="showModalCuuXe"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm </b>
                    </b-button>
                  </strong>
                </div>
                <div>
                  <strong
                    ><span class="text-muted">Tổng tiền: </span
                    >1,500,000</strong
                  >
                </div>
              </div>
              <div>
                <b-table
                  :fields="fCXN"
                  :items="tCXN"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(actions)>
                    <div class="text-center" style="cursor: pointer">
                      <i class="fas fa-trash-alt text-danger mr-2"></i>
                      <i class="fas fa-edit text-warning"></i>
                    </div> </template
                ></b-table>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <div>
                  <strong
                    ><i class="fas fa-info-square mr-1"></i>THÔNG TIN BẢO HIỂM
                    CHI TRẢ
                    <b-button
                      class="ml-1 mb-1"
                      squared
                      :variant="`outline-primary`"
                      size="sm"
                      style="
                        height: 24px;
                        padding: 1px;
                        padding-left: 3px;
                        padding-right: 3px;
                      "
                      @click="showModalBaoHiem"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm </b>
                    </b-button>
                  </strong>
                </div>
                <div>
                  <strong
                    ><span class="text-muted">Tổng tiền: </span>500,000</strong
                  >
                </div>
              </div>
              <div>
                <b-table
                  :fields="fBHCT"
                  :items="tBHCT"
                  bordered
                  responsive
                  show-empty
                  head-variant="light"
                >
                  <template #cell(actions)>
                    <div class="text-center" style="cursor: pointer">
                      <i class="fas fa-trash-alt text-danger mr-2"></i>
                      <i class="fas fa-edit text-warning"></i>
                    </div> </template
                ></b-table>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLcustom>
    <b-modal :id="`modal-bh`" centered size="md" title="THÊM" @ok="handleAddBH">
      <div class="mt-2">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Đơn vị bảo hiểm" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.DVBH"
                :options="['Bảo hiểm nhật thọ', 'Bảo hiểm ABC', 'Bảo hiểm DEF']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group
              label="Số phiếu liên quan"
              class="has-float-label mb-4"
            >
              <b-form-input v-model="formCustom.SPLQ" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Số Tiền" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.SoTien" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Ghi chú" class="has-float-label mb-4">
              <b-form-textarea v-model="formCustom.GhiChu" />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-modal
      :id="`modal-cvvt`"
      centered
      size="md"
      title="THÊM"
      @ok="handleAddCVVT"
    >
      <div class="mt-2">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Công việc" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.CongViec"
                :options="['Sửa bố thắng', 'Thay vỏ xe', 'Thay ruột xe']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Vật tư" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.VatTu"
                :options="['Thắng ABS', 'Thắng RTS', 'Thắng Tay']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Số lượng" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.SoLuong" />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-modal :id="`modal-bd`" centered size="md" title="THÊM" @ok="handleAddBD">
      <div>
        <b-row>
          <b-col lg="12">
            <b-form-group label="Chi phí" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.ChiPhi"
                :options="['Sửa bố thắng', 'Thay vỏ xe', 'Thay ruột xe']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Số tiền" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.SoTien" />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Ký hiệu hóa đơn" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.KyHieu" />
            </b-form-group>
          </b-col>
          <b-col lg="12" class="mb-4">
            <b-form-file
              placeholder="Chọn file đính kèm (nếu có)"
              v-model="formCustom.file"
              multiple
              accept="/*"
              :browse-text="'CHỌN'"
            ></b-form-file>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Ghi chú" class="has-float-label mb-4">
              <b-form-textarea v-model="formCustom.GhiChu" />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-modal
      :id="`modal-cxn`"
      centered
      size="md"
      title="THÊM"
      @ok="handleAddCXN"
    >
      <div>
        <b-row>
          <b-col lg="12">
            <b-form-group label="Khu vực cứu xe" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.KhuVuc"
                :options="[
                  'Quận7 Khu Trung Sơn',
                  'Quận1 Bến Bạch Đằng',
                  'Cát Lái Đồng Nai',
                ]"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Nhân viên cứu xe" class="has-float-label mb-4">
              <v-select
                multiple
                v-model="formCustom.NhanVien"
                :options="['Nguyễn Văn A', 'Nguyễn Văn B', 'Nguyễn Văn C']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Phương tiện" class="has-float-label mb-4">
              <v-select
                multiple
                v-model="formCustom.PhuongTien"
                :options="['Trần Văn D', 'Nguyễn Văn E', 'Xe công ty']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-checkbox>Có phụ cấp xăng ?</b-form-checkbox>
          </b-col>
          <b-col lg="7">
            <b-form-group label="Số tiền" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.PCX" />
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-checkbox>Có phụ cấp ngoài giờ ?</b-form-checkbox>
          </b-col>
          <b-col lg="7">
            <b-form-group label="Số tiền" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.PCNG" />
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Ghi chú" class="has-float-label mb-4">
              <b-form-textarea v-model="formCustom.GhiChu" />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import FormBasicNPLcustom from "./component/FormBasicNPLcustom.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import MapViTri from "./component/MapViTri";

export default {
  components: {
    FormBasicNPLcustom,
    MapViTri,
    "v-select": vSelect,
  },
  data() {
    return {
      formCustom: {},
      radioGara: "NPL",
      fieldsTable: [
        {
          key: "ID",
          label: "Mã yêu cầu",
        },
        {
          key: "createDate",
          label: "Ngày yêu cầu",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "SDT",
          label: "Điện thoại",
        },
        {
          key: "LoaiSuCo",
          label: "Loại sự cố",
        },
        {
          key: "YeuCauThem",
          label: "Yêu cầu thêm",
        },
        {
          key: "TGSC",
          label: "TG Sự cố",
        },
        {
          key: "TGTN",
          label: "TG Tiếp nhận",
        },
        {
          key: "DKHT",
          label: "DK hoàn thành",
        },
        {
          key: "TGHT",
          label: "TG hoàn thành",
        },
        {
          key: "TTTN",
          label: "Trình trạng tiếp nhận",
        },
        {
          key: "PAXL",
          label: "Phương án xử lý",
        },
        {
          key: "TTBG",
          label: "Trình trạng bàn giao",
        },
        {
          key: "SCT",
          label: "Sửa chữa tại",
        },
        {
          key: "CVCXL",
          label: "Công việc chưa xử lý",
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
          ID: "YC001",
          createDate: "09:30 12/12/2022",
          NghiepVu: "Bàn giao",
          NghiepVuColor: "green",
          BSX: "59P2-40841",
          LoaiXe: "HW1000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hư bình điện",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC001",
          createDate: "09:30 12/12/2022",
          NghiepVu: "Bàn giao",
          NghiepVuColor: "green",
          BSX: "MOC138367",
          LoaiXe: "Mooc xương",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Đã tiếp nhận",
          StatusColor: "#2980b9",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "4",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC002",
          createDate: "11/12/2023",
          NghiepVu: "Cho mượn",
          NghiepVuColor: "#9b59b6",
          LoaiXe: "RM1000",
          BSX: "59P2-40845",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "5",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC0021",
          createDate: "11/12/2023",
          NghiepVu: "Cho mượn",
          NghiepVuColor: "#9b59b6",
          LoaiXe: "Mooc sàn",
          BSX: "MOC187377",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          note: "...",
          Status: "Đang xử lý",
          StatusColor: "#8e44ad",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "6",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC0031",
          createDate: "10/12/2023",
          NghiepVu: "Thu hồi",
          NghiepVuColor: "orange",
          LoaiXe: "RM1000",
          BSX: "59P2-40245",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Đã hoàn thành",
          StatusColor: "green",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC003",
          createDate: "10/12/2023",
          NghiepVu: "Thu hồi",
          NghiepVuColor: "orange",
          LoaiXe: "Mooc xương",
          BSX: "MOC037888",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Đã hoàn thành",
          StatusColor: "green",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC0041",
          createDate: "09/12/2023",
          NghiepVu: "Thu hồi cho mượn",
          NghiepVuColor: "orange",
          LoaiXe: "HW1000",
          BSX: "59P2-40845",
          TaiXe: "Nguyễn Văn D",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Đầu kéo",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          ChuKy: "3",
          DKHT: "20:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
        {
          ID: "YC004",
          createDate: "09/12/2023",
          NghiepVu: "Thu hồi cho mượn",
          NghiepVuColor: "orange",
          LoaiXe: "Mooc sàn",
          BSX: "MOC172829",
          TaiXe: "Nguyễn Văn D",
          SDT: "0961421396",
          CMND: "301692324",
          GPLX: "GPLX09232",
          DKTG: "09:30 12/12/2022",
          MCTXL: "MCTXL9238",
          TTBG: " Hoạt động bình thường",
          TTTH: "Hoạt động bình thường",
          note: "...",
          Status: "Chờ tiếp nhận",
          StatusColor: "orange",
          PhuongTien: "Romooc",
          TGTN: "17:00 12/12/2022",
          KMBG: "15,500",
          DKHT: "20:00 12/12/2022",
          ChuKy: "3",
          TGHT: "21:00 12/12/2022",
          TTTN: "Hoạt động bình thường",
          CVCXL: "Thay bình hơi",
          YCK: "...",
          LoaiSuCo: "Hư vỏ",
          YeuCauThem: "Bơm hơi thêm",
          TGSC: "13:00 12/12/2022",
          PAXL: "Về trạm sửa chữa",
          SCT: "Trạm sửa chữa nPL",
          ViTri: "10.9321388, 10.7535277",
        },
      ],
      fCVVT: [
        {
          key: "CongViec",
          label: "Công việc",
        },
        {
          key: "VatTu",
          label: "Vật tư",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "actions",
          label: "Thao tác",
          tdClass: "text-center",
        },
      ],
      tCVVT: [
        {
          ID: "001",
          CongViec: "Thay bố thắng",
          VatTu: "Bố thắng",
          SoLuong: "2",
        },
      ],
      fCPSC: [
        {
          key: "ChiPhi",
          label: "Chi phí",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "KyHieu",
          label: "Ký hiệu và Hóa đơn",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "actions",
          label: "Thao tác",
          tdClass: "text-center",
        },
      ],
      tCPSC: [
        {
          ChiPhi: "Sửa bố thắng",
          SoTien: "1,500,000",
          KyHieu: "KT18-123444",
          GhiChu: "....",
        },
      ],
      fCXN: [
        {
          key: "KhuVuc",
          label: "Khu vực",
        },
        {
          key: "NhanVien",
          label: "Nhân viên cứu xe",
          formatter: (value, key, item) => {
            return value + "";
          },
        },
        {
          key: "PhuongTien",
          label: "Phương tiện",
          formatter: (value, key, item) => {
            return value + "";
          },
        },
        {
          key: "PCX",
          label: "Phụ cấp xăng",
        },
        {
          key: "PCNG",
          label: "PC ngoài giờ",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "actions",
          label: "Thao tác",
          tdClass: "text-center",
        },
      ],
      tCXN: [
        {
          ID: "001",
          KhuVuc: "Quận 7",
          NhanVien: "Nguyễn Văn A",
          PhuongTien: "Trần Văn B",
          PCX: "150,000",
          PCNG: "300,000",
          GhiChu: "...",
        },
      ],
      fBHCT: [
        {
          key: "NgayNhan",
          label: "Ngày nhận",
        },
        {
          key: "SoTien",
          label: "Số tiền nhận",
        },
        {
          key: "SPLQ",
          label: "Số phiếu liên quan",
        },
        {
          key: "DVBH",
          label: "Đơn vị bảo hiểm",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "actions",
          label: "Thao tác",
          tdClass: "text-center",
        },
      ],
      tBHCT: [
        {
          NgayNhan: "12/12/2022",
          SoTien: "500,000",
          SPLQ: "123",
          DVBH: "Bảo Hiểm Nhật Thọ",
          GhiChu: "...",
        },
      ],
      options: {},
    };
  },
  methods: {
    handleAddBH() {
      let obj = {
        NgayNhan: "12/12/2022",
        ID: this.tBHCT.length + 1,
        ...this.formCustom,
      };
      this.tBHCT.push(obj);
    },
    showModalBaoHiem() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-bh");
      }, 500);
    },
    handleAddCVVT() {
      let obj = {
        ID: this.tCVVT.length + 1,
        ...this.formCustom,
      };
      this.tCVVT.push(obj);
    },
    showModalCVVT() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-cvvt");
      }, 500);
    },
    handleAddBD() {
      let obj = {
        ID: this.tCPSC.length + 1,
        ...this.formCustom,
      };
      this.tCPSC.push(obj);
    },
    showModalBD() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-bd");
      }, 500);
    },
    handleAddCXN() {
      let obj = {
        ID: this.tCXN.length + 1,
        ...this.formCustom,
      };
      this.tCXN.push(obj);
    },
    showModalCuuXe() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-cxn");
      }, 500);
    },
    handleChangeTitle(string) {
      if (string.toUpperCase() != "THU HỒI") {
        this.fTTLX = this.fTTLX.filter((f) => f.key != "CTH");
        this.fDCBG = this.fDCBG.filter((f) => f.key != "CTH");
        this.fGTBG = this.fGTBG.filter((f) => f.key != "CTH");
      } else {
        let obj = {
          key: "CTH",
          label: "Có thu hồi ?",
          typeCol: "CHECKBOX",
        };
        this.fTTLX.push(obj);
        this.fDCBG.push(obj);
        this.fGTBG.push(obj);
      }
    },
  },
};
</script>