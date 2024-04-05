<script>
    import CuisineCard from '../components/CuisineCard.vue'
    import ButtonGroup from '../components/ButtonGroup.vue'
    import {
        mapActions,
        mapState
    } from 'pinia';
    import {
        useRestaurantStore
    } from '../stores/restaurant'

    export default {
        components: {
            CuisineCard,
            ButtonGroup
        },
        data() {
            return {
                params: {
                    search: ''
                }
            }
        },
        methods: {
            ...mapActions(useRestaurantStore, ['fetchCuisines', 'fetchCatalogs'])
        },
        computed: {
            ...mapState(useRestaurantStore, ['cuisines', 'catalogs'])
        },
        watch: {
            ['params.search']() {
                this.fetchCuisines(this.params)
            }
        },
        created() {
            this.fetchCuisines()
            this.fetchCatalogs()
        }
    }
</script>

<template>
    <div class="container mt-5">
        <h3 class="mb-3"><a href="#!" @click.prevent="this.$router.back" class="text-body"><i
                    class="fas fa-long-arrow-alt-left me-2"></i>Back</a></h3>
        <hr>
        <h1 class="mb-4">Food and Drink lists</h1>
        <div class="input-group rounded mb-4 border">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" v-model="params.search"
                aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
            </span>
        </div>
        <div class="btn-group mb-3" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="fetchCuisines()">All</button>
            <ButtonGroup v-for="catalog in catalogs" :key="catalog.id" :catalog="catalog"/>
        </div>
        <div class="row g-5">
            <CuisineCard v-for="cuisine in cuisines" :key="cuisine.id" :cuisine="cuisine" />
        </div>
    </div>
</template>