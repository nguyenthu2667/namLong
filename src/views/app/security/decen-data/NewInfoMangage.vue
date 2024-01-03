<template>
  <b-row v-if="objectData">
    <b-colxx class="disable-text-selection">
      <!-- <b-row>
        <b-colxx xxs="12">
          <h1>
            <strong>{{ objectData.formName }}</strong>
          </h1>
          <div class="top-right-button-container mt-4">
            <b-dropdown
              right
              :text="edit.group_name ? edit.group_name : 'loading..'"
              variant="primary"
              style="min-width: 120px"
            >
              <template v-if="listGroup.length > 0" v-for="items in listGroup">
                <b-dropdown-item @click="getListMenuChange(items)">
                  {{ items.text }}
                </b-dropdown-item>
              </template>
            </b-dropdown>
          </div>
          <div v-if="listGeoCode && listGeoCode.length > 0" class="mb-2 ml-2">
            <b-dropdown
              id="dropdown-form"
              ref="dropdown"
              left
              variant="empty"
              toggle-class="p-0"
              no-caret
              class="pb-1"
            >
              <template slot="button-content">
                <span v-b-toggle.collapse-header>
                  <i class="fad fa-cog" style="font-size: 18px"></i>
                </span>
              </template>
              <b-dropdown-form>
                <b-form-input
                  class="mt-1"
                  id="search-input"
                  type="search"
                  size="sm"
                  v-model="searchText"
                  :placeholder="$t('panel.search-input-monitor')"
                  style="min-width: 200px"
                ></b-form-input>
                <template v-if="searchText && searchText !== ''">
                  <template v-if="optionSearch(searchText).length > 0">
                    <p class="mt-3 mb-0 text-muted font-italic text-small">
                      {{ $t("panel.total") }}
                      {{ optionSearch(searchText).length }}
                      {{ $t("panel.result") }}
                    </p>
                  </template>
                  <template v-else>
                    <p class="mt-3 mb-0 text-muted font-italic text-small">
                      {{ $t("panel.non-data") }}
                    </p>
                  </template>
                </template>
                <template v-else>
                  <p class="mt-3 mb-0 text-muted font-italic text-small">
                    {{ $t("panel.total") }} {{ listGeoCode.length }}
                    {{ $t("panel.result") }}
                  </p>
                </template>
              </b-dropdown-form>
              <b-dropdown-divider></b-dropdown-divider>
              <vue-perfect-scrollbar
                class="list-item-station-option"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <template v-if="searchText && searchText !== ''">
                  <b-dropdown-item
                    v-for="(station, index) in optionSearch(searchText)"
                    :key="index"
                    @click="changeSelectedGeoCode(station)"
                  >
                    <span class="item-station-option">
                      {{ station.text }}
                    </span>
                  </b-dropdown-item>
                </template>
                <template v-else>
                  <b-dropdown-item
                    v-for="(station, index) in listGeoCode"
                    :key="index"
                    @click="changeSelectedGeoCode(station)"
                  >
                    <span class="item-station-option">
                      {{ station.text }}
                    </span>
                  </b-dropdown-item>
                </template>
              </vue-perfect-scrollbar>
            </b-dropdown>
            <template v-if="selectedGeoCode">
              <span class="ml-2 h5 text-muted">
                <strong>{{ selectedGeoCode.text }}</strong>
              </span>
            </template>
          </div>

          <div class="ml-3 mb-2"></div>
          <div class="separator mb-5" />
        </b-colxx>
      </b-row> -->
      <b-card>
        <custom-table
          :data-table="items"
          :field-table="fields"
          :column-show="listColumnShow"
          :access-write="objectData.accessWrite"
          :select-mode="selectMode"
          :rowPage="10"
          @row-selected="rowSelected"
          @status-edit="statusEdit"
        ></custom-table>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
// import CustomTables from "@/components/Table/CustomTables";
import CustomTables from "@/views/app/security/decen-data/CustomTables";
import MenuListItem from "../../config/system/component/MenuListItem.vue";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import groupAPI from "@/api/modules/groupAPI";

export default {
  props: ["id", "currentGeoCode"],
  components: {
    "menu-list-item": MenuListItem,
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer: 500,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      menuRight: [],
      selectedItems: null,
      listGroup: [],
      listGeoCode: [],
      selectedGeoCode: null,
      edit: {
        group_id: null,
        group_name: null,
      },
      items: null,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      listActiveStationID: [],
      //search
      searchText: "",
      search: "",
    };
  },
  methods: {
    //search
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.listGeoCode.forEach((val) => {
          if (val.text.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    //
    changeSelectedGeoCode(item) {
      // this.selectedGeoCode = item;
      this.getKeyTable(this.edit);
      this.getData(this.edit);
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getListMenuChange(items) {
      this.edit = {
        group_id: items.value,
        group_name: items.text,
      };
      this.getKeyTable(this.edit);
      this.getData(this.edit);
    },
    getKeyTable(items) {
      let body = {
        GroupID: items.group_id,
        GeoCode: this.selectedGeoCode.value,
        UserIDCurent: this.userID,
      };
      systemAPI
        .stationRights(body)
        .then((val) => {
          if (val.status) {
            this.objectKey =
              val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(items) {
      let body = {
        GeoCode: this.selectedGeoCode.value,
        GroupID: items.group_id,
        UserIDCurent: this.userID,
      };
      systemAPI
        .stationRights(body)
        .then((val) => {
          if (val.status) {
            this.listActiveStationID = [];
            this.items = val.data;
            this.items.forEach((item) => {
              item.IsSelected = handling.convertBitToBoolean(item.IsSelected);
              if (item.IsSelected === true) {
                this.listActiveStationID.push(item.StationID);
              }
            });
          } else {
            this.items = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    getOption() {
      this.listGeoCode = [];
      systemAPI
        .getListGeoCode()
        .then((val) => {
          if (val.status) {
            for (let i = 0; i < val.data.length; i++) {
              let obj = {
                id: val.data[i].DataTypeID,
                value: val.data[i].GeoCode,
                text: val.data[i].DataTypeName,
                icon: val.data[i].Icon,
              };
              this.listGeoCode.push(obj);
            }
            // this.selectedGeoCode = this.listGeoCode[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };

      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data) {
      if (data.IsSelected === true) {
        this.listActiveStationID.push(data.StationID);
      } else {
        let result = this.listActiveStationID.find(
          (id) => id === data.StationID
        );
        this.listActiveStationID = this.listActiveStationID.filter(
          (id) => id !== result
        );
      }
      let listStation = this.listActiveStationID.join(",");
      console.log(this.selectedGeoCode);
      let body = {
        GeoCode: this.selectedGeoCode.value,
        GroupID: this.edit.group_id,
        UserIDCurent: this.userID,
        StationID: data.StationID,
        IsRight: handling.convertBooleanToBit(data.IsSelected),
      };
      systemAPI
        .editStationRights(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData(this.edit);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData(this.edit);
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
    await this.getOption();
    await this.getColumn("stationRights");
  },
  watch: {
    items() {
      this.getColumn("stationRights");
      this.getKeyTable(this.edit);
    },
    id() {
      this.edit = {
        ...this.edit,
        group_id: this.id,
      };
      this.getKeyTable(this.edit);
      this.getData(this.edit);
    },
    // currentGeoCode() {
    //   const obj = this.listGeoCode.find(item => item.id == this.currentGeoCode.StationID)
    //   if(obj) {
    //     this.selectedGeoCode = obj
    //     this.changeSelectedGeoCode()
    //   }
    //   else {
    //     this.selectedGeoCode = null
    //   }
    // },
    changeCurrentCodeAndListGeoCode() {
      if(this.currentGeoCode) {
        const obj = this.listGeoCode.find(
          (item) => item.id == this.currentGeoCode.StationID
        );
        if (obj) {
          this.selectedGeoCode = obj;
          this.changeSelectedGeoCode();
        } else {
          this.selectedGeoCode = null;
        }
      }
      else {
        this.selectedGeoCode = null;
      }
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
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
    changeCurrentCodeAndListGeoCode() {
      return {
        currentGeoCode: this.currentGeoCode,
        listGeoCode: this.listGeoCode,
      };
    },
  },
  mounted() {
    this.edit = {
      ...this.edit,
      group_id: this.id,
    };
    // setTimeout(() => {
    //   this.edit = {
    //     group_id: this.listGroup[0].value,
    //     group_name: this.listGroup[0].text,
    //   };
    //   this.getKeyTable(this.edit);
    //   this.getData(this.edit);
    // }, this.timer);
    // this.getKeyTable(this.edit);
    // this.getData(this.edit);
  },
};
</script>
<style></style>
