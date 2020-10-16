<template>
    <el-container>
        <el-main>
            <el-alert
                    title="报餐请注意"
                    type="error"
                    description="此处报餐真实有效！请谨慎提交！"
                    show-icon>
            </el-alert>
            <el-form ref="form" :model="orderForm" label-width="180px">
                <el-form-item label="吃饭人">
                    <el-input v-model="orderForm.name"></el-input>
                </el-form-item>
                <el-form-item label="吃啥🌚">
                    <el-radio-group v-model="orderForm.orderType" @change="onOrderTypeSelect">
                        <!--                        <el-radio label="套餐饭">套餐饭（工作日）</el-radio>-->
                        <!--                        <el-radio label="中餐和晚餐">中餐和晚餐（周末）</el-radio>-->
                        <!--                        <el-radio label="中餐">中餐（周末）</el-radio>-->
                        <!--                        <el-radio label="晚餐">晚餐（周末）</el-radio>-->
                        <el-radio v-for="orderType in orderTypes" border :key="orderType._id" :label="orderType.value"
                                  :size="orderType.openStatus ? 'medium':'mini'">{{orderType.value}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="订餐日期（次日就餐）">
                    <el-date-picker
                            v-model="orderForm.time"
                            type="datetime"
                            placeholder="订餐日期（次日就餐）"
                            :picker-options="pickerOptions"
                            value-format="timestamp"
                            default-time="17:59:59"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有啥想法？">
                    <el-input type="textarea" v-model="orderForm.suggestContent"></el-input>
                </el-form-item>
                <el-alert
                        title="报餐请注意"
                        type="error"
                        description="此处报餐真实有效！请谨慎提交！"
                        show-icon>
                </el-alert>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即报餐</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Ordering",
        data() {
            return {
                orderForm: {
                    name: '',
                    orderType: '',
                    time: 0,
                    YYMMdd: this.date,
                    isAM: 1,
                    suggestContent: '',
                },
                // {"error_code":0,"msg":"ok 😄","data":[{"_id":"5c3c2067795d1e7c0a8dc2e7","value":"套餐饭","openStatus":true,"__v":0},{"_id":"5c665072795d1e7c0a8dc81a","value":"中餐","openStatus":false,"__v":0},{"_id":"5c66507a795d1e7c0a8dc81b","value":"晚餐","openStatus":false,"__v":0},{"_id":"5c665083795d1e7c0a8dc81c","value":"中餐和晚餐","openStatus":false,"__v":0},{"_id":"5e9662ec795d1e7c0a8ded0b","value":"牛肉汤面","openStatus":false,"__v":0},{"_id":"5e966309795d1e7c0a8ded0c","value":"干面套餐+猪杂汤","openStatus":true,"__v":0},{"_id":"5e9be1ee795d1e7c0a8ded5f","value":"干炒粿条","openStatus":true,"__v":0},{"_id":"5e9e6526795d1e7c0a8ded94","value":"牛肉炒饭","openStatus":false,"__v":0},{"_id":"5ea12dd8795d1e7c0a8deddb","value":"牛肉炒面","openStatus":false,"__v":0}]}
                orderTypes: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < new Date(new Date().getTime() - 3600 * 24 * 1000 * 2);
                    },
                    shortcuts: [{
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
            };
        },
        computed: {
            date() {
                let date = new Date(this.orderForm.time);
                return this.formatDate(date);
            }
        },
        methods: {
            fetchAllOrderTypes() {
                axios.get('/api/order-types').then(res => {
                    let body = res.data;
                    console.log(body);
                    this.orderTypes = body.data;
                })
            },
            fix0(s) {
                return `0${s}`.slice(-2);
            },
            formatDate(date) {
                return `${date.getFullYear()}${this.fix0(date.getMonth() + 1)}${this.fix0(date.getDate())}`;
            },
            onOrderTypeSelect(selectedValue) {
                console.log(selectedValue)
                if (!this.isValidOrderType(selectedValue)) {
                    confirm(`当前选择的 ${selectedValue} 非当日有效选项 ${this.allValidTypes()}，请确认是否选择！`)
                }
            },
            isValidOrderType(value) {
                return this.allValidTypes().includes(value);
            },
            allValidTypes() {
                return this.orderTypes.filter(t => t.openStatus).map(t => t.value);
            },
            onSubmit() {
                if (!confirm('大佬真的要吃(jia)饭(ban)吗？\n这不是演习，真的会提交订餐哦🌚\n') || !confirm('此处报餐真实有效，是否确认提交？')) {
                    return;
                }
                let form = this.orderForm;
                form.YYMMdd = this.date;
                form.suggestContent = `${form.suggestContent}. .      `;
                console.log(form);
                axios.post('/api/order', form).then(res => {
                    let body = res.data;
                    console.log(body);
                    this.$router.push(`/ordered/${form.YYMMdd}`);
                })
            }
        },
        mounted() {
            let now = new Date();
            now.setHours(17);
            now.setMinutes(59);
            now.setSeconds(59);
            now.setMilliseconds(0);
            this.orderForm.time = now.getTime();
            this.fetchAllOrderTypes();
        }
    }
</script>

<style scoped>

</style>