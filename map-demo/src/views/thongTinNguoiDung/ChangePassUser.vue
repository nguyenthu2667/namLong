<template>
  <!-- <div class="Change-pass"> -->
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col cols="2"> <tab-data-vue></tab-data-vue></b-col>
      <b-col cols="10">
        <h1>Thay đổi mật khẩu</h1>
        <b-form class="from-change-pass">
          <b-form-group
            id="input-group-pass-now"
            label="Nhập mật khẩu hiện tại của bạn: "
            label-for="input-pass-now"
            ><b-input-group>
              <b-form-input
                id="input-pass-now"
                type="password"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  variant="outline-primary"
                  id="hide-pasnow"
                  class="hide-unhide"
                  ><ion-icon name="eye-off-outline"></ion-icon
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="input-group-pass-new"
            label="Mật khẩu mới: "
            label-for="input-pass-new"
          >
            <b-input-group>
              <b-form-input
                id="input-pass-new"
                type="password"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  variant="outline-primary"
                  id="hide-pasnew"
                  class="hide-unhide"
                  ><ion-icon name="eye-off-outline"></ion-icon
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="input-group-re-pass-new"
            label="Nhập lại mật khẩu mới: "
            label-for="input-re-pass-new"
          >
            <b-input-group>
              <b-form-input
                id="input-re-pass-now"
                type="password"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  variant="outline-primary"
                  id="hide-re-pasnow"
                  class="hide-unhide"
                  ><ion-icon name="eye-off-outline"></ion-icon
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form>

        <b-button type="submit" variant="primary" class="sub"
          >Thay đổi</b-button
        >
      </b-col>
    </b-row>
  </b-container>
  <!-- </div> -->
</template>

<script>
import TabDataVue from "@/components/tab/TabData.vue";
export default {
  components: {
    TabDataVue,
  },
  name: "change-pass-ueser",
  data() {},
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 40px 0;
  font-family: "Trirong", serif;
  font-weight: 600;
}
.from-change-pass {
  width: 550px !important;
  margin: 0 auto;
}
.sub,
.hide-unhide {
  color: #fff !important;
  background: #5d5e83fb !important;
  width: 100px !important;
  height: 40px !important;
  border: none;
}
.sub:hover,
.hide-unhide:hover {
  color: #fff !important;
  background: #5d5d5d !important;
  width: 100px !important;
  height: 40px !important;
}
</style>
<style>
label {
  text-align: left;
}
</style>
