<template>
    <text
        :class="props.name"
        :style="{
            fontSize: props.size + 'rpx'
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
    }
})

const emits = defineEmits([
    "click"
]);

const onClick = () => {
    emits('click')
}

</script>
