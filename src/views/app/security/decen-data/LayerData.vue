<template>
  <b-row v-if="objectData">
    <b-colxx class="disable-text-selection">
      <b-row v-if="isLoad">
        <b-colxx xxs="12">
          <h1>
            <strong>{{ objectData.formName }}</strong>
          </h1>
          <div class="top-right-button-container">
            <b-button-group>
              <b-dropdown right :text="edit.group_name" variant="primary">
                <template v-if="listGroup.length > 0">
                  <template v-for="(items, key) in listGroup">
                    <b-dropdown-item
                      @click="getListMenuChange(items)"
                      :key="key"
                    >
                      {{ items.text }}
                    </b-dropdown-item>
                  </template>
                </template>
              </b-dropdown>
            </b-button-group>
          </div>
          <div class="mb-2 mt-2"></div>
          <div class="separator mb-5" />
        </b-colxx>
      </b-row>
      <template v-if="isLoad">
        <b-row class="mb-4">
          <template v-if="items.length > 0">
            <template v-for="(item, index) in items">
              <b-colxx cols="12" class="mb-2" :key="index" :id="item.StationID">
                <b-card :class="{ 'card-option-camera d-flex flex-row': true }">
                  <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <p class="list-item-heading mb-0 truncate">
                        <i class="fad fa-layer-group mr-4"></i>
                        {{ item.StationName }}
                      </p>
                      <p
                        class="list-item-heading mb-0 truncate text-muted text-small"
                      >
                        {{ item.StationAddress }}
                      </p>
                      <b
                        class="mb-0 truncate"
                        style="opacity: 0.5"
                        v-if="item.IsSelected === false"
                      >
                        {{ $t("status.non-active") }}
                      </b>
                      <b class="mb-0 truncate" style="opacity: 0.5" v-else>
                        {{ $t("status.active") }}
                      </b>
                    </div>
                    <div
                      class="custom-control custom-checkbox pl-2 align-self-center pr-4"
                    >
                      <b-form-checkbox
                        v-if="objectData.accessWrite === true"
                        v-model="item.IsSelected"
                        name="check-button"
                        switch
                        @change="checkActive(item)"
                      ></b-form-checkbox>
                      <b-form-checkbox
                        v-else
                        v-model="item.IsSelected"
                        name="check-button"
                        switch
                        disabled
                      ></b-form-checkbox>
                    </div>
                  </div>
                </b-card>
              </b-colxx>
            </template>
          </template>
        </b-row>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import groupAPI from "@/api/modules/groupAPI";

export default {
  data() {
    return {
      timer: 500,
      type: "MenuRight",
      isLoad: false,
      displayMode: "list",
      menuRight: [],
      items: null,
      // selectedItems: [],
      show: false,
      listGroup: [],
      edit: {
        group_id: null,
        group_name: null,
      },
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      setTimeout(() => {
        this.isLoad = true;
      }, this.timer / 2);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    checkActive(item) {
      let body = {
        GroupID: this.edit.group_id,
        GeoCode: "All",
        StationID: item.StationID,
        IsRight: handling.convertBooleanToBit(item.IsSelected),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      systemAPI
        .layerRightEdit(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            this.getListMenu(this.edit);
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenuChange(items) {
      this.edit = {
        group_id: items.value,
        group_name: items.text,
      };
      this.getListMenu(this.edit);
    },
    getListMenu(items) {
      let body = {
        GroupID: items.group_id,
        GeoCode: "All",
      };
      systemAPI
        .layerRight(body)
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
      this.loadItems();
    },
    getListGroup() {
      this.listGroup = [];
      groupAPI
        .groupUserListActive()
        .then((val) => {
          if (val.status) {
            for (let i = 0; i < val.data.length; i++) {
              let obj = {
                value: val.data[i].GroupID,
                text: val.data[i].GroupName,
              };
              this.listGroup.push(obj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getListGroup();
  },
  computed: {
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.edit = {
        group_id: this.listGroup[0].value,
        group_name: this.listGroup[0].text,
      };
      this.getListMenu(this.edit);
    }, this.timer);
  },
};
</script>
<style>
.card-option-camera .card-body {
  padding: 0.5rem;
}
</style>
