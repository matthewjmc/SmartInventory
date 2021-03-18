


<template>
    <header class = 'header'>
        <h1 class = 'title'> CIE Inventory System </h1>
        <ul>
            <li>
                <nuxt-link to='/'>Home</nuxt-link>
            </li>
            <li>
                <nuxt-link to='/login'>Login</nuxt-link>
            </li>
        </ul>
    </header>
</template>

<script>
    export default {
        name: 'AppHeader'
    }
</script>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
            }
    .header .title {
        font-size: 2rem;
        color: #ffffff;
    }
    .header ul{
        display: flex;
    }
    .header a{
        display: inline-block;
        background: #D77113;
        color: #fff;
        padding: 0.3rem 1rem;
        margin-right: 1rem;
    }
    .container {
        max-width: 2500px;
        margin: 1rem;
        overflow: hidden;
        padding: 1rem 2rem;
        background: #ff8d24;
        }
</style>