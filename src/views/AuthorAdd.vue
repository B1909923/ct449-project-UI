<template>
<div v-if="author" class="page">
    <h4>Create New Author</h4>
    <AuthorForm :author="author" @submit:author="addAuthor" />
    <Dialog :message="message" v-if="message!=''" />
</div>
</template>

<script>
import AuthorForm from "@/components/AuthorForm.vue";
import Dialog from "@/components/Dialog.vue";
import AuthorService from "@/services/author.service";
export default {
    components: {
        AuthorForm,
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
            author: null,
            message: "",
        };
    },
    methods: {
        async getAuthor() {
            try {
                this.author = await {
                    name: "",
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
        async addAuthor(data) {
            try {
                console.log("Data: " ,data);
                await AuthorService.create(data);
                this.message = "The author is added.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getAuthor();
        this.message = "";
    },
};
</script>
