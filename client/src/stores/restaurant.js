import {
    defineStore
} from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useRestaurantStore = defineStore('resto', {
    state: () => ({
        isLogin: false,
        baseUrl: 'https://hf.abobelajardihacktiv.xyz',
        featuredCuisines: [],
        cuisines: [],
        bins: [],
        catalogs: []
    }),
    actions: {
        swal(icon, title, text) {
            Swal.fire({
                icon,
                title,
                text,
                showConfirmButton: false,
                timer: 1500
            })
        },
        async fetchFeaturedCuisines() {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/cuisines/featured',
                    method: 'get'
                })
                this.featuredCuisines = data
                console.log(data)
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async fetchCuisines(params) {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/cuisines',
                    method: 'get',
                    params
                })
                this.cuisines = data
                console.log(data)
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async fetchCatalogs() {
            try {
                const { data } = await axios({
                    url: this.baseUrl + '/catalogs',
                    method: 'get'
                })
                this.catalogs = data
                console.log(data)
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async discordLogin(params) {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/discord-login',
                    method: 'get',
                    params
                })
                localStorage.setItem('access_token', data.access_token)
                this.isLogin = true
                console.log(data)
                this.$router.push('/')
                this.swal('success', 'Wellcome!', 'Login success')
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        logout() {
            localStorage.clear()
            this.isLogin = false
            this.$router.push('/')
            this.swal('success', 'Good Bye', 'Hope you comeback later')
        },
        async fetchbins() {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/bins',
                    method: 'get',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.bins = data
                console.log(data)
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async patchQuantitybin(val, id) {
            try {
                console.log(val)
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/bins/' + id,
                    method: 'patch',
                    data: {
                        qty: val
                    },
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.fetchbins()
                console.log(data)
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async addbin(cuisineId) {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/bins/' + cuisineId,
                    method: 'post',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.$router.push('/bin')
                this.fetchbins()
                console.log(data)
                this.swal('success', 'Success', 'Add to bin')
            } catch (err) {
                console.log(err)
                this.$router.push('/')
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async deletebin(id) {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                if (result.isConfirmed) {
                    const {
                        data
                    } = await axios({
                        url: this.baseUrl + '/bins/' + id,
                        method: 'delete',
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })
                    this.fetchbins()
                    console.log(data)
                    Swal.fire(
                        'Deleted!',
                        'Your order has been deleted.',
                        'success'
                    )
                }

            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async checkout() {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/checkout',
                    method: 'delete',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                console.log(data)
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        },
        async payment() {
            try {
                const {
                    data
                } = await axios({
                    url: this.baseUrl + '/generate-midtrans-token',
                    method: 'post',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                const callback = this.checkout
                const bins = this.fetchbins
                // console.log(data)
                window.snap.pay(data.token, {
                    onSuccess: function (result) {
                        callback()
                        bins()
                        console.log('a')
                    }
                })
            } catch (err) {
                console.log(err)
                this.swal('error', 'Oops...', err.response.data.message)
            }
        }
    }
})