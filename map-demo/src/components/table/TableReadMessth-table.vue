<template>
  <div class="table-read-mess-th">
    <section class="section">
      <div class="columns">
        <div class="column">
          <table class="table">
            <thead class="tieude">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    class="checkbox"
                    :checked="allSelected"
                    @click="selectAll"
                  />
                </th>
                <th>Danh mục góp ý</th>
                <th>Nội dung tóm gọn</th>
                <th>Thời gian gửi</th>
              </tr>
            </thead>
            <tbody class="table-hover">
              <tr v-for="itm in items" :key="itm.id_send">
                <td>
                  <input
                    type="checkbox"
                    class="checkbox"
                    v-model="itm.selected"
                  />
                </td>
                <td @click="outImfMess(itm)">{{ itm.cate_feedback }}</td>
                <td @click="outImfMess(itm)">
                  {{ itm.con_compact.slice(0, 50) + "..." }}
                </td>
                <td @click="outImfMess(itm)">{{ itm.time_send }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column">
          <!-- <div class="box">
            <h2 class="subtitle">id checkbox đã đc chọn</h2>
              <p class="content">
                {{ currentSelections }}
                </p>
                <h2 class="subtitle">id click row đã đc chọn</h2>
              <p class="content">
                {{ rowSelections }}
                </p>
            </div> -->
          <modal-read-imf-mess-vue
            :id_send="idModal"
            :cate_feedback="cateFeack"
            :con_compact="conComp"
          ></modal-read-imf-mess-vue>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ModalReadImfMessVue from "../../views/quanLi/ModalReadImfMess.vue";
export default {
  components: {
    ModalReadImfMessVue,
  },
  data() {
    return {
      items: [
        {
          id_send: 1,
          cate_feedback: "Trồng cây xanh đường phố",
          con_compact:
            "Cây xanh đóng vai trò vô cùng quan trọng trong cuộc sống của con người. Bởi nó đem đến rất nhiều lợi ích thiết thực mà không ai có thể thay thế được. Cây cối giúp cung cấp một lượng lớn khí oxi - loại khí vô cùng quan trọng với sự sống trên trái đất. Cây cối còn cho chúng ta một lượng lớn tài nguyên như lá, củ, quả để sinh sống. Cùng lượng lớn gỗ cho các ngành sản xuất phục vụ cho cuộc sống con người. Hơn nữa, các rừng cây còn có tác dụng giúp giữ đất, ngăn cản bớt hiện tượng sạt lở, xói mòn đất đai, và giúp giảm bớt ảnh hưởng của mưa lũ. Không chỉ vậy, cây cối còn có những tác động tích cực đến thế giới tinh thần của con người. Chúng trở thành những “cây cưng” giúp con người được ngắm nghía, chăm sóc để thư giãn sau các giờ phút căng thẳng. Với những lợi ích thiết thực như vậy, cây cối đã tự chứng minh được tầm quan trọng không thể thiếu được của mình đối với con người.",
          time_send: "05/12/2022",
          image_modal: "cay-xanh-1.jpg",
        },

        {
          id_send: 2,
          cate_feedback: "Trồng cây xanh đường phố",
          con_compact:
            "Cây xanh và môi trường thiên nhiên có vai trò to lớn vô cùng quan trọng đối với cuộc sống con người. Chúng ta không thể phủ nhận vai trò to lớn của cây xanh. Chính vì thế chúng ta cần tích cực hơn nữa trong việc trồng và bảo vệ cây xanh. Có một thực trạng đáng buồn là cây xanh ở những cánh rừng hiện nay đang bị tàn phá nặng nề để làm nương rẫy, làm nơi cư trú cho con người. Việc thiếu cây xanh gây ảnh hưởng to lớn đến cuộc sống con người như : mất cân bằng sinh thái, tình trạng xói mòn, sạt lở đất thường xuyên xảy ra, ô nhiễm môi trường gia tăng, động vật hoang dã mất nơi sinh sống,… Bởi lẽ, cây xanh làm sạch khí quyển, điều hòa không khí trên Trái Đất, cung cấp khí ôxi cho con người. Cây xanh lọc sạch bụi bẩn trong không khí, mang đến cho con người một bầu không khí trong sách, mát mẻ. Cây xanh còn có khả năng chống xói mòn và sạt lở đất nhất là ở các vùng núi, đồi có độ dốc lớn, thường xuyên xảy ra thiên tai, lũ lụt Cây xanh cũng đóng một vai trò quan trọng trong việc cải tạo đất, làm tơi xốp, giữ độ ẩm vừa đủ cho bề mặt, giữ nước cùng các chất dinh dưỡng khác trong mặt đất. Ngoài ra cây xanh cũng cung cấp cho con người thức ăn, cùng nguồn chất xơ vô cùng phong phú đa dạng. Cây xanh cũng cung cấp một lượng lớn vật liệu như gỗ, tre, nứa cho ngành công nghiệp xây dựng, nội thất và sản xuất giấy viết cho chúng ta sử dụng. Để khắc phục tình trạng như hiện nay, trước hết mỗi cá nhân ngay từ bây giờ hãy có những hành động thiết thực bảo vệ cây xanh, bảo vệ môi trường rừng. Tích cực trồng cây gây rừng. Bên cạnh đó, nhà nước cần đẩy mạnh công tác tuyên truyền về lợi ích của cây xanh, khuyến khích con người trồng cây, cải tạo môi trường sống đồng thời xử lí nghiêm khắc những hành vi vi phạm, tàn phá cây xanh, tàn phá môi trường rừng. Mỗi người chung tay một hành động nhỏ nhưng tạo nên ý nghĩa to lớn. Chúng ta hãy cố gắng vì một môi trường xanh, sạch, đẹp ngay từ hôm nay.",
          time_send: "01/12/2022",
          image_modal: "cay-xanh-2.jpg",
        },

        {
          id_send: 3,
          cate_feedback: "Cây nguy hiểm",
          con_compact:
            "Sự sống trên trái đất không thể duy trì mà không có cây xanh. Thuở ban đầu, cây xanh có mặt trước tạo ra môi trường sống thích hợp rồi các loài động vật, trong đó có con người mới lần lượt xuất hiện. Có thể nói cây xanh chính là nguồn cội của sự sống, mang lại cho chúng ta biết bao nhiêu lợi ích. Cây xanh có vai trò chống hiệu ứng nhà kính cực kì hiệu quả. Hiện tượng nóng lên toàn cầu là kết quả của khí nhà kính quá mức tạo ra do tiêu thụ lượng nhiên liệu hóa thạch gia tăng và do phá hủy rừng nhiệt đới. Việc phá hủy các khu rừng rậm không những làm mất đi cây xanh mà còn tạo nên nhiều khoảng trống không được che phủ trên mặt đất, làm đất bị đốt nóng, ion hóa, phản nhiệt lại bầu không khí. Không còn cây xanh, lượng khí thải vào không khí cũng giảm, lượng khí cacbonic tăng cao, cát bụi bao phủ làm tăng cường hiệu ứng nhà kính. Trong mấy năm gần đây, trái đất liên tục nóng lên, đe dọa đời sống của hàng trăm triệu người trên trái đất. Cây xanh làm sạch không khí, làm cho bầu không khí trở nên trong lành hơn. Bảo vệ cây xanh là bảo vệ cuộc sống của chính chúng ta. Thật không thể tưởng tượng nếu một ngày nào đó không còn cây xanh nữa thì tai họa khủng khiếp nào sẽ đến với đời sống của con người trên khắp trái đất này.",
          time_send: "11/11/2022",
          image_modal: "cay-xanh-3.jpg",
        },

        {
          id_send: 4,
          cate_feedback: "Cắt tỉa cây",
          con_compact:
            "Cây xanh có vai trò vô cùng to lớn trong cuộc sống của chúng ta. Đất nước ta đang trên đà đi lên công nghiệp hóa và hiện đại hóa: các nhà máy, cơ quan, các khu đô thị,... mọc lên ngày càng nhiều. Và cũng theo đó, vấn đề ô nhiễm môi trường là điều không thể tránh khỏi: khí hậu thay đổi, thời tiết bất thường (bão lũ, hạn hán,…) cộng với nhiều nguồn ô nhiễm (nguồn nước, rác thải, khói bụi, tiếng ồn,…) gây ra cho con người những bất lợi về sức khỏe thậm chí là tính mạng. Trong hoàn cảnh đó, cây xanh lại càng có vai trò vô cùng quan trọng. Trồng và bảo vệ cây xanh là biện pháp hữu hiệu để bảo vệ môi trường và cải thiện không gian sống quanh ta. Hệ thống cây xanh có tác dụng cải thiện khí hậu vì chúng có khả năng ngăn chặn và lọc bức xạ mặt trời, ngăn chặn quá trình bốc hơi nước, giữ độ ẩm đất và độ ẩm không khí, kiểm soát gió và lưu thông gió. Cây xanh có tác dụng bảo vệ môi trường: hút khí CO2 và cung cấp O2, ngăn giữ các chất khí bụi độc hại. Với những vai trò to lớn ấy, thật không quá khi nói rằng trồng và bảo vệ cây xanh chính là bảo vệ cuộc sống của chính chúng ta. Bởi vậy, chúng ta cần chung tay bảo vệ cây xanh, nếu cần thay thế trồng mới cây cổ thụ thì cần được xây dựng quy hoạch một cách hệ thống và được sự giám sát chặt chẽ của các cơ quan chức năng.",
          time_send: "10/10/2022",
          image_modal: "cay-xanh-4.jpg",
        },
      ],
      currentSelections: null,
      rowSelections: null,
      idModal: null,
      cateFeack: null,
      conComp: null,
      modalImg: null,
    };
  },
  mounted() {
    this.items.forEach((itm) => this.$set(itm, "selected", false));
  },
  computed: {
    allSelected() {
      return this.items.every((itm) => itm.selected);
    },
  },
  methods: {
    outImfMess(item) {
      console.log(item);
      this.rowSelections = item.id_send;
      this.idModal = item.id_send;
      this.cateFeack = item.cate_feedback;
      this.conComp = item.con_compact;
      this.modalImg = item.image_modal;
      console.log(this.modalImg);
      this.$root.$refs.modalRead.showModal();
    },

    selectAll() {
      let all_s = this.allSelected;
      this.items.forEach((itm) => (itm.selected = !all_s));
    },
  },
  watch: {
    items: {
      handler() {
        this.currentSelections = this.items
          .filter((itm) => itm.selected)
          .map((itm) => itm.id_send)
          .toString();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.table-hover > tr:hover {
  background: #9d9b986e;
}
.tieude {
  background: darkgray;
}
</style>
