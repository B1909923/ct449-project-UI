<template>
<div v-if="book" class="page">
    <h4>Create New Book</h4>
    <BookForm :book="book" @submit:book="addBook" />
    <Dialog :message="message" v-if="message!=''" />
</div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import Dialog from "@/components/Dialog.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookForm,
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
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook() {
            try {
                this.book = await {
                    title: "",
                    subtitle: "",
                    author: "",
                    image: "",
                    description: "",
                    favorite: false,
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
        async addBook(data) {
            try {
                console.log("Data: " ,data);
                await BookService.create(data);
                this.message = "The book is added.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getBook();
        this.message = "";
    },
};
</script>
