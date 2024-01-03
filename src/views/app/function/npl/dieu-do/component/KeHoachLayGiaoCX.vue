<template>
  <div>
    <template v-for="(item, i) in arrKeHoachLayGiao">
      <b-row :key="'r' + i">
        <!-- <b-col lg="12">
          <div>
            <strong
              ><i class="fas fa-file-alt mr-1"></i>DANH SÁCH MÃ LẤY CONT</strong
            >
          </div>
          <b-table
            :fields="fieldsMLC"
            :items="itemsMLCSelected"
            bordered
            head-variant="light"
          >
            <template #cell(SoLuong)="row">
              <div>1 {{ row.item.SoLuong }}</div>
            </template>
          </b-table>
        </b-col> -->
      </b-row>
      <b-row :key="i" class="bg-light pt-2 mb-2 position-relative mb-4">
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
              ><i class="fas fa-truck-loading mr-1"></i>ĐIỂM (CẢNG) LẤY
              RỖNG</strong
            >
          </div>
          <b-row>
            <b-col lg="8">
              <b-input-group
                prepend="Địa chỉ"
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
                  value="2022-11-12T14:12"
                  @input="handleDateTime"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="3">
          <div
            class="d-flex text-center"
            style="width: 100%; margin-top: 5px; margin-left: 20px"
          >
            <div class="mr-3" style="font-weight: 600; margin-top: 2px">
              Lấy cont
            </div>
            <b-form-radio :name="`cont${i}`" class="mr-3">Cont 20</b-form-radio>
            <b-form-radio :name="`cont${i}`">Cont 40</b-form-radio>
          </div>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="Số Lượng" class="t-input-group mb-3">
            <b-form-input
              class="text-left"
              v-model="item.SoLuongLay"
            ></b-form-input>
          </b-input-group>
        </b-col>
        <!-- <b-col lg="12">
          <b-input-group prepend="Tgian DKiến" class="t-input-group mb-3">
            <b-form-input value="06:00 15/12/2022" ></b-form-input>
          </b-input-group>
        </b-col> -->
        <b-col lg="12">
          <div class="text-success">
            <strong>
              <i class="fas fa-box-check mr-1"></i>
              ĐIỂM ĐÓNG HẠ</strong
            >
          </div>

          <b-row>
            <b-col lg="8">
              <b-input-group
                prepend="Địa chỉ"
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
                  value="2022-11-12T18:00"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="12">
          <div style="color: #9b59b6">
            <strong>
              <i class="fas fa-arrow-alt-to-bottom mr-1"> </i>
              ĐIỂM HẠ CONT</strong
            >
          </div>
          <b-row>
            <b-col lg="8">
              <b-input-group
                prepend="Địa chỉ"
                class="t-input-group mb-3"
                style="display: flex; flex-wrap: nowrap"
              >
                <v-select
                  style="width: 100%; white-space: nowrap"
                  v-model="item.HaRong"
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
              <b-input-group prepend="Tgian DKiến" class="t-input-group mb-3">
                <b-form-input
                  type="datetime-local"
                  value="2022-12-12T20:00"
                ></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
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
      fieldsMLC: [
        {
          key: "ID",
          label: "Mã Lấy Cont",
        },
        {
          key: "SoLuong",
          label: "Số Lượng",
        },
      ],
      itemsMLCSelected: [
        {
          ID: "MLC0123455",
          SoLuong: "20f",
        },
        {
          ID: "MLC0123466",
          SoLuong: "40f",
        },
      ],
    };
  },
  methods: {
    handleDateTime(v) {
      console.log(1, "handleDateTime", v);
    },
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

<style>
.vs__selected {
  max-width: 230px;
  white-space: nowrap;
}
</style>