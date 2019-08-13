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
                    <el-input v-model="orderForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="吃啥🌚">
                    <el-radio-group v-model="orderForm.orderType">
                        <el-radio label="套餐饭">套餐饭（工作日）</el-radio>
                        <el-radio label="中餐和晚餐">中餐和晚餐（周末）</el-radio>
                        <el-radio label="中餐">中餐（周末）</el-radio>
                        <el-radio label="晚餐">晚餐（周末）</el-radio>
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
                        onclick(picker) {
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
            fix0(s) {
                return `0${s}`.slice(-2);
            },
            formatDate(date) {
                return `${date.getFullYear()}${this.fix0(date.getMonth() + 1)}${this.fix0(date.getDate())}`;
            },
            onSubmit() {
                confirm('大佬真的要吃(jia)饭(ban)吗？\n这不是演习，真的会提交订餐哦🌚\n');
                confirm('此处报餐真实有效，是否确认提交？');
                let form = this.orderForm;
                form.YYMMdd = this.date;
                console.log(form);
                axios.post('/api/order', form).then(res => {
                    let body = res.data;
                    console.log(body);
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
        }
    }
</script>

<style scoped>

</style>