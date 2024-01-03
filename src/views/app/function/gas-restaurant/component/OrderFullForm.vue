<template>
  <div>
    <b-modal
      :id="nameForm"
      :ref="nameForm"
      :title="titleForm"
      @hidden="resetModal"
      v-if="dataForm"
      scrollable
      class="text-center"
      size="lg"
      :hide-footer="hideFooter"
    >
      <form ref="form">
        <b-row>
          <b-col md="12">
            <b-tabs content-class="mt-3" fill>
              <b-tab :title="$t('modal.order-details').toUpperCase()" active>
                <b-row>
                  <b-col md="12">
                    <b-alert
                      class="text-dark"
                      show
                      :style="{ 'background-color': dataForm['StatusColor'] }"
                    >
                      <span>
                        <strong>{{ dataForm["StatusName"] }}</strong>
                        - {{ $t("modal.at") }}:
                        <strong>
                          {{ convertDateTime(dataForm["StatusTime"]) }}
                        </strong>
                      </span>
                      <template
                        v-if="
                          dataForm['StatusID'] === -1 ||
                          dataForm['StatusID'] === 5
                        "
                      >
                        <br />
                        <span>
                          {{ $t("dashboards.reason") }}:
                          <strong>{{ dataForm["CancelNote"] }}</strong>
                        </span>
                      </template>
                    </b-alert>
                  </b-col>
                  <b-col md="6">
                    <b-form-group :label="$t('modal.delivery-code') + ':'">
                      <b-form-input
                        class="text-center"
                        v-model="dataForm['OID']"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group :label="$t('modal.order-code') + ':'">
                      <b-form-input
                        class="text-center"
                        v-model="dataForm['ReferenceID']"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="7">
                    <b-form-group :label="$t('modal.choose-store') + ':'">
                      <b-form-input
                        class="text-left"
                        v-model="dataForm['StationName']"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="5">
                    <b-form-group :label="$t('modal.delivery-date') + ':'">
                      <b-form-datepicker
                        :locale="locale"
                        v-model="dataForm['EstimateDelivery']"
                        disabled
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group :label="$t('modal.phone') + ':'">
                      <b-form-input
                        class="text-left"
                        v-model="dataForm['StationPhone']"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="8">
                    <b-form-group :label="$t('modal.address') + ':'">
                      <b-form-input
                        class="text-left"
                        v-model="dataForm['StationAddress']"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="12">
                    <b-form-group :label="$t('modal.description') + ':'">
                      <b-form-textarea
                        class="text-left"
                        v-model="dataForm['Note']"
                        rows="3"
                        max-rows="6"
                        disabled
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                  <template v-if="dataForm['Details'].length > 0">
                    <b-col md="12" class="mb-2">
                      <!-- <b-alert show variant="success" class="text-center"
                        ><strong>{{
                          $t("modal.list-product").toUpperCase()
                        }}</strong></b-alert
                      > -->
                      <span class="text-danger">
                        <i class="fad fa-shopping-cart mr-2"></i>
                        <span class="font-weight-bold mr-2 p-1">
                          {{ $t("modal.list-product").toUpperCase() }}
                        </span>
                      </span>
                    </b-col>
                    <template v-for="(gas, index) in dataForm['Details']">
                      <b-col md="12">
                        <span class="d-flex mb-2">
                          <span class="font-weight-bold pt-1 pb-1">
                            {{ index + 1 }}.
                            {{ gas.ItemName }}
                          </span>
                        </span>
                      </b-col>
                      <b-col md="2">
                        <b-form-group :label="$t('modal.quantity') + ':'">
                          <b-form-input
                            class="text-right"
                            v-model="gas.ItemQtty"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="5">
                        <b-form-group :label="$t('modal.price-vat') + ':'">
                          <b-form-input
                            class="text-right"
                            :id="'PriceVAT-input' + gas.ItemID"
                            :value="convertFloat(gas.PriceVAT)"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="5">
                        <b-form-group
                          :label="$t('modal.into-money') + ' (VNĐ):'"
                        >
                          <b-form-input
                            class="text-right"
                            :id="'Item_Amnt-input' + gas.ItemID"
                            :value="convertFloat(gas.Item_Amnt)"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="12">
                        <b-form-group>
                          <b-form-input
                            :id="'Note-input' + gas.ItemID"
                            v-model="gas.Note"
                            :placeholder="$t('modal.description') + '...'"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </template>
                  </template>
                  <b-col md="12" class="mb-2">
                    <span class="text-danger">
                      <i class="fad fa-tags mr-2"></i>
                      <span class="font-weight-bold mr-2 p-1">
                        {{ $t("modal.total-payment").toUpperCase() }}
                      </span>
                    </span>
                  </b-col>
                  <b-col md="3">
                    <b-form-group
                      :label="$t('modal.money-product') + ' (VNĐ):'"
                    >
                      <b-form-input
                        class="text-right"
                        id="Prd_Amnt-input"
                        :value="convertFloat(dataForm['Prd_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group
                      :label="$t('modal.money-deb_amnt') + ' (VNĐ):'"
                    >
                      <b-form-input
                        class="text-right"
                        id="Deb_Amnt-input"
                        :value="convertFloat(dataForm['Deb_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group :label="$t('modal.discount') + ' (VNĐ):'">
                      <b-form-input
                        class="text-right"
                        id="Dcn_Amnt-input"
                        :value="convertFloat(dataForm['Dcn_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group
                      :label="$t('modal.money-gas-return') + ' (VNĐ):'"
                    >
                      <b-form-input
                        class="text-right"
                        id="Ret_Amnt-input"
                        :value="convertFloat(dataForm['Ret_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <!-- // -->
                  <b-col md="4">
                    <b-form-group :label="$t('modal.total-money') + ' (VNĐ):'">
                      <b-form-input
                        class="text-right from-input_color-red"
                        id="Total_Amnt-input"
                        :value="convertFloat(dataForm['Total_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group
                      :label="$t('modal.money-pay_amnt') + ' (VNĐ):'"
                    >
                      <b-form-input
                        class="text-right from-input_color-green"
                        id="Pay_Amnt-input"
                        :value="convertFloat(dataForm['Pay_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group
                      :label="$t('modal.money-remain_amnt') + ' (VNĐ):'"
                    >
                      <b-form-input
                        class="text-right from-input_color-blue"
                        id="Remain_Amnt-input"
                        :value="convertFloat(dataForm['Remain_Amnt'])"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab :title="$t('modal.recovery-details').toUpperCase()">
                <b-row>
                  <template
                    v-if="dataForm['StatusID'] > 2 && dataForm['StatusID'] < 5"
                  >
                    <template v-if="dataForm['ReturnQuantitys'].length > 0">
                      <b-col md="12" class="mb-2">
                        <span class="text-danger">
                          <i class="fad fa-shopping-cart mr-2"></i>
                          <span class="font-weight-bold mr-2 p-1">
                            {{ $t("modal.recovery-product").toUpperCase() }}
                            <span style="color: blue">
                              ({{
                                dataForm["ReturnQttyUnit"]
                                  ? dataForm["ReturnQttyUnit"]
                                  : dataForm["ReturnQuantitys"].length
                              }}
                              {{ $t("modal.jar").toLowerCase() }} -
                              {{
                                dataForm["ReturnQttyKg"]
                                  ? dataForm["ReturnQttyKg"]
                                  : dataForm["ReturnQuantitys"]
                                      .map((item) => item.ItemKg)
                                      .reduce((prev, curr) => prev + curr, 0)
                              }}kg)
                            </span>
                          </span>
                        </span>
                      </b-col>
                      <template
                        v-for="(gasReturn, index) in dataForm[
                          'ReturnQuantitys'
                        ]"
                      >
                        <b-col md="12">
                          <span class="d-flex mb-2">
                            <span class="font-weight-bold pt-1 pb-1">
                              {{ index + 1 }}.{{ gasReturn.ItemName }}
                            </span>
                          </span>
                        </b-col>
                        <b-col md="2">
                          <b-form-group :label="$t('modal.sku') + ':'">
                            <b-form-input
                              class="text-left"
                              v-model="gasReturn.ItemCode"
                              disabled
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="2">
                          <b-form-group :label="$t('modal.number') + ' kg:'">
                            <b-form-input
                              class="text-right"
                              v-model="gasReturn.ItemKg"
                              disabled
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="8">
                          <b-form-group :label="$t('modal.description') + ':'">
                            <b-form-input
                              :id="'Note-input' + gasReturn.ItemID"
                              v-model="gasReturn.Note"
                              disabled
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </template>
                    </template>
                    <template v-if="dataForm['Attachs'].length > 0">
                      <b-col md="12" class="mb-3">
                        <span class="text-danger">
                          <i class="fad fa-images mr-2"></i>
                          <span class="font-weight-bold mr-2 p-1">
                            {{ $t("modal.attached-photo").toUpperCase() }}
                          </span>
                        </span>
                      </b-col>
                      <template
                        v-for="(imgReturn, index) in dataForm['Attachs']"
                      >
                        <b-col md="4">
                          <b-img
                            class="custom-image"
                            :id="
                              'imageReturn_' +
                              imgReturn.ReferenceID +
                              '_' +
                              index
                            "
                            :key="
                              'imageReturn_' +
                              imgReturn.ReferenceID +
                              '_' +
                              index
                            "
                            :alt="'Image Return ' + index"
                            @click="
                              openFullscreen(
                                'imageReturn_' +
                                  imgReturn.ReferenceID +
                                  '_' +
                                  index
                              )
                            "
                            :src="imgReturn.AttachData"
                            @error="handleImgError"
                            center
                          ></b-img>
                        </b-col>
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    <b-col md="12">
                      <strong class="text-danger font-italic">
                        {{ $t("modal.no-info") }}
                      </strong>
                    </b-col>
                  </template>
                </b-row>
              </b-tab>
              <b-tab :title="$t('modal.delivery-tracking').toUpperCase()">
                <b-row>
                  <template v-if="dataForm['DeliveryTimes'].length > 0">
                    <b-col md="12" class="mb-2">
                      <h3
                        class="font-weight-bold"
                        :style="{
                          color: dataForm['StatusColor'],
                        }"
                      >
                        {{ dataForm["StatusName"] }}
                      </h3>
                      <p class="font-italic">
                        {{ $t("modal.at") }}:
                        <strong>
                          {{ convertDateTime(dataForm["StatusTime"]) }}
                        </strong>
                      </p>
                    </b-col>
                    <b-col md="12">
                      <ol class="numbered" :style="custom">
                        <template
                          v-for="(item, index) in dataForm['DeliveryTimes']"
                        >
                          <li :key="index">
                            <p
                              class="ont-weight-bold mb-2"
                              :style="{
                                color:
                                  item.StatusID === 5
                                    ? 'red'
                                    : item.StatusID === 4
                                    ? 'green'
                                    : 'black',
                              }"
                            >
                              {{ item.StatusName }}
                            </p>
                            <p class="font-italic">
                              {{ convertDateTime(item.StatusTime) }}
                            </p>
                            <hr />
                          </li>
                        </template>
                      </ol>
                    </b-col>
                  </template>
                  <template v-else>
                    <b-col md="12">
                      <strong class="text-danger font-italic">
                        {{ $t("modal.no-info") }}
                      </strong>
                    </b-col>
                  </template>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>
<script>
import handling from "@/constants/handling";

export default {
  props: ["nameForm", "titleForm", "dataForm", "hideFooter"],
  data() {
    return {
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
    };
  },
  computed: {
    custom() {
      return (
        "counter-reset: numbered-list " +
        (this.dataForm["DeliveryTimes"].length + 1)
      );
    },
  },
  methods: {
    resetModal() {
      this.$emit("reset-modal");
    },
    convertFloat(n) {
      return handling.convertFloat(n);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    handleImgError(event) {
      event.target.src = require("@/assets/img/no-image.png");
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
  },
};
</script>
<style lang="scss" scoped>
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  padding: 0;
}

body {
  background-color: #fff;
  margin: 100px;
  padding: 20px;
}

ol.numbered {
  $bullet-line-width: 3px;
  $bullet-color: grey;
  $bullet-border-width: $bullet-line-width;
  $bullet-background-color: white;
  $bullet-size: 25px;
  border-left: $bullet-line-width solid $bullet-color;
  // counter-reset: numbered-list;
  margin-left: 10px;
  position: relative;
  list-style-type: none;

  li {
    font-size: 13px;
    line-height: 1.2;
    margin-bottom: 15px;
    padding-left: 30px;
    &:last-child {
      border-left: $bullet-line-width solid $bullet-background-color;
      margin-left: -$bullet-line-width;
    }

    &:before {
      $half-of-font-size: -0.5em;
      background-color: $bullet-color;
      border: $bullet-border-width solid $bullet-background-color;
      border-radius: 50%;
      color: $bullet-background-color;
      content: counter(numbered-list, decimal);
      counter-increment: numbered-list -1;
      display: block;
      font-weight: bold;
      width: $bullet-size + 5px;
      height: $bullet-size + 5px;
      margin-top: $half-of-font-size;
      line-height: $bullet-size;
      position: absolute;
      left: -$bullet-size / 2 - $bullet-line-width / 2 - $bullet-border-width;
      text-align: center;
    }
  }
}
.custom-image {
  border: 1px solid #d7d7d7;
  height: 150px;
  width: 100%;
}
.from-input_color-blue {
  color: blue;
  font-weight: 600;
  font-size: 14px;
}
.from-input_color-green {
  color: green;
  font-weight: 600;
  font-size: 14px;
}
.from-input_color-red {
  color: red;
  font-weight: 600;
  font-size: 14px;
}
</style>
