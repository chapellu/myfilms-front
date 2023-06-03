<template>
    <div class="d-flex align-center justify-center flex-column">
        <v-card width="60%">
            <v-card-title>{{ title }}</v-card-title>
            <v-rating v-model="grade" hover half-increments></v-rating>
            <v-card-text>
                <p>Description</p>
                <v-textarea v-model="description" @change="sendDescription"></v-textarea>
                <p>Actors</p>
                <v-list>
                    <v-list-item v-for="actor in actors" :key="actor.id" :title="fullname(actor)">
                        <template v-slot:append>
                            <v-btn icon="mdi-pencil" variant="text" @click="editActor(actor)"></v-btn>
                            <v-btn icon="mdi-delete" variant="text" @click="deleteActor(actor)"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                <v-row align="center" justify="center">
                    <v-btn icon="mdi-plus" @click="addActor"></v-btn>
                </v-row>
                <EditActor v-model:edit-actor-dialog="editActorDialog" :edited-actor="editedActor" @actorEdited="sendActor"></EditActor>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
import EditActor from './EditActor.vue';
export default {
    components: {
        EditActor
    },
    data() {
        return {
            id: 0,
            title: "",
            description: "",
            actors: [],
            grade: null,
            editActorDialog: false,
            editedActor: null,
            descriptionLoading: false
        }
    },
    async mounted() {
        await this.getDataFromAPI()
    },
    watch: {
        async grade(newGrade, oldGrade){
            console.log(oldGrade, newGrade);
            if (oldGrade !== null){
                console.log("here")
                await this.axios.put(`http://localhost:8000/${this.$route.params.id}`, { "grade": newGrade })
            }
        },
    },
    methods: {
        fullname(actor) {
            return `${actor.first_name} ${actor.last_name}`
        },
        async getDataFromAPI() {
            const response = await this.axios.get(`http://localhost:8000/${this.$route.params.id}`)
            this.title = response.data.title
            this.description = response.data.description
            this.actors = response.data.actors
            this.grade = response.data.grade
        },
        async deleteActor(actor) {
            const index = this.actors.indexOf(actor, 0);
            if (index > -1) {
                this.actors.splice(index, 1);
            }
            await this.axios.put(`http://localhost:8000/${this.$route.params.id}`, { "actors": this.actors })
        },
        async editActor(actor){
            this.editedActor = actor
            this.editActorDialog = true
        },
        async addActor(){
            this.editedActor = {
                "id": -1,
                "first_name": null,
                "last_name": null
            }
            this.editActorDialog = true
        },
        async sendActor(actor){
            if(this.actors.indexOf(actor) == -1){
                this.actors.push(this.editedActor)
            }
            await this.axios.put(`http://localhost:8000/${this.$route.params.id}`, { "actors": this.actors })
        },
        async sendDescription(){
            await this.axios.put(`http://localhost:8000/${this.$route.params.id}`, { "description": this.description })
        },
        async hello(){
            console.log("hello")
        }
    }
}

</script>

<style></style>