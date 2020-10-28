<template>
    <el-container>
        <order-most-chart></order-most-chart>
    </el-container>
</template>

<script>
    import orderMostChart from "@/components/OrderMostChart";

    export default {
        name: "OrderMost",
        components: {orderMostChart},
        data() {
            return {};
        }
    }
</script>

<style scoped>

</style>