<template>
  <div class="tin-tuc">
    <h3>KHU VỰC CÂY XANH ĐÔ THỊ QUẢN LÝ</h3>
    <b-container fluid>
      <div
        id="scrollspy-nested"
        style="position: relative; height: 80vh; overflow-y: auto"
      >
        <ul class="list-unstyled">
          <b-media tag="li">
            <template #aside>
              <b-img
                blank
                blank-color="#abc"
                width="20"
                alt="placeholder"
              ></b-img>
            </template>
            <h5 class="mt-0 mb-1">Cục quản lý thị trường quận 5</h5>
            <p class="mb-0">
              <li>Tuyến đường Nguyễn Chí Thanh</li>
              <li>Tuyến đường Phạm Ngọc Thạch</li>
              <li>Tuyến đường Trương Định</li>
              <li>Tuyến đường Nguyễn Du</li>
              <li>Tuyến đường Hoàng Sa</li>
              <li>Tuyến đường Trường Sa</li>
            </p>
          </b-media>

          <b-media tag="li" class="my-4">
            <template #aside>
              <b-img
                blank
                blank-color="#cba"
                width="20"
                alt="placeholder"
              ></b-img>
            </template>

            <h5 class="mt-0 mb-1">Cục quản lý thị trường quận 5</h5>
            <p class="mb-0">
              <li>Tuyến đường 3/2</li>
              <li>Tuyến đường Tô Hiến Thành</li>
              <li>Tuyến đường Lý Thái Tổ</li>
              <li>Tuyến đường Ngô Gia Tự</li>
            </p>
          </b-media>

          <b-media tag="li">
            <template #aside>
              <b-img
                blank
                blank-color="#bac"
                width="20"
                alt="placeholder"
              ></b-img>
            </template>

            <h5 class="mt-0 mb-1">Cục quản lý thị trường quận 1</h5>
            <p class="mb-0">
              <li>Tuyến đường Lê Duẩn</li>
              <li>Tuyến đường Nguyễn Bỉnh Khiêm</li>
              <li>Tuyến đường Huyền Trân Công Chúa</li>
              <li>Tuyến đường Trương Định</li>
            </p>
          </b-media>

          <b-media tag="li">
            <template #aside>
              <b-img
                blank
                blank-color="#bac"
                width="20"
                alt="placeholder"
              ></b-img>
            </template>

            <h5 class="mt-0 mb-1">Cục quản lý thị trường quận 1</h5>
            <p class="mb-0">
              <li>Tuyến đường Lê Duẩn</li>
              <li>Tuyến đường Nguyễn Bỉnh Khiêm</li>
              <li>Tuyến đường Huyền Trân Công Chúa</li>
              <li>Tuyến đường Trương Định</li>
            </p>
          </b-media>
        </ul>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "com-imf-coso",
};
</script>

<style scoped>
.tin-tuc {
  box-sizing: border-box;
  box-shadow: 0 5px 10px rgb(0 0 0 / 60%);
  height: 100vh;
  margin-right: -15px;
}
h3 {
  padding: 20px 20px;
}
.danh-sach {
  padding: 0 15px;
  /* overflow-y: scroll; */
}
</style>
