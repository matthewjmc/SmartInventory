
<template>
    
    <div class='withdraw2'>
        <div class='nameDispSbi'>{{ item_name }} </div>
        <div class='userIdDispSbi'>{{ userID }} </div>
        <div class='nameDispSbi'>{{ Fullname }} </div>
        <div class='dateDispSbi'>{{ date_borrowed }} </div>
        <div class='dateDispSbi'>{{ expected_return_date }} </div>
    </div>

</template>

<script>
export default {
    name: 'itemOverdueWithdrawalTable',
    props: ['userID','itemID','Fullname','item_name','date_borrowed','expected_return_date']
}
</script>

<style>
    .withdraw2 {
        font-size: 26px;
        color: #000;
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #853500;
        color: #fff;
        padding-top: 2px;
        padding-bottom: 1px;
        justify-content: left;
        text-align: left;
        
    }

.itemIdDispSbi {
        width: 6%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .userIdDispSbi {
        width: 10%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
.dateDispSbi {
        width: 24%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 2rem;
        padding-left: 10px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
.nameDispSbi {
        width: 15%;
        font-weight: 500px;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>