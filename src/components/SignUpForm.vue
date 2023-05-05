<template>
<div class="d-flex justify-content-center">
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="name">Name</label>
            <Field name="name" type="text" class="form-control" placeholder="Name" v-model="userLocal.name" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" placeholder="Username" v-model="userLocal.username" />
            <ErrorMessage name="username" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" placeholder="Password" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-success">
                Sign Up
            </button>
        </div>
    </Form>
    
</div>
</template>

<script>
import * as yup from "yup";
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
    emits: ["submit:user", "delete:user"],
    props: {
        user: {
            type: Object,
            required: true
        },
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("User name is required.")
                .min(2, "User name length min 2.")
                .max(50, "User name length max 50."),
            username: yup
                .string()
                .required("User username is required.")
                .min(2, "User username length min 2.")
                .max(50, "User username length max 50."),
            password: yup
                .string()
                .required("User password is required.")
                .min(2, "User password length min 2.")
                .max(50, "User password length max 50."),
        });
        return {
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
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
