<script setup>

</script>

<script>
// 小程序去除自定义组件节点
export default {
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<template>
    <view class="petal-grid-item">
        <slot name="default"></slot>
    </view>
</template>

<style scoped>
.petal-grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>