<script>
export default {
    props: {
        book: {
            type: Object,
            required: true
        },

    },
};
</script>
<template>
<div>
    <div class="d-flex">
        <img v-bind:src="book.image" width="300" height="400">
        <div class="flex-grow-1">
            <div class="p-1">
                <h3>
                    <strong>Title:</strong>
                    {{ book.title }}
                </h3>
            </div>
            <div v-if="book.subtitle != book.title" class="p-1">
                <strong>Subitle:</strong>
                {{ book.subtitle }}
            </div>
            <div class="p-1">
                <h5>
                    <strong>Author:</strong>
                    {{ book.author.name }}
                </h5>
            </div>
            <div class="p-1">
                <h5>
                    <strong>Admin suggested this review:&nbsp;</strong>
                    <i v-if="book.favorite" class="fas fa-check text-primary"></i>
                    <i v-else class="fa-solid fa-xmark text-warning"></i>
                </h5>
                
            </div>
        </div>
    </div>

    <div class="p-1 ">
        <strong>Description:</strong>
        <div v-html="book.description">
        </div>
    </div>
</div>
</template>
