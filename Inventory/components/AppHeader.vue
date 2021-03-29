
<template>
    <header class = 'header'>
        <h1 class = 'title'> CIE Inventory System </h1>
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
    .container {
        max-width: 8000px;
        margin: 1rem;
        overflow: hidden;
        padding: 1rem 2rem;
        background: #ff8d24;
    }
</style>