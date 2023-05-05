<template>
<div v-if="user" class="page">
    <h4 class="text-center">Sign Up</h4>
    <SignUpForm :user="user" @submit:user="signUp" />
    <Dialog :message="message" v-if="message!=''" />
</div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import Dialog from "@/components/Dialog.vue";
import AuthService from "@/services/auth.service";
export default {
    components: {
        SignUpForm,
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
                    name: "",
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
        async signUp(data) {
            try {
                console.log("Data: " ,data);
                let userInfo = await AuthService.signUp(data);
                this.message = "Sign up is successful.";
                localStorage.setItem("userId",userInfo._id);
                localStorage.setItem("userRole",userInfo.is_admin);
                this.goToHomePage();
            } catch (error) {
                console.log(error);
            }
        },
        goToHomePage(){
            let userRole = localStorage.getItem("userRole") || undefined;
            if(userRole == undefined){
                this.$router.push({
                    name: "sign-up"
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
