<template>
  <div>
    <b-row>
      <template v-for="(arr, i1) in data">
        <b-col :key="i1" lg="6" v-if="arr && arr.length > 0">
          <div class="box-content mb-3">
            <div class="title">
              <strong>
                {{
                  arr[0].FilterColumn.toUpperCase() == "ROUTEID"
                    ? titleArr[0].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "TREEID"
                    ? titleArr[1].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "TREESTATUS"
                    ? titleArr[2].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "TREEGROUPID"
                    ? titleArr[3].toUpperCase()
                    : arr[0].FilterColumn.toUpperCase() == "TREETYPEID"
                    ? titleArr[4].toUpperCase()
                    : null
                }}
              </strong>
            </div>
            <div
              v-if="arr[0].FilterColumn.toUpperCase() == 'ROUTEID'"
              class="content"
            >
              <template v-if="arrRoute && arrRoute.length > 0">
                <treeselect
                  class="tree-select-radio"
                  :options="arrRoute"
                  v-model="arrSelectedRoute"
                  placeholder="Tìm kiếm..."
                  :max-height="null"
                  :hide-control="false"
                  :dropdownpopover="false"
                  :multiple="true"
                  :collapse-menu-padding="true"
                  :show-count="true"
                  :defaultExpandLevel="3"
                  :alwaysOpen="true"
                  @select="flyToEmit"
                >
                  <label
                    slot="option-label"
                    slot-scope="{ node, labelClassName }"
                    :class="labelClassName"
                  >
                    <strong style="color: #6e6e6e">
                      {{ node.label }}
                      <span> ({{ node.raw.CountValues }}) </span>
                    </strong>
                  </label>
                </treeselect>
              </template>
              <template v-else>
                <p class="p-3 text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'TREEID'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    :checked="item.isChecked"
                    @input="handleSelect(item.TreeID, 'TREEID')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'TREESTATUS'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    :checked="item.isChecked"
                    @input="handleSelect(item.TreeStatus, 'TREESTATUS')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'TREEGROUPID'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    :checked="item.isChecked"
                    @input="handleSelect(item.TreeGroupID, 'TREEGROUPID')"
                  >
                    <strong style="color: #6e6e6e">{{ item.Name }}</strong>
                  </b-form-checkbox>
                </div>
              </template>
            </div>
            <div
              v-else-if="arr[0].FilterColumn.toUpperCase() == 'TREETYPEID'"
              class="content"
            >
              <template v-for="(item, i2) in arr">
                <div :key="i2">
                  <b-form-checkbox
                    :checked="item.isChecked"
                    @input="handleSelect(item.TreeTypeID, 'TREETYPEID')"
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
  props: ["data"],
  components: {
    Treeselect,
  },
  data() {
    return {
      titleArr: [
        "Tìm theo tuyến",
        "Tìm theo cây",
        "Tìm theo tình trạng",
        "Tìm theo nhóm",
        "Tìm theo loại",
      ],
      arrSelectedRoute: [],
      arrSelectedTreeID: [],
      arrSelectedStatus: [],
      arrSelectedGroup: [],
      arrSelectedType: [],
      arrRoute: null,
    };
  },
  async created() {
    await this.handleData();
  },
  methods: {
    flyToEmit(obj) {
      if (obj) {
        this.$emit("flyToRegion", obj);
      }
    },
    handleSelect(id, key) {
      switch (key.toUpperCase()) {
        case "TREEID":
          const isCheckID = this.arrSelectedTreeID.every((idS) => idS != id);
          if (isCheckID == true) {
            this.arrSelectedTreeID.push(id);
          } else {
            this.arrSelectedTreeID = this.arrSelectedTreeID.filter(
              (idS) => idS != id
            );
          }
          break;
        case "TREESTATUS":
          const isCheckStatus = this.arrSelectedStatus.every(
            (idS) => idS != id
          );
          if (isCheckStatus == true) {
            this.arrSelectedStatus.push(id);
          } else {
            this.arrSelectedStatus = this.arrSelectedStatus.filter(
              (idS) => idS != id
            );
          }
          break;
        case "TREEGROUPID":
          const isCheckGroup = this.arrSelectedGroup.every((idS) => idS != id);
          if (isCheckGroup == true) {
            this.arrSelectedGroup.push(id);
          } else {
            this.arrSelectedGroup = this.arrSelectedGroup.filter(
              (idS) => idS != id
            );
          }
          break;
        case "TREETYPEID":
          const isCheckType = this.arrSelectedType.every((idS) => idS != id);
          if (isCheckType == true) {
            this.arrSelectedType.push(id);
          } else {
            this.arrSelectedType = this.arrSelectedType.filter(
              (idS) => idS != id
            );
          }
          break;
      }
    },
    handleData() {
      if (this.data?.length > 0) {
        this.data.forEach((arr) => {
          if (arr[0].FilterColumn.toUpperCase() == "ROUTEID") {
            this.arrRoute = [];
            this.recursiveDataRegion(arr, 0, this.arrRoute);
          } else {
            arr.forEach((item) => {
              item.isChecked = false;
            });
          }
        });
      }
    },
    recursiveDataRegion(arr, parentID, result) {
      if (!arr) return;
      arr.forEach((item) => {
        if (item["ParentID"] != parentID) return;
        let n = [];
        this.recursiveDataRegion(arr, item["RouteID"], n);
        if (n.length > 0) {
          result.push({
            id: item["RouteID"],
            label: item["Name"],
            RouteID: item["RouteID"],
            Name: item["Name"],
            FilterType: item["FilterType"],
            Level: item["Level"],
            CountValues: item["CountValues"],
            children: n,
          });
        } else {
          result.push({
            id: item["RouteID"],
            label: item["Name"],
            RouteID: item["RouteID"],
            Name: item["Name"],
            FilterType: item["FilterType"],
            Level: item["Level"],
            CountValues: item["CountValues"],
          });
        }
      });
    },
    handleSubmit() {
      let body = {
        DataCode: "TREE",
        MapFilter: [],
      };
      if (this.arrSelectedRoute?.length > 0) {
        let obj = {
          GeoCode: "TREE",
          ColName: "RouteID",
          Filters: this.arrSelectedRoute.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedTreeID?.length > 0) {
        let obj = {
          GeoCode: "TREE",
          ColName: "TreeID",
          Filters: this.arrSelectedTreeID.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedStatus?.length > 0) {
        let obj = {
          GeoCode: "TREE",
          ColName: "TreeStatus",
          Filters: this.arrSelectedStatus.join(),
        };
        body.MapFilter.push(obj);
      }
      if (this.arrSelectedGroup?.length > 0) {
        let obj = {
          GeoCode: "TREE",
          ColName: "TreeGroupID",
          Filters: this.arrSelectedGroup.join(),
        };
      }
      if (this.arrSelectedType?.length > 0) {
        let obj = {
          GeoCode: "TREE",
          ColName: "TreeTypeID",
          Filters: this.arrSelectedType.join(),
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
