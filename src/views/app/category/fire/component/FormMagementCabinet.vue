<template>
  <div>
    <template v-if="dataForm">
      <div class="form-management-cabinet">
        <b-row>
          <b-col lg="2">
            <b-form-group label="ID">
              <b-form-input
                :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                disabled
                class="text-center"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-group
              :label="dataForm.Name[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Name[3]"
            >
              <b-form-input
                v-model="dataForm.Name[1]"
                @input="resetStateInput('Name')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-group
              :label="dataForm.NameExtention1[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.NameExtention1[3]"
            >
              <b-form-input v-model="dataForm.NameExtention1[1]"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.ConnectTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.ConnectTypeID[3]"
            >
              <b-form-select
                v-model="dataForm.ConnectTypeID[1]"
                :options="dataFormOptions.ConnectTypeID"
                @input="resetStateInput('ConnectTypeID')"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.PowerTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.PowerTypeID[3]"
            >
              <b-form-select
                v-model="dataForm.PowerTypeID[1]"
                :options="dataFormOptions.PowerTypeID"
                @input="resetStateInput('PowerTypeID')"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.SessionData[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.SessionData[3]"
            >
              <b-form-input
                v-model="dataForm.SessionData[1]"
                @input="resetStateInput('SessionData')"
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group :label="dataForm.ImageLink[0] + ':'">
              <b-form-file
                :placeholder="$t('update-image') + '...'"
                v-model="listImage"
                :file-name-formatter="formatNames"
                multiple
                accept="image/*"
                :browse-text="$t('browse-text')"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col lg="8">
            <b-form-group :label="dataForm.Note[0]">
              <b-form-input v-model="dataForm.Note[1]"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <template
              v-if="
                (listImageBase64 && listImageBase64.length > 0) ||
                (dataForm.ImageLink[1] && dataForm.ImageLink[1].length > 0)
              "
            >
              <div class="box">
                <carousel
                  v-if="isShowCarousel"
                  :autoplay="true"
                  :loop="true"
                  :autoplayLoop="true"
                  :autoplayTimeout="3000"
                  :perPage="2"
                  :navigationEnabled="true"
                >
                  <template
                    v-if="listImageBase64 && listImageBase64.length > 0"
                  >
                    <template v-for="(img, i) in listImageBase64">
                      <slide :key="i + 'a'" style="" class="slide">
                        <div style="height: 249px; position: relative">
                          <b-img
                            style="width: 100%; height: 249px"
                            :src="img.Images"
                          />

                          <b-badge
                            style="
                              background: red !important;
                              position: absolute;
                              right: 0px;
                              top: -5px;
                              cursor: pointer;
                            "
                            @click.stop.prevent="removeBase64(i, 'BASE64')"
                          >
                            X
                          </b-badge>
                        </div>
                      </slide>
                    </template>
                  </template>
                  <template
                    v-if="
                      dataForm.ImageLink[1] && dataForm.ImageLink[1].length > 0
                    "
                  >
                    <template v-for="(img, i) in dataForm.ImageLink[1]">
                      <slide :key="i + 'b'" class="slide">
                        <div style="height: 249px; position: relative">
                          <b-img
                            style="width: 100%; height: 249px"
                            :src="img.ImageLink"
                          />

                          <b-badge
                            style="
                              background: red !important;
                              position: absolute;
                              right: 0px;
                              top: -5px;
                              cursor: pointer;
                            "
                            @click.stop.prevent="
                              removeBase64(i, 'DATAFORM', 'ImageLink')
                            "
                          >
                            X
                          </b-badge>
                        </div>
                      </slide>
                    </template>
                  </template>
                </carousel>
              </div>
            </template>
            <template v-else>
              <div style="height: 249px">
                <b-img
                  style="width: 100%; height: 249px; background: #c1c1c1"
                  :src="'https://dainam.edu.vn/img/system/no-image.png'"
                />
              </div>
            </template>
          </b-col>
        </b-row>
      </div>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
import shareAPI from "@/api/modules/shareAPI";

export default {
  props: ["dataForm", "listImageBase64"],
  data() {
    return {
      dataFormOptions: {
        ConnectTypeID: [],
        PowerTypeID: [],
      },
      listImage: null,
      // listImageBase64: [],
      isShowCarousel: true,
    };
  },
  watch: {
    dataForm(newVal) {
      if (newVal) {
        this.isShowCarousel = false;
        setTimeout(() => {
          this.isShowCarousel = true;
        }, 300);
      }
    },
    listImage(to, from) {
      if (to && to.length > 0) {
        // this.dataForm['ImageLink'][1] = []
        // this.listImageBase64.length = 0
        for (let i = 0; i < to.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(to[i]);
          setTimeout(() => {
            this.listImageBase64.push({
              ID: to[i].lastModified + i,
              Images: reader.result,
            });
          }, 500);
        }
      }
    },
  },
  mounted() {
    this.isShowCarousel = false;
    setTimeout(() => {
      this.isShowCarousel = true;
    }, 300);
  },
  created() {
    this.getPowerTypeOption();
    this.getConnectTypeOption();
  },
  methods: {
    resetStateInput(field) {
      //reset lại state khi có input để nó mất cái dòng cảnh báo đi
      if (this.dataForm[field][3] === false) {
        this.dataForm[field][3] = true;
      }
    },
    getPowerTypeOption() {
      shareAPI
        .sharePowerTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.PowerTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].PowerTypeName,
                    value: val.data[i].PowerTypeID,
                  };
                  this.dataFormOptions.PowerTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getConnectTypeOption() {
      shareAPI
        .shareConnectTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ConnectTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].ConnectTypeName,
                    value: val.data[i].ConnectTypeID,
                  };
                  this.dataFormOptions.ConnectTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeBase64(index, key, property) {
      this.isShowCarousel = false;
      setTimeout(() => {
        if (key === "BASE64") {
          let remove = this.listImageBase64.splice(index, 1);
        }
        if (key === "DATAFORM" && property) {
          let remove = this.dataForm[property][1].splice(index, 1);
        }
        this.isShowCarousel = true;
      }, 100);
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} ${this.$t("form.image")}`;
    },
  },
};
</script>

<style lang="scss">
.form-management-cabinet {
  .VueCarousel-pagination {
    display: none;
  }
  .b-form-file {
    height: 36px;
    .custom-file-label {
      height: 36px;
      padding: 0.5rem 0.75rem;
      margin-bottom: 0;
      overflow: hidden;
      &::after {
        padding: 0.5rem 0.75rem;
        height: 36px;
      }
      // overflow: hidden;
    }
  }
}
</style>
