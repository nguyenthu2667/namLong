<template>
  <div class="npl-ve-thang">
    <FormBasicNPLCustom
      :title="'Cập nhật chứng từ'"
      :fields="fieldsTable"
      :items="dataTable"
      :fieldsForm="fieldsForm"
      ref="refFormBasicNPLCustom"
      :sAdd="false"
      :sDelete="false"
      :componentKey="'CapNhatChungTu'"
    >
      <template #ChungTuGoc="slotProps">
        <div>
          <span
            v-if="slotProps.row.ChungTuGoc || slotProps.row.ChungTuGoc == 'Có'"
            style="color: limegreen"
          >
            ✔
          </span>
          <span v-else> <i class="fas fa-minus text-muted"></i></span>
        </div>
      </template>
      <template #tabTwo="slotProps">
        <div class="form-cnct">
          <div class="mt-2">
            <b-row>
              <b-col>
                <b-form-group label="Mã chứng từ" class="has-float-label mb-4">
                  <b-form-input
                    value="AUTO"
                    disabled
                    class="text-center"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Ngày chứng từ"
                  class="has-float-label mb-4"
                >
                  <datepicker
                    v-model="slotProps.dataForm.createDate"
                    :format="'dd/MM/yyyy'"
                    :placeholder="'DD/MM/YYYY'"
                    disabled
                    :bootstrap-styling="true"
                    @input="convertDate('createDate')"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Số xe" class="has-float-label mb-4">
                  <b-form-input v-model="slotProps.dataForm.BSX" disabled />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Tài xế" class="has-float-label mb-4">
                  <b-form-input v-model="slotProps.dataForm.TaiXe" disabled />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Lương tài xế" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.LuongTaiXe"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Phí khoán" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhoan"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Phí khác" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhac"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Chứng từ gốc" class="has-float-label mb-4">
                  <template v-if="slotProps.isDisable">
                    <div
                      style="background: #e9ecef; border: 1px solid #d7d7d7"
                      class="text-center p-2"
                    >
                      <span
                        v-if="slotProps.dataForm.ChungTuGoc"
                        style="color: limegreen"
                      >
                        ✔ Đã nhận
                      </span>
                      <span v-else> Chờ cập nhật </span>
                    </div>
                  </template>
                  <template v-else>
                    <v-select
                      v-model="slotProps.dataForm.ChungTuGoc"
                      label="Name"
                      :options="['Đã nhận', 'Chưa nhận', 'Không chứng từ']"
                    />
                  </template>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- // -->
            <b-row>
              <b-col>
                <b-form-group label="PC cơm" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhoan"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="PC cẩu" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhoan"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="PC phủ bạt" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhoan"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="PC Lơ" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhuCap"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="PC quá tải" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhac"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Số lượng chuyến"
                  class="has-float-label mb-4"
                >
                  <b-form-input
                    value="36"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="PC trên 35 chuyến"
                  class="has-float-label mb-4"
                >
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhac"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="PC hàng lẻ" class="has-float-label mb-4">
                  <b-form-input
                    v-model="slotProps.dataForm.PhiKhac"
                    :disabled="slotProps.isDisable"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- // -->
            <b-row>
              <b-col lg="12">
                <div class="mb-1"><strong>DANH SÁCH ĐƠN HÀNG</strong></div>
              </b-col>
              <b-col lg="12">
                <div>
                  <b-table
                    show-empty
                    responsive
                    bordered
                    head-variant="light"
                    :fields="fDonHang"
                    :items="aDonHang"
                  >
                    <template #cell(actions)>
                      <div class="text-center">
                        <i class="fas fa-edit text-warning"></i>
                      </div>
                    </template>
                  </b-table>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-row>
            <b-col lg="6">
              <b-row>
                <b-col lg="12">
                  <div class="mb-1 d-flex justify-content-between">
                    <div>
                      <strong> THÔNG TIN PHÍ NÂNG/HẠ/DO (CHỊ HẰNG)</strong>
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
                        @click="showModalAddPNH"
                      >
                        <i class="fas fa-plus"></i> <b>Thêm</b>
                      </b-button>
                    </div>
                    <div class="text-right pt-1">
                      <strong class="d-flex">
                        <b-form-checkbox class="mr-2" style="margin-top: -3px"
                          >Không có phí nâng hạ ?</b-form-checkbox
                        >
                        <!-- <span class="text-muted">Tổng cộng : </span>700,000 -->
                      </strong>
                    </div>
                  </div>
                  <div class="total text-right">
                    <strong class="mr-2"
                      ><span class="text-muted">Nâng cont quá hạn : </span>0
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Phí đậu bãi : </span>0
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Phí cược cont : </span>0
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Tổng vệ sinh : </span>200,000
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Tổng nâng hạ : </span>500,000
                    </strong>
                    <strong
                      ><span class="text-muted">Tổng cộng : </span>700,000
                    </strong>
                  </div>
                  <div>
                    <b-table
                      :fields="fieldsPNH"
                      :items="tablePNH"
                      bordered
                      responsive
                      show-empty
                      head-variant="light"
                    >
                      <template #cell(img)="row">
                        <div style="width: 32px; height: 32px">
                          <img
                            v-img
                            style="width: 100%; height: 100%"
                            :src="row.item.img"
                          />
                        </div>
                      </template>
                      <template #cell(actions)="row">
                        <div class="text-center">
                          <i
                            class="fas fa-trash-alt text-danger mr-2"
                            @click="removePNH(row.item)"
                          ></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                      <template #cell(Status)="row">
                        <div :style="`color:${row.item.StatusColor}`">
                          {{ row.item.Status }}
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-data") }}
                        </div>
                      </template>
                      <template #emptyfiltered>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-result") }}
                        </div>
                      </template>
                    </b-table>
                  </div>
                  <!-- // -->
                  <div class="mb-1 d-flex justify-content-between">
                    <div>
                      <strong> THÔNG TIN PHÍ NÂNG/HẠ/DO (CHỊ CHUNG)</strong>
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
                        @click="showModalAddPNH"
                      >
                        <i class="fas fa-plus"></i> <b>Thêm</b>
                      </b-button>
                    </div>
                    <div class="text-right pt-1">
                      <strong class="d-flex">
                        <!-- <b-form-checkbox class="mr-2" style="margin-top: -3px"
                          >Không có phí nâng hạ ?</b-form-checkbox
                        > -->
                        <!-- <span class="text-muted">Tổng cộng : </span>700,000 -->
                      </strong>
                    </div>
                  </div>
                  <div class="total text-right">
                    <strong class="mr-2"
                      ><span class="text-muted">Nâng cont quá hạn : </span>0
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Phí đậu bãi : </span>0
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Phí cược cont : </span>0
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Tổng vệ sinh : </span>200,000
                    </strong>
                    <strong class="mr-2"
                      ><span class="text-muted">Tổng nâng hạ : </span>500,000
                    </strong>
                    <strong
                      ><span class="text-muted">Tổng cộng : </span>700,000
                    </strong>
                  </div>
                  <div>
                    <b-table
                      :fields="fieldsPNH"
                      :items="tablePNH"
                      bordered
                      responsive
                      show-empty
                      head-variant="light"
                    >
                      <template #cell(img)="row">
                        <div style="width: 32px; height: 32px">
                          <img
                            v-img
                            style="width: 100%; height: 100%"
                            :src="row.item.img"
                          />
                        </div>
                      </template>
                      <template #cell(actions)="row">
                        <div class="text-center">
                          <i
                            class="fas fa-trash-alt text-danger mr-2"
                            @click="removePNH(row.item)"
                          ></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                      <template #cell(Status)="row">
                        <div :style="`color:${row.item.StatusColor}`">
                          {{ row.item.Status }}
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-data") }}
                        </div>
                      </template>
                      <template #emptyfiltered>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-result") }}
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
                <b-col lg="12">
                  <div class="mb-1 d-flex justify-content-between">
                    <div>
                      <strong> CHI TIẾT PHỤ CẤP KHÁC</strong>
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
                        @click="showModalAddPCK"
                      >
                        <i class="fas fa-plus"></i> <b>Thêm</b>
                      </b-button>
                    </div>
                    <div class="text-right pt-1">
                      <strong
                        ><span class="text-muted">Tổng cộng : </span>600,000
                      </strong>
                    </div>
                  </div>
                  <div>
                    <b-table
                      :fields="fieldsPCK"
                      :items="tablePCK"
                      bordered
                      responsive
                      show-empty
                      head-variant="light"
                    >
                      <template #cell(actions)="row">
                        <div class="text-center">
                          <i
                            class="fas fa-trash-alt text-danger mr-2"
                            @click="removePCK(row.item)"
                          ></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-data") }}
                        </div>
                      </template>
                      <template #emptyfiltered>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-result") }}
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="6">
              <b-row>
                <b-col lg="12">
                  <div class="mb-1 d-flex justify-content-between">
                    <div>
                      <strong> CHI TIẾT PHÍ CẦU ĐƯỜNG</strong>
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
                        @click="showModalAddPCD"
                      >
                        <i class="fas fa-plus"></i> <b>Thêm</b>
                      </b-button>
                    </div>
                    <div class="text-right pt-1">
                      <strong class="mr-4"
                        ><span class="text-muted">Tổng cộng(vé ETC) : </span
                        >300,000
                      </strong>
                      <strong
                        ><span class="text-muted">Tổng cộng(vé tay) : </span
                        >300,000
                      </strong>
                    </div>
                  </div>

                  <div
                    style="min-height: 178px; overflow: auto; margin-top: 23px"
                  >
                    <b-table
                      :fields="fieldsPCD"
                      :items="tablePCD"
                      bordered
                      responsive
                      show-empty
                      head-variant="light"
                    >
                      <template #cell(actions)="row">
                        <div class="text-center">
                          <i
                            class="fas fa-trash-alt text-danger mr-2"
                            @click="removePCD(row.item)"
                          ></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-data") }}
                        </div>
                      </template>
                      <template #emptyfiltered>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-result") }}
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
                <b-col lg="12">
                  <div class="mb-1 d-flex justify-content-between">
                    <div>
                      <strong> THÔNG TIN PHÍ PHÁT SINH</strong>
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
                        @click="showModalPPS"
                      >
                        <i class="fas fa-plus"></i> <b>Thêm</b>
                      </b-button>
                    </div>
                    <div class="text-right pt-1">
                      <strong
                        ><span class="text-muted">Tổng cộng : </span>100,000
                      </strong>
                    </div>
                  </div>
                  <div
                    style="min-height: 175px; overflow: auto; margin-top: 23px"
                  >
                    <b-table
                      :fields="fieldsPPS"
                      :items="tablePPS"
                      bordered
                      responsive
                      show-empty
                      head-variant="light"
                    >
                      <template #cell(Status)="row">
                        <div :style="`color:${row.item.StatusColor}`">
                          {{ row.item.Status }}
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-data") }}
                        </div>
                      </template>
                      <template #emptyfiltered>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-result") }}
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
                <b-col lg="12">
                  <div class="mb-1 d-flex justify-content-between">
                    <div>
                      <strong> DOANH THU PHÁT SINH</strong>
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
                        @click="showModalPPS"
                      >
                        <i class="fas fa-plus"></i> <b>Thêm</b>
                      </b-button>
                    </div>
                    <div class="text-right pt-1">
                      <strong
                        ><span class="text-muted">Tổng cộng : </span>100,000
                      </strong>
                    </div>
                  </div>
                  <div>
                    <b-table
                      :fields="fieldsPPS"
                      :items="tableDTPS"
                      bordered
                      responsive
                      show-empty
                      head-variant="light"
                    >
                      <template #cell(Status)="row">
                        <div :style="`color:${row.item.StatusColor}`">
                          {{ row.item.Status }}
                        </div>
                      </template>
                      <template #empty>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-data") }}
                        </div>
                      </template>
                      <template #emptyfiltered>
                        <div class="text-left font-italic text-muted">
                          {{ $t("data.non-result") }}
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLCustom>
    <b-modal id="modal-pcd" centered size="md" @ok="handleAddPCD" title="THÊM">
      <div class="mt-2">
        <b-col lg="12">
          <b-form-group label="Trạm thu phí" class="has-float-label mb-4">
            <v-select
              v-model="formCustom.TramThuPhi"
              :options="['Trạm Quốc Lộ 1A', 'Trạm An Sương', 'Trạm Long An']"
            ></v-select>
            <!-- <b-form-input v-model="formCustom.TramThuPhi"></b-form-input> -->
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Số tiền" class="has-float-label mt-2 mb-4">
            <b-form-input v-model.number="formCustom.SoTien"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group>
            <b-form-datepicker
              v-model="formCustom.createDate"
              locale="vi"
              placeholder="DD/MM/YYYY"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </div>
    </b-modal>
    <b-modal id="modal-pps" centered size="md" @ok="handleAddPPS" title="THÊM">
      <div class="mt-2">
        <b-row>
          <b-col lg="6">
            <b-form-group label="Mục phí">
              <v-select
                v-model="formCustom.Name"
                label="Name"
                :options="['Bốc xếp', 'Bảo kê', 'Thủ kho']"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Số tiền đề xuất">
              <b-form-input v-model="formCustom.Money"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group :label="'Hình ảnh đính kèm (Nếu có)'">
              <b-form-file
                :placeholder="'Xin mời chọn...'"
                v-model="formCustom.img"
                multiple
                accept="/*"
                :browse-text="'Chọn Tệp'"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Nội dung">
              <b-form-textarea
                rows="2"
                max-rows="6"
                v-model="formCustom.NDPD"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-modal id="modal-pck" centered size="md" @ok="handleAddPCK" title="THÊM">
      <b-col lg="12">
        <b-form-group label="Tên phụ cấp" class="has-float-label mb-4">
          <v-select
            v-model="formCustom.TenPhuCap"
            :options="['Hàng lẻ', 'Chuyến ghép']"
          ></v-select>
        </b-form-group>
      </b-col>
      <b-col lg="12">
        <b-form-group label="Số tiền" class="has-float-label mt-2 mb-4">
          <b-form-input v-model="formCustom.SoTien"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="12">
        <b-form-group label="Ghi chú" class="has-float-label mt-2 mb-4">
          <b-form-textarea v-model="formCustom.GhiChu"></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-modal>
    <b-modal id="modal-pnh" centered size="md" @ok="handleAddPNH" title="THÊM">
      <div class="mt-2">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Loại phí" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.LoaiPhi"
                :options="[
                  'Phí nâng hạ',
                  'Phí vệ sinh',
                  'Phí cược cont',
                  'Phí đậu bãi',
                  'Phí nâng cont quá hạn',
                ]"
              ></v-select>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Cảng/Depot" class="has-float-label mb-4">
              <v-select
                v-model="formCustom.Depot"
                :options="[
                  'Cảng Cát Lái, Đồng Nai',
                  'Cảng Vũng tàu, Bà Rịa',
                  'Cảng Đức Hòa, Long An',
                ]"
              ></v-select>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group
              label="Ký hiệu/Số hóa đơn"
              class="has-float-label mb-4"
            >
              <b-form-input v-model="formCustom.ID"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="12">
            <b-form-group label="Nhập số tiền" class="has-float-label mb-4">
              <b-form-input v-model="formCustom.SoTien"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group>
              <b-form-file
                :placeholder="'Xin mời chọn...'"
                v-model="formCustom.img"
                accept="/*"
                :browse-text="'Chọn'"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Ghi chú" class="has-float-label mt-2 mb-4">
              <b-form-textarea
                v-model.number="formCustom.GhiChu"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import FormBasicNPLCustom from "./component/FormBasicNPLCustom.vue";
export default {
  components: {
    FormBasicNPLCustom,
    "v-select": vSelect,
  },
  data() {
    return {
      selectedItems: [],
      formCustom: {},
      fieldsForm: [],
      fDonHang: [
        {
          key: "ID",
          label: "Đơn hàng",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "createDate",
          label: "Ngày",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "LoaiHang",
          label: "Loại hàng",
        },
        {
          key: "MatHang",
          label: "Mặt hàng",
        },
        {
          key: "DonVi",
          label: "Đơn vị tính",
        },
        {
          key: "GiaVanChuyen",
          label: "Giá vận chuyển",
          tdClass: "text-right",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "TrongLuong",
          label: "Trọng lượng",
          tdClass: "text-right",
        },
        {
          key: "SoCont",
          label: "Số cont",
          tdClass: "text-right",
        },
        {
          key: "SoSeal",
          label: "Số seal",
          tdClass: "text-right",
        },
        {
          key: "actions",
          label: "Thao tác",
          tdClass: "text-center",
        },
      ],
      aDonHang: [
        {
          ID: "DH001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "2 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "1,000,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "2Cuộn (10tấn)",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
          LoaiHang: "Cont nhập",
          SoLuong: "2 Cuộn",
          TrongLuong: "10 tấn",
          MatHang: "Thép",
          DonVi: "Tấn",
          CuocCont: "500,000",
        },
        {
          ID: "DH002",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-LA (Cát Lái - Long An)",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "500,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "2,000,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: false,
          SLVT: "3Cuộn (20tấn)",
          SoCont: "AF1932GG2",
          SoSeal: "C20123412",
          LoaiHang: "Cont xuất",
          SoLuong: "3 Cuộn",
          TrongLuong: "20 tấn",
          MatHang: "Thép",
          DonVi: "Tấn",
          CuocCont: "500,000",
        },
      ],
      fieldsTable: [
        {
          key: "createDate",
          label: "Ngày",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
        {
          key: "ChungTuGoc",
          label: "CTG",
          tdClass: "text-center",
        },
        {
          key: "LoaiHang",
          label: "Loại hàng",
        },
        {
          key: "MatHang",
          label: "Mặt hàng",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
        },
        {
          key: "TrongLuong",
          label: "Trọng lượng",
        },
        {
          key: "BSX",
          label: "Số xe",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "PhiCauDuong",
          label: "Vé cầu đường",
          tdClass: "text-right",
        },
        {
          key: "LuongTaiXe",
          label: "Lương TX",
        },
        {
          key: "PhiKhoan",
          label: "Phí khoán",
          tdClass: "text-right",
        },
        {
          key: "PhiKhac",
          label: "Phí khác",
          tdClass: "text-right",
        },
        {
          key: "SoCont",
          label: "Số cont",
          tdClass: "text-right",
        },
        {
          key: "CuocCont",
          label: "Cược cont",
          tdClass: "text-right",
        },
        {
          key: "PhiDO",
          label: "Phí DO",
          tdClass: "text-right",
        },
        {
          key: "PhiNangHa",
          label: "Phí nâng hạ",
          tdClass: "text-right",
        },
        {
          key: "PhuCap",
          label: "PC Cơm",
          tdClass: "text-right",
        },
        {
          key: "PCL",
          label: "PC Cẩu",
          tdClass: "text-right",
        },
        {
          key: "PCPB",
          label: "PC phủ bạt",
          tdClass: "text-right",
        },
        {
          key: "PCL",
          label: "PC Lơ",
          tdClass: "text-right",
        },
        {
          key: "PCQT",
          label: "PC Quá tải",
          tdClass: "text-right",
        },
        {
          key: "PCCG",
          label: "PC trên 35chuyến",
          tdClass: "text-right",
        },
        {
          key: "PCHL",
          label: "PC hàng lẻ",
          tdClass: "text-right",
        },
        {
          key: "PCK",
          label: "PC Khác",
          tdClass: "text-right",
        },
        //
        // {
        //   key: "MaVD",
        //   label: "Mã VD",
        // },

        // {
        //   key: "DonHang",
        //   label: "Đơn hàng",
        // },
        // {
        //   key: "DVT",
        //   label: "Đơn vị",
        // },
        // {
        //   key: "GiaVanChuyen",
        //   label: "Giá vận chuyển",
        //   tdClass: "text-right",
        // },

        // {
        //   key: "SoSeal",
        //   label: "Số seal",
        //   tdClass: "text-right",
        // },
        // {
        //   key: "Depot",
        //   label: "Cảng/Depot",
        // },
        // {
        //   key: "PhiPhatSinh",
        //   label: "Phí (PS)",
        //   tdClass: "text-right",
        // },
        // {
        //   key: "DTPS",
        //   label: "DTPS",
        //   tdClass: "text-right",
        // },
      ],
      dataTable: [
        {
          ID: "CT/22/001",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "11/12/2022",
          SoLuongXe: "2 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
          SoLuong: "2cuộn",
          TrongLuong: "10tấn",
          DonHang: "DH001",
          MatHang: "Thép",
          DVT: "Tấn",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
          Depot: "Tân thuận",
          PCPB: "100,000",
          PCL: "100,000",
          PCQT: "100,000",
          PCCG: "100,000",
          PCHL: "100,000",
          LoaiHang: "Cont nhập",
          note: "...",
          CuocCont: "500,000",
          PhiDO: "100,000",
          PCK: "50,000",
        },
        {
          ID: "CT/22/002",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-LA (Cát Lái - Long An)",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "500,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: false,
          SLVT: "5Cuộn (30tấn)",
          SoLuong: "2cuộn",
          TrongLuong: "10tấn",
          DonHang: "DH001",
          MatHang: "Thép",
          DVT: "Tấn",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
          Depot: "Tân thuận",
          PCPB: "100,000",
          PCL: "100,000",
          PCQT: "100,000",
          PCCG: "100,000",
          PCHL: "100,000",
          LoaiHang: "Cont xuất",
          note: "...",
          CuocCont: "500,000",
          PhiDO: "100,000",
          PCK: "50,000",
        },
        {
          ID: "CT/22/003",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty C",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          BSX: "59P1-12345",
          createDate: "11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "2 xe",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421398",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-SG (Cát Lái - Sài Gòn)",
          SoPhieuChi: "SP12347",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "400,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/003",
          MaVD: "VD/22/003",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          SoLuot: "2",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
          statusName: "Chờ khóa",
          statusColor: "orange",
          GiaVanChuyen: "500,000",
          PhiCauDuong: "100,000",
          PhiNangHa: "100,000",
          PhiPhatSinh: "50,000",
          DTPS: "300,000",
          PhiKhoan: "100,000",
          PhiKhac: "50,000",
          LuongTaiXe: "10,000,000",
          PhuCap: "500,000",
          ChungTuGoc: true,
          SLVT: "5Cuộn (30tấn)",
          SoLuong: "2cuộn",
          TrongLuong: "10tấn",
          DonHang: "DH001",
          MatHang: "Thép",
          DVT: "Tấn",
          SoCont: "AF19323FG",
          SoSeal: "C20123412",
          Depot: "Tân thuận",
          PCPB: "100,000",
          PCL: "100,000",
          PCQT: "100,000",
          PCCG: "100,000",
          PCHL: "100,000",
          LoaiHang: "Cont nhập",
          note: "...",
          CuocCont: "500,000",
          PhiDO: "100,000",
          PCK: "50,000",
        },
      ],
      //PHÍ CẦU ĐƯỜNG
      fieldsPCD: [
        {
          key: "TramThuPhi",
          label: "Trạm thu phí",
        },
        {
          key: "LoaiVe",
          label: "Loại vé",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "createDate",
          label: "Thời gian",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      tablePCD: [
        {
          //   ID: "CT/22/001",
          ID: "59P1-12347",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "10:30 11/12/2022",
          SoLuongXe: "20 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          GhiChu: "...",
          SoTien: "300,000",
          statusName: "Chờ khóa",
          statusColor: "orange",
          LoaiVe: "Vé tay",
        },
        {
          //   ID: "CT/22/002",
          ID: "59P1-12346",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11:30 11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "15 xe",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-LA (Cát Lái - Long An)",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "500,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          GhiChu: "...",
          SoTien: "300,000",
          statusName: "Đã khóa",
          statusColor: "red",
          LoaiVe: "Vé ETC",
        },
      ],
      //PHÍ PHÁT SINH
      fieldsPPS: [
        {
          key: "Name",
          label: "Mục phí",
        },
        {
          key: "Money",
          label: "Số tiền đề xuất",
          tdClass: "text-right",
        },
        {
          key: "STPD",
          label: "Số tiền phê duyệt",
          tdClass: "text-right",
        },
        {
          key: "NDPD",
          label: "Nội dung phê duyệt",
          tdClass: "text-left",
        },
        {
          key: "TGPD",
          label: "Thời gian phê duyệt",
          tdClass: "text-left",
        },
        {
          key: "Status",
          label: "Trạng thái",
          tdClass: "text-center",
        },
      ],
      tablePPS: [
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
      tableDTPS: [
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
      //PHÍ NÂNG HẠ
      fieldsPNH: [
        {
          key: "LoaiPhi",
          label: "Loại phí",
        },
        {
          key: "Depot",
          label: "Cảng/Depot",
        },
        {
          key: "ID",
          label: "Ký hiệu & Số hóa đơn",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "img",
          label: "Ảnh hóa đơn",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      tablePNH: [
        {
          ID: "TC18P-000123",
          Depot: "Depot Tân Thuận",
          SoTien: "500,000",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
          LoaiPhi: "Phí nâng hạ",
        },
        {
          ID: "TC18P-000456",
          Depot: "Depot Tân Thuận",
          SoTien: "200,000",
          GhiChu: "...",
          img: "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg",
          LoaiPhi: "Phí vệ sinh",
        },
      ],
      //PHỤ CẤP KHÁC
      fieldsPCK: [
        {
          key: "TenPhuCap",
          label: "Tên phụ cấp",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      tablePCK: [
        {
          //   ID: "CT/22/001",
          TenPhuCap: "Thưởng sinh nhật",
          ID: "59P1-12347",
          TramThuPhi: "Quốc lộ 1A, Nguyễn văn trỗi, Bình tân",
          KhachHang: "Công ty A",
          BSX: "59P1-12347",
          createDate: "10:30 11/12/2022",
          SoLuongXe: "20 xe",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          PhiNang: "300,000",
          HinhThucChi: "Chuyển khoản",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "SG-LA (Sài gòn - Long an)",
          SoPhieuChi: "SP12345",
          SoTienDaChi: "300,000",
          PhiThang: "700,000",
          TongTien: "600,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/001",
          MaVD: "VD/22/001",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          GhiChu: "...",
          SoTien: "300,000",
          statusName: "Chờ khóa",
          statusColor: "orange",
        },
        {
          TenPhuCap: "Thưởng hiệu suất",
          //   ID: "CT/22/002",
          ID: "59P1-12346",
          TramThuPhi: "Hưng lộ 2, Tân phú, Tân Bình, HCM",
          KhachHang: "Công ty B",
          BSX: "59P1-12346",
          createDate: "11:30 11/12/2022",
          TuNgay: "12/01/2022",
          DenNgay: "12/30/2022",
          SoLuongXe: "15 xe",
          LayCont: "20 Cát Lái, Đồng Nai",
          PhiHa: "100,000",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          PhiNang: "300,000",
          HinhThucChi: "Tiền mặt",
          HaCont: "Debot Tân Thuận, 12 Tân Thuận, HCM",
          TuyenDuong: "CL-LA (Cát Lái - Long An)",
          SoPhieuChi: "SP12346",
          SoTienDaChi: "300,000",
          PhiThang: "500,000",
          TongTien: "500,000",
          TongTienPC: "600,000",
          MaCT: "CT/22/002",
          MaVD: "VD/22/002",
          NgayCT: "11/12/2022",
          SoLuongVD: "2",
          GhiChu: "...",
          SoTien: "300,000",
          statusName: "Đã khóa",
          statusColor: "red",
        },
      ],
    };
  },
  methods: {
    handleSelect(items) {
      this.selectedItems = items;
    },
    //PHÍ CẦU ĐƯỜNG
    showModalAddPCD() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-pcd");
      }, 500);
    },
    handleAddPCD() {
      if (this.formCustom) {
        this.tablePCD.push(this.formCustom);
        setTimeout(() => {
          this.formCustom = {};
        }, 500);
      }
    },
    removePCD(row) {
      this.tablePCD = this.tablePCD.filter((r) => r.ID != row.ID);
    },
    //PHỤ CẤP KHÁC
    showModalAddPCK() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-pck");
      }, 500);
    },
    handleAddPCK() {
      if (this.formCustom) {
        this.formCustom.ID = moment(new Date()).format("ID/ss");
        this.tablePCK.push(this.formCustom);
        setTimeout(() => {
          this.formCustom = {};
        }, 500);
      }
    },
    removePCK(row) {
      this.tablePCK = this.tablePCK.filter((r) => r.ID != row.ID);
    },
    //PHÍ NÂNG HẠ
    showModalAddPNH() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-pnh");
      }, 500);
    },
    handleAddPNH() {
      if (this.formCustom) {
        this.formCustom.img =
          "https://thaison.vn/FileUpload/ArticleMaterials/Giai-phap-in-logo-cong-ty-anh-nen-mau-len-hoa-don-tu-in.jpg";
        this.tablePNH.push(this.formCustom);
        setTimeout(() => {
          this.formCustom = {};
        }, 500);
      }
    },
    removePNH(row) {
      this.tablePNH = this.tablePNH.filter((r) => r.ID != row.ID);
    },
    // PHÍ PHÁT SINH
    handleAddPPS() {
      if (this.formCustom) {
        this.formCustom.ID = moment(new Date()).format("ID/ss");
        this.formCustom.STPD = "0";
        this.formCustom.TGPD = "20:00 20/11/2022";
        this.formCustom.Status = "Chờ duyệt";
        this.formCustom.StatusColor = "orange";
        this.tablePPS.push(this.formCustom);
        setTimeout(() => {
          this.formCustom = {};
        }, 500);
      }
    },
    removePPS(row) {
      this.tablePPS = this.tablePPS.filter((r) => r.ID != row.ID);
    },
    showModalPPS() {
      this.formCustom = {};
      setTimeout(() => {
        this.$bvModal.show("modal-pps");
      }, 500);
    },
    //DANH THU PHÁT SINH
    //================
    convertDate(key) {
      this.$refs.refFormBasicNPLCustom.convertDate(key);
    },
  },
};
</script>
<style>
.npl-phi-nang-ha .table th {
  white-space: nowrap;
}
</style>