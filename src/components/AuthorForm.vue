<template>
<div class="d-flex justify-content-between">
    <Form @submit="submitAuthor" :validation-schema="authorFormSchema">
        <div class="form-group">
            <label for="name">Author name</label>
            <Field name="name" type="text" class="form-control" placeholder="Author name" v-model="authorLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button v-if="authorLocal._id" type="submit" class="btn btn-warning">
                Edit
            </button>
            <button v-else type="submit" class="btn btn-primary">Create New</button>
            <button v-if="authorLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteAuthor">
                Xóa
            </button>
        </div>
    </Form>
    
</div>
</template>

<script>
import * as yup from "yup";
import "@tinymce/tinymce-vue";
import {
    Form,
    Field,
    ErrorMessage
} from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:author", "delete:author"],
    props: {
        author: {
            type: Object,
            required: true
        },
    },
    data() {
        const authorFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Author name is required.")
                .min(2, "Author name length min 2.")
                .max(50, "Author name length max 50."),
        });
        return {
            authorLocal: this.author,
            authorFormSchema,
        };
    },
    methods: {
        submitAuthor() {
            this.$emit("submit:author", this.authorLocal);
        },
        deleteAuthor() {
            this.$emit("delete:author", this.authorLocal.id);
        },
    },
    created() {
        this.message = "";
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
