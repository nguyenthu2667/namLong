<template>
  <div class="com-tap-slot">
    <!-- <div name="imformation-user" v-for="(item, index) in user" :key="index">
            <img :src="require(`@/assets/${item.userImg}`)" alt="">
        </div> -->
    <!-- <slot name="imformation-user"></slot> -->
    <div class="imformation-user">
      <img :src="require(`@/assets/${userImg}`)" alt="" class="img-user" />
      <span>{{ userName }}</span>
    </div>
    <slot name="tab-content"></slot>
  </div>
</template>

<script>
export default {
  name: "tap-com",
  props: {
    userImg: String,
    userName: String,
  },
  data() {
    return {
      // user:[{
      //     userImg: 'userimage1',
      //     userName: 'user 1',
      // }]
    };
  },

  methods: {},
};
</script>

<style scoped>
.img-user {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.imformation-user {
  display: table-caption;
  width: 100px;
}
</style>
