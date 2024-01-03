<template>
  <div>
    <template v-if="dataForm">
      <b-col
        lg="12"
        class="pl-0"
        style="max-height: calc(100% - 15px); margin-top: -1px"
      >
        <b-row>
          <b-col lg="6">
            <b-row>
              <b-col lg="2">
                <b-form-group label="ID">
                  <b-form-input
                    class="text-center"
                    :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col lg="5">
                <b-form-group
                  v-if="currentMode != `adding`"
                  :label="dataForm.IsActive[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.IsActive[3]"
                >
                  <div class="d-flex">
                    <b-form-radio
                      v-model="dataForm.IsActive[1]"
                      :value="1"
                      class="ml-2"
                      :disabled="
                        currentMode === 'adding' || currentMode === 'editing'
                          ? false
                          : true
                      "
                    >
                      {{ $t("npl.using") }}
                    </b-form-radio>
                    <b-form-radio
                      v-model="dataForm.IsActive[1]"
                      :value="0"
                      class="ml-2"
                      :disabled="
                        currentMode === 'adding' || currentMode === 'editing'
                          ? false
                          : true
                      "
                    >
                      {{ $t("npl.not-use") }}
                    </b-form-radio>
                  </div>
                </b-form-group>
              </b-col>
              <b-col lg="5">
                <b-form-group
                  :label="dataForm.RegionName[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.RegionName[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input v-model="dataForm.RegionName[1]" />
                </b-form-group>
              </b-col>
              <b-col lg="7">
                <b-form-group
                  :label="dataForm.RegionParentID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.RegionParentID[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <template
                    v-if="currentMode != 'adding' && currentMode != 'editing'"
                  >
                    <!-- <b-form-input v-model="item" /> -->
                    <template v-if="dataForm.RegionParentID[1] === 0">
                      <b-form-input v-model="textOptionDataNull" />
                    </template>
                    <template
                      v-for="formatItem in item.map((data) => ({
                        RegionID: data.RegionID,
                        RegionName: data.RegionName,
                      }))"
                      v-if="dataForm.RegionParentID[1] === formatItem.RegionID"
                    >
                      <!-- {{formatItem.RegionID}}
                      {{dataForm.RegionParentID[1]}}  -->

                      <b-form-input v-model="formatItem.RegionName" />
                    </template>
                  </template>

                  <template v-else>
                    <!-- options -->
                    <treeselect
                      v-model="dataForm.RegionParentID[1]"
                      name="tree-select-input"
                      :searchable="searchable"
                      :close-on-select="closeOnSelect"
                      :options="dataFormOption.RegionParentID"
                      :max-height="500"
                      :placeholder="placeholder"
                      :default-expand-level="keyShow"
                      :no-results-text="noResultsText"
                      class="zindex-treeselect"
                    />
                  </template>
                </b-form-group>
              </b-col>

              <b-col lg="5">
                <b-form-group
                  :label="dataForm.RegionNameExtention1[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.RegionNameExtention1[3]"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                >
                  <b-form-input v-model="dataForm.RegionNameExtention1[1]" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="4">
            <b-form-group :label="dataForm.Note[0]">
              <b-form-textarea
                v-model="dataForm.Note[1]"
                rows="2"
                max-rows="6"
                style="height: 113px"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
export default {
  components: {
    Treeselect,
  },
  props: [
    "dataForm",
    "currentMode",
    "dataFormOption",
    "keyShow",
    "loadOptions",
    "item",
  ],
  data() {
    return {
      searchable: true,
      closeOnSelect: true,
      placeholder: this.$t("other.find"),
      noResultsText: this.$t("data.no-result"),
      textOptionDataNull: "Không có"
    };
  },
  // computed: {
  //   colorWarning() {
  //     if (
  //       this.dataFormOption.LevelCode &&
  //       this.dataFormOption.LevelCode.length > 0 &&
  //       this.dataForm.LevelCode
  //     ) {
  //       let option = this.dataFormOption.LevelCode;
  //       if (this.dataForm.LevelCode[1]) {
  //         let result = option.find(
  //           (el) => el.value == this.dataForm.LevelCode[1]
  //         );
  //         return result.statusColor;
  //       } else {
  //         return option[0].statusColor;
  //       }
  //     } else {
  //       return "gray";
  //     }
  //   },
  //   // returnLocationLng: function () {
  //   //   let key = Object.keys(this.dataForm);
  //   //   for (let i = 0; i < key.length; i++) {
  //   //     if (
  //   //       this.dataForm[key[i]][2].split("-")[1] &&
  //   //       this.dataForm[key[i]][2].split("-")[1].toUpperCase() === "LNG"
  //   //     ) {
  //   //       return this.dataForm[key[i]][1];
  //   //     }
  //   //   }
  //   // },
  //   // returnLocationLat: function () {
  //   //   let key = Object.keys(this.dataForm);
  //   //   for (let i = 0; i < key.length; i++) {
  //   //     if (
  //   //       this.dataForm[key[i]][2].split("-")[1] &&
  //   //       this.dataForm[key[i]][2].split("-")[1].toUpperCase() === "LAT"
  //   //     ) {
  //   //       return this.dataForm[key[i]][1];
  //   //     }
  //   //   }
  //   // },
  // },
  // methods: {
  //   convertBody(body) {
  //     if (body.hasOwnProperty("IsSale")) {
  //       body.IsSale = handling.convertBooleanToBit(body.IsSale);
  //     }
  //     if (body.hasOwnProperty("HasMarker")) {
  //       body.HasMarker = handling.convertBooleanToBit(body.HasMarker);
  //     }
  //     if (body.hasOwnProperty("SideType")) {
  //       body.SideType = handling.convertBooleanToBit(body.SideType);
  //     }
  //     if (body.hasOwnProperty("Note") && body.Note == null) {
  //       body.Note = "";
  //     }
  //     if (body.hasOwnProperty("IsSchedule")) {
  //       if (
  //         body.IsSchedule === false ||
  //         body.IsSchedule == 0 ||
  //         body.IsSchedule === null
  //       ) {
  //       } else {
  //         body.ScheduleDate = this.date + " " + this.time;
  //       }
  //       body.IsSchedule = handling.convertBooleanToBit(body.IsSchedule);
  //     }
  //     if (body.hasOwnProperty("DataKey")) {
  //       body.DataKey = body.DataKey.toString();
  //     }
  //     // if (body.hasOwnProperty('LevelCode')) {
  //     //   body.LevelCode = body.LevelCode.toString()
  //     // }
  //     if (body.hasOwnProperty("DataTypeID") && this.dataFormOption.DataTypeID) {
  //       if (this.geoCodeBySelected == null) {
  //         body.GeoCode = this.dataFormOption.DataTypeID.find(
  //           (el) => el.value == body.DataTypeID
  //         ).geoCode;
  //       } else {
  //         body.GeoCode = this.geoCodeBySelected;
  //       }
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
