<template>
  <div
    v-if="currentTitle"
    style="font-size: 16px; background: #d7d7d7; color: #005aab"
    class="mb-2 text-center"
  >
    <strong>NGHIỆP VỤ : {{ currentTitle.toUpperCase() }}</strong>
    <b-dropdown
      class="title-dropdown"
      size="lg"
      variant="link"
      toggle-class="text-decoration-none"
    >
      <template v-for="(title, key) in titleOption">
        <b-dropdown-item @click="changeTitle(title)" :key="key" href="#"
          >{{ title.label }}
        </b-dropdown-item>
      </template>
    </b-dropdown>
    <hr class="m-0" />
  </div>
</template>

<script>
export default {
  props: ['titleOption', 'currentTitle'],
  data() {
    return {

    }
  },
  methods: {
    changeTitle(obj) {
      this.currentTitle = obj.label;
    },
  }
}
</script>