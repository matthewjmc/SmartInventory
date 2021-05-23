
<template>
    <div class='inv'>
        <div class='monthHeader'> {{ item_name }} </div>
        <div class='requiredItemHeader'>{{ description }} </div>
    </div>

</template>

<script>
export default {
    name: 'currentInv',
    props: ['item_name','description','amount','availability']
}
</script>

<style>
    .inv {
        font-size: 25px;
        color: #000;
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #D77113;
        color: #fff;
        padding-top: 2px;
        padding-bottom: 1px;
        justify-content: left;
        text-align: left;
    }
    .requiredItemHeader {
        width: 70%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .monthHeader {
        width: 35%;
        font-weight: 600px;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>