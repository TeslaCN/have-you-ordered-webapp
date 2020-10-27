<template>
    <el-container>
        <div id ="placeHold">
            <!--<transition name="fade">
                <loading v-if="isLoading"></loading>
            </transition>-->
            <div id="date-agg-chart">
            </div>
        </div>
    </el-container>
</template>

<script>
    import echarts from 'echarts';
    import axios from 'axios';
    import loading from '@/components/Loading';
    export default {
        name: "DateAggChart",
        components:{loading},
        data() {
            return {
                chart: null,
                data: [],
                xAxisData: [],
                isLoading: true
            }
        },
        methods: {
            fetchData() {
                axios.get('/api/dashboard/agg-by-day').then(res => {
                    let body = res.data;
                    this.xAxisData = body.map(o => o.key);
                    this.data = body.map(o => o.value);
                    this.setChart();
                    this.isLoading = false
                })
            },
            setChart() {
                let option = {
                    title: {
                        text: '吃饭人数聚合'
                    },
                    legend: {
                        data: ['吃饭人数（在线订餐）'],
                        align: 'left'
                    },
                    toolbox: {
                        // y: 'bottom',
                        feature: {
                            dataZoom: {
                                yAxisIndex: false
                            },
                            magicType: {
                                type: ['stack', 'tiled']
                            },
                            dataView: {},
                            saveAsImage: {
                                pixelRatio: 2
                            }
                        }
                    }, dataZoom: [{
                        type: 'inside'
                    }, {
                        type: 'slider'
                    }],
                    tooltip: {},
                    xAxis: {
                        data: this.xAxisData,
                        silent: false,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '吃饭人数（在线订餐）',
                            type: 'bar',
                            data: this.data,
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        },
                    ],
                    animationEasing: 'elasticOut',
                    animationDelayUpdate: function (idx) {
                        return idx * 5;
                    }
                };
                this.chart.setOption(option)
            }
        },
        mounted() {
            this.chart = echarts.init(document.getElementById('date-agg-chart'));
            this.fetchData()
        }
    }
</script>

<style lang="less">
    #date-agg-chart {
        width: 100%;
        height: 600px;
    }
    #placeHold{
        width: 100%;
        height: 600px;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
</style>