<template>
  <div>
    <FormBasicNPLCustom
      :title="title"
      :fields="fields"
      :items="items"
      ref="refFormBasicNPLCustom"
    >
      <template #tabTwo="slotProps">
        <div class="mt-1">
          <b-row>
            <b-col lg="7">
              <b-row>
                <b-col lg="3">
                  <b-form-group
                    label="Mã chứng từ"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      value="AUTO"
                      disabled
                      class="text-center"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group
                    label="Ngày chứng từ"
                    class="has-float-label mb-4"
                  >
                    <datepicker
                      v-model="slotProps.dataForm.createDate"
                      :format="'dd/MM/yyyy'"
                      :placeholder="'DD/MM/YYYY'"
                      :disabled="slotProps.isDisable"
                      :bootstrap-styling="true"
                      @input="convertDate('createDate')"
                    ></datepicker>
                  </b-form-group>
                </b-col>
                <b-col lg="6"></b-col>
                <b-col lg="3">
                  <b-form-group label="Khách hàng" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.company"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group
                    label="Người liên hệ"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      v-model="slotProps.dataForm.fullName"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Điện thoại" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.phone"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Email" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.email"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Lấy hàng" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.LayHang"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Loại hàng" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.loaiDonHang"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Số lượng" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.quantity"
                      :disabled="slotProps.isDisable"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Giao hàng" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.GiaoHang"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Mặt hàng" class="has-float-label mb-4">
                    <b-form-input
                      v-model="slotProps.dataForm.brand"
                      :disabled="slotProps.isDisable"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group
                    label="Trọng lượng"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      v-model="slotProps.dataForm.weight"
                      :disabled="slotProps.isDisable"
                      class="text-right"
                    />
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-row>
                    <b-col lg="12">
                      <b-form-group
                        label="Tgian yêuc cầu"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          value="10:30 25/12/2022"
                          :disabled="slotProps.isDisable"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col lg="12">
                      <b-form-group
                        label="Trạng thái"
                        class="has-float-label mb-4"
                      >
                        <b-form-input
                          style="color: #e5980a; font-weight: 600"
                          value="Đang chờ xử lí"
                          :disabled="slotProps.isDisable"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Ghi chú" class="has-float-label mb-4">
                    <b-form-textarea
                      v-model="slotProps.dataForm.Note"
                      :disabled="slotProps.isDisable"
                      style="height: 96px"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="5"></b-col>
          </b-row>
        </div>
      </template>
    </FormBasicNPLCustom>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import FormBasicNPLCustom from "./component/FormBasicNPLCustom.vue";

export default {
  props: ["title", "fields", "items"],
  components: {
    FormBasicNPLCustom,
    "v-select": vSelect,
  },
};
</script>

<style lang="scss" scoped>
</style>