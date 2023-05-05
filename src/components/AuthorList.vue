<script>
export default {
    props: {
        authors: {
            type: Array,
            default: []
        }
    }
};
</script>
<template>
<ul class="list-group">
    <li class="list-group-item" v-for="(author, index) in authors" :key="author._id" >
        <div class="d-flex justify-content-between">
            <span class="name">
                {{ author.name }}
            </span>
            <router-link :to="{
                name: 'author.edit',
                params: { id: author._id },
            }">
                <button type="button" class="btn btn-warning"><i class="fas fa-edit"></i> Edit</button>
            </router-link>
        </div>
        
    </li>
</ul>
</template>
