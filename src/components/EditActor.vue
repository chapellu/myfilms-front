<template>
    <v-dialog v-model="dialog" activator="dialog" width="30%">
        <v-card @keyup.enter="saveActor">
            <v-card-text>
                <p>First name</p>
                <v-text-field label="First name" v-model="firstName"></v-text-field>
                <p>Last name</p>
                <v-text-field label="Last name" v-model="lastName"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="saveActor">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">


export default {
    props: {
        'editActorDialog': Boolean, "editedActor": Object
    },
    emits: ['update:editActorDialog', 'actorEdited'],
    data() {
        return {
            firstName: null,
            lastName: null
        }
    },
    watch: {
        editedActor(newValue, oldValue){
            console.log(newValue)
            this.firstName = newValue.first_name
            this.lastName = newValue.last_name
        }
    },
    computed: {
        dialog: {
            get() {
                return this.editActorDialog
            },
            set(value) {
                this.$emit('update:editActorDialog', value)
            },
        },
    },
    methods: {
        saveActor() {
            this.dialog = false
            this.editedActor.first_name = this.firstName
            this.editedActor.last_name = this.lastName
            this.$emit('actorEdited', this.editedActor)
        }
    }
}
</script>

<style></style>