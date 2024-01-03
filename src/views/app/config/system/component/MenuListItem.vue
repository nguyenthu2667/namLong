<template>
  <b-row>
    <template v-if="type === 'Menu'">
      <template v-for="(item, index) in data" v-if="data.length > 0">
        <b-colxx cols="12" class="mb-2" :key="index" :id="item.id">
          <b-card
            :class="{
              'd-flex flex-row': true,
              active: selectedItems.includes(item.id),
            }"
          >
            <div class="pl-2 d-flex flex-grow-1 min-width-zero">
              <div
                class="custom-control pl-2 align-self-center pr-2 pt-1 pb-1"
                v-if="item.subs.length > 0"
                v-b-toggle="'collapse-' + item.id"
                @click="changeIconActiveClass('icon-collapse-' + item.id)"
              >
                <i :id="'icon-collapse-' + item.id" class="fa fa-plus"></i>
              </div>
              <div
                class="custom-control pl-2 align-self-center pr-2 pt-1 pb-1"
                v-else
              >
                <i class="fa fa-minus"></i>
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  pl-4
                  align-self-center
                  pr-2
                "
                v-if="accessWrite === true"
                @click.prevent="toggleItem($event, item)"
              >
                <b-form-checkbox
                  :checked="selectedItems.includes(item.id)"
                  class="itemCheck mb-0"
                />
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  pl-4
                  align-self-center
                  pr-2
                "
                v-else
              >
                <b-form-checkbox
                  :checked="selectedItems.includes(item.id)"
                  class="itemCheck mb-0"
                  disabled
                />
              </div>
              <div
                class="
                  card-body
                  align-self-center
                  d-flex
                  flex-column flex-lg-row
                  justify-content-between
                  min-width-zero
                  align-items-lg-center
                "
              >
                <p class="list-item-heading mb-0 truncate">{{ item.label }}</p>
                <b
                  class="mb-0 truncate"
                  style="opacity: 0.5"
                  v-if="item.active === false"
                  >{{ $t("status.non-active") }}</b
                >
                <b class="mb-0 truncate" style="opacity: 0.5" v-else>{{
                  $t("status.active")
                }}</b>
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  pl-2
                  align-self-center
                  pr-4
                "
              >
                <b-form-checkbox
                  v-if="accessWrite === true"
                  v-model="item.active"
                  name="check-button"
                  switch
                  @input="checkActive(item)"
                ></b-form-checkbox>
                <b-form-checkbox
                  v-else
                  v-model="item.active"
                  name="check-button"
                  switch
                  disabled
                ></b-form-checkbox>
              </div>
            </div>
          </b-card>
        </b-colxx>
        <b-colxx cols="12">
          <b-collapse v-if="item.subs.length > 0" :id="'collapse-' + item.id">
            <b-row>
              <b-colxx cols="1"></b-colxx>
              <b-colxx cols="11">
                <MenuItemComponent
                  :type="type"
                  :subs="item.subs"
                  :selected-items="selectedItems"
                  :access-write="accessWrite"
                  @toggle-item="toggleItem"
                  @check-active="checkActive"
                ></MenuItemComponent>
              </b-colxx>
            </b-row>
          </b-collapse>
        </b-colxx>
      </template>
    </template>
    <template v-else>
      <template v-for="(item, index) in data" v-if="data.length > 0">
        <b-colxx cols="12" class="mb-2" :key="index" :id="item.id">
          <b-card
            :class="{
              'd-flex flex-row': true,
              active: selectedItems.includes(item.id),
            }"
          >
            <div class="pl-2 d-flex flex-grow-1 min-width-zero">
              <div
                class="custom-control pl-2 align-self-center pr-2 pt-1 pb-1"
                v-if="item.subs.length > 0"
                v-b-toggle="'collapse-' + item.id"
                @click="changeIconActiveClass('icon-collapse-' + item.id)"
              >
                <i :id="'icon-collapse-' + item.id" class="fa fa-plus"></i>
              </div>
              <div
                class="custom-control pl-2 align-self-center pr-2 pt-1 pb-1"
                v-else
              >
                <i class="fa fa-minus"></i>
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  pl-4
                  align-self-center
                  pr-2
                "
                v-if="accessWrite === true"
                @click.prevent="toggleItem($event, item)"
              >
                <b-form-checkbox
                  :checked="selectedItems.includes(item.id)"
                  class="itemCheck mb-0"
                />
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  pl-4
                  align-self-center
                  pr-2
                "
                v-else
              >
                <b-form-checkbox
                  :checked="selectedItems.includes(item.id)"
                  class="itemCheck mb-0"
                  disabled
                />
              </div>
              <div
                class="
                  card-body
                  align-self-center
                  d-flex
                  flex-column flex-lg-row
                  justify-content-between
                  min-width-zero
                  align-items-lg-center
                "
              >
                <p class="list-item-heading mb-0 truncate">{{ item.label }}</p>
                <b
                  class="mb-0 truncate"
                  style="opacity: 0.5"
                  v-if="item.menuAccess === false"
                  >{{ $t("status.read-only") }}</b
                >
                <b class="mb-0 truncate" style="opacity: 0.5" v-else>{{
                  $t("status.full-control")
                }}</b>
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  pl-2
                  align-self-center
                  pr-4
                "
              >
                <b-form-checkbox
                  v-if="accessWrite === true && selectedItems.includes(item.id)"
                  v-model="item.menuAccess"
                  name="check-button"
                  switch
                  @input="checkActive(item)"
                ></b-form-checkbox>
                <b-form-checkbox
                  v-else
                  v-model="item.menuAccess"
                  name="check-button"
                  switch
                  disabled
                ></b-form-checkbox>
              </div>
            </div>
          </b-card>
        </b-colxx>
        <b-colxx cols="12">
          <b-collapse v-if="item.subs.length > 0" :id="'collapse-' + item.id">
            <b-row>
              <b-colxx cols="1"></b-colxx>
              <b-colxx cols="11">
                <MenuItemComponent
                  :type="type"
                  :subs="item.subs"
                  :selected-items="selectedItems"
                  :access-write="accessWrite"
                  @toggle-item="toggleItem"
                  @check-active="checkActive"
                ></MenuItemComponent>
              </b-colxx>
            </b-row>
          </b-collapse>
        </b-colxx>
      </template>
    </template>
  </b-row>
</template>

<script>
export default {
  props: ["data", "selectedItems", "accessWrite", "type"],
  beforeCreate: function () {
    this.$options.components.MenuItemComponent =
      require("./MenuItem.vue").default;
  },
  methods: {
    toggleItem(event, item) {
      this.$emit("toggle-item", event, item);
    },
    checkActive(data) {
      this.$emit("check-active", data);
    },
    changeIconActiveClass(id) {
      if (
        localStorage.getItem("collapse") !== undefined &&
        localStorage.getItem("collapse") !== null
      ) {
        let array = localStorage
          .getItem("collapse")
          .split(",")
          .filter((x) => x !== "");
        if (array.length > 0) {
          if (array.includes(id.split("icon-")[1])) {
            array = array.filter((x) => x !== id.split("icon-")[1]);
          } else {
            array.push(id.split("icon-")[1]);
          }
        } else {
          array.push(id.split("icon-")[1]);
        }
        localStorage.setItem("collapse", array);
      } else {
        let arrays = id.split("icon-")[1];
        localStorage.setItem("collapse", arrays);
      }
      let classDom = document.getElementById(id);
      if (classDom.className === "fa fa-plus") {
        classDom.className = "fa fa-minus";
      } else {
        classDom.className = "fa fa-plus";
      }
    },
  },
};
</script>
<style scoped>
.card .card-body {
  padding: 0.8rem;
}
</style>
