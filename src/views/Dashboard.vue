<template>
    <el-container>
        <date-agg-chart></date-agg-chart>
    </el-container>
</template>

<script>
    import dateAggChart from "@/components/DateAggChart";

    export default {
        name: "Dashboard",
        components: {dateAggChart},
        data() {
            return {};
        }
    }
</script>

<style scoped>

</style>