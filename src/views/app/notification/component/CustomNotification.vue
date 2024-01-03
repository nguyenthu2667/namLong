<template>
  <div>
    <b-row>
      <template v-if="data">
        <b-col lg="12" class="mb-3">
          <h3 class="font-weight-bold text-center text-danger">
            {{ data.Title }}
          </h3>
          <p class="text-center text-danger">{{ data.CreateDate }}</p>
          <div
            class="
              div-avatar-notification
              mb-1
              text-uppercase
              font-weight-bolder
            "
          >
            <template v-if="data.ImgLink">
              <b-img
                :src="data.ImgLink"
                fluid
                center
                alt="notification-image"
                style="min-width: 200px; max-width: 100%; height: auto"
              ></b-img>
            </template>
            <template v-else>
              <div class="absolute-default-avatar text-center">
                <p class="mb-0">
                  <i
                    class="fad fa-user-alt-slash p-3"
                    style="font-size: 40px"
                  ></i>
                </p>
                <p class="mb-0" style="font-size: 15px">No Image</p>
              </div>
            </template>
          </div>
        </b-col>
        <b-col lg="12">
          <p class="font-weight-bold">{{ data.Body }}</p>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped>
.div-avatar-notification {
  width: 100%;
  height: auto;
  position: relative;
}

.div-avatar-notification .absolute-default-avatar {
  color: white;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
