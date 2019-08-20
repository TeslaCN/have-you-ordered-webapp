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
                    :fetch-suggestions="searchName"
                    :debounce="10"
                    @select="onSelect"
                    clearable
            ></el-autocomplete>
            <el-button @click="clearHistory">sudo rm -rf /</el-button>
        </el-header>
        <el-main>
            <order-list :date="date" :person-name-key="personNameKey"></order-list>
        </el-main>
    </el-container>
</template>

<script>
    import orderList from '@/components/OrderList'
    import strings from '@/util/strings';

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
        computed: {
            historyKey() {
                return 'searchHistory';
            }
        },
        methods: {
            searchName(key, cb) {
                let suggestions = [];

                if (key) {
                    suggestions.push(key);
                    this.store(key);
                }

                let historyString = localStorage.getItem(this.historyKey);
                if (historyString) {
                    let histories = historyString.split(',').filter(s => s);
                    suggestions.push(...histories.reverse());
                }

                let s = '自动补全？别想了🌚';
                suggestions.push(s);
                cb(Array.from(new Set(suggestions)).map(s => Object.assign({}, {value: s})));
            },
            store(key) {
                let s = localStorage.getItem(this.historyKey) || '';
                let list = s.split(',');
                list.push(key);
                let deduplicated = Array.from(new Set(list.reverse())).reverse();
                localStorage.setItem(this.historyKey, `${deduplicated.join(',')}`);
            },
            onSelect(item) {
                this.store(item.value);
            },
            clearHistory() {
                localStorage.removeItem(this.historyKey);
            }
        },
        mounted() {
            let params = this.$route.params;
            let date = this.date;
            if (params && (date = params.date)) {
                this.date = date;
                console.log("Params: " + date);
            } else if (!date || date === '') {
                let now = new Date();
                this.date = `${now.getFullYear()}${strings.fix0(now.getMonth() + 1)}${strings.fix0(now.getDate())}`;
            }
        }
    }
</script>

<style scoped>
    .el-container {
        text-align: center;
    }
</style>