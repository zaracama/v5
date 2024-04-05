<script>
    export default {
        props: ['cuisine']
    }
</script>

<template>
    <div class="col-12 col-lg-3">
        <div class="card shadow-sm border-0 rounded">
            <img :src="cuisine.Cuisines[0].imageUrl" class="card-img-top" alt="" />
            <div class="card-body">
                <h3 class="card-title">{{ cuisine.Cuisines[0].name }}</h3>
                <p class="card-text">{{ cuisine.Cuisines[0].description }}</p>
                <p>Rp. {{ cuisine.Cuisines[0].price }}</p>
                <button class="btn btn-card" @click="this.$router.push('/list')">Order Now</button>
            </div>
        </div>
    </div>
</template>