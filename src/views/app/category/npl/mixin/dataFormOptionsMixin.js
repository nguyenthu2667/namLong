import nplAPI from "@/api/modules/nplAPI";

export default {
  data() {
    return {
      dataFormOptions: {},
    }
  },
  methods: {
    getSelect(type, nameKey, option) {
      let body = {
        CategoryType: type,
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              const obj = {
                text: item[nameKey],
                value: item.ID,
              };
              newArr.push(obj);
            });
          }
          // this.dataFormOptions[option] = newArr //--> cái này có khi nó sẽ ko cập nhật lại
          this.dataFormOptions = {
            ...this.dataFormOptions,
            [option]: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
  },
}