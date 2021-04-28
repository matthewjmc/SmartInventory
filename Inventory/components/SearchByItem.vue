
<template>
    
    <div class='withdraw'>
        <div class='idDisp'>{{ itemID }} </div>
        <div class='nameDisp'>{{ item_name }} </div>
        <div class='idDisp'>{{ userID }} </div>
        <div class='nameDisp'>{{ firstname }}  {{ lastname }} </div>
        <div class='dateDisp'>{{ date_borrowed }} </div>
        <div class='dateDisp'>{{ expected_return_date }} </div>
    </div>

</template>

<script>
export default {
    name: 'itemWithdrawalTable',
    props: ['userID','itemID','firstname','lastname','item_name','date_borrowed','expected_return_date']
}
</script>

<style>
    .withdraw {
        font-size: 26px;
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

.idDisp {
        width: 12%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
.dateDisp {
        width: 24%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 2rem;
        padding-left: 10px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
.nameDisp {
        width: 19%;
        font-weight: 500px;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>