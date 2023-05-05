<template>
<div v-if="book" class="page">
    <h4>Edit Book Details</h4>
    <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
    <Dialog :message="message" v-if="message!=''" />
    <ConfirmDialog v-if="confirmMessage" :message="confirmMessage" @confirmDelete="confirmDelete" />
    <p>{{ message }}</p>
</div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";
import Dialog from "@/components/Dialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
export default {
    components: {
        BookForm,
        ConfirmDialog,
        Dialog
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            book: null,
            message: "",
            confirmMessage: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
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
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                this.message = "The book is edited.";
            } catch (error) {
                console.log(error);
            }
        },
        async confirmDelete(confirm) {
            this.confirmMessage = "";
            console.log(confirm);
            if (confirm) {
                try {
                    await BookService.delete(this.book._id);
                    this.$router.push({
                        name: "admin-home"
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async deleteBook() {
            this.confirmMessage = "Do you want to detele this book?";
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>
