<template>
<div class="modal m-5" tabindex="-1" style="top:20%" @click="goToHomePage">
    <div class="modal-dialog">
        <div class="modal-content border-light shadow-lg">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title">Notify</h5>
                

            </div>
            <div class="modal-body">
                <p>{{message}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
        }
    },
    methods: {
        goToHomePage(){
            let userRole = localStorage.getItem("userRole") || undefined;
            if(userRole == undefined){
                this.$router.push({
                    name: "login"
                });
            } else if(userRole){
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
};
</script>
