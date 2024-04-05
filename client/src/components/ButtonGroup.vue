<script>
    import { mapActions } from 'pinia';
    import { useRestaurantStore } from '../stores/restaurant';
    export default {
        props: ['catalog'],
        methods: {
            ...mapActions(useRestaurantStore, ['fetchCuisines']),
            filteringCuisines(id) {
                const params = {
                    filterCatalog: id
                }
                this.fetchCuisines(params)
            }
        }
    }
</script>

<template>
    <button type="button" class="btn btn-outline-secondary btn-sm" @click="filteringCuisines(catalog.id)">{{ catalog.name }}</button>
</template>