<template>
  <div class="d-flex flex-row mb-3">
    <span class="d-block position-relative">
        <b-img :src="value.TreeImage" :alt="'image_' + value.TreeID " class="list-thumbnail border-0" fluid-grow/>
    </span>
    <div class="pl-3 pr-2 pt-2 pb-2">
      <span>
        <p class="list-item-heading">{{ value.TreeName }}</p>
          <div class="pr-4">
              <span class="text-muted mb-1 text-small">
                 {{ $t('dashboards.total') }}: {{
                  value.TotalByTree
                }} {{ $t('dashboards.tree').toLowerCase() }}
              </span>
            </div>
          <div class="text-primary text-small font-weight-medium d-none d-sm-block">
            {{ getDateNow() }}
          </div>
      </span>
    </div>
    <div class="pl-3 pr-2 pt-2 pb-2 d-none d-sm-block">
      <template v-for="detail in value.TotalRouteAndTreeBtTreeStatus">
        <p class="text-muted mt-1 mb-1 text-small">- {{
            detail.StatusName
          }}: {{ detail.TotalByRouteAndTreeStatus }} {{ $t('dashboards.tree').toLowerCase() }}
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  props: ["value"],
  methods: {
    getDateNow(){
      return moment(new Date()).format("HH:mm DD/MM/YYYY")
    }
  }
}
</script>
