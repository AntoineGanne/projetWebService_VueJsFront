<template>
    <div>
        <router-link to="/actors"><img class="ml-1 mt-1" src="../../assets/icon/left-arrow.png"/></router-link>
        <div class="w-75 mt-0 mr-auto ml-auto bg-dark">
            <h1 class="text-white mt-3 text-center">Informations sur l'acteur n°{{noAct}}</h1>
            <div v-if="renderComponent">
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/user-r.png"/>  Nom</h4>
                    </div>
                    <div class="col-md-4 mr-auto text-center">
                        <h4 class="text-white">{{actors.actors.actorSelected.actor.prenAct}} {{actors.actors.actorSelected.actor.nomAct}}</h4>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/calendar.png"/>  Date de naissance</h4>
                    </div>
                    <div class="col-md-4 mr-auto text-center">
                        <h4 class="text-white">{{actors.actors.actorSelected.actor.dateNaiss}}</h4>
                    </div>
                </div>
                <div class="row mt-3" v-if="actors.actors.actorSelected.actor.dateDeces !== null">
                    <div class="col-md-4 ml-auto">
                        <h4 class="text-white"><img src="../../assets/icon/calendar.png"/>  Date de décés</h4>
                    </div>
                    <div class="col-md-4 mr-auto text-center">
                        <h4 class="text-white">{{actors.actors.actorSelected.actor.dateDeces}}</h4>
                    </div>
                </div>
            </div>
            <div class="row mt-3" v-if="renderCharacters">
                <div class="col-md-4 ml-auto">
                    <h4 class="text-white"><img src="../../assets/icon/superhero.png"/>  Personnages</h4>
                </div>
                <div class="col-md-4 mr-auto ml-0 text-center">
                    <div v-for="character in characters" :key="character.noFilm">
                        <div v-for="character in characters" :key="character.noFilm">
                            <h4 class="text-white" v-for="(element, index) in character.charactersSelected.character" :key="index" :value="element.nomPers">
                                {{element.nomPers}} ({{element.filmByNoFilm.titre}} - {{element.filmByNoFilm.realisateurByNoRea.prenRea}} {{element.filmByNoFilm.realisateurByNoRea.nomRea}})</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "ActorDetails",
        data() {
            return {
                noAct: this.$route.params.id,
                renderComponent: false,
                renderCharacters: false
            }
        },
        created() {
            this.getAnActor(this.noAct)
            this.getActorCharacters(this.noAct)

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'actors/getAnActorSuccess') {
                    this.renderComponent = true
                }
            });

            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'characters/getActorCharactersSuccess') {
                    this.renderCharacters = true
                }
            });
        },
        computed: {
            ...mapState({actors: state => state.actors}),
            ...mapState({characters: state => state.characters})
        },
        methods: {
            ...mapActions('actors', ['getAnActor']),
            ...mapActions('characters', ['getActorCharacters']),

        },
    }
</script>

<style scoped>

</style>