<template>
  <div class="d-flex flex-row">
    <template v-if="data.length > 0">
      <div class="w-50">
        <ul class="list-unstyled mb-0">
          <li
            v-for="(item, index) in data.slice(0, data.length / 2)"
            :key="index"
            class="mb-1"
          >
            <router-link target="_blank" tag="a" :to="item.LinkInfoTree">
              {{ item.TreeName }} ({{ item.SL }})
            </router-link>
          </li>
        </ul>
      </div>
      <div class="w-50">
        <ul class="list-unstyled mb-0">
          <li
            v-for="(item, index) in data.slice(data.length / 2, data.length)"
            :key="index"
            class="mb-1"
          >
            <router-link target="_blank" tag="a" :to="item.LinkInfoTree">
              {{ item.TreeName }} ({{ item.SL }})
            </router-link>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <p class="text-center text-muted text-small font-italic">
        {{ $t("map.no-data") }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>
