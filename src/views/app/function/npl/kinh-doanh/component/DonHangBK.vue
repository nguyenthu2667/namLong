<template>
  <div class="form-basic">
    <ActionsHeaderNPL
      @first-index="updateFirstIndex"
      @pre-index="updatePreIndex"
      @next-index="updateNextIndex"
      @last-index="updateLastIndex"
      :currentIndex="currentIndex"
      :isAdd="isAdd"
      :isEdit="isEdit"
      :isDelete="isDelete"
      @change-actions="handleChangeActions"
    ></ActionsHeaderNPL>
    <b-tabs v-model="currentTab" nav-class="d-none">
      <b-tab
        ><div class="box-content mt-2 custom-box-tab1">
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
            :current-page="currentPage"
            :per-page="perPage"
            @row-dblclicked="handleDbClick"
          >
            <template v-slot:cell(tiepNhanDon)="row">
              <div>
                <Status
                  :color="row.item.tiepNhanDonColor"
                  :label="row.item.tiepNhanDon"
                  :showCircle="false"
                ></Status>
              </div>
            </template>
            <template v-slot:cell(trangThaiVanDon)="row">
              <div>
                <Status
                  :color="row.item.trangThaiVanDonColor"
                  :label="row.item.trangThaiVanDon"
                  :showCircle="false"
                ></Status>
              </div>
            </template>
            <template v-slot:cell(banGiaoCT)="row">
              <div>
                <Status
                  :color="row.item.banGiaoCTColor"
                  :label="row.item.banGiaoCT"
                  :showCircle="false"
                ></Status>
              </div>
            </template>
            <template v-slot:cell(chungTuGoc)="row">
              <div>
                <Status
                  :color="row.item.chungTuGocColor"
                  :label="row.item.chungTuGoc"
                  :showCircle="false"
                ></Status>
              </div>
            </template>
            <template v-slot:cell(turnover)="row">
              <div>
                {{ convertMoneyVN(row.item.turnover).split(".")[0] }}
              </div>
            </template>
          </b-table>
          <b-pagination
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
      </b-tab>
      <b-tab>
        <div
          v-if="currentTitle"
          style="font-size: 16px; background: #d7d7d7; color: #005aab"
          class="mb-2 text-center pt-1"
        >
          <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
          <b-dropdown
            class="title-dropdown"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
          >
            <template v-for="(title, key) in titleOption">
              <b-dropdown-item @click="changeTitle(title)" :key="key" href="#"
                >{{ title.label }}
              </b-dropdown-item>
            </template>
          </b-dropdown>
          <hr class="m-0" />
        </div>
        <div class="box-content">
          <b-row>
            <b-col lg="9">
              <b-row v-if="typeFormHeader && typeFormHeader.length > 0">
                <template v-for="(value, i) in typeFormHeader">
                  <template
                    v-if="value.type && value.type.toUpperCase() == 'DATE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <datepicker
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Chọn ngày'"
                          v-model="dataForm[value.key]"
                          @input="convertDate(value.key)"
                          :disabled="isEdit || isAdd ? false : true"
                        ></datepicker>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      (value.type && value.type.toUpperCase() == 'NUMBER') ||
                      (value.type && value.type.toUpperCase() == 'MONEY')
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group
                        :label="value.label"
                        v-show="
                          currentTitle.toUpperCase() == 'HÀNG RỜI' ||
                          currentTitle.toUpperCase() == 'CONT XUẤT'
                        "
                      >
                        <b-form-input
                          v-model.number="dataForm[value.key]"
                          type="number"
                          :disabled="isEdit || isAdd ? false : true"
                          class="text-right"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        :label="'Cont kiểm hóa'"
                        v-show="currentTitle.toUpperCase() == 'CONT NHẬP'"
                      >
                        <v-select
                          :options="[
                            'Chi cục Long An',
                            'Chi cục HCM',
                            'Chi cục An Giang',
                          ]"
                        ></v-select>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'SELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <v-select
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                          @option:selected="handleSelect"
                        />
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'MULTISELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <v-select
                          multiple
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'TABLE'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-table
                          id="npl-table-chil"
                          class="npl-table-chil"
                          :fields="fieldsByKey[value.key]"
                          :items="dataByKey[value.key]"
                          bordered
                          responsive
                          show-empty
                          head-variant="light"
                        ></b-table>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="value.type && value.type.toUpperCase() == 'NOTE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-textarea
                          rows="2"
                          max-rows="6"
                          :style="
                            value.height ? `height:${value.height}` : null
                          "
                          v-model="dataForm[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'DISABLED'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          v-model="dataForm[value.key]"
                          disabled
                          :class="value.class"
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'CUSTOM'
                    "
                  >
                    <template v-if="currentTitle.toUpperCase() == 'CONT NHẬP'">
                      <b-colxx :key="i" :sm="value.col">
                        <b-form-group :label="'Có chi hộ hay không ?'">
                          <v-select :options="['Có', 'Không']"></v-select>
                        </b-form-group>
                      </b-colxx>
                    </template>
                    <template v-else>
                      <b-colxx :key="i" :sm="value.col">
                        <b-form-group :label="value.label">
                          <b-form-input
                            v-model="dataForm[value.key]"
                            :disabled="
                              (isEdit || isAdd) && value.type != 'key'
                                ? false
                                : true
                            "
                            :class="value.class"
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                    </template>
                  </template>
                  <template v-else>
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          v-model="dataForm[value.key]"
                          :disabled="
                            (isEdit || isAdd) && value.type != 'key'
                              ? false
                              : true
                          "
                          :class="value.class"
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                </template>
              </b-row>
              <div class="mb-3">
                <strong>{{ currentTitle.toUpperCase() }}</strong>
              </div>
            </b-col>
            <b-col lg="3">
              <b-row
                v-if="typeFormHeaderRight && typeFormHeaderRight.length > 0"
              >
                <template v-for="(value, i) in typeFormHeaderRight">
                  <template
                    v-if="value.type && value.type.toUpperCase() == 'DATE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <datepicker
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Chọn ngày'"
                          v-model="dataForm[value.key]"
                          @input="convertDate(value.key)"
                          :disabled="isEdit || isAdd ? false : true"
                        ></datepicker>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      (value.type && value.type.toUpperCase() == 'NUMBER') ||
                      (value.type && value.type.toUpperCase() == 'MONEY')
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group
                        :label="value.label"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          v-model.number="dataForm[value.key]"
                          type="number"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'SELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <v-select
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'MULTISELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group
                        :label="value.label"
                        class="has-float-label mb-4"
                      >
                        <v-select
                          multiple
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'TABLE'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-table
                          id="npl-table-chil"
                          class="npl-table-chil"
                          :fields="fieldsByKey[value.key]"
                          :items="dataByKey[value.key]"
                          bordered
                          responsive
                          show-empty
                          head-variant="light"
                        ></b-table>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="value.type && value.type.toUpperCase() == 'NOTE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-textarea
                          rows="2"
                          max-rows="6"
                          :style="
                            value.height ? `height:${value.height}` : null
                          "
                          v-model="dataForm[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'STATUS'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          :style="`font-weight:600;color:${
                            dataForm[value.key + 'Color']
                          } !important`"
                          v-model="dataForm[value.key]"
                          :disabled="
                            (isEdit || isAdd) && value.type != 'key'
                              ? false
                              : true
                          "
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template v-else>
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          v-model="dataForm[value.key]"
                          :disabled="
                            (isEdit || isAdd) && value.type != 'key'
                              ? false
                              : true
                          "
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                </template>
              </b-row>
            </b-col>
            <b-col lg="12" class="mb-2">
              <b-row v-if="currentTitle.toUpperCase() == 'HÀNG RỜI'">
                <b-col lg="12">
                  <div class="text-info">
                    <strong
                      ><i class="fas fa-truck-loading mr-1"></i
                      ><span style="font-size: 11px">LẤY HÀNG</span></strong
                    >
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
                      @click="showModalHangRoi('HRL')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsHR" :items="dataHRL">
                    <template #cell(actions)="row">
                      <div class="text-center" style="cursor: pointer">
                        <i
                          @click="removeByKey(row.item, 'HRL')"
                          class="fas fa-trash-alt text-danger mr-2"
                        ></i>
                        <i
                          @click="editByKey(row.item, 'HRL')"
                          class="fas fa-edit text-warning"
                        ></i>
                      </div>
                    </template>
                  </b-table>
                  <div class="text-success">
                    <strong
                      ><i class="fas fa-box-check mr-1"></i
                      ><span style="font-size: 11px">GIAO HÀNG</span></strong
                    >
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
                      @click="showModalHangRoi('HRG')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsHR" :items="dataHRG">
                    <template #cell(actions)="row">
                      <div class="text-center" style="cursor: pointer">
                        <i
                          @click="removeByKey(row.item, 'HRG')"
                          class="fas fa-trash-alt text-danger mr-2"
                        ></i>
                        <i
                          @click="editByKey(row.item, 'HRG')"
                          class="fas fa-edit text-warning"
                        ></i>
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-row v-else-if="currentTitle.toUpperCase() == 'CONT XUẤT'">
                <b-col lg="12">
                  <div class="text-info">
                    <strong
                      ><i class="fas fa-truck-loading mr-1"></i
                      ><span style="font-size: 11px">LẤY RỖNG</span></strong
                    >
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
                      @click="showModalCXL('CXL')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <div>
                    <b-table bordered :fields="fieldsCXL" :items="dataCXL">
                      <template #cell(actions)>
                        <div class="text-center" style="cursor: pointer">
                          <i class="fas fa-trash-alt text-danger mr-2"></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                    </b-table>
                  </div>
                  <div class="text-success">
                    <strong
                      ><i class="fas fa-truck-loading mr-1"></i
                      ><span style="font-size: 11px">ĐÓNG HÀNG</span></strong
                    >
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
                      @click="showModalCXG('CXG')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsCXG" :items="dataCXG">
                    <template #cell(actions)>
                      <div class="text-center" style="cursor: pointer">
                        <i class="fas fa-trash-alt text-danger mr-2"></i>
                        <i class="fas fa-edit text-warning"></i>
                      </div>
                    </template>
                  </b-table>
                  <div style="color: #9b59b6">
                    <strong
                      ><i class="fas fa-arrow-alt-to-bottom mr-1"></i
                      ><span style="font-size: 11px">HẠ HÀNG</span></strong
                    >
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
                      @click="showCxHaHang('CXHH')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <div>
                    <b-table bordered :fields="fieldsCXHH" :items="dataCXHH">
                      <template #cell(actions)>
                        <div class="text-center" style="cursor: pointer">
                          <i class="fas fa-trash-alt text-danger mr-2"></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
              <b-row v-else-if="currentTitle.toUpperCase() == 'CONT NHẬP'">
                <b-col lg="12">
                  <div class="text-info">
                    <strong
                      ><i class="fas fa-truck-loading mr-1"></i
                      ><span style="font-size: 11px">LẤY HÀNG</span></strong
                    >
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
                      @click="showModalCNL('CNL')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <div>
                    <b-table bordered :fields="fieldsCNL" :items="dataCNL">
                      <template #cell(actions)>
                        <div class="text-center" style="cursor: pointer">
                          <i class="fas fa-trash-alt text-danger mr-2"></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
                <b-col lg="8">
                  <div>
                    <strong style="font-size: 11px"
                      ><span>DANH SÁCH CONT NHẬP</span
                      ><span class="text-danger ml-2" style="cursor: pointer"
                        ><u>CHỌN FILE EXCEL</u></span
                      ></strong
                    >
                  </div>
                  <b-table
                    bordered
                    :fields="fieldsMLCN"
                    :items="dataMLCN"
                  ></b-table>
                </b-col>
                <b-col lg="4">
                  <b-form-group label="Tổng cont20" class="mt-2">
                    <b-form-input></b-form-input>
                  </b-form-group>
                  <b-form-group label="Tổng cont40">
                    <b-form-input></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <div class="text-success">
                    <strong
                      ><i class="fas fa-box-check mr-1"></i
                      ><span style="font-size: 11px">TRẢ HÀNG</span></strong
                    >
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
                      @click="showModalCNT('CNT')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsCNT" :items="dataCNT">
                    <template #cell(actions)>
                      <div class="text-center" style="cursor: pointer">
                        <i class="fas fa-trash-alt text-danger mr-2"></i>
                        <i class="fas fa-edit text-warning"></i>
                      </div>
                    </template>
                  </b-table>
                </b-col>
                <b-col lg="12">
                  <div style="color: #9b59b6">
                    <strong
                      ><i class="fas fa-arrow-alt-to-bottom mr-1"></i
                      ><span style="font-size: 11px">HẠ RỖNG</span>
                    </strong>
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
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <div>
                    <b-table bordered :fields="fieldsCNHR" :items="dataCNHR">
                      <template #cell(actions)>
                        <div class="text-center" style="cursor: pointer">
                          <i class="fas fa-trash-alt text-danger mr-2"></i>
                          <i class="fas fa-edit text-warning"></i>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="9">
              <b-row>
                <b-col lg="6">
                  <div class="mb-1">
                    <strong>CHI PHÍ PHÁT SINH</strong>
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
                      @click="showModalCppsDtps('CPPS')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsCPPS" :items="dataCPPS">
                    <template #cell(Status)="row">
                      <div :style="`color:${row.item.StatusColor}`">
                        {{ row.item.Status }}
                      </div>
                    </template>
                  </b-table>
                  <div class="text-right">
                    <strong
                      ><span class="text-muted">Tổng cộng : </span>300,000
                    </strong>
                  </div>
                </b-col>
                <b-col lg="6">
                  <div class="mb-1">
                    <strong>DOANH THU PHÁT SINH</strong>
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
                      @click="showModalCppsDtps('DTPS')"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsCPPS" :items="dataDTPS">
                    <template #cell(Status)="row">
                      <div :style="`color:${row.item.StatusColor}`">
                        {{ row.item.Status }}
                      </div>
                    </template>
                  </b-table>
                  <div class="text-right">
                    <strong
                      ><span class="text-muted">Tổng cộng : </span
                      >700,000</strong
                    >
                  </div>
                </b-col>
                <b-col lg="12">
                  <div class="mb-1 mt-2">
                    <strong>THÔNG TIN XUẤT HÓA ĐƠN</strong>
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
                      @click="showModalListCty()"
                    >
                      <i class="fas fa-plus"></i> <b>Thêm</b>
                    </b-button>
                  </div>
                  <b-table bordered :fields="fieldsXHD" :items="dataXHD">
                    <template #cell(Money)>
                      <b-form-input></b-form-input>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="3">
              <b-row
                v-if="typeFormBottomRight && typeFormBottomRight.length > 0"
              >
                <template v-for="(value, i) in typeFormBottomRight">
                  <template
                    v-if="value.type && value.type.toUpperCase() == 'DATE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <datepicker
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Chọn ngày'"
                          v-model="dataForm[value.key]"
                          @input="convertDate(value.key)"
                          :disabled="isEdit || isAdd ? false : true"
                        ></datepicker>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      (value.type && value.type.toUpperCase() == 'NUMBER') ||
                      (value.type && value.type.toUpperCase() == 'MONEY')
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group
                        :label="value.label"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          v-model.number="dataForm[value.key]"
                          type="number"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'SELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group
                        :label="value.label"
                        class="has-float-label mb-4"
                      >
                        <v-select
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'MULTISELECT'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group
                        :label="value.label"
                        class="has-float-label mb-4"
                      >
                        <v-select
                          multiple
                          v-model="dataForm[value.key]"
                          :options="options[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        />
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'TABLE'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-table
                          id="npl-table-chil"
                          class="npl-table-chil"
                          :fields="fieldsByKey[value.key]"
                          :items="dataByKey[value.key]"
                          bordered
                          responsive
                          show-empty
                          head-variant="light"
                        ></b-table>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="value.type && value.type.toUpperCase() == 'NOTE'"
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-textarea
                          rows="2"
                          max-rows="6"
                          :style="
                            value.height ? `height:${value.height}` : null
                          "
                          v-model="dataForm[value.key]"
                          :disabled="isEdit || isAdd ? false : true"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template
                    v-else-if="
                      value.type && value.type.toUpperCase() == 'STATUS'
                    "
                  >
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          :style="`font-weight:600;color:${
                            dataForm[value.key + 'Color']
                          } !important`"
                          v-model="dataForm[value.key]"
                          :disabled="
                            (isEdit || isAdd) && value.type != 'key'
                              ? false
                              : true
                          "
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                  <template v-else>
                    <b-colxx :key="i" :sm="value.col">
                      <b-form-group :label="value.label">
                        <b-form-input
                          :style="value.style ? value.style : null"
                          :class="value.class ? value.class : null"
                          v-model="dataForm[value.key]"
                          :disabled="
                            (isEdit || isAdd) && value.type != 'key'
                              ? false
                              : true
                          "
                        ></b-form-input>
                      </b-form-group>
                    </b-colxx>
                  </template>
                </template>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-tab>
      <b-tab>
        <div
          v-if="currentTitle"
          style="font-size: 16px; background: #d7d7d7; color: #005aab"
          class="text-center pt-1"
        >
          <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
          <b-dropdown
            class="title-dropdown"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
          >
            <!-- <template v-for="(title, key) in titleOption">
              <b-dropdown-item @click="changeTitle(title)" :key="key" href="#"
                >{{ title.label }}
              </b-dropdown-item>
            </template> -->
          </b-dropdown>
          <hr class="m-0" />
        </div>
        <div class="box-content mt-2">
          <table-history
            v-if="dataHisAction && dataHisAction.length > 0"
            :fields="fieldsHisAction"
            :items="dataHisAction"
          ></table-history>
          <div v-else class="mt-4 text-center text-muted font-weight-bold">
            Không tồn tại dữ liệu !
          </div>
        </div>
      </b-tab>
      <b-tab>
        <div
          v-if="currentTitle"
          style="font-size: 16px; background: #d7d7d7; color: #005aab"
          class="text-center pt-1"
        >
          <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
          <b-dropdown
            class="title-dropdown"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
          >
            <!-- <template v-for="(title, key) in titleOption">
              <b-dropdown-item @click="changeTitle(title)" :key="key" href="#"
                >{{ title.label }}
              </b-dropdown-item>
            </template> -->
          </b-dropdown>
          <hr class="m-0" />
        </div>
        <div class="box-content mt-2">
          <table-list-file></table-list-file>
        </div>
      </b-tab>
    </b-tabs>
    <ActionsFooterNPL
      :activeFocus="currentTab"
      @change-tab="updateTab"
    ></ActionsFooterNPL>
    <b-modal :id="`modal-import-${keyComponent}`" title="ĐÍNH KÈM FILE">
      <b-form-file
        :placeholder="'Xin mời chọn...'"
        v-model="files"
        multiple
        accept="/*"
        :browse-text="'Chọn Tệp'"
      ></b-form-file>
    </b-modal>
    <b-modal
      :id="`modal-find-${keyComponent}`"
      title="TÌM, LỌC DỮ LIỆU"
      size="lg"
    >
      <template v-for="(field, i) in fieldsTable">
        <div
          :key="i"
          class="d-flex justify-content-between align-items-center mb-1"
        >
          <div style="width: 100%">
            <strong>{{ field.label }}</strong>
          </div>
          <div style="width: 100%" class="text-right">
            <span style="color: #145388"
              ><b>{{ currentSearch }}</b></span
            >
            <b-dropdown
              class="title-dropdown ml-1 mr-4"
              variant="link"
              toggle-class="text-decoration-none"
            >
              <b-dropdown-item @click="changeTypeSearch('Lớn hơn')" href="#">
                Lớn hơn</b-dropdown-item
              >
              <b-dropdown-item @click="changeTypeSearch('Bé hơn')" href="#">
                Bé hơn</b-dropdown-item
              >
              <b-dropdown-item
                @click="changeTypeSearch('Lớn hoặc bằng')"
                href="#"
                >Lớn hoặc bằng</b-dropdown-item
              >
              <b-dropdown-item
                @click="changeTypeSearch('Bé hoặc bằng')"
                href="#"
                >Bé hoặc bằng</b-dropdown-item
              >
              <b-dropdown-item @click="changeTypeSearch('Bằng')" href="#"
                >Bằng</b-dropdown-item
              >
              <b-dropdown-item
                @click="changeTypeSearch('Trong khoảng')"
                href="#"
                >Trong khoảng</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div style="width: 100%" class="mr-2">
            <div>Giá trị 1</div>
            <b-form-input></b-form-input>
          </div>
          <div style="width: 100%">
            <div>Giá trị 2</div>
            <b-form-input></b-form-input>
          </div>
        </div>
      </template>
    </b-modal>
    <b-modal
      :id="`modal-list-cty-${keyComponent}`"
      title="DANH SÁCH CTY"
      size="md"
      centered
    >
      <div>
        <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
          <b-tab title="CHỌN DỮ LIỆU">
            <b-row>
              <b-col lg="12">
                <b-form-group label="Cty" size="sm">
                  <v-select
                    v-model="dataFormXHD"
                    :options="dataXHD"
                    label="Name"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Địa chỉ" size="sm">
                  <b-form-input v-model="dataFormXHD.Address"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="MST" size="sm">
                  <b-form-input v-model="dataFormXHD.MST"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Số tiền" size="sm">
                  <b-form-input v-model="dataFormXHD.Money"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="TẠO MỚI">
            <b-row>
              <b-col lg="12">
                <b-form-group label="Cty" size="sm">
                  <b-form-input></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Địa chỉ" size="sm">
                  <b-form-input></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="MST" size="sm">
                  <b-form-input></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Số tiền" size="sm">
                  <b-form-input></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
    <!-- modal-hàng rời -->
    <b-modal
      :id="`modal-them-hangroi-${keyComponent}`"
      title="THÊM (HÀNG RỜI)"
      size="xl"
      centered
      body-class="pt-0"
      @ok="pushDataByKey(dataFormHR, typeModal)"
    >
      <div>
        <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
          <b-tab title="CHỌN DỮ LIỆU">
            <b-row>
              <b-col lg="6">
                <b-form-group label="Kho hàng">
                  <v-select
                    v-model="dataFormHR"
                    label="Name"
                    :options="optionHR"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormHR.Address"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Liên hệ">
                  <b-form-input v-model="dataFormHR.LienHe"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Điện thoại">
                  <b-form-input v-model="dataFormHR.phone"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Yêu cầu">
                  <b-form-input v-model="dataFormHR.YeuCau"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-row>
                  <b-col>
                    <b-form-group label="Thời gian từ">
                      <div class="d-flex">
                        <b-form-timepicker
                          style="width: 40%; padding-top: 5px; font-size: 12px"
                          size="sm"
                          locale="vi"
                          class="mr-1"
                          label-no-time-selected="01:00"
                        ></b-form-timepicker>
                        <datepicker
                          style="width: 60%"
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Xin mời chọn..'"
                          @input="convertDateByKey('fromDate', 'HR')"
                          v-model="dataFormHR.fromDate"
                        ></datepicker>
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Thời gian đến">
                      <div class="d-flex">
                        <b-form-timepicker
                          style="width: 45%; padding-top: 5px; font-size: 12px"
                          size="sm"
                          locale="vi"
                          class="mr-1"
                          label-no-time-selected="12:00"
                        ></b-form-timepicker>
                        <datepicker
                          style="width: 55%"
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Xin mời chọn..'"
                          @input="convertDateByKey('toDate', 'HR')"
                          v-model="dataFormHR.toDate"
                        ></datepicker>
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Sô lượng">
                      <b-form-input v-model="dataFormHR.SoLuong"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Trọng lượng">
                      <b-form-input
                        v-model="dataFormHR.TrongLuong"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="TẠO MỚI">
            <b-row>
              <b-col lg="6">
                <b-form-group label="Kho hàng">
                  <b-form-input v-model="dataFormHR.Name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormHR.Address"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Liên hệ">
                  <b-form-input v-model="dataFormHR.LienHe"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Điện thoại">
                  <b-form-input v-model="dataFormHR.phone"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Yêu cầu">
                  <b-form-input v-model="dataFormHR.YeuCau"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-row>
                  <b-col>
                    <b-form-group label="Thời gian từ">
                      <div class="d-flex">
                        <b-form-timepicker
                          style="width: 40%; padding-top: 5px; font-size: 12px"
                          size="sm"
                          locale="vi"
                          class="mr-1"
                          label-no-time-selected="01:00"
                        ></b-form-timepicker>
                        <datepicker
                          style="width: 60%"
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Xin mời chọn..'"
                          @input="convertDateByKey('fromDate', 'HR')"
                          v-model="dataFormHR.fromDate"
                        ></datepicker>
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Thời gian đến">
                      <div class="d-flex">
                        <b-form-timepicker
                          style="width: 45%; padding-top: 5px; font-size: 12px"
                          size="sm"
                          locale="vi"
                          class="mr-1"
                          label-no-time-selected="12:00"
                        ></b-form-timepicker>
                        <datepicker
                          style="width: 55%"
                          :language="locale"
                          :format="datePickerFormat"
                          :bootstrap-styling="true"
                          :placeholder="'Xin mời chọn..'"
                          @input="convertDateByKey('toDate', 'HR')"
                          v-model="dataFormHR.toDate"
                        ></datepicker>
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Sô lượng">
                      <b-form-input v-model="dataFormHR.SoLuong"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Trọng lượng">
                      <b-form-input
                        v-model="dataFormHR.TrongLuong"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
    <b-modal
      :id="`modal-them-cpps-${keyComponent}`"
      title="THÊM CHI PHÍ PHÁT SINH"
      size="lg"
      centered
      body-class="pt-4"
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
          <b-form-group label="Ghi chú">
            <b-form-textarea
              rows="2"
              max-rows="6"
              v-model="dataFormCppsDtps.note"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
        <b-tab title="CHỌN DỮ LIỆU">
          <b-row>
            <b-col lg="4">
              <b-form-group label="Mục phí">
                <v-select
                  v-model="dataFormCppsDtps"
                  label="Name"
                  :options="optionCppsDtps"
                />
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group label="Số tiền">
                <b-form-input
                  v-model.number="dataFormCppsDtps.Money"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group label="Trạng thái">
                <b-form-input v-model="dataFormCppsDtps.Status"></b-form-input>
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
        </b-tab>
        <b-tab title="TẠO MỚI">
          <b-row>
            <b-col lg="4">
              <b-form-group label="Mục phí">
                <b-form-input v-model="dataFormCppsDtps.Name"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group label="Số tiền">
                <b-form-input
                  v-model.number="dataFormCppsDtps.Money"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group label="Trạng thái">
                <b-form-input v-model="dataFormCppsDtps.Status"></b-form-input>
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
        </b-tab>
      </b-tabs> -->
    </b-modal>
    <!-- modal-hàng xuất -->
    <b-modal
      :id="`modal-cxl-${keyComponent}`"
      title="THÊM"
      size="xl"
      centered
      body-class="pt-0"
    >
      <div>
        <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
          <b-tab title="CHỌN DỮ LIỆU">
            <b-row>
              <b-col lg="4">
                <b-form-group label="Số lệnh">
                  <v-select
                    v-model="dataFormCX"
                    label="SoLenh"
                    :options="dataCXL"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="File lệnh">
                  <b-form-file
                    style="height: 35px"
                    size="sm"
                    :placeholder="'Xin mời chọn...'"
                    v-model="dataFormCX.FileLenh"
                    multiple
                    accept="/*"
                    :browse-text="'Chọn Tệp'"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="File lệnh duyệt">
                  <b-form-file
                    style="height: 35px"
                    size="sm"
                    :placeholder="'Xin mời chọn...'"
                    v-model="dataFormCX.FileLenhDuyet"
                    multiple
                    accept="/*"
                    :browse-text="'Chọn Tệp'"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian lấy rỗng đầu">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('TgianLayRongDau', 'CX')"
                    v-model="dataFormCX.TgianLayRongDau"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian lấy rỗng cuối">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('TgianLayRongCuoi', 'CX')"
                    v-model="dataFormCX.TgianLayRongCuoi"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont20">
                  <b-form-input v-model="dataFormCX.SLcont20"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont40">
                  <b-form-input v-model="dataFormCX.SLcont40"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Công ty xuất hóa đơn">
                  <b-form-input v-model="dataFormCX.CtyXHD"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Mã số thuế">
                  <b-form-input v-model="dataFormCX.MaSoThue"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormCX.DiaChi"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="TẠO MỚI">
            <b-row>
              <b-col lg="4">
                <b-form-group label="Số lệnh">
                  <b-form-input v-model="dataFormCX.SoLenh"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="File lệnh">
                  <b-form-file
                    style="height: 35px"
                    size="sm"
                    :placeholder="'Xin mời chọn...'"
                    v-model="dataFormCX.FileLenh"
                    multiple
                    accept="/*"
                    :browse-text="'Chọn Tệp'"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="File lệnh duyệt">
                  <b-form-file
                    style="height: 35px"
                    size="sm"
                    :placeholder="'Xin mời chọn...'"
                    v-model="dataFormCX.FileLenhDuyet"
                    multiple
                    accept="/*"
                    :browse-text="'Chọn Tệp'"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian lấy rỗng đầu">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('TgianLayRongDau', 'CX')"
                    v-model="dataFormCX.TgianLayRongDau"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian lấy rỗng cuối">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('TgianLayRongCuoi', 'CX')"
                    v-model="dataFormCX.TgianLayRongCuoi"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont20">
                  <b-form-input v-model="dataFormCX.SLcont20"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont40">
                  <b-form-input v-model="dataFormCX.SLcont40"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Công ty xuất hóa đơn">
                  <b-form-input v-model="dataFormCX.CtyXHD"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Mã số thuế">
                  <b-form-input v-model="dataFormCX.MaSoThue"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormCX.DiaChi"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
    <b-modal
      :id="`modal-cxg-${keyComponent}`"
      title="THÊM"
      size="xl"
      centered
      body-class="pt-0"
    >
      <div>
        <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
          <b-tab title="CHỌN DỮ LIỆU">
            <b-row>
              <b-col lg="3">
                <b-form-group label="Kho hàng">
                  <v-select
                    v-model="dataFormCX"
                    label="Name"
                    :options="dataCXG"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormCX.Address"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Liên hệ">
                  <b-form-input v-model="dataFormCX.LienHe"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Điện thoại">
                  <b-form-input v-model="dataFormCX.phone"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian từ">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('fromDate', 'CX')"
                    v-model="dataFormCX.fromDate"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian đến">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('toDate', 'CX')"
                    v-model="dataFormCX.toDate"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont20">
                  <b-form-input v-model="dataFormCX.SLcont20"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont40">
                  <b-form-input v-model="dataFormCX.SLcont40"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Yêu cầu">
                  <b-form-input v-model="dataFormCX.YeuCau"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="TẠO MỚI">
            <b-row>
              <b-col lg="3">
                <b-form-group label="Kho hàng">
                  <b-form-input v-model="dataFormCX.Name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormCX.Address"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Liên hệ">
                  <b-form-input v-model="dataFormCX.LienHe"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Điện thoại">
                  <b-form-input v-model="dataFormCX.phone"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian từ">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('fromDate', 'CX')"
                    v-model="dataFormCX.fromDate"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian đến">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('toDate', 'CX')"
                    v-model="dataFormCX.toDate"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont20">
                  <b-form-input v-model="dataFormCX.SLcont20"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont40">
                  <b-form-input v-model="dataFormCX.SLcont40"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Yêu cầu">
                  <b-form-input v-model="dataFormCX.YeuCau"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
    <b-modal
      :id="`modal-cxhh-${keyComponent}`"
      title="THÊM"
      size="lg"
      centered
      body-class="pt-4"
    >
      <b-row>
        <b-col lg="12">
          <b-form-group label="Cảng hạ">
            <v-select v-model="dataFormCX" :options="dataCXHH" label="CangHa" />
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group label="Thông tin hạ đầu">
            <b-form-input></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group label="Thông tin hạ cuối">
            <b-form-input></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Ghi chú">
            <b-form-textarea rows="2" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      :id="`modal-cnl-${keyComponent}`"
      title="THÊM"
      size="xl"
      centered
      body-class="pt-0"
    >
      <div>
        <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
          <b-tab title="CHỌN DỮ LIỆU">
            <b-row>
              <b-col lg="3">
                <b-form-group label="Số lệnh">
                  <v-select
                    v-model="dataFormCN"
                    label="SoBill"
                    :options="dataCNL"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="File đính kèm">
                  <b-form-input v-model="dataFormCN.FileDinhKem"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Cảng lấy hàng">
                  <b-form-input v-model="dataFormCN.CangLayHang"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn lưu cont">
                  <b-form-input v-model="dataFormCN.HanLuuCont"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn lấy rỗng">
                  <b-form-input v-model="dataFormCN.HanLayRong"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn phụ thu">
                  <b-form-input v-model="dataFormCN.HanPhuThu"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn lưu bãi">
                  <b-form-input v-model="dataFormCN.HanLuuBai"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Ngày tàu cập">
                  <b-form-input v-model="dataFormCN.NgayTauCap"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Ghi chú">
                  <b-form-input v-model="dataFormCN.note"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="TẠO MỚI">
            <b-row>
              <b-col lg="3">
                <b-form-group label="Số lệnh">
                  <b-form-input v-model="dataFormCN.SoBill"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="File đính kèm">
                  <b-form-input v-model="dataFormCN.FileDinhKem"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Cảng lấy hàng">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('CangLayHang', 'CN')"
                    v-model="dataFormCN.CangLayHang"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn lưu cont">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('HanLuuCont', 'CN')"
                    v-model="dataFormCN.HanLuuCont"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn lấy rỗng">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('HanLayRong', 'CN')"
                    v-model="dataFormCN.HanLayRong"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn phụ thu">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('HanPhuThu', 'CN')"
                    v-model="dataFormCN.HanPhuThu"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Hạn lưu bãi">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('HanLuuBai', 'CN')"
                    v-model="dataFormCN.HanLuuBai"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Ngày tàu cập">
                  <datepicker
                    :language="locale"
                    :format="datePickerFormat"
                    :bootstrap-styling="true"
                    :placeholder="'Chọn ngày'"
                    @input="convertDateByKey('NgayTauCap', 'CN')"
                    v-model="dataFormCN.NgayTauCap"
                  ></datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="12">
                <b-form-group label="Ghi chú">
                  <b-form-input v-model="dataFormCN.note"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
    <b-modal
      :id="`modal-cnt-${keyComponent}`"
      title="THÊM"
      size="xl"
      centered
      body-class="pt-0"
    >
      <div>
        <b-tabs v-model="currentTabForm" content-class="mt-3" fill>
          <b-tab title="CHỌN DỮ LIỆU">
            <b-row>
              <b-col lg="3">
                <b-form-group label="Tên kho">
                  <v-select
                    v-model="dataFormCN"
                    label="TenKho"
                    :options="dataCNT"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormCN.DiaChi"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Liên hệ">
                  <b-form-input v-model="dataFormCN.LienHe"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Điện thoại">
                  <b-form-input v-model="dataFormCN.Phone"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Yêu cầu">
                  <b-form-input v-model="dataFormCN.YeuCau"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian từ">
                  <b-form-input v-model="dataFormCN.ThoiGianTu"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian đến">
                  <b-form-input v-model="dataFormCN.ThoiGianDen"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont20">
                  <b-form-input v-model="dataFormCN.SLcont20"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont40">
                  <b-form-input v-model="dataFormCN.SLcont40"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="TẠO MỚI">
            <b-row>
              <b-col lg="3">
                <b-form-group label="Tên kho">
                  <v-select
                    v-model="dataFormCN"
                    label="TenKho"
                    :options="dataCNT"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Địa chỉ">
                  <b-form-input v-model="dataFormCN.DiaChi"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Liên hệ">
                  <b-form-input v-model="dataFormCN.LienHe"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Điện thoại">
                  <b-form-input v-model="dataFormCN.Phone"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Yêu cầu">
                  <b-form-input v-model="dataFormCN.YeuCau"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian từ">
                  <b-form-input v-model="dataFormCN.ThoiGianTu"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Thời gian đến">
                  <b-form-input v-model="dataFormCN.ThoiGianDen"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont20">
                  <b-form-input v-model="dataFormCN.SLcont20"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Số lượng cont40">
                  <b-form-input v-model="dataFormCN.SLcont40"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Handling from "@/constants/handling.js";
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import Status from "@/components/Badges/StatusColor.vue";
import { mapGetters } from "vuex";
import TitleMajor from "@/views/app/function/npl/kinh-doanh/component/TitleMajor.vue";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import TitleOption from "@/data/modules/npl/titleOptions";
import hangRoi from "@/data/modules/npl/hangRoi";

export default {
  props: [
    "items",
    "fields",
    "fieldsFormHeader",
    "fieldsFormHeaderRight",
    "fieldsFormBottomRight",
    "optionByKey",
    "title",
  ],
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      currentTab: 0,
      currentTabForm: 0,
      dataForm: this.items?.length > 0 ? this.items[0] : null,
      dataBackup: null,
      fieldsTable: this.fields ?? [],
      typeFormHeader: this.fieldsFormHeader ?? [],
      typeFormHeaderRight: this.fieldsFormHeaderRight ?? [],
      typeFormBottomRight: this.fieldsFormBottomRight ?? [],
      dataTable: this.items ?? [],
      totalRows: this.items?.length > 0 ? this.items.length : 0,
      currentPage: 1,
      perPage: 10,
      currentIndex: 0,
      //key-component
      keyComponent: "donhang",
      //title-options
      currentTitle: this.title ?? null,
      titleOption: TitleOption.dataDonHangKD,
      //table-chil-by-key
      fieldsByKey: {},
      dataByKey: {},
      //search
      currentSearch: "Chọn loại tìm kiếm",
      options: this.optionByKey ?? {},
      //actions-header
      isAdd: false,
      isEdit: false,
      isDelete: false,
      //import-file
      files: null,
      listFile: [],
      //static-data
      typeModal: "HR",
      //cont nhập
      fieldsCNL: [
        {
          key: "SoBill",
          label: "Số bill",
        },
        {
          key: "FileDinhKem",
          label: "File đính kèm",
        },
        {
          key: "CangLayHang",
          label: "Cảng lấy hàng",
        },
        {
          key: "HanLuuCont",
          label: "Hạ lưu cont",
        },
        {
          key: "HanLayRong",
          label: "Hạn lấy rỗng",
        },
        {
          key: "HanPhuThu",
          label: "Hạn phụ thu",
        },
        {
          key: "HanLuuBai",
          label: "Hạn lưu bãi",
        },
        {
          key: "NgayTauCap",
          label: "Ngày tàu cập",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      dataCNL: [
        {
          SoBill: "BILL00122",
          FileDinhKem: "file-dinh-kem.docx",
          CangLayHang: "Cát lái",
          HanLuuCont: "17:00 15-11-2022",
          HanLayRong: "18:00 16-11-2022",
          HanPhuThu: "19:00 16-11-2022",
          HanLuuBai: "20:00 16-11-2022",
          NgayTauCap: "07:00 17-11-2022",
          note: "",
        },
      ],
      fieldsCNT: [
        {
          key: "TenKho",
          label: "Tên kho",
        },
        {
          key: "DiaChi",
          label: "Địa chỉ",
        },
        {
          key: "LienHe",
          label: "Người liên hệ",
        },
        {
          key: "Phone",
          label: "Điện thoại",
        },
        {
          key: "YeuCau",
          label: "Yêu cầu",
        },
        {
          key: "ThoiGianTu",
          label: "Thời gian từ",
        },
        {
          key: "ThoiGianDen",
          label: "Thời gian đến",
        },
        {
          key: "SLcont20",
          label: "Số lượng cont20",
          tdClass: "text-right",
        },
        {
          key: "SLcont40",
          label: "Số lượng cont40",
          tdClass: "text-right",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      dataCNT: [
        {
          TenKho: "BILL2022",
          DiaChi: "file-dinh-kem.docx",
          LienHe: "Cát lái",
          Phone: "17:00 15-11-2022",
          YeuCau: "Khai báo abc",
          ThoiGianTu: "19:00 16-11-2022",
          ThoiGianDen: "20:00 16-11-2022",
          SLcont20: 2,
          SLcont40: 1,
          note: "",
        },
      ],
      fieldsCNHR: [
        {
          key: "NoiHa",
          label: "Nơi hạ",
        },
        {
          key: "FileLenhHa",
          label: "File lệnh hạ",
        },
        {
          key: "ThoiGianHaTu",
          label: "Thời gian hạ từ",
        },
        {
          key: "ThoiGianHaDen",
          label: "Thời gian hạ đến",
        },
        {
          key: "CtyXHD",
          label: "Xuất hóa đơn hạ cho",
        },
        {
          key: "MST",
          label: "Mã số thuế",
        },
        {
          key: "DiaChi",
          label: "Địa chỉ",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      dataCNHR: [
        {
          NoiHa: "Cát lái",
          FileLenhHa: "file-lenh-ha.docx",
          ThoiGianHaTu: "17:00 15-11-2022",
          ThoiGianHaDen: "18:00 15-11-2022",
          CtyXHD: "Công ty A",
          MST: "MST010112022",
          DiaChi: "43R Hồ Văn Huê, Phú Nhuận",
          note: "",
        },
      ],
      fieldsMLCN: [
        {
          key: "ID",
          label: "Mã lấy cont",
        },
        {
          key: "SoCont",
          label: "Số cont",
          tdClass: "text-right",
        },
        {
          key: "SoSeal",
          label: "Số Seal",
          tdClass: "text-right",
        },
        {
          key: "width",
          label: "Chiều dài cont",
          tdClass: "text-right",
        },
      ],
      dataMLCN: [
        {
          ID: "LLC12345",
          width: "40f",
          SoCont: "2",
          SoSeal: "2",
        },
        {
          ID: "LAC13468",
          width: "20f",
          SoCont: "2",
          SoSeal: "2",
        },
      ],
      dataFormCN: {},
      //cont xuất
      dataFormCX: {},
      dataCXHH: [
        {
          CangHa: "Cát lái",
          TgianHaDau: "12:00 16/11/2022",
          TgianHaCuoi: "17:00 16/11/2022",
        },
        {
          CangHa: "Đồng nai",
          TgianHaDau: "12:00 16/11/2022",
          TgianHaCuoi: "17:00 16/11/2022",
        },
      ],
      fieldsCXHH: [
        {
          key: "CangHa",
          label: "Cảng hạ",
        },
        {
          key: "TgianHaDau",
          label: "Thời gian hạ đầu",
        },
        {
          key: "TgianHaCuoi",
          label: "Thời gian hạ cuối",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      fieldsCXL: [
        {
          key: "SoLenh",
          label: "Số lệnh",
        },
        {
          key: "FileLenh",
          label: "File lệnh",
        },
        {
          key: "FileLenhDuyet",
          label: "File lệnh duyệt",
        },
        {
          key: "SLcont20",
          label: "Số lượng cont20",
          tdClass: "text-right",
        },
        {
          key: "SLcont40",
          label: "Số lượng cont40",
          tdClass: "text-right",
        },
        {
          key: "TgianLayRongDau",
          label: "Thời gian lấy rỗng đầu",
        },
        {
          key: "TgianLayRongCuoi",
          label: "Thời gian lấy rỗng cuối",
        },
        {
          key: "CtyXHD",
          label: "Công ty xuất hóa đơn",
        },
        {
          key: "MaSoThue",
          label: "Mã số thuế",
        },
        {
          key: "DiaChi",
          label: "Địa chỉ",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      dataCXL: [
        {
          SoLenh: "SL/11/15/001",
          FileLenh: "file-lenh.docx",
          FileLenhDuyet: "file-lenh-duyet.docx",
          SLcont20: "10",
          SLcont40: "20",
          TgianLayRongDau: "18:00 10-11-2022",
          TgianLayRongCuoi: "20:00 12-11-2022",
          CtyXHD: "Công ty A",
          MaSoThue: "MST00129201",
          DiaChi: "43R Hồ Văn Huê, Phú nhuận",
        },
      ],
      fieldsCXG: [
        {
          key: "Name",
          label: "Kho hàng",
        },
        {
          key: "Address",
          label: "Địa chỉ",
        },
        {
          key: "LienHe",
          label: "Liên hệ",
        },
        {
          key: "phone",
          label: "Điện thoại",
        },
        {
          key: "YeuCau",
          label: "Yêu cầu",
        },
        {
          key: "fromDate",
          label: "Thời gian từ",
        },
        {
          key: "toDate",
          label: "Thời gian đến",
        },
        {
          key: "cont20",
          label: "Số lượng cont20",
          tdClass: "text-right",
        },
        {
          key: "cont40",
          label: "Số lượng cont40",
          tdClass: "text-right",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      dataCXG: [
        {
          Name: "Kho Quận 1",
          Address: "13 Đồng khánh, Quận 1",
          LienHe: "Anh Tú",
          phone: "0961421396",
          YeuCau: "Liên hệ bảo vệ",
          fromDate: "11:30 16-11-2022",
          toDate: "18:00 15-11-2022",
          SoLuong: "5 cuộn (80tấn)",
          cont20: 2,
          cont40: 1,
        },
      ],
      //hàng rời
      optionHR: hangRoi.data,
      dataFormHR: {
        Name: null,
        Address: null,
        LienHe: null,
        phone: null,
        YeuCau: null,
        fromDate: null,
        toDate: null,
        SoLuong: null,
        note: null,
      },
      optionCppsDtps: [
        {
          Name: "Bốc xếp",
          Money: "100,000",
          Status: "Chờ duyệt",
          note: "",
        },
        {
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
      fieldsHR: [
        {
          key: "Name",
          label: "Kho hàng",
        },
        {
          key: "Address",
          label: "Địa chỉ",
        },
        {
          key: "YeuCau",
          label: "Yêu cầu",
        },
        {
          key: "fromDate",
          label: "Thời gian từ",
        },
        {
          key: "toDate",
          label: "Thời gian đến",
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
          key: "LienHe",
          label: "Liên hệ",
        },
        {
          key: "phone",
          label: "Điện thoại",
        },
        {
          key: "actions",
          label: "Thao tác",
        },
      ],
      dataHRL: [
        {
          ID: 0,
          Name: "Thủ Đức",
          Address: "13 Đồng khánh, Phú Nhuận",
          YeuCau: "Không bóc keo",
          fromDate: "11:30 16-11-2022",
          toDate: "18:00 15-11-2022",
          SoLuong: "5 cuộn",
          TrongLuong: "80tấn",
          LienHe: "Anh Tú",
          phone: "0961421396",
        },
      ],
      dataHRG: [
        {
          Name: "Phú nhuận",
          Address: "43R Hồ văn huê, Phú Nhuận",
          YeuCau: "Khai báo abc",
          fromDate: "19:30 15-11-2022",
          toDate: "22:00 15-11-2022",
          SoLuong: "5 cuộn",
          TrongLuong: "80tấn",
          LienHe: "Anh C",
          phone: "0912212133",
        },
      ],
      //chi phí phát sinh
      dataFormXHD: {},
      fieldsXHD: [
        {
          key: "Name",
          label: "Tên công ty",
        },
        {
          key: "MST",
          label: "Mã số thuế",
        },
        {
          key: "Address",
          label: "Địa chỉ",
        },
      ],
      dataXHD: [
        {
          Name: "Công ty NL",
          MST: "0310111222",
          Address: "43r Hồ Văn Huê, Phú nhuận, HCM",
          Money: null,
        },
        {
          Name: "Công ty ABC",
          MST: "0310113333",
          Address: "49r Cao Thắng, Quận 1, HCM",
          Money: null,
        },
      ],
      fieldsCPPS: [
        {
          key: "Name",
          label: "Mục phí",
        },
        {
          key: "Money",
          label: "Số tiền",
          tdClass: "text-right",
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
          StatusColor: "green",
        },
        {
          Name: "Thủ kho",
          Money: "200,000",
          Status: "Chờ duyệt",
          StatusColor: "orange",
        },
      ],
      dataDTPS: [
        {
          Name: "Neo xe",
          Money: "600,000",
          Status: "Đã duyệt",
          StatusColor: "green",
        },
        {
          Name: "Bốc xếp",
          Money: "100,000",
          Status: "Đã duyệt",
          StatusColor: "green",
        },
      ],
      //
      //history-actions
      typeAction: null,
      fieldsHisAction: [
        {
          key: "dateTime",
          label: "Thời gian",
        },
        {
          key: "userName",
          label: "Người thực hiện",
        },
        {
          key: "typeAction",
          label: "Thao tác",
        },
        {
          key: "note",
          label: "Ghi chú",
        },
      ],
      dataHisAction: [
        {
          dateTime: "13:10 10-11-2022",
          userName: "Trần Văn A",
          typeAction: "add",
          note: "",
        },
        {
          dateTime: "15:10 10-11-2022",
          userName: "Trần Văn B",
          typeAction: "edit",
          note: "phát sinh abc...",
        },
        {
          dateTime: "12:10 11-11-2022",
          userName: "Trần Văn C",
          typeAction: "delete",
          note: "Không đủ xe vận tải",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  watch: {
    dataForm() {
      if (this.dataForm && this.dataForm.type) {
        if (this.dataForm.type == "HR") {
          this.currentTitle = "HÀNG RỜI";
        }
        if (this.dataForm.type == "CX") {
          this.currentTitle = "CONT XUẤT";
        }
        if (this.dataForm.type == "CN") {
          this.currentTitle = "CONT NHẬP";
        }
      }
    },
    currentTabForm(val) {
      if (val == 1) {
        this.dataFormHR = {
          Name: null,
          Address: null,
          LienHe: null,
          phone: null,
          YeuCau: null,
          fromDate: null,
          toDate: null,
          SoLuong: null,
          note: null,
        };
        this.dataFormCppsDtps = {
          Name: null,
          Money: null,
          Status: "Chờ duyệt",
          note: "",
        };
      }
    },
  },
  methods: {
    handleSelect(value) {
      if (value == "SG-CL (SÀI GÒN-CÁT LÁI)") {
        if (this.dataForm.donGia) {
          this.dataForm.donGia = "600,000";
        }
      }
      if (value == "SG-LA (SÀI GÒN-LONG AN)") {
        if (this.dataForm.donGia) {
          this.dataForm.donGia = "400,000";
        }
      }
      if (value == "BT-AG (BẾN TRE-AN GIANG)") {
        if (this.dataForm.donGia) {
          this.dataForm.donGia = "200,000";
        }
      }
    },
    showModalCNT(key) {
      this.typeModal = key;
      this.dataFormCN = {};
      setTimeout(() => {
        this.$bvModal.show(`modal-cnt-${this.keyComponent}`);
      }, 500);
    },
    showModalCNL(key) {
      this.typeModal = key;
      this.dataFormCN = {};
      setTimeout(() => {
        this.$bvModal.show(`modal-cnl-${this.keyComponent}`);
      }, 500);
    },
    showCxHaHang(key) {
      this.typeModal = key;
      setTimeout(() => {
        this.$bvModal.show(`modal-cxhh-${this.keyComponent}`);
      }, 500);
    },
    showModalCXG(key) {
      this.typeModal = key;
      this.dataFormCX = {};
      setTimeout(() => {
        this.$bvModal.show(`modal-cxg-${this.keyComponent}`);
      }, 500);
    },
    showModalCXL(key) {
      this.typeModal = key;
      setTimeout(() => {
        this.$bvModal.show(`modal-cxl-${this.keyComponent}`);
      }, 500);
    },
    showModalCppsDtps(key) {
      this.typeModal = key;
      setTimeout(() => {
        this.$bvModal.show(`modal-them-cpps-${this.keyComponent}`);
      }, 500);
    },
    editByKey(row, key) {
      if (key == "HRL" || key == "HRG") {
        this.dataFormHR = { ...row };
      }
      setTimeout(() => {
        this.$bvModal.show(`modal-them-hangroi-${this.keyComponent}`);
      }, 500);
    },
    removeByKey(row, key) {
      if (key == "HRL") {
        this.dataHRL = this.dataHRL.filter((r) => r.ID != row.ID);
      }
      if (key == "HRG") {
        this.dataHRG = this.dataHRG.filter((r) => r.ID != row.ID);
      }
    },
    pushDataByKey(item, key) {
      if (this.typeModal == "HRL") {
        this.dataHRL.ID = this.dataHRL.length + 1;
        this.dataHRL.push(item);
        const key = "ID";
        this.dataHRL = [
          ...new Map(this.dataHRL.map((item) => [item[key], item])).values(),
        ];
      }
      if (this.typeModal == "HRG") {
        this.dataHRG.ID = this.dataHRG.length + 1;
        this.dataHRG.push(item);
        const key = "ID";
        this.dataHRG = [
          ...new Map(this.dataHRG.map((item) => [item[key], item])).values(),
        ];
      }
    },
    showModalHangRoi(key) {
      this.typeModal = key;
      setTimeout(() => {
        this.$bvModal.show(`modal-them-hangroi-${this.keyComponent}`);
      }, 500);
    },
    showModalListCty() {
      setTimeout(() => {
        this.$bvModal.show(`modal-list-cty-${this.keyComponent}`);
      }, 500);
    },
    changeTypeSearch(value) {
      // this.currentSearch = value;
    },
    changeTitle(obj) {
      this.currentTitle = obj.label;
    },
    handleShowImportFile() {
      setTimeout(() => {
        this.$bvModal.show(`modal-import-${this.keyComponent}`);
      }, 500);
    },
    pushHistory() {
      if (this.typeAction) {
        let row = {
          dateTime: Handling.getDateTimeNow(),
          userName: this.currentUser.UserName,
          referenceID: this.dataForm.ID,
          typeAction: this.typeAction,
        };
        this.dataHisAction.unshift(row);
        this.typeAction = null;
      }
    },
    handleChangeActions(bol, key) {
      switch (key) {
        case "add":
          this.typeAction = key;
          this.isAdd = !bol;
          this.isEdit = true;
          this.isDelete = true;
          this.dataBackup = { ...this.dataForm };
          this.currentTab = 1;
          this.handleAdd();
          break;
        case "edit":
          this.typeAction = key;
          this.isEdit = !bol;
          this.isAdd = true;
          this.isDelete = true;
          this.dataBackup = { ...this.dataForm };
          this.currentTab = 1;
          break;
        case "delete":
          this.typeAction = key;
          this.pushHistory();
          this.deleteModal();
          this.currentTab = 1;
          break;
        case "save":
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          this.handleSave();
          this.pushHistory();
          break;
        case "cancel":
          this.typeAction = null;
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          this.dataForm = { ...this.dataBackup };
          this.dataBackup = null;
          break;
        case "print":
          setTimeout(() => {
            this.$bvModal.show(`modal-print-basic`);
          }, 500);
          break;
        case "import":
          setTimeout(() => {
            this.$bvModal.show(`modal-import-basic`);
          }, 500);
          // this.handleShowImportFile();
          break;
        case "find":
          setTimeout(() => {
            this.$bvModal.show(`modal-find-${this.keyComponent}`);
          }, 500);
          break;
      }
    },
    convertDate(key) {
      this.dataForm[key] = Handling.convertDateNPL(this.dataForm[key]);
    },
    convertDateByKey(key, keyForm) {
      if (keyForm == "HR" || keyForm == "HRL" || keyForm == "HRG") {
        this.dataFormHR[key] = Handling.convertDateNPL(this.dataFormHR[key]);
      }
      if (keyForm == "CX") {
        this.dataFormCX[key] = Handling.convertDateNPL(this.dataFormCX[key]);
      }
      if (keyForm == "CN") {
        this.dataFormCN[key] = Handling.convertDateNPL(this.dataFormCN[key]);
      }
    },
    updateFirstIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = 0;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updatePreIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == 0) {
        this.currentIndex = 0;
      } else {
        this.currentIndex -= 1;
      }
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateNextIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == this.dataTable.length - 1) {
        this.currentIndex = this.dataTable.length - 1;
      } else {
        this.currentIndex += 1;
      }
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateLastIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = this.dataTable.length - 1;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    handleDbClick(row, index) {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = index;
      this.dataForm = { ...row };
      this.currentTab = 1;
    },
    updateTab(value) {
      this.currentTab = value;
      if (value == 0) {
      }
      if (value == 1) {
        if (this.dataForm.type == "HR") {
          this.currentTitle = "HÀNG RỜI";
        }
        if (this.dataForm.type == "CX") {
          this.currentTitle = "CONT XUẤT";
        }
        if (this.dataForm.type == "CN") {
          this.currentTitle = "CONT NHẬP";
        }
      }
      if (value == 2) {
        this.currentTitle = "Lịch sử thao tác";
      }
      if (value == 3) {
        this.currentTitle = "File đính kèm";
      }
    },
    handleAdd() {
      for (const key in this.dataForm) {
        this.dataForm[key] = null;
      }
      this.dataForm.ID = moment(new Date()).format("HH:mm:ss").toString();
      this.dataTable.unshift(this.dataForm);
      this.currentIndex = 0;
    },
    handleSave() {
      this.dataTable = this.dataTable.filter(
        (row) => row.ID != this.dataForm.ID
      );
      this.dataTable.unshift(this.dataForm);
      this.currentIndex = 0;
      this.$notify("success", "THÔNG BÁO", "Xử lí thành công", {
        duration: 3000,
        permanent: false,
      });
    },
    deleteModal() {
      this.$bvModal
        .msgBoxConfirm(`Bạn muốn xóa ${this.dataForm.ID} ?`, {
          title: "CẢNH BÁO",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Đồng ý",
          cancelTitle: "Hủy",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.dataTable = this.dataTable.filter(
              (row) => row.ID != this.dataForm.ID
            );
            if (this.dataTable?.length > 0) {
              this.dataForm = { ...this.dataTable[0] };
              this.currentIndex = 0;
              this.$notify("success", "THÔNG BÁO", "Xử lí thành công", {
                duration: 3000,
                permanent: false,
              });
            } else {
              this.dataForm = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertMoneyVN(value) {
      return Handling.convertFloat(value);
    },
  },
};
</script>
<style>
.table th {
  white-space: nowrap;
}
</style>
<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style>
.npl-table-basic-form .table th {
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 335px);
  overflow: auto;
}
</style>
<style>
.b-custom-control-sm .custom-file-label {
  border-radius: 0;
  font-size: 12px;
  height: 35px;
  padding: 0.4rem 0.5rem !important;
}
</style>
<style scoped>
.custom-box-tab1 {
  height: calc(100vh - 297px);
}
</style>
<style scoped>
@media screen and (max-width: 1366px) {
  .box-content {
    height: calc(100vh - 308px);
  }
  .custom-box-tab1 {
    height: calc(100vh - 270px);
  }
}
</style>