<template>
  <div v-if="formValues" class="pr-3 vehicle-handover">
    <b-row>
      <b-col lg="2">
        <b-form-group label="Chứng từ">
          <b-form-input v-model="formValues['ID']" disabled></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="Ngày áp dụng">
          <datepicker
            :language="locale"
            :format="datePickerFormat"
            :bootstrap-styling="true"
            :placeholder="'Chọn ngày'"
            v-model="formValues['date']"
            @input="convertDate(formValues['date'])"
            disabled
          ></datepicker>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <b-form-group label="Tài xế">
          <b-form-select
            v-model="formValues['driver']"
            :options="tempData.driverOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col lg="5">
        <b-form-group label="Địa chỉ">
          <b-form-input v-model="formValues['address']" disabled></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="2">
        <b-form-group label="Điện thoại">
          <b-form-input v-model="formValues['phone']" disabled></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="CMND">
          <b-form-input v-model="formValues['CMND']" disabled></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="GPLX">
          <b-form-input v-model="formValues['GPLX']" disabled></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="Ngày hết hạn GPLX">
          <b-form-input
            v-model="formValues['GPLXExpiredDate']"
            disabled
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="2">
        <b-form-group label="Loại bàn giao">
          <b-form-select
            v-model="formValues['handover']"
            :options="tempData.handoverOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="Phương tiện">
          <b-form-select
            v-model="formValues['licensePlate']"
            :options="tempData.licensePlatesOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="Loại phương tiện">
          <b-form-input v-model="formValues['type']" disabled></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group label="Dự kiến thu hồi">
          <b-form-input type="datetime-local" v-model="formValues['dateTime']"></b-form-input>
        </b-form-group>
      </b-col>
      <!-- <b-col lg="3">
        <b-form-group label="Dự kiến bàn giao">
          <div class="d-flex">
            <b-form-timepicker
              style="width: 50%; padding-top: 5px; font-size: 12px"
              size="sm"
              locale="vi"
              class="mr-1"
              label-no-time-selected="HH:MM"
              v-model="formValues['handoverTime']"
            ></b-form-timepicker>
            <datepicker
              style="width: 50%"
              :language="locale"
              :format="datePickerFormat"
              :bootstrap-styling="true"
              :placeholder="'DD/MM/YYYY'"
              v-model="formValues['handoverDate']"
              :disabled="false"
            ></datepicker>
          </div>
        </b-form-group>
      </b-col> -->
    </b-row>
    <b-row>
      <b-col lg="4">
        <b-form-group label="Ghi chú">
          <b-form-textarea
            rows="2"
            max-rows="6"
            v-model="formValues['note']"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import Handling from "@/constants/handling.js";
import tempData from "@/data/modules/npl/YeuCauBanGiaoPhuongTien(4.1)";

export default {
  props: ["dataForm"],
  data() {
    return {
      formValues: null,
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      tempData,
    };
  },
  methods: {
    convertDate(key) {
      if (key) {
        console.log(key);
        console.log(Handling.convertDateNPL(this.dataForm[key]));
        return Handling.convertDateNPL(this.dataForm[key]);
      }
      return "";
    },
    dateToday() {
      const now = new Date()
      return `${moment(now).format('YYYY-MM-DD')}T${moment(now).format('HH:mm')}`
    }
  },
  watch: {
    "formValues.driver"(to) {
      const obj = tempData.driverInfo.find((item) => item.driver == to);
      this.formValues = {
        ...this.formValues,
        ...obj,
      };
    },
    "formValues.licensePlate"(to) {
      const obj = this.tempData.licensePlatesInfo.find(
        (item) => item.licensePlate == to
      );
      this.formValues = {
        ...this.formValues,
        ...obj,
      };
    },
  },
  created() {
    this.formValues = {
      ...this.dataForm,
      handoverDate: moment(new Date()).format("MM-DD-YYYY"),
      handoverTime: moment(new Date()).format("HH:mm"),
      dateTime: this.dateToday(),
    };
  },
};
</script>

<style lang="scss">
.vehicle-handover {
  .vdp-datepicker {
    .vdp-datepicker__calendar {
      right: 0;
    }
  }
}
</style>
