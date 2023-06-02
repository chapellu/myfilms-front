<template>
    <v-dialog v-model="dialog" activator="dialog" width="30%">
        <v-card>
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
    emits: ['update:editActorDialog', 'update:editedActor'],
    data() {
        return {
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
        firstName: {
            get(){
                return this.editedActor.first_name
            },
            set(value){
                this.lastName = value
            }
        },
        lastName: {
            get(){
                return this.editedActor.last_name
            },
            set(value){
                this.lastName = value
            }
        },
    },
    methods: {
        saveActor() {
            this.dialog = false
            this.$emit('update:editedActor', {
                "id": this.editedActor.id,
                "first_name": this.firstName,
                "last_name": this.lastName
            })
        }
    }
}
</script>

<style></style>