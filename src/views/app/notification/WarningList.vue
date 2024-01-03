<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h1><strong>DANH SÁCH THÔNG BÁO</strong></h1>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <div>
            <b-row class="mb-4">
              <b-colxx md="7" class="mt-2">
                <span
                  >{{ $t("form.total") }}: <strong>{{ totalRows }}</strong>
                  {{ $t("form.result").toLowerCase() }}</span
                >
              </b-colxx>
              <b-colxx md="5">
                <b-form-group
                  label-align-sm="right"
                  label-size="sm"
                  label-for="filterInput"
                  class="mb-0"
                >
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      :placeholder="search_title"
                      style="
                        border-bottom-left-radius: 20px;
                        border-top-left-radius: 20px;
                        font-size: 12px;
                        height: 31px;
                        padding-left: 1rem;
                      "
                    ></b-form-input>
                    <b-input-group-append>
                      <b-dropdown
                        :text="$t('cards.find-text')"
                        right
                        variant="primary"
                        size="sm"
                        no-caret
                        style="height: 31px"
                      >
                        <b-form-checkbox-group
                          v-model="filterOn"
                          class="ml-3 mt-1 mr-3 mb-1"
                          style="width: 160px"
                        >
                          <template v-for="(item, key) in fieldList">
                            <b-form-checkbox :value="item.key" :key="key"
                              ><span class="text-small font-weight-bold">{{
                                item.label
                              }}</span></b-form-checkbox
                            >
                            <br :key="key" />
                          </template>
                        </b-form-checkbox-group>
                      </b-dropdown>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-colxx>
            </b-row>
            <b-table
              ref="custom-table-notification"
              id="custom-table-notification"
              sort-by="title"
              sort-desc.sync="false"
              @row-selected="rowSelected"
              selectable
              :select-mode="selectMode"
              :current-page="currentPage"
              :per-page="perPage"
              selectedVariant="primary"
              :fields="fieldList"
              :items="notifyList"
              class="text-center"
              @filtered="onFiltered"
              :filter="filter"
              :filter-included-fields="filterOn"
              responsive
            >
              <template v-slot:cell(_image)="slot">
                <b-img
                  :src="slot.item.ImgLink"
                  :id="'image_' + slot.item.NotifyID"
                  fluid
                  :alt="slot.item.Screen"
                  style="width: 50px; height: 50px"
                  @click="openFullscreen('image_' + slot.item.NotifyID)"
                ></b-img>
              </template>
              <template v-slot:cell(_view)="slot">
                <template v-if="parseInt(slot.item.IsView) === 1">
                  <a class="success_class text-white" style="font-size: 12px">
                    Đã xem
                  </a>
                </template>
                <template v-else>
                  <a class="danger_class text-white" style="font-size: 12px">
                    Chưa xem
                  </a>
                </template>
              </template>
            </b-table>
            <b-pagination
              size="sm"
              align="center"
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
            >
              <template v-slot:next-text>
                <i class="simple-icon-arrow-right" />
              </template>
              <template v-slot:prev-text>
                <i class="simple-icon-arrow-left" />
              </template>
              <template v-slot:first-text>
                <i class="simple-icon-control-start" />
              </template>
              <template v-slot:last-text>
                <i class="simple-icon-control-end" />
              </template>
            </b-pagination>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      @hide="resetModal"
      class="text-center"
      id="detail-notification"
      size="md"
      centered
      hide-header
      v-if="dataModal"
      ok-only
    >
      <custom-notification :data="dataModal"></custom-notification>
    </b-modal>
  </div>
</template>

<script>
import notificationAPI from "@/api/modules/notificationAPI";
import CustomNotification from "./component/CustomNotification.vue";
import { mapActions } from "vuex";

export default {
  name: "WarningList",
  components: {
    "custom-notification": CustomNotification,
  },
  data() {
    return {
      selectMode: "single",
      notifyList: null,
      fieldList: [
        {
          key: "_image",
          label: "Hình ảnh",
        },
        {
          key: "Title",
          label: "Thông báo",
        },
        {
          key: "Body",
          label: "Nội dung",
        },
        {
          key: "CreateDate",
          label: "Thời gian",
        },
        {
          key: "_view",
          label: "Trạng thái",
        },
      ],
      currentPage: 1,
      perPage: 20,
      search_title: this.$t("form.search-invalid"),
      filter: "",
      totalRows: 0,
      filterOn: [],
      dataModal: null,
    };
  },
  updated() {
    if (this.notifyList && this.filter === "") {
      this.totalRows = this.notifyList.length;
    }
  },
  methods: {
    ...mapActions(["setNotification"]),
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    resetModal() {
      this.dataModal = null;
    },
    getListNotify() {
      notificationAPI.getNotify().then((val) => {
        this.notifyList = val.status ? val.data : null;
        this.totalRows = this.notifyList.length;
      });
    },
    rowSelected(items) {
      this.selectedItems = items;
      if (this.selectedItems && this.selectedItems.length > 0) {
        this.dataModal = this.selectedItems[0];
        setTimeout(() => {
          this.$bvModal.show("detail-notification");
          let body = {
            NotifyID: this.selectedItems[0].NotifyID,
          };
          notificationAPI
            .updateViewNotify(body)
            .then((val) => {
              if (val.status) {
                this.setNotification(true);
                this.getListNotify();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 500);
      }
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  async created() {
    await this.getListNotify();
  },
};
</script>

<style scoped>
.danger_class {
  background-color: #ff0000;
  -webkit-border-radius: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

@-webkit-keyframes glowing {
  0% {
    background-color: #ad0000;
    -webkit-box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    -webkit-box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    -webkit-box-shadow: 0 0 3px #ad0000;
  }
}

@-moz-keyframes glowing {
  0% {
    background-color: #ad0000;
    -moz-box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    -moz-box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    -moz-box-shadow: 0 0 3px #ad0000;
  }
}

@-o-keyframes glowing {
  0% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
}

@keyframes glowing {
  0% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 10px #ff0000;
  }
  100% {
    background-color: #ad0000;
    box-shadow: 0 0 3px #ad0000;
  }
}

.danger_class {
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
}

.success_class {
  background-color: #00ff00;
  -webkit-border-radius: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

@-webkit-keyframes glowingsss {
  0% {
    background-color: #01df3a;
    -webkit-box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    -webkit-box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    -webkit-box-shadow: 0 0 3px #01df3a;
  }
}

@-moz-keyframes glowingsss {
  0% {
    background-color: #01df3a;
    -moz-box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    -moz-box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    -moz-box-shadow: 0 0 3px #01df3a;
  }
}

@-o-keyframes glowingsss {
  0% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
}

@keyframes glowingsss {
  0% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
  50% {
    background-color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
  }
  100% {
    background-color: #01df3a;
    box-shadow: 0 0 3px #01df3a;
  }
}

.success_class {
  -webkit-animation: glowingsss 1500ms infinite;
  -moz-animation: glowingsss 1500ms infinite;
  -o-animation: glowingsss 1500ms infinite;
  animation: glowingsss 1500ms infinite;
}
</style>
