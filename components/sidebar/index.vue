<script setup>

import {computed, onMounted, provide} from "vue"
import {usePetalUiStore} from "../../stores/petal-ui"

const puiStore = usePetalUiStore()

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    },
    background: {
        type: String,
        default: 'bg-body'
    },
    _style: {
        type: Object,
        default: {}
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
})

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

const style = computed(() => {
    return {
        backgroundColor: puiStore.theme[props.background] || props.background,
        ...props._style
    }
})

</script>

<template>
    <view class="petal-sidebar" :style="style">
        <slot name="default"/>
    </view>

</template>

<style scoped>

.petal-sidebar {
    width: 160rpx;
    min-height: 300rpx;
    overflow-y: scroll;
}

</style>