<template>
    <div>
        <v-data-table-server :headers="headers" :items="movies" :items-length="totalMovies" :loading="loading"
            :items-per-page="5" item-value="title" hover class="elevation-1" @click:row="showFilmDetails"
            @update:page="getPage">
        </v-data-table-server>
    </div>
</template>
  
<script lang="ts">
import type { VDataTable } from 'vuetify/lib/labs/components.mjs'
type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>> ? UnwrapReadonlyArrayType<I> : A
type DT = InstanceType<typeof VDataTable>;
type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT['headers']>;


export default {
    // type inference enabled
    data() {
        const header: ReadonlyDataTableHeader =
        {
            title: 'Movie title',
            key: 'title',
            align: 'center'
        }

        return {
            totalMovies: 0,
            movies: [],
            loading: true,
            headers: [header],
        }
    },
    async mounted() {
        await this.getDataFromApi(1)
    },
    methods: {
        async getPage(page: number) {
            await this.getDataFromApi(page)
        },
        showFilmDetails(event: any, itemEvent: { item: { raw: { id: any } } }) {
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
}
</script>