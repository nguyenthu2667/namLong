<template>
  <div>
    <b-form inline>
      <b-form-group
        id="input-group-address-tinh"
        label="Địa chỉ:"
        label-for="input-address-tinh"
      >
        <b-form-select
          v-model="selected"
          :options="Tinh"
          @change="changeHuyen(selected)"
          id="p2"
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-address-xa" label-for="input-address-xa">
        <div v-for="(item, index) in xa" :key="index">
          <div v-if="item.maTinh === isIndex">
            <b-form-select
              v-model="selecTinh"
              :options="item.ten"
            ></b-form-select>
          </div>
          <div v-else-if="item.maTinh === null" id="p1">
            <b-form-select v-model="selecTinh" :options="xa"></b-form-select>
          </div>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-textAddress"
        label="Số nhà:"
        label-for="input-textAddress"
      >
        <b-form-input
          id="input-textAddress"
          required
          v-model="diaChiRo"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ComSelectUserChange",
  props: {
    selectTinh: String,
    selectXa: String,
    soNha: String,
  },
  data() {
    return {
      selected: null,
      selecTinh: null,

      diaChiRo: this.soNha,
      Tinh: [
        { value: null, text: this.selectTinh, disabled: true },
        { value: 1, text: "Thành phố Hà Nội" },
        { value: 37, text: "Tỉnh Nghệ An" },
      ],
      xa: [
        { maTinh: null, value: null, text: this.selectXa, disabled: true },
        {
          maTinh: 1,
          ten: [
            { value: 1, text: "Quận Ba Đình" },
            { value: 2, text: "Quận Hoàn Kiếm" },
            { value: 3, text: "Quận Tây Hồ" },
            { value: 4, text: "Quận Long Biên" },
            { value: 5, text: "Quận Cầu Giấy" },
            { value: 6, text: "Quận Đống Đa" },
            { value: 7, text: "Quận Hai Bà Trưng" },
            { value: 8, text: "Quận Hoàng Mai" },
            { value: 9, text: "Quận Thanh Xuân" },
            { value: 10, text: "Huyện Sóc Sơn" },
            { value: 11, text: "Quận Nam Từ Liêm" },
          ],
          disabled: true,
        },

        {
          maTinh: 37,
          ten: [
            { value: 1, text: "Thành phố Vinh" },
            { value: 2, text: "Thị xã Cửa Lò" },
            { value: 3, text: "Thị xã Thái Hoà" },
            { value: 4, text: "Huyện Quế Phong" },
            { value: 5, text: "Huyện Quỳ Châu" },
            { value: 6, text: "Huyện Kỳ Sơn" },
            { value: 7, text: "Huyện Tương Dương" },
            { value: 8, text: "Huyện Nghĩa Đàn" },
            { value: 9, text: "Huyện Quỳ Hợp" },
            { value: 10, text: "Huyện Quỳnh Lưu" },
            { value: 11, text: "Huyện Con Cuông" },
            { value: 12, text: "Huyện Tân Kỳ" },
            { value: 13, text: "Huyện Anh Sơn" },
            { value: 14, text: "Huyện Diễn Châu" },
            { value: 15, text: "Huyện Yên Thành" },
            { value: 16, text: "Huyện Đô Lương" },
            { value: 17, text: "Huyện Thanh Chương" },
            { value: 18, text: "Huyện Nghi Lộc" },
            { value: 19, text: "Huyện Nam Đàn" },
            { value: 20, text: "Huyện Hưng Nguyên" },
            { value: 21, text: "Thị xã Hoàng Mai" },
          ],
          disabled: true,
        },
      ],

      isIndex: 0,
    };
  },
  methods: {
    changeHuyen(index) {
      this.isIndex = index;
      var child = document.getElementById("p1");
      child.parentNode.removeChild(child);
      this.Tinh.splice(0, 1);
    },
  },
};
</script>

<style scoped>
#input-group-address-tinh,
#input-group-address-xa {
  margin-right: 50px;
}
#input-textAddress {
  width: 300px;
}
</style>
<style>
label {
  margin-right: 20px;
}
</style>
