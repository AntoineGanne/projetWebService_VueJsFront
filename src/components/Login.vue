<template>
    <div class="w-50 m-auto" style="background-color: #1E1E1E;">
        <h1 class="text-center" style="color: #BB0B0B">Login</h1>
        <div class="input-group w-auto m-auto pl-3 pr-3">
            <div class="input-group-prepend">
                <span class="input-group-text" style="background-color: #BB0B0B;">
                    <img alt="user" src="../assets/icon/user.png">
                </span>
            </div>
            <input type="text" class="form-control m-auto" placeholder="Username" aria-label="Username" v-model="username" required>
        </div>
        <br />
        <div class="input-group w-auto m-auto pl-3 pr-3">
            <div class="input-group-prepend">
                <span class="input-group-text" style="background-color: #BB0B0B;">
                    <img alt="lock" src="../assets/icon/lock.png">
                </span>
            </div>
            <input type="password" class="form-control m-auto " placeholder="Password" aria-label="Password" v-model="password" required>
        </div>
        <div class="text-center mt-2">
            <button class="btn" style="background-color: #BB0B0B;" type="submit" v-on:click="handleSubmit()">Login</button>
            <br/>
            <span v-if="auth.authenticationError !== '' && !auth.authenticationSuccess" class="text-danger">{{authenticationError}}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'
    import router from '../router'

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapGetters('auth', ['authenticating', 'authenticationError', 'authenticationErrorCode', 'authenticationSuccess']),
            ...mapState({auth: state => state.auth}),
        },
        methods: {
            ...mapActions('auth', ['authenticate', 'getUserConnected']),

            async handleSubmit() {
                this.submitted = true;
                if (this.username !== '' && this.password !== '') {
                    let authenticationSuccess = await this.authenticate({
                        username: this.username,
                        password: this.password
                    });
                    this.password = "";
                    if (authenticationSuccess) {
                        // Get the user
                        await this.getUserConnected();

                        // And change current route
                        router.push('/');
                    }
                }
            }
        },
    }
</script>

<style scoped>
</style>
