<template>
    <div class="d-flex align-center justify-center flex-column">
        <v-card width="60%">
            <v-card-title>{{ title }}</v-card-title>
            <v-rating v-model="grade" hover half-increments></v-rating>
            <v-card-text>
                <p>Description</p>
                <v-textarea :model-value="description"></v-textarea>
                <p>Actors</p>
                <v-list>
                    <v-list-item v-for="actor in actors" :key="actor.id" :title="fullname(actor)">
                        <template v-slot:append>
                            <v-btn icon="mdi-pencil" variant="text"></v-btn>
                            <v-btn icon="mdi-delete" variant="text"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                <v-row align="center" justify="center">
                    <v-btn icon="mdi-plus"></v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 1,
            title: "",
            description: "",
            actors: [],
            grade: 0
        }
    },
    async mounted() {
        await this.getDataFromAPI()
    },
    methods: {
        fullname(actor) {
            return `${actor.first_name} ${actor.last_name}`
        },
        async getDataFromAPI() {
            {
                this.title = "Titanic",
                    this.description = "A story of a boat and its love for icecream",
                    this.actors = [{
                        "id": 1,
                        "first_name": "George",
                        "last_name": "TuSaisQui"
                    }, {
                        "id": 2,
                        "first_name": "David",
                        "last_name": "Goodenough"
                    }],
                    this.grade = 4.3
            }
        }
    }
}

</script>

<style></style>