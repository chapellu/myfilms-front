<template>
    <div>
        <v-data-table-server :headers="headers" :items="movies" :items-length="totalMovies" :loading="loading"
            :items-per-page="5" item-value="title" hover class="elevation-1" @click:row="showFilmDetails"
            @update:page="getPage">
        </v-data-table-server>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // type inference enabled
    data() {
        return {
            totalMovies: 0,
            movies: [],
            loading: true,
            headers: [
                {
                    title: 'Movie title',
                    key: 'title',
                    align: 'center'
                }
            ],
        }
    },
    async mounted() {
        await this.getDataFromApi(1)
    },
    methods: {
        async getPage(page: number) {
            await this.getDataFromApi(page)
        },
        showFilmDetails(event, itemEvent) {
            this.$router.push({ path: `/${itemEvent.item.raw.id}` })
        },
        async getDataFromApi(page: number) {
            this.loading = true
            const response = await this.axios.get(`http://localhost:8000/?page=${page}`)
            console.log(response)
            this.movies = response.data.films
            this.totalMovies = response.data.length
            this.loading = false
        },
    },
})
</script>