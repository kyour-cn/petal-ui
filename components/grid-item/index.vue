<template>
    <view class="petal-grid-item">
        <slot name="default"></slot>
    </view>
</template>

<script setup>

</script>

<style scoped>
.petal-grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>