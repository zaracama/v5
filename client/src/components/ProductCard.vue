<script>
    import { mapActions } from 'pinia';
    import { useRestaurantStore } from '../stores/restaurant';
    
    export default {
        props: ['cuisine'],
        methods: {
            ...mapActions(useRestaurantStore, ['addbin'])
        }
    }
</script>

<template>
    <div class="col-12 col-lg-3">
        <div class="card shadow-sm border-0 rounded">
            <img :src="cuisine.imageUrl" class="card-img-top" :alt="cuisine.name" style="max-height: 167px;"/>
            <div class="card-body">
                <h3 class="card-title">{{ cuisine.name }}</h3>
                <p class="card-text">{{ cuisine.description }}</p>
                <p>Rp. {{ cuisine.price }}</p>
                <button class="btn btn-card" @click="addbin(cuisine.id)">Add to bin</button>
            </div>
        </div>
    </div>
</template>