<template>
<div class="page row">
    <div class="col-md-12">
        <InputSearch v-model="searchText" />
    </div>
    <div v-if="pageIndex == 0" class="mt-3 col-md-12">
        <div class="d-flex">
            <h4 class="bg-secondary text-light px-4 py-1 rounded">
                Books
                <i class="fas fa-book"></i>
            </h4>
            <h4  v-on:click="activePage()" class="px-4 py-1 rounded">
                Authors
                <i class="fas fa-user-alt"></i>
            </h4>
        </div>
        <BookList v-if="filteredCount > 0" :books="filtered" v-model:activeIndex="activeIndex" />
        <p v-else>Empty.</p>
        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Refresh
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddBook">
                <i class="fas fa-plus"></i> Create new
            </button>
            <button class="btn btn-sm btn-danger" @click="removeAllBooks">
                <i class="fas fa-trash"></i> Remove all
            </button>
        </div>
    </div>
    <div v-else class="mt-3 col-md-12">
        <div class="d-flex">
            <h4 v-on:click="activePage()" class="px-4 py-1 rounded">
                Books
                <i class="fas fa-book"></i>
            </h4>
            <h4 class="bg-secondary text-light px-4 py-1 rounded">
                Authors
                <i class="fas fa-user-alt"></i>
            </h4>
        </div>
        <AuthorList v-if="filteredCount > 0" :authors="filtered"/>
        <p v-else>Empty.</p>
        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary" @click="">
                <i class="fas fa-redo"></i> Refresh
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddAuthor">
                <i class="fas fa-plus"></i> Create new
            </button>
            <button class="btn btn-sm btn-danger" @click="">
                <i class="fas fa-trash"></i> Remove all
            </button>
        </div>
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
            <div class="modal-footer">
                <router-link :to="{
                    name: 'book.edit',
                    params: { id: activeBook._id },
                }">
                    <button type="button" class="btn btn-warning"><i class="fas fa-edit"></i> Edit</button>
                </router-link>
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
            authors: [],
            activeIndex: -1,
            searchText: "",
            pageIndex: 0,
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        authorStrings() {
            return this.authors.map((author) => {
                const {
                    name
                } = author;
                return [name].join("");
            });
        },
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
            if(this.pageIndex == 0){
                if (!this.searchText) return this.books;
                return this.books.filter((_book, index) =>
                    this.bookStrings[index].includes(this.searchText)
                );
            } else {
                if (!this.searchText) return this.authors;
                return this.authors.filter((_author, index) =>
                    this.authorStrings[index].includes(this.searchText)
                );
            }
            
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
        async retrieveAuthors() {
            try {
                this.authors = await AuthorService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.retrieveAuthors();
            this.activeIndex = -1;
        },
        activePage() {
            if (this.pageIndex == 0){
                this.pageIndex = 1;
            } else {
                this.pageIndex = 0;
            }
        },
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddAuthor(){
            this.$router.push({
                name: "author.add"
            });
        },
        goToAddBook() {
            this.$router.push({
                name: "book.add"
            });
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
        }
    },
    mounted() {
        this.goToHomePage();
        this.retrieveAuthors();
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
