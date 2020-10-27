<template>
    <el-container>
        <div id="order-most-chart">
        </div>
    </el-container>
</template>

<script>
    import echarts from 'echarts';
    import axios from 'axios';
    export default {
        name: "OrderMostChart",
        data() {
            return {
                chart: null,
                data: [],
                xAxisData: [],
            }
        },
        methods: {
            fetchData() {
                axios.get('/api/dashboard/agg-order-person').then(res => {
                    let body = res.data;
                     this.xAxisData = body.map(o => o.key);
                     this.data = body.map(o => o.value);
                  // for (let i = 0; i < 20; i++) {//展示前20名
                  //     this.xAxisData.push(body[i].key);
                  //     this.data.push(body[i].value);
                  // }
                    this.setChart();
                })
            },
            setChart() {
                let option = {
                    title: {
                        text: '吃饭大王排行榜',
                        subtext: '数据来自网络'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['历史订餐数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        //bottom: '3%',
                        containLabel: true,
                        height:'6000px'
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        inverse: true,
                        type: 'category',
                        data: this.xAxisData
                    },
                    series: [
                        {
                            name: '订餐数',
                            type: 'bar',
                            data: this.data,
                            itemStyle: {//柱样式
                                normal: {
                                    barBorderRadius: [0, 5, 5, 0],
                                    color: function (params) {//渐变色，也可以直接用数组给不同的柱子设置不同的颜色
                                        var colorList = [new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#cd806f'
                                        }, {
                                            offset: 1,
                                            color: '#e35839'
                                        }]), new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#cd806f'
                                        }, {
                                            offset: 1,
                                            color: '#e35839'
                                        }])];
                                        return colorList[params.dataIndex];
                                    },
                                    opacity: 1,
                                }
                            }
                        }
                    ]
            };
            this.chart.setOption(option)
        }
    },
        mounted() {
            this.chart = echarts.init(document.getElementById('order-most-chart'));
            this.fetchData();
        }
    }
</script>

<style lang="less">
    #order-most-chart {
        width: 100%;
        height: 6100px;
    }
</style>