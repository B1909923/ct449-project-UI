<template>
<nav class="navbar navbar-expand navbar-success bg-success">
    <div class="mr-auto navbar-brand text-white d-flex justify-content-between w-100 align-items-center">
        <div class="nav-link text-white" @click="goToHomePage">
            Review Books
            <i class="fas fa-address-book"></i>
        </div>
        <div>
            <i class="fa-solid fa-arrow-right-from-bracket px-4 py-2" style="cursor:pointer" title="Log out" v-if="isUser" @click="logout"></i>
        </div>
    </div>
</nav>
</template>
<script>
export default {
    data() {
        return {
            isUser: false,
        };
    },
    methods: {
        goToHomePage(){
            let userRole = localStorage.getItem("userRole") || undefined;
            if(userRole == undefined || userRole == 'undefined' ){
                this.$router.push({
                    name: "login"
                });
            } else if(userRole == "true"){
                this.$router.push({
                    name: "admin-home"
                });
            } else {
                this.$router.push({
                    name: "home"
                });
            }
        },
        checkUser(){
            let userRole = localStorage.getItem("userRole") || undefined;
            if(userRole == undefined || userRole == 'undefined' ){
                this.isUser = false;
            } else if(userRole == "true"){
                this.isUser = true;
            } else {
                this.isUser = true;
            }
        },
        logout(){
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");
            this.goToHomePage();
        }
    },
    mounted(){
        this.checkUser();
    }
};
</script>
