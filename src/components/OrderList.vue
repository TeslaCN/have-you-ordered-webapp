<template>
    <div>
        <el-alert v-if="orderList.length == 0" title="今天还没人点餐，可以试试选择昨天的日期！" type="warning" show-icon></el-alert>
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
    </div>
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
                if (!date) {
                    return;
                }
                console.log(`Fetching: ${date}`);
                axios.get(`/api/ordered/${date}`).then(response => {
                    let body = response.data;
                    this.orderList = body.data;
                })
            },
        },
        watch: {
            date() {
                this.fetch(this.date);
            }
        },
        mounted() {
            this.fetch(this.date);
        }
    }
</script>

<style scoped>

</style>