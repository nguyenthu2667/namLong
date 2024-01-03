<template>
  <div id="test-filter">
    <!-- <b-card no-body>
      <div class="nav-menu">
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i style="color: green" class="fad fa-plus"></i> Thêm
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i style="color: #7e4a08" class="fad fa-edit"></i> Sửa
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i style="color: red" class="fad fa-trash-alt"></i> Xoá
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i style="color: #898905" class="fad fa-undo-alt"></i>Trở lại
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i style="color: #529ff3" class="fad fa-save"></i>Lưu
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i style="color: purple" class="fad fa-file-import"></i>Import
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav">
            <i class="fad fa-file-export"></i>Export
          </button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav"><i class="fad fa-book"></i>Hướng dẫn</button>
        </div>
        <div class="nav-menu-item">
          <button class="btn-nav" @click="handleNavControl">
            <i class="fad fa-exchange-alt"></i>
          </button>
        </div>
      </div>
    </b-card> -->
    <!-- <b-card no-body>
      <b-tabs card vertical fill nav-class="p-0 m-0 cusTabs">
        <b-tab title="Tab 1" title-link-class="title-tab">
          <template #title>
            <div>
              <i style="font-size: 16px" class="fad fa-file-edit mr-1"></i
              ><strong>Tạo mẫu tin</strong>
            </div>
          </template>
          <div class="box-content">
            <div style="width: 50%; padding: 0 10px">
              <div class="bg-light" style="min-height: 20vh">control</div>
            </div>
            <div style="width: 100%; padding: 0 10px">
              <div class="text-right">
                Tổng:<strong>{{ finalData.length }}</strong> kết quả
              </div>
              <b-table class="bg-light" :items="finalData" bordered></b-table>
            </div>
          </div>
        </b-tab>
        <b-tab active title="Tab 2" title-link-class="title-tab">
          <template #title>
            <div>
              <i style="font-size: 16px" class="fad fa-search mr-1"></i
              ><strong>Tìm kiếm</strong>
            </div>
          </template>
          <div class="box-content">
            <div id="left" v-if="keys">
              <div class="left-top bg-light">
                <b-table :fields="fieldsAction" :items="dataDieuKien" bordered>
                  <template v-slot:cell(valueDK)="row">
                    <b-dropdown
                      id="cus-dropdown"
                      :text="
                        dieuKien.find((dk) => dk.value == row.item.valueDK).name
                      "
                    >
                      <template v-for="(dk, index) in dieuKien">
                        <b-dropdown-item
                          :key="index"
                          @click="pushDieuKien(dk.value, row.item.name)"
                        >
                          {{ dk.name }}
                        </b-dropdown-item>
                      </template>
                    </b-dropdown>
                  </template>
                  <template v-slot:cell(value1)="row">
                    <input
                      style="width: 100px"
                      v-if="row.item.valueDK != '0'"
                      v-model="row.item.value1"
                    />
                  </template>
                  <template v-slot:cell(value2)="row">
                    <input
                      style="width: 100px"
                      v-if="row.item.valueDK == '5'"
                      v-model="row.item.value2"
                    />
                  </template>
                </b-table>
              </div>
              <div class="left-bottom bg-light">
                <div class="left-bottom-menu text-right">
                  <button @click="filter(dataDieuKien)" class="btn-nav">
                    <i class="fad fa-search"></i>Tìm
                  </button>
                  <button class="btn-nav">
                    <i class="fad fa-trash-alt"></i>
                    Xoá điều kiện
                  </button>
                </div>
                <div class="left-bottom-content p-2">
                  <div
                    style="font-size: 14px"
                    class="d-flex justify-content-between"
                  >
                    <div class="text-muted">
                      <b>Tổng số chứng từ:</b>
                    </div>
                    <div><b>10</b></div>
                  </div>
                  <div
                    style="font-size: 14px"
                    class="d-flex justify-content-between"
                  >
                    <div class="text-muted">
                      <b>Tổng tiền hàng:</b>
                    </div>
                    <div><b>10,250,750</b></div>
                  </div>
                  <div
                    style="font-size: 14px"
                    class="d-flex justify-content-between"
                  >
                    <div class="text-muted">
                      <b>Tổng tiền chiết khấu:</b>
                    </div>
                    <div><b>1,250,750</b></div>
                  </div>
                  <div
                    style="font-size: 14px"
                    class="d-flex justify-content-between"
                  >
                    <div class="text-muted">
                      <b>Tổng tiền thuế:</b>
                    </div>
                    <div><b>2,600,000</b></div>
                  </div>
                  <div
                    style="font-size: 14px"
                    class="d-flex justify-content-between"
                  >
                    <div class="text-muted">
                      <b>Tổng phí khác:</b>
                    </div>
                    <div><b>150,000</b></div>
                  </div>
                  <div
                    style="font-size: 14px"
                    class="d-flex justify-content-between"
                  >
                    <div class="text-muted">
                      <b>Tổng tiền:</b>
                    </div>
                    <div><b>27,600,000</b></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="right">
              <div>
                <b-table
                  style="margin-bottom: 2px"
                  class="bg-light"
                  :items="finalData"
                  bordered
                ></b-table>
              </div>
              <div class="text-right">
                Tổng:<strong>{{ finalData.length }}</strong> kết quả
              </div>
            </div>
          </div></b-tab
        >
        <b-tab title="Tab 3" title-link-class="title-tab">
          <template #title>
            <div>
              <i style="font-size: 16px" class="fad fa-clipboard-check mr-1"></i
              ><strong>Xét duyệt</strong>
            </div>
          </template>
          <div class="box-content">Tab contents 3</div></b-tab
        >
      </b-tabs>
    </b-card> -->
  </div>
</template>

<script>
export default {
  name: "test-filter",
  data() {
    return {
      toggleControl: false,
      isShow: false,
      finalData: [],
      items: [
        {
          isActive: true,
          age: 40,
          name: "một",
          date: "03/03/2022",
        },
        {
          isActive: true,
          age: 42,
          name: "mot",
          date: "01/02/2022",
        },
        { isActive: false, age: 21, name: "hai", date: "01/03/2022" },
        { isActive: false, age: 89, name: "hai mot", date: "02/03/2022" },
        { isActive: true, age: 38, name: "ba", date: "01/05/2022" },
        { isActive: true, age: 38, name: "bốn", date: "03/06/2022" },
        { isActive: false, age: 23, name: "nam", date: "04/03/2022" },
        { isActive: false, age: 84, name: "sáu", date: "07/03/2022" },
        { isActive: true, age: 35, name: "bay", date: "01/08/2022" },
        { isActive: true, age: 36, name: "tam", date: "03/09/2022" },
        { isActive: false, age: 23, name: "chin", date: "06/03/2022" },
        { isActive: false, age: 84, name: "muoi", date: "05/03/2022" },
        { isActive: true, age: 35, name: "mười một", date: "04/08/2022" },
        { isActive: true, age: 36, name: "mười hai", date: "02/09/2022" },
        { isActive: true, age: 25, name: "mười ba", date: "04/01/2022" },
      ],
      dieuKien: [
        {
          name: "Không điều kiện",
          value: "0",
        },
        {
          name: "Theo chữ cái",
          value: "1",
        },
        {
          name: "Bằng (=)",
          value: "2",
        },
        {
          name: "Bé hơn (<)",
          value: "3",
        },
        {
          name: "Lớn hơn (>)",
          value: "4",
        },
        {
          name: "Trong khoảng",
          value: "5",
        },
      ],
      dataDieuKien: [],
      fieldsAction: [
        {
          key: "name",
          label: "Tiêu đề",
        },
        {
          key: "valueDK",
          label: "Chọn điều kiện",
        },
        {
          key: "value1",
          label: "Giá trị",
        },
        {
          key: "value2",
          label: "Giá trị",
        },
      ],
    };
  },
  computed: {
    keys() {
      this.dataDieuKien = [];
      let keys = Object.keys(this.items[0]);
      keys.map((key) => {
        let obj = {
          name: key,
          valueDK: "0",
          value1: null,
          value2: null,
        };
        this.dataDieuKien.push(obj);
      });
      return keys;
    },
  },
  created() {
    this.finalData = [...this.items];
  },
  mounted() {
    this.isShow = false;
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
  },
  methods: {
    handleNavControl() {
      this.toggleControl = !this.toggleControl;
      let left = document.getElementById("left");
      let right = document.getElementById("right");
      if (this.toggleControl) {
        left.style.display = "none";
        right.style.width = "100%";
      } else {
        left.style.display = "block";
        left.style.width = "42%";
        right.style.width = "58%";
      }
    },
    pushDieuKien(value, key) {
      let obj = this.dataDieuKien.find((item) => item.name == key);
      obj.valueDK = value;
      obj.value1 = null;
      obj.value2 = null;
      const isCheckDefaltData = this.dataDieuKien.some(
        (item) => item.valueDK != "0"
      );
      if (isCheckDefaltData == false) {
        this.filter(this.dataDieuKien);
      }
    },
    filter(arr) {
      let result = [];
      this.finalData = [];
      let onFilter = arr.filter((it) => it.valueDK != "0");
      if (onFilter?.length > 0) {
        onFilter.forEach((e) => {
          if (e.valueDK == "1") {
            if (e.value1 && e.value1 != "") {
              let regex = new RegExp(e.value1, "i");
              this.items.map((val) => {
                if (val.name.search(regex) !== -1) {
                  result.push(val);
                }
              });
            }
          }
          if (e.valueDK == "2") {
            this.items.map((val) => {
              if (val.age == e.value1) {
                result.push(val);
              }
            });
          }
          if (e.valueDK == "3") {
          }
          if (e.valueDK == "4") {
          }
          //unique
          if (result?.length > 0) {
            const uniqueSet = new Set(result);
            const final = [...uniqueSet];
            result = [...final];
          } else {
            result = [...this.items];
          }
        });
      } else {
        result = [...this.items];
      }
      this.finalData = result;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-content {
  /* height: 82vh; */
  display: flex;
  flex-wrap: wrap;
  & #left {
    width: 42%;
    padding-left: 5px;
    padding-right: 5px;
    overflow: auto;
    & .left-top {
      height: 60vh;
      margin-bottom: 5px;
    }
  }
  & #right {
    width: 58%;
    padding-left: 5px;
    padding-right: 5px;
  }
}
.box-tab2 {
  height: 30vh;
}
.btn-nav {
  height: 35px;
  border: 0.5px solid #d7d7d7;
  padding: 0 10px;
  &:hover {
    background: #fff;
  }
  & i {
    margin-right: 5px;
    font-size: 16px;
  }
}
.nav-menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.nav-menu-item {
}
</style>
<style>
.cusTabs {
  background: #f7f7f7;
}
#test-filter .card .card-body {
  padding: 10px 0;
}
#test-filter .nav-link.active::before {
  background: none;
  height: 0 !important;
}
#test-filter .nav-tabs .nav-item {
  margin-bottom: -1px;
  border: 1px solid #d7d7d7;
}
#test-filter .nav-link {
  padding: 1rem;
}
#cus-dropdown button {
  padding: 0;
  background: 0;
  color: black;
  border: 0;
}
</style>
