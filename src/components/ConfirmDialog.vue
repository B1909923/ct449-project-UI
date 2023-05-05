<template>
<div class="modal m-5" tabindex="-1" style="top:20%">
    <div class="modal-dialog">
        <div class="modal-content border-light shadow-lg">
            <div class="modal-header bg-warning text-white">
                <h5 class="modal-title">Confirm</h5>
                <h4 v-on:click="confirmFalse"><i class="fa fa-close" data-bs-dismiss="modal" aria-label="Close"></i></h4>
            </div>
            <div class="modal-body">
                <p>{{message}}</p>
            </div>
            <div class="modal-footer">
                <button type="button" v-on:click="confirmFalse" class="btn btn-success">No</button>
                <button type="button" v-on:click="confirmTrue" class="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    emits: ["confirmDelete"],
    props: {
        message: {
            type: String,
        }
    },
    data(){
        return {
            confirm : false,
        };
    },
    methods:{
        confirmFalse(){
            this.confirm = false;
            this.$emit("confirmDelete", this.confirm);
        },
        confirmTrue(){
            this.confirm = true;
            this.$emit("confirmDelete", this.confirm);
        }
    }
};
</script>
