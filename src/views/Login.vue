<template>
<div v-if="user" class="page">
    <h4 class="text-center">Login</h4>
    <LoginForm :user="user" @submit:user="login" />
    <Dialog :message="message" v-if="message!=''" />
</div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import Dialog from "@/components/Dialog.vue";
import AuthService from "@/services/auth.service";
export default {
    components: {
        LoginForm,
        Dialog,
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            user: null,
            message: "",
        };
    },
    methods: {
        async getAuthor() {
            try {
                this.user = await {
                    username: "",
                    password: "",
                }
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async login(data) {
            try {
                console.log("Data: " ,data);
                let userInfo = await AuthService.login(data);
                if(userInfo.length == 0){
                    this.message = "User is not found.";
                    setTimeout(()=>{
                        this.message = "";
                    },2000);
                } else {
                    this.message = "Login is successful.";
                    setTimeout(()=>{
                        this.message = "";
                    },2000);
                    localStorage.setItem("userId",userInfo[0]._id);
                    localStorage.setItem("userRole",userInfo[0].is_admin);
                    
                    this.goToHomePage();
                }
            } catch (error) {
                console.log(error);
            }
        },
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
    },
    created() {
        this.goToHomePage();
        this.getAuthor();
        this.message = "";
    },
};
</script>
