<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">🌚🌚🌚</router-link>
            |
            <router-link to="/ordered">点餐了？🌝</router-link>
            |
            <router-link to="/ordering">现在点（不受时间限制，小心查水表🌚）</router-link>
            |
            <router-link to="/version">🌜版本信息🌛</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
    };
</script>
<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*  color: #2c3e50;*/
    }

    #nav {
        text-align: center;
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
