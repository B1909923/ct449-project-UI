<template>
<div class="page row justify-content-center">
    <div class="col-md-12">
        <InputSearch v-model="searchText" />
    </div>
    <div class="mt-5 w-100 p-3">
        <BookList v-if="filteredCount > 0" :books="filtered" v-model:activeIndex="activeIndex" />
        <p v-else>Empty.</p>
    </div>
        
</div>
<div class="modal" tabindex="-1" v-if="activeBook">
    <div class="modal-dialog" style="max-width: 70%; max-height:90%">
        <div class="modal-content border-light shadow-lg">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title">Book Details</h5>
                    <h4><i class="fa fa-close" v-on:click="closeDialog"></i></h4>

            </div>
            <div class="modal-body">
                <BookCard :book="activeBook" style="max-height:500px; overflow-y:auto;" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import AuthorList from "@/components/AuthorList.vue";
import BookService from "@/services/book.service";
import AuthorService from "@/services/author.service";
export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
        AuthorList,
    },
    data() {
        return {
            books: [],
            searchText: "",
            activeIndex: -1,
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const {
                    title,
                    subtitle,
                    author,
                    image,
                    description
                } = book;
                return [title, subtitle, author, image, description].join("");
            });
        },
        // Trả về các book có chứa thông tin cần tìm kiếm.
        filtered() {
                if (!this.searchText) return this.books;
                return this.books.filter((_book, index) =>
                    this.bookStrings[index].includes(this.searchText)
                );
            
            
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filtered[this.activeIndex];
        },
        closeDialog(){
            if (this.activeIndex >= 0) {
                this.activeIndex = -1
            };
        },
        filteredCount() {
            return this.filtered.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        goToHomePage(){
            let userRole = localStorage.getItem("userRole") || undefined;
            if(userRole == undefined || userRole == 'undefined' ){
                this.$router.push({
                    name: "login"
                });
            } else if(userRole == "true"){
                this.$router.push({
                    name: "admin-home"
                });
            } else {
                this.$router.push({
                    name: "home"
                });
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        
    },
    mounted() {
        this.goToHomePage()
        this.retrieveBooks();
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 100%;
}
</style>
