<template>
<div v-if="author" class="page">
    <h4>Edit Author Details</h4>
    <AuthorForm :author="author" @submit:author="updateAuthor" @delete:author="deleteAuthor" />
    <Dialog :message="message" v-if="message!=''" />
    <ConfirmDialog v-if="confirmMessage" :message="confirmMessage" @confirmDelete="confirmDelete" />
</div>
</template>

<script>
import AuthorForm from "@/components/AuthorForm.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import Dialog from "@/components/Dialog.vue";
import AuthorService from "@/services/author.service";
export default {
    components: {
        AuthorForm,
        Dialog,
        ConfirmDialog,
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
            confirmMessage: "",
        };
    },
    methods: {
        async getAuthor(id) {
            try {
                this.author = await AuthorService.get(id);
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
        async confirmDelete(confirm) {
            this.confirmMessage = "";
            console.log(confirm);
            if (confirm) {
                try {
                    await AuthorService.delete(this.author._id);
                    this.$router.push({
                        name: "admin-home"
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async updateAuthor(data) {
            try {
                console.log("Data: ", data);
                await AuthorService.update(this.author._id, data);
                this.message = "The author is updated.";
            } catch (error) {
                console.log(error);
            }
        },
        deleteAuthor() {
            this.confirmMessage = "Do you want to detele this author?";
        },
    },
    created() {
        this.getAuthor(this.id);
        this.message = "";
    },
};
</script>
