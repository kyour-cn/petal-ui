<template>
    <text
        :class="props.name"
        :style="{
            fontSize: props.size + 'rpx',
            color: props.color
        }"
        @click="onClick"
    />
</template>

<script setup>

// TODO: 计划任务如下
// 1. 支持图片图标
// 2. 支持自定义图标

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    size: {
        type: Number,
        default: 32
    },
    color: {
        type: String,
        default: ''
    }
})

const emits = defineEmits([
    "click"
]);

const onClick = () => {
    emits('click')
}

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
