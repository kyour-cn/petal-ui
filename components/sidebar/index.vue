<script setup>

import {computed, onMounted, provide} from "vue";

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    }
})

const emits = defineEmits([
    'update:modelValue',
    'change'
])

// 给子组件提供一个index
let indexCount = 0
provide('index', () => {
    return indexCount++
});

// 伪需求，实际上应该用不到，暂且保留
onMounted(() => {
    // 重置index索引
    indexCount = 0
})

const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emits('update:modelValue', value)
        emits('change', value)
    }
})

// 当前活动的item
provide('activeIndex', value)

</script>

<template>
    <view class="petal-sidebar">
        <slot name="default"/>
    </view>

</template>

<style scoped>

.petal-sidebar {
    width: 160rpx;
    min-height: 300rpx;
}

</style>