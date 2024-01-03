<template>
  <div>
    <b-row>
      <template v-for="(arr, i1) in data">
        <b-col :key="i1" lg="6" v-if="arr && arr.length > 0">
          <div class="box-content mb-3">
            <div class="title">
              <strong>
                {{
                  arr[0].FilterColumn.toUpperCase() == "REGIONID"
                    ? titleArr[0].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "LAMPERROR"
                    ? titleArr[1].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "LAMPDISCONNECT"
                    ? titleArr[2].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "LAMPON"
                    ? titleArr[3].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "LAMPMOVED"
                    ? titleArr[4].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "LAMPOPEN"
                    ? titleArr[5].toUpperCase()
                    : null
                }}
              </strong>
            </div>
            <div
              v-if="arr[0].FilterColumn.toUpperCase() == 'REGIONID'"
              class="content"
            >
              <template v-if="arrRoute && arrRoute.length > 0">
                <treeselect
                  class="light-select-radio"
                  :options="arrRoute"
                  v-model="arrSelectedRoute"
                  placeholder="Tìm kiếm..."
                  :max-height="null"
                  :hide-control="false"
                  :dropdownpopover="false"
                  :multiple="true"
                  :collapse-menu-padding="true"
                  :defaultExpandLevel="3"
                  :alwaysOpen="true"
                >
                </treeselect>
              </template>
              <template v-else>
                <p class="p-3 text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'LAMPERROR'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    :v-model="item.isChecked"
                    @change="handleSelect(item.LampError, 'LAMPERROR')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'LAMPDISCONNECT'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    v-model="item.isChecked"
                    @change="
                      handleSelect(item.LampDisconnect, 'LAMPDISCONNECT')
                    "
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'LAMPON'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    v-model="item.isChecked"
                    @change="handleSelect(item.LampOn, 'LAMPON')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'LAMPMOVED'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    v-model="item.isChecked"
                    @change="handleSelect(item.LampMoved, 'LAMPMOVED')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'LAMPOPEN'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    v-model="item.isChecked"
                    @change="handleSelect(item.LampOpen, 'LAMPOPEN')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
          </div>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import mapAPI from "@/api/modules/mapAPI";

export default {
  props: ["data", "code"],
  components: {
    Treeselect,
  },
  data() {
    return {
      titleArr: [
        "Tìm theo tuyến",
        "Tìm theo đèn lỗi",
        "Tìm theo đèn bị mất kết nối",
        "Tìm theo đèn bật",
        "Tìm theo tủ di chuyển",
        "Tìm theo tủ mở",
      ],
      arrSelectedRoute: [],
      arrSelectedError: [],
      arrSelectedDisconnect: [],
      arrSelectedOn: [],
      arrSelectedMoved: [],
      arrSelectedOpen: [],
      arrRoute: null,
    };
  },
  async created() {
    await this.handleData();
  },
  methods: {
    flyToEmit(obj) {
      console.log(obj);
      if (obj) {
        this.$emit("flyToRegion", obj);
      }
    },
    handleSelect(id, key) {
      console.log(id, key);
      switch (key.toUpperCase()) {
        case "LAMPERROR":
          const isCheckID = this.arrSelectedError.every((idS) => idS != id);
          if (isCheckID == true) {
            this.arrSelectedError.push(id);
          } else {
            this.arrSelectedError = this.arrSelectedError.filter(
              (idS) => idS != id
            );
          }
          break;
        case "LAMPDISCONNECT":
          const isCheckStatus = this.arrSelectedDisconnect.every(
            (idS) => idS != id
          );
          if (isCheckStatus == true) {
            this.arrSelectedDisconnect.push(id);
          } else {
            this.arrSelectedDisconnect = this.arrSelectedDisconnect.filter(
              (idS) => idS != id
            );
          }
          break;
        case "LAMPON":
          const isCheckGroup = this.arrSelectedOn.every((idS) => idS != id);
          if (isCheckGroup == true) {
            this.arrSelectedOn.push(id);
          } else {
            this.arrSelectedOn = this.arrSelectedOn.filter((idS) => idS != id);
          }
          break;
        case "LAMPMOVED":
          const isCheckType = this.arrSelectedMoved.every((idS) => idS != id);
          if (isCheckType == true) {
            this.arrSelectedMoved.push(id);
          } else {
            this.arrSelectedMoved = this.arrSelectedMoved.filter(
              (idS) => idS != id
            );
          }
          break;

        case "LAMPOPEN":
          const isCheckOpen = this.arrSelectedOpen.every((idS) => idS != id);
          if (isCheckOpen == true) {
            this.arrSelectedOpen.push(id);
          } else {
            this.arrSelectedOpen = this.arrSelectedOpen.filter(
              (idS) => idS != id
            );
          }
          break;
      }
    },
    handleData() {
      if (this.data?.length > 0) {
        this.data.forEach((arr) => {
          if (arr[0].FilterColumn.toUpperCase() == "REGIONID") {
            this.arrRoute = [];
            this.recursiveDataRegion(arr, "0", this.arrRoute);
          } else {
            arr.forEach((item) => {
              item.isChecked = false;
            });
          }
        });
      }
    },
    recursiveDataRegion(arr, parentID, result) {
      if (!arr?.length > 0) return;
      arr.forEach((item) => {
        if (item["ParentID"] != parentID) return;
        let n = [];
        this.recursiveDataRegion(arr, item["ID"], n);
        if (n.length > 0) {
          result.push({
            id: item["ID"],
            label: item["Name"],
            ParentID: item["ParentID"],
            Name: item["Name"],
            IsSelect: item["IsSelect"],
            FilterType: item["FilterType"],
            children: n,
          });
        } else {
          result.push({
            id: item["ID"],
            label: item["Name"],
            ParentID: item["ParentID"],
            Name: item["Name"],
            IsSelect: item["IsSelect"],
            FilterType: item["FilterType"],
          });
        }
      });
    },
    handleSubmit() {
      let body = {
        DataCode: this.code,
        MapFilter: [],
      };
      if (this.arrSelectedRoute?.length > 0) {
        let obj = {
          GeoCode: this.code,
          ColName: "RegionID",
          Filters: this.arrSelectedRoute.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedError?.length > 0) {
        let obj = {
          GeoCode: this.code,
          ColName: "LampError",
          Filters: this.arrSelectedError.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedDisconnect?.length > 0) {
        let obj = {
          GeoCode: this.code,
          ColName: "LampDisconnect",
          Filters: this.arrSelectedDisconnect.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedOn?.length > 0) {
        let obj = {
          GeoCode: this.code,
          ColName: "LampOn",
          Filters: this.arrSelectedOn.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedMoved?.length > 0) {
        let obj = {
          GeoCode: this.code,
          ColName: "LampMoved",
          Filters: this.arrSelectedMoved.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedOpen?.length > 0) {
        let obj = {
          GeoCode: this.code,
          ColName: "LampOpen",
          Filters: this.arrSelectedOpen.join(),
        };
        body.MapFilter.push(obj);
      }
      this.$emit("drawPolyGonWithin", body?.MapFilter);
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          if (val.status) {
            this.$emit("reloadData", val.data[0]);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.box-content {
  height: 200px;
  overflow: auto;
  background: #f9f9f9;
  padding: 5px;
}
</style>
