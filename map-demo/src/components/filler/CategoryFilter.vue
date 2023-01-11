<template>   
                <div class="loc-danh-muc">
                    <b-dropdown id="danh-muc-loc" :text="textDrop" class="m-md-2 danh-muc-loc">
                        <b-dropdown-item v-for="(item) in filer" :key="item.id" @click="test(item)" >{{item.cate}}</b-dropdown-item>
                        
                    </b-dropdown>
                </div>
</template>

<script>
export default {
    name: 'btn-filler-category',
    data(){
       return {
        filer: [
            { id: 1, cate: 'Trồng cây xanh đường phố' },
            { id: 2, cate: 'Cắt tỉa cây' },
            { id: 3, cate: 'Cây nguy hiểm' },
            { id: 4, cate: 'Chặt hạ, di chuyển cây xanh' },
        ],
        textDrop: 'Lọc danh mục'
       }
    },
    methods: {
        test(v) {
            // console.log(JSON.parse(JSON.stringify(v)))
            // this.textDrop = v.target.text;    
            this.textDrop = v.cate    
        }
    }

    
}
</script>

<style>
.btn:not(:disabled):not(.disabled){
    cursor: pointer;
    background: white;
    border: none;
    color: black;
}
</style>