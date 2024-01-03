<template>
  <div class="box-modal">
    <div class="box-card">
      <div>
        <div>
          <strong>ĐƠN HÀNG ĐIỀU ĐỘ</strong>
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
            @click="showModalDonHang"
          >
            <i class="fas fa-plus"></i> <b>Thêm </b>
          </b-button>
        </div>
        <div class="mb-2">
          <b-table
            show-empty
            bordered
            responsive
            head-variant="light"
            :fields="fieldsTable"
            :items="propsDonHang"
          >
            <template #cell(TrinhTrang)="row">
              <Status
                :color="row.item[`TrinhTrangColor`]"
                :label="row.item[`TrinhTrang`]"
                :showCircle="false"
              ></Status>
            </template>
            <template #cell(actions)="row">
              <div class="text-center" style="cursor: pointer">
                <i
                  class="fas fa-trash-alt text-danger mr-2"
                  @click="remove(row.item)"
                ></i>
                <!-- <i
                  class="fas fa-edit text-warning"
                  @click="handleEdit(row.item)"
                ></i> -->
              </div>
            </template>
          </b-table>
        </div>
      </div>
      <div class="box-chonxe">
        <div class="mb-1">
          <strong>CHỌN XE DỰ KIẾN</strong>
        </div>
        <b-row>
          <b-col lg="6" style="height: 600px; overflow: auto">
            <b-row>
              <b-col lg="12">
                <b-row>
                  <b-col :sm="3">
                    <b-form-input
                      class="mb-2"
                      @click.prevent.stop="showModalBienSoXe"
                      :value="'AUTO'"
                      disabled
                      style="width: 88px"
                    ></b-form-input>
                  </b-col>
                  <b-col lg="9">
                    <div class="d-flex justify-content-between">
                      <b-form-checkbox>Quá tải ?</b-form-checkbox>
                      <b-form-checkbox>Cặp cổ ?</b-form-checkbox>
                      <b-form-checkbox>Ghép trước sau ?</b-form-checkbox>
                      <b-form-checkbox>Ghép đơn ?</b-form-checkbox>
                    </div>
                  </b-col>
                  <b-col :sm="6">
                    <b-input-group
                      prepend="Chọn xe"
                      class="t-input-group mb-3"
                      @click.prevent.stop="showModalBienSoXe"
                    >
                      <b-form-input
                        v-model="dataForm['BSX']"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col :sm="6">
                    <b-input-group
                      prepend="Tài xế "
                      class="t-input-group mb-3"
                      @click.prevent.stop="showModalTaiXe"
                    >
                      <b-form-input
                        :value="dataForm['TaiXe']"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
                <div>
                  <strong
                    ><i class="fas fa-arrow-alt-up mr-1"></i>Cẩu hàng lên
                  </strong>
                </div>
                <b-row>
                  <b-col :sm="6">
                    <div class="d-flex mb-2">
                      <div
                        class="p-2"
                        style="
                          border: 0.5px solid #d7d7d7;
                          white-space: nowrap;
                          width: 100px;
                        "
                      >
                        Cẩu hàng
                      </div>
                      <v-select
                        @input="handleSelect(dataForm['CauHang'])"
                        style="width: 100%"
                        v-model="dataForm['CauHang']"
                        :options="[
                          'Không Cẩu',
                          'Tự Cẩu',
                          'Thuê Cẩu',
                          'Cẩu giúp',
                        ]"
                      />
                    </div>
                  </b-col>
                  <b-col lg="6">
                    <div class="d-flex mb-2">
                      <div
                        class="p-2"
                        style="
                          border: 0.5px solid #d7d7d7;
                          white-space: nowrap;
                          width: 100px;
                        "
                      >
                        Xe cẩu
                      </div>
                      <b-form-input
                        :disabled="isCau"
                        v-model="dataForm['DonViCau']"
                        @click.prevent.stop="showModalBienSoXe"
                      />
                    </div>
                  </b-col>
                </b-row>
                <div>
                  <strong
                    ><i class="fas fa-arrow-alt-down mr-1"></i>Cẩu hàng xuống
                  </strong>
                </div>
                <b-row class="mb-2">
                  <b-col :sm="6">
                    <div class="d-flex mb-2">
                      <div
                        class="p-2"
                        style="
                          border: 0.5px solid #d7d7d7;
                          white-space: nowrap;
                          width: 100px;
                        "
                      >
                        Cẩu hàng
                      </div>
                      <v-select
                        @input="handleSelect(dataForm['CauHang'])"
                        style="width: 100%"
                        v-model="dataForm['CauHang']"
                        :options="[
                          'Không Cẩu',
                          'Tự Cẩu',
                          'Thuê Cẩu',
                          'Cẩu giúp',
                        ]"
                      />
                    </div>
                  </b-col>
                  <b-col lg="6">
                    <div class="d-flex mb-2">
                      <div
                        class="p-2"
                        style="
                          border: 0.5px solid #d7d7d7;
                          white-space: nowrap;
                          width: 100px;
                        "
                      >
                        Xe cẩu
                      </div>
                      <b-form-input
                        :disabled="isCau"
                        v-model="dataForm['DonViCau']"
                        @click.prevent.stop="showModalBienSoXe"
                      />
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <div class="detail">
              <b-row>
                <b-col class="text-center">
                  <div style="font-size: 14px" class="pt-2">
                    <strong> KẾ HOẠCH LẤY VÀ GIAO HÀNG </strong>
                  </div>
                </b-col>
                <b-col lg="4" class="pr-0">
                  <b-form-group
                    label="Chọn đơn hàng"
                    class="has-float-label mb-4"
                  >
                    <v-select
                      label="Name"
                      v-model="selectedTypeDetailAdd"
                      :options="optionsDetail"
                    >
                    </v-select>
                  </b-form-group>
                </b-col>
                <b-col lg="2">
                  <b-button
                    class="ml-1 mb-1 pl-2"
                    squared
                    :variant="`outline-primary`"
                    size="sm"
                    style="
                      height: 35px;
                      padding: 1px;
                      padding-left: 2px;
                      padding-right: 3px;
                    "
                    @click="addDetailDonHang"
                  >
                    <i class="fas fa-plus"></i> <b>Thêm</b>
                  </b-button>
                </b-col>
              </b-row>
              <template v-if="dataForm.Detail && dataForm.Detail.length > 0">
                <template v-for="(dh, i) in dataForm.Detail">
                  <b-row :key="'t' + i">
                    <b-col lg="12" class="bg-light">
                      <div class="position-relative">
                        <div class="pt-1" style="padding-left: 2px">
                          <strong>
                            <i class="fas fa-map-marker-alt"></i>
                            {{
                              dh.type.toUpperCase() == "HR"
                                ? "DH001"
                                : dh.type.toUpperCase() == "CN"
                                ? "DH002"
                                : "DH003"
                            }}
                            - ĐIỂM {{ i + 1 }}
                          </strong>
                        </div>
                        <div>
                          <b-button
                            :key="'btn-' + i"
                            class="ml-1 mb-1"
                            squared
                            :variant="`danger`"
                            size="sm"
                            style="
                              height: 24px;
                              padding: 1px;
                              padding-left: 3px;
                              padding-right: 3px;
                              position: absolute;
                              top: 0px;
                              right: 0px;
                              z-index: 1;
                            "
                            @click="removeByIndex(i)"
                          >
                            <i class="far fa-trash-alt"></i> <b>Xóa</b>
                          </b-button>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <hr :key="'hr' + i" class="m-0 p-0" />
                  <div
                    :key="i"
                    v-if="dh.type.toUpperCase() == 'HR'"
                    class="mb-3"
                  >
                    <b-row :key="i" class="bg-light pt-2 mb-2">
                      <b-col lg="12">
                        <div class="text-info">
                          <strong
                            ><i class="fas fa-truck-loading mr-1"></i>ĐIỂM LẤY
                            HÀNG</strong
                          >
                        </div>
                        <b-row class="mt-2">
                          <b-col lg="8">
                            <b-form-group
                              label="Lấy hàng"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.LayHang"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-11-12T08:30"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group
                          label="Mặt hàng"
                          class="has-float-label mb-4"
                        >
                          <div>
                            <b-form-input
                              v-model="dh.MatHangLay"
                              class="text-left"
                              disabled
                            ></b-form-input>
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group
                          label="Số lượng"
                          class="has-float-label mb-4"
                        >
                          <div class="d-flex">
                            <b-form-input
                              style="width: 60%"
                              v-model="dh.SoLuongLay"
                              class="text-right"
                            ></b-form-input>
                            <b-form-input
                              style="width: 40%"
                              :value="'Cuộn'"
                              class="text-center"
                              disabled
                            ></b-form-input>
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group
                          label="Trọng lượng"
                          class="has-float-label mb-4"
                        >
                          <div class="d-flex">
                            <b-form-input
                              style="width: 60%"
                              v-model="dh.TrongLuongLay"
                              class="text-right"
                            ></b-form-input>
                            <b-form-input
                              style="width: 40%"
                              :value="'Tấn'"
                              class="text-center"
                              disabled
                            ></b-form-input>
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <div class="text-success">
                          <strong>
                            <i class="fas fa-box-check mr-1"></i>
                            ĐIỂM GIAO HÀNG</strong
                          >
                        </div>
                        <b-row class="mt-2">
                          <b-col lg="8">
                            <b-form-group
                              label="Giao hàng"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.GiaoHang"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-11-12T09:00"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </div>
                  <div
                    :key="i"
                    v-else-if="dh.type.toUpperCase() == 'CN'"
                    class="mb-3"
                  >
                    <b-row
                      :key="i"
                      class="bg-light pt-2 mb-2 position-relative mb-4"
                    >
                      <b-col lg="12">
                        <div class="text-info mb-2">
                          <strong
                            ><i class="fas fa-truck-loading mr-1"></i>ĐIỂM LẤY
                            CONT</strong
                          >
                        </div>
                        <b-row>
                          <b-col lg="8">
                            <b-form-group
                              label="Lấy hàng"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.LayHang"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự Kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-11-12T06:00"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="12">
                        <div class="mb-2 d-flex">
                          <strong
                            ><i class="fas fa-file-alt mr-1"></i>LẤY CONT
                          </strong>
                        </div>
                        <b-row>
                          <b-col lg="6">
                            <b-form-group
                              label="Cont1"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh['Cont1']"
                                :options="[
                                  'MC00122',
                                  'MC00123',
                                  'MC00124',
                                  'MC00125',
                                  'MC00126',
                                  'MC00127',
                                ]"
                              />
                            </b-form-group>
                          </b-col>
                          <b-col lg="6">
                            <b-form-group
                              label="Cont2"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh['Cont2']"
                                :options="[
                                  'MC00122',
                                  'MC00123',
                                  'MC00124',
                                  'MC00125',
                                  'MC00126',
                                  'MC00127',
                                ]"
                              />
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="12">
                        <div class="text-success mb-2">
                          <strong>
                            <i class="fas fa-box-check mr-1"></i>
                            ĐIỂM GIAO HÀNG</strong
                          >
                        </div>
                        <b-row>
                          <b-col lg="8">
                            <b-form-group
                              label="Giao hàng"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.GiaoHang"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-12-12T18:00"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="12">
                        <div style="color: #9b59b6" class="mb-2">
                          <strong>
                            <i class="fas fa-arrow-alt-to-bottom mr-1"> </i>
                            ĐIỂM HẠ RỖNG</strong
                          >
                        </div>
                        <b-row>
                          <b-col lg="8">
                            <b-form-group
                              label="Hạ Rỗng"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.HaRong"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-12-12T20:00"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </div>
                  <div
                    :key="i"
                    v-else-if="dh.type.toUpperCase() == 'CX'"
                    class="mb-3"
                  >
                    <b-row
                      :key="i"
                      class="bg-light pt-2 mb-2 position-relative mb-4"
                    >
                      <b-col lg="12">
                        <div class="text-info mb-2">
                          <strong
                            ><i class="fas fa-truck-loading mr-1"></i>ĐIỂM
                            (CẢNG) LẤY RỖNG</strong
                          >
                        </div>
                        <b-row>
                          <b-col lg="8">
                            <b-form-group
                              label="Địa chỉ"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.LayHang"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-11-12T14:12"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="8">
                        <div
                          class="d-flex text-center mb-2"
                          style="margin-top: -10px"
                        >
                          <div class="mr-3" style="font-weight: 600">
                            Lấy cont
                          </div>
                          <b-form-radio
                            :name="`cont${i}`"
                            class="mr-3"
                            style="margin-top: -2px"
                            >Cont 20</b-form-radio
                          >
                          <b-form-radio
                            :name="`cont${i}`"
                            style="margin-top: -2px"
                            >Cont 40</b-form-radio
                          >
                        </div>
                      </b-col>
                      <b-col lg="4">
                        <div style="margin-top: -10px">
                          <b-form-group
                            label="Số Lượng"
                            class="has-float-label mb-4"
                          >
                            <b-form-input
                              class="text-right"
                              v-model="dh.SoLuongLay"
                            ></b-form-input>
                          </b-form-group>
                        </div>
                      </b-col>

                      <b-col lg="12">
                        <div class="text-success mb-2">
                          <strong>
                            <i class="fas fa-box-check mr-1"></i>
                            ĐIỂM ĐÓNG HẠ</strong
                          >
                        </div>
                        <b-row>
                          <b-col lg="8">
                            <b-form-group
                              label="Địa chỉ"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.GiaoHang"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Dự kiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-11-12T18:00"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col lg="12">
                        <div style="color: #9b59b6" class="mb-2">
                          <strong>
                            <i class="fas fa-arrow-alt-to-bottom mr-1"> </i>
                            ĐIỂM HẠ CONT</strong
                          >
                        </div>
                        <b-row>
                          <b-col lg="8">
                            <b-form-group
                              label="Địa chỉ"
                              class="has-float-label mb-4"
                            >
                              <v-select
                                v-model="dh.HaRong"
                                :options="[
                                  'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                                  'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                  'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                                ]"
                              ></v-select>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4">
                            <b-form-group
                              label="Tgian DKiến"
                              class="has-float-label mb-4"
                            >
                              <b-form-input
                                type="datetime-local"
                                value="2022-12-12T20:00"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="text-muted text-center pt-2">
                  Không tồn tại dữ liệu !
                </div>
              </template>
            </div>
          </b-col>
          <b-col lg="6">
            <b-row>
              <b-col lg="12">
                <div class="box-map">
                  <MapXeNangLuc></MapXeNangLuc>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal id="modal-biensoxe" size="lg" title="CHỌN XE" centered>
      <b-table
        select-mode="single"
        selectable
        :fields="fieldsBienSoXe"
        :items="itemsBienSoXe"
        bordered
        head-variant="light"
        @row-selected="handleSelectBienSoXe"
      ></b-table>
    </b-modal>
    <b-modal id="modal-taixe" size="lg" title="CHỌN TÀI XẾ" centered>
      <b-table
        select-mode="single"
        selectable
        :fields="fieldsTaiXe"
        :items="itemsTaiXe"
        bordered
        head-variant="light"
        @row-selected="handleSelectTaiXe"
      ></b-table>
    </b-modal>
    <b-modal
      @ok="addDonHang"
      id="modal-don-hang"
      size="xl"
      centered
      title="DANH SÁCH ĐƠN HÀNG"
    >
      <div>
        <b-table
          id="npl-table-basic-form"
          class="npl-table-basic-form"
          :fields="fieldsTable"
          :items="dataTable"
          bordered
          responsive
          show-empty
          head-variant="light"
          selectable
          :select-mode="'single'"
          @row-selected="donHangSelected"
        ></b-table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import KeHoachLayGiao from "./KeHoachLayGiao.vue";
import MapXeNangLuc from "./MapXeNangLuc.vue";
import Status from "@/components/Badges/StatusColor.vue";

export default {
  props: ["data", "type", "propsDonHang"],
  components: {
    "v-select": vSelect,
    KeHoachLayGiao,
    MapXeNangLuc,
    Status,
  },
  created() {
    if (this.propsDonHang?.length > 0) {
      let value = "HR";
      if (this.propsDonHang[0].LoaiHang.toUpperCase() == "CONT NHẬP") {
        value = "CN";
      }
      if (this.propsDonHang[0].LoaiHang.toUpperCase() == "CONT XUẤT") {
        value = "CX";
      }
      this.selectedTypeDetailAdd = {
        Value: value,
        Name: this.propsDonHang[0].ID,
      };
      this.addDetailDonHang();
    }
  },
  data() {
    return {
      idModal: null,
      selectedTypeDetailAdd: null,
      isCau: false,
      optionsDetail: [
        {
          Name: "DH001",
          Value: "HR",
        },
        {
          Name: "DH002",
          Value: "CN",
        },
        {
          Name: "DH003",
          Value: "CX",
        },
      ],
      dataForm: this.data ?? {
        ID: "VD-AUTO" + moment(new Date()).format("ss"),
        BSX: null,
        TaiXe: null,
        Detail: [],
      },
      selectedDonHangs: [],
      //modal-biensoxe
      fieldsBienSoXe: [
        {
          key: "BSX",
          label: "Biển xố xe",
        },
        {
          key: "RoMoc",
          label: "Rơ móc",
        },
        {
          key: "KhoangCachDiemNhanHang",
          label: "Khoảng cách",
        },
        {
          key: "SoDonGanDiemGiao",
          label: "Đơn gần Đ/giao",
        },
        {
          key: "TaiXe",
          label: "Tài xế",
        },
        {
          key: "NangLuc",
          label: "Năng lực",
        },
        {
          key: "ThoiGianHoatDong",
          label: "Hoạt động",
        },
        {
          key: "DoanhThu",
          label: "Doanh thu",
        },
      ],
      itemsBienSoXe: [
        {
          BSX: "51P1-12345",
          RoMoc: "Xương",
          KhoangCachDiemNhanHang: "30km",
          SoDonGanDiemGiao: 1,
          TaiXe: "Trần Văn A",
          NangLuc: "Thép, Tôn",
          ThoiGianHoatDong: "03:00",
          DoanhThu: "5,000,000",
        },
        {
          BSX: "51P1-41212",
          RoMoc: "Sàn",
          KhoangCachDiemNhanHang: "10km",
          SoDonGanDiemGiao: 0,
          TaiXe: "Trần Văn B",
          NangLuc: "Ván, Thạch cao",
          ThoiGianHoatDong: "01:00",
          DoanhThu: "6,000,000",
        },
        {
          BSX: "51P1-11202",
          RoMoc: "Xương",
          KhoangCachDiemNhanHang: "50km",
          SoDonGanDiemGiao: 1,
          TaiXe: "Trần Văn C",
          NangLuc: "Thép, Ván",
          ThoiGianHoatDong: "05:00",
          DoanhThu: "7,000,000",
        },
      ],
      //modal-taixe
      fieldsTaiXe: [
        {
          key: "TaiXe",
          label: "Tài Xế",
        },
        {
          key: "DienThoai",
          label: "Điện thoại",
        },
        {
          key: "NangLuc",
          label: "Năng lực",
        },
        {
          key: "ThoiGianHoatDong",
          label: "Tgian hoạt động",
        },
        {
          key: "DoanhThu",
          label: "Doanh thu",
        },
        {
          key: "HanGPLX",
          label: "Hạn GPLX",
        },
      ],
      itemsTaiXe: [
        {
          TaiXe: "Trần Văn A",
          DienThoai: "0961421396",
          NangLuc: "Thép, Tôn",
          ThoiGianHoatDong: "03:00",
          DoanhThu: "5,000,000",
          HanGPLX: "21/01/2025",
        },
        {
          TaiXe: "Trần Văn B",
          DienThoai: "0961421222",
          NangLuc: "Ván, Thạch cao",
          ThoiGianHoatDong: "02:00",
          DoanhThu: "3,000,000",
          HanGPLX: "21/01/2025",
        },
        {
          TaiXe: "Trần Văn C",
          DienThoai: "0961421333",
          NangLuc: "Ván, Thép",
          ThoiGianHoatDong: "03:00",
          DoanhThu: "7,000,000",
          HanGPLX: "21/01/2025",
        },
      ],
      //table - đơn hàng
      fieldsTable: [
        {
          key: "ID",
          label: "Mã đơn hàng",
        },
        {
          key: "Date",
          label: "Ngày đơn hàng",
        },
        {
          key: "Date",
          label: "Ngày đơn hàng",
        },
        {
          key: "KhachHang",
          label: "Khách hàng",
        },
        {
          key: "LoaiHang",
          label: "Loại hàng",
        },
        {
          key: "HangHoa",
          label: "Hàng hóa",
        },
        {
          key: "SoLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "TrongLuong",
          label: "Số lượng",
          tdClass: "text-right",
        },
        {
          key: "XeDuKien",
          label: "Dự kiến (xe)",
          tdClass: "text-right",
        },
        {
          key: "SoLuongXeDaDieu",
          label: "Điều độ (xe)",
          tdClass: "text-right",
        },
        {
          key: "DuKienLayHang",
          label: "Dự kiến lấy hàng",
        },
        {
          key: "TuyenDuong",
          label: "Tuyến đường",
        },
        {
          key: "TienDo",
          label: "Tiến độ",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: "Thao tác",
          tdClass: "text-center",
        },
      ],
      dataTable: [
        {
          ID: "DH001",
          Date: "20/11/2022",
          KhachHang: "Công ty A",
          LoaiHang: "Hàng rời",
          HangHoa: "Thép",
          SoLuong: "20 Cuộn",
          TrongLuong: "2 Tấn",
          XeDuKien: 15,
          SoLuongXeDaDieu: 10,
          DuKienLayHang: "20:10 22/11/2022",
          TuyenDuong: "SG-LA (Sài Gòn - Long An)",
          TienDo: "1/3 30%",
          type: "HR",
        },
        {
          ID: "DH002",
          Date: "20/11/2022",
          KhachHang: "Công ty B",
          LoaiHang: "Cont nhập",
          HangHoa: "Giấy",
          SoLuong: "30 Tấm",
          TrongLuong: "3 Tấn",
          XeDuKien: 21,
          SoLuongXeDaDieu: 12,
          DuKienLayHang: "20:10 22/11/2022",
          TuyenDuong: "AG-BT (An Giang - Ben Tree)",
          TienDo: "1/2 40%",
          type: "CN",
        },
        {
          ID: "DH003",
          Date: "20/11/2022",
          KhachHang: "Công ty C",
          LoaiHang: "Cont xuất",
          HangHoa: "Ván",
          SoLuong: "20 Tấm",
          TrongLuong: "2 Tấn",
          XeDuKien: 21,
          SoLuongXeDaDieu: 15,
          DuKienLayHang: "20:10 22/11/2022",
          TuyenDuong: "CL-SG (Cát Lái - Sài Gòn)",
          TienDo: "1/2 50%",
          type: "CX",
        },
      ],
    };
  },
  methods: {
    handleSelect(value) {
      if (value == "Cẩu giúp" || value == "Thuê Cẩu") {
        this.isCau = false;
      } else {
        this.isCau = true;
      }
    },
    remove(row) {
      this.propsDonHang = this.propsDonHang.filter((e) => e.ID != row.ID);
    },
    removeByIndex(index) {
      this.dataForm.Detail = this.dataForm.Detail.filter((e, i) => i != index);
    },
    donHangSelected(items) {
      this.selectedDonHangs = items;
    },
    addDonHang() {
      if (this.selectedDonHangs?.length > 0) {
        this.$notify("success", "THÀNH CÔNG", "Thêm thành công!");
        this.propsDonHang = [...this.propsDonHang, ...this.selectedDonHangs];
      } else {
        this.$notify("error", "THẤT BẠI", "Bạn chưa chọn dữ liệu!");
      }
    },
    addDetailDonHang() {
      if (this.selectedTypeDetailAdd) {
        this.$notify("success", "THÀNH CÔNG", "Thêm thành công!");
        let type = this.selectedTypeDetailAdd.Value;
        switch (type) {
          case "HR":
            let obj = {
              type: "HR",
              LayHang: "Cảng ABC (55 Bà Rịa,Phường 9, TP. Vũng Tàu)",
              GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
              MatHangLay: "Thép",
              MatHangGiao: "Thép",
              SoLuongLay: "1 Cuộn",
              SoLuongGiao: "1 Cuộn",
              TrongLuongLay: "10 Tấn",
              TrongLuongGiao: "10 Tấn",
            };
            this.dataForm.Detail.push(obj);
            break;
          case "CN":
            let objCN = {
              type: "CN",
              LayHang: "Cảng Vũng Tàu (55 Bà Rịa, TP. Vũng Tàu)",
              GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
              HaRong: "Cảng Cát Lái (11 Đức Hòa Thượng, Đức Hòa, Long An)",
              MatHangLay: "Thép",
              MatHangGiao: "Thép",
              SoLuongLay: 1,
              SoLuongGiao: 1,
              TrongLuongLay: 10,
              TrongLuongGiao: 10,
            };
            this.dataForm.Detail.push(objCN);
            break;
          case "CX":
            let objCX = {
              type: "CX",
              LayHang: "Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)",
              GiaoHang: "Kho DH (12 Đức Hòa Thượng, Đức Hòa, Long An)",
              HaRong: "Cảng DH (11 Đức Hòa Thượng, Đức Hòa, Long An)",
              MatHangLay: "Thép",
              MatHangGiao: "Thép",
              SoLuongLay: 1,
              SoLuongGiao: 1,
              TrongLuongLay: 10,
              TrongLuongGiao: 10,
            };
            this.dataForm.Detail.push(objCX);
            break;
        }
      } else {
        this.$notify("error", "THẤT BẠI", "Bạn chưa chọn dữ liệu!");
      }
    },
    showModalDonHang() {
      setTimeout(() => {
        this.$bvModal.show("modal-don-hang");
      }, 500);
    },
    handleSelectBienSoXe(row) {
      this.dataForm.BSX = row[0].BSX;
      this.dataForm.DonViCau = row[0].BSX;
      this.dataForm.TaiXe = row[0].TaiXe;
    },
    handleSelectTaiXe(row) {
      this.dataForm.TaiXe = row[0].TaiXe;
    },
    showModalTaiXe() {
      setTimeout(() => {
        this.$bvModal.show("modal-taixe");
      }, 500);
    },
    showModalBienSoXe() {
      setTimeout(() => {
        this.$bvModal.show("modal-biensoxe");
      }, 500);
    },
    handleActions(action) {
      switch (action.toUpperCase()) {
        case "ADD":
          this.dataForm.XeDuKien += 1;
          break;
        case "DELETE":
          this.dataForm.XeDuKien -= 1;
          break;
      }
      this.$notify("success", "THÔNG BÁO", "Xử lí thành công !.", {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>


<style scoped>
.box-modal {
  max-height: calc(100vh - 300px);
  overflow: auto;
  overflow-x: hidden;
}
</style>
<style >
.t-input-group .input-group-prepend .input-group-text {
  width: 88px;
  white-space: nowrap;
}
</style>
<style scoped>
.box-map {
  height: 600px;
  background: lightblue;
}
</style>
<style>
.v-select .vs__dropdown-toggle .vs__selected-options {
  overflow: hidden;
}
</style>