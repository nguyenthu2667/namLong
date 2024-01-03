<template>
  <div v-if="items">
    <custom-table
      :data-table="items"
      :field-table="fields"
      :column-show="listColumnShow"
      :access-write="objectData.accessWrite"
      @status-edit="statusEdit"
    ></custom-table>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";

export default {
  props: ["data", "listColumnShow", "objectData", "groupID"],
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer: 500,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      items: this.data ?? null,
      objectKey: Object.keys(this.data[0]) ?? [],
    };
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
  },
  methods: {
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
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
    statusEdit(data) {
      let body = {
        GeoCode: "MainTenance",
        GroupID: this.groupID,
        UserIDCurent: this.userID,
        StationID: data.StationID,
        IsRight: handling.convertBooleanToBit(data.IsSelected),
      };
      systemAPI
        .editStationRights(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              // this.handleReload()
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              // this.handleReload()
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
    await this.getColumn("StationRights_Maintenance");
  },
  watch: {
    items() {
      this.getColumn("StationRights_Maintenance");
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
  },
};
</script>
