<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>
            {{ $t('report.title.lamp') }}
          </strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <export-excel
                name="BÁO_CÁO_DANH_SÁCH_ĐÈN_THEO_TỦ"
                :data="data"
                :fields="fieldsExcel"
              >
                <b-dropdown-item v-if="objectData.accessWrite === true">
                  <i class="fas fa-file-download"></i>
                  &emsp; {{ $t('report.action.download-excel') }}
                </b-dropdown-item>
              </export-excel>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <custom-table
            :data-table="data"
            :field-table="cusFields"
            :column-show="listColumnShow"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import CustomTables from '@/components/Table/CustomTables'

export default {
  props: ['data', 'objectData', 'cusFields', 'listColumnShow'],
  name: 'LampManager',
  components: {
    'custom-table': CustomTables,
  },
  data() {
    return {}
  },
  computed: {
    fieldsExcel: function () {
      if (!this.cusFields) {
        return
      }
      let obj = {}
      let arr = this.cusFields
      for (let i = 0; i < arr.length; i++) {
        let label = arr[i].label
        obj[label] = arr[i].key
      }
      return obj
    },
  },
}
</script>

<style></style>
