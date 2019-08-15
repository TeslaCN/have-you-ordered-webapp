<template>
    <el-table
            :data="filteredList"
            stripe
            style="width: 100%">
        <el-table-column
                type="index" width="50">
        </el-table-column>
        <el-table-column
                prop="name"
                label="吃饭人"
                width="100"
        >
        </el-table-column>
        <el-table-column
                prop="orderType"
                label="吃啥"
                width="150">
        </el-table-column>
        <el-table-column
                prop="time"
                label="点餐时间（次日吃饭）"
                width="400"
        >
        </el-table-column>
        <el-table-column
                prop="suggestContent"
                label="吃饭建议">
        </el-table-column>
    </el-table>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "OrderList",
        props: {
            date: String,
            personNameKey: String,
        },
        data() {
            return {
                // {"_id":"5d4bba9f795d1e7c0a8dd916","name":"胡明哲","orderType":"套餐饭","time":"Thu Aug 08 2019 14:01:03 GMT+0800 (CST)","isAM":1,"YYMMDD":"20190808","suggestContent":"","__v":0}
                orderList: [],
            };
        },
        computed: {
            filteredList() {
                return this.orderList.filter(o => o.name.includes(this.personNameKey));
            }
        },
        methods: {
            fetch(date) {
                console.log(`Fetching: ${date}`);
                axios.get(`/api/ordered/${date}`).then(response => {
                    let body = response.data;
                    this.orderList = body.data;
                })
            },
            fix0(s) {
                return ('0' + s).slice(-2);
            }
        },
        watch: {
            date() {
                this.fetch(this.date);
            }
        },
        mounted() {
            let date = this.date;
            if (date === '') {
                let now = new Date();
                date = `${now.getFullYear()}${this.fix0(now.getMonth() + 1)}${this.fix0(now.getDate())}`;
            }
            this.fetch(date);
        }
    }
</script>

<style scoped>

</style>