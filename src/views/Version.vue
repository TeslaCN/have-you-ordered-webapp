<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                {{activity.content}}
            </el-timeline-item>
        </el-timeline>
        <ul>
            <li>
                <a href="https://github.com/TeslaCN/have-you-ordered-webapp" target="_blank">前端 https://github.com/TeslaCN/have-you-ordered-webapp</a>
            </li>
            <li>
                <a href="https://github.com/TeslaCN/have-you-ordered" target="_blank">后端 https://github.com/TeslaCN/have-you-ordered</a>
            </li>
            <li>
                <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备18011924号-1</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Version",
        data() {
            return {
                activities: [
                    {
                        content: 'v0.0.6 吃饭大王排行榜',
                        timestamp: '2020-10-26',
                        size: 'large',
                        // type: 'primary',
                        // icon: 'el-icon-success',
                        color: 'green',
                    },
                    {
                        content: 'v0.0.5 动态获取可选订餐类型',
                        timestamp: '2020-05-05',
                        size: 'large',
                        // type: 'primary',
                        // icon: 'el-icon-success',
                        //color: 'green',
                    }, {
                        content: 'v0.0.4 搜索建议',
                        timestamp: '2019-08-20',
                    }, {
                        content: 'v0.0.3 报餐人列表索引；报餐确认',
                        timestamp: '2019-08-13',
                    }, {
                        content: 'v0.0.2 实现订餐人数日期聚合；分离、重写前端',
                        timestamp: '2019-08-10',
                    }, {
                        content: 'v0.0.1 首次上线：实现查询、点餐功能（后端渲染页面模板）',
                        timestamp: '2019-08-03'
                    },
                ]
            };
        }
    }
</script>

<style scoped>

</style>