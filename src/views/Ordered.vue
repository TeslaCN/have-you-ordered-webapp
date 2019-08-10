<template>
    <el-container>
        <el-header>
            <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="点餐日期（次日就餐）"
                    value-format="yyyyMMdd"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-autocomplete
                    class="inline-input"
                    v-model="personNameKey"
                    placeholder="名字的某个字？"
                    :trigger-on-focus="false"
                    :fetch-suggestions="searchName"
                    :select-when-unmatched="true"
                    clearable
            ></el-autocomplete>
        </el-header>
        <el-main>
            <order-list :date="date" :person-name-key="personNameKey"></order-list>
        </el-main>
    </el-container>
</template>

<script>
    import orderList from '@/components/OrderList'

    export default {
        name: "Ordered",
        components: {orderList},
        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '明天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() + 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        }]
                },
                date: '',
                personNameKey: '',
            };
        },
        methods: {
            searchName(key, cb) {
                cb([{value: '自动补全？别想了🌚'}]);
            }
        },
    }
</script>

<style scoped>
    .el-container {
        text-align: center;
    }
</style>