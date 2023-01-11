<template>
    <div name="uesr-imf-data">        
        
    </div>

    
</template>

<script>


export default {
    name: 'compo-user',
    data(){
        return{
            user:[{
                userImg: 'userimage1.jpg',
                userName: 'user 1',
            }],            
        }      

    },
    methods: {
        userName(){
            let name = ' ';
            this.user.forEach(element => {
                console.log("loog",element.userName);
                name = element.userName
                return name;
            });
        }
    },
    

    created() {
            this.$root.$refs.compData = this;
        }
    
}
</script>

<style scoped>

</style>