<template>
<div class="d-flex justify-content-between">
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="title">Title</label>
            <Field name="title" type="text" class="form-control" placeholder="Title" v-model="bookLocal.title" />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="subtitle">Subtitle</label>
            <Field name="subtitle" type="text" class="form-control" placeholder="Subtitle" v-model="bookLocal.subtitle" />
            <ErrorMessage name="subtitle" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Author</label>
            <Field name="author" type="text" as="select" v-on:change="changeAuthor()" class="form-control" v-model="authorInput">
                <option value="">----Author----</option>
                <option v-for="author in authors" :value="author._id" :asia-selected="author._id === bookLocal.author._id">{{author.name}}</option>
            </Field>
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Image</label>
            <Field name="image" type="file" v-on:change="changeImage()" class="form-control" placeholder="Image" v-model="image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <editor api-key="v9s06gg3siwsvh7kyg32kyks19d5yzbs72w0du3xc4p61gkk" placeholder="Description" name="description" v-model="bookLocal.description" :init="{
         height: 500,
         menubar: false,
         toolbar:'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code'
       }" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="bookLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Favorite</strong>
            </label>
        </div>
        <div class="form-group">
            <button v-if="bookLocal._id" type="submit" class="btn btn-warning">
                Edit
            </button>
            <button v-else type="submit" class="btn btn-primary">Create New</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
        </div>
    </Form>
    <img :src="this.bookLocal.image != '' ? this.bookLocal.image : 'https://i.pinimg.com/originals/c3/8c/41/c38c412d6b948816ee0fac4f1382064e.jpg'" width="300" height="400">
</div>
</template>

<script>
import * as yup from "yup";
import Editor from '@tinymce/tinymce-vue';
import "@tinymce/tinymce-vue";
import {
    Form,
    Field,
    ErrorMessage
} from "vee-validate";
import AuthorService from "@/services/author.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        'editor': Editor,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        image: "",
        image_url: {
            type:String
        },
        book: {
            type: Object,
            required: true
        }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Title is required.")
                .min(2, "Title length min 2.")
                .max(50, "Title length max 50."),
            subtitle: yup
                .string()
                .required("Subtitle is required.")
                .min(2, "Subtitle length min 2.")
                .max(50, "Subtitle length max 50."),
            author: yup
                .string()
                .required("Author is required."),
            image: yup
                .string()
                .required('Image required'),
            description: yup
                .string()
                .max(500, "Description length max 500."),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
            authorInput: this.book.author._id,
        };
    },
    methods: {
        async getAuthors() {
            try {
                this.authors = await AuthorService.getAll();
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
        async changeAuthor() {
            if(this.authorInput != ""){
                let author1 = await AuthorService.get(this.authorInput)
                this.bookLocal.author = author1;
            } else {
                this.bookLocal.author = "";
            }
        },
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        changeImage() {
            let file = this.image;
            if (file != undefined) {
                var reader = new FileReader();
                reader.onload = (file) => {
                    this.bookLocal.image = reader.result;
                    image_url = reader.result;
                }
                reader.readAsDataURL(file)
            } else {
                this.bookLocal.image = "";
                image_url = "https://i.pinimg.com/originals/c3/8c/41/c38c412d6b948816ee0fac4f1382064e.jpg";
            }

        }
    },
    created() {
        this.getAuthors();
        this.message = "";
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
