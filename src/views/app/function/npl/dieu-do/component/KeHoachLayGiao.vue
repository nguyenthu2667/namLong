<template>
  <div>
    <template v-for="(item, i) in arrKeHoachLayGiao">
      <b-row :key="i" class="bg-light pt-2 mb-2 position-relative">
        <b-button
          :key="'btn-' + i"
          class="ml-1 mb-1"
          squared
          :variant="`danger`"
          size="sm"
          style="
            height: 24px;
            padding: 1px;
            padding-left: 3px;
            padding-right: 3px;
            position: absolute;
            top: 0px;
            right: 15px;
            z-index: 1;
          "
          @click="removeByIndex(i)"
        >
          <i class="far fa-trash-alt"></i> <b>Xóa</b>
        </b-button>
        <b-col lg="12">
          <div class="text-info">
            <strong
              ><i class="fas fa-truck-loading mr-1"></i>ĐIỂM LẤY HÀNG</strong
            >
          </div>
          <b-row>
            <b-col lg="8">
              <b-input-group
                prepend="Lấy hàng"
                class="t-input-group mb-3"
                style="display: flex; flex-wrap: nowrap"
              >
                <v-select
                  style="width: 100%; white-space: nowrap"
                  v-model="item.LayHang"
                  :options="[
                    'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                    'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                    'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                    'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                  ]"
                ></v-select>
              </b-input-group>
            </b-col>
            <b-col lg="4">
              <b-input-group prepend="Dự kiến" class="t-input-group mb-3">
                <b-form-input
                  type="datetime-local"
                  value="2022-11-12T08:30"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4">
          <b-form-group label="Mặt hàng">
            <div class="d-flex">
              <b-form-input
                v-model="item.MatHangLay"
                class="text-left"
                disabled
              ></b-form-input>
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group label="Số lượng">
            <div class="d-flex">
              <b-form-input
                style="width: 60%"
                v-model="item.SoLuongLay"
                class="text-right"
              ></b-form-input>
              <b-form-input
                style="width: 40%"
                :value="'Cuộn'"
                class="text-center"
                disabled
              ></b-form-input>
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group label="Trọng lượng">
            <div class="d-flex">
              <b-form-input
                style="width: 60%"
                v-model="item.TrongLuongLay"
                class="text-right"
              ></b-form-input>
              <b-form-input
                style="width: 40%"
                :value="'Tấn'"
                class="text-center"
                disabled
              ></b-form-input>
            </div>
          </b-form-group>
        </b-col>
        <!-- <b-col lg="12">
          <b-form-group label="Dự kiến lấy hàng">
            <b-form-input disabled value="10/12/2022 08:30"></b-form-input>
          </b-form-group>
        </b-col> -->
        <b-col lg="12">
          <div class="text-success">
            <strong>
              <i class="fas fa-box-check mr-1"></i>
              ĐIỂM GIAO HÀNG</strong
            >
          </div>
          <b-row>
            <b-col lg="8">
              <b-input-group
                prepend="Giao hàng"
                class="t-input-group mb-3"
                style="display: flex; flex-wrap: nowrap"
              >
                <v-select
                  style="width: 100%; white-space: nowrap"
                  v-model="item.GiaoHang"
                  :options="[
                    'Cảng vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                    'Kho vũng tàu (55 Bà Rịa, TP. Vũng Tàu)',
                    'Cảng cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                    'Kho cát lái (43R Hồ Văn Huê, Phú Nhuận, HCM)',
                  ]"
                ></v-select>
              </b-input-group>
            </b-col>
            <b-col lg="4">
              <b-input-group prepend="Dự kiến" class="t-input-group mb-3">
                <b-form-input
                  type="datetime-local"
                  value="2022-11-12T09:00"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <!-- <b-col lg="4">
          <b-input-group prepend="Mặt hàng" class="t-input-group mb-3">
            <b-form-input v-model="item.MatHangGiao" disabled></b-form-input>
          </b-input-group>
        </b-col>
        <b-col lg="4">
          <b-input-group prepend="Số lượng" class="t-input-group mb-3">
            <b-form-input
              class="text-right"
              v-model="item.SoLuongGiao"
              disabled
            ></b-form-input>
          </b-input-group>
        </b-col>
        <b-col lg="4">
          <b-input-group prepend="Trọng lượng" class="t-input-group mb-3">
            <b-form-input
              class="text-right"
              v-model="item.TrongLuongGiao"
              disabled
            ></b-form-input>
          </b-input-group>
        </b-col> -->
      </b-row>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    "v-select": vSelect,
  },
  props: ["data"],
  data() {
    return {
      arrKeHoachLayGiao: this.data ?? [],
    };
  },
  methods: {
    removeByIndex(index) {
      this.arrKeHoachLayGiao = this.arrKeHoachLayGiao.filter(
        (e, i) => i != index
      );
      this.$emit("returnRemove", this.arrKeHoachLayGiao);
    },
    addItemList(obj) {
      this.arrKeHoachLayGiao.push(obj);
      this.$notify("success", "THÔNG BÁO", "Xử lí thành công !.", {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>