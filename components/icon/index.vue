<template>
    <text :class="props.name"></text>
</template>

<script setup>

// TODO: 计划任务如下
// 1. 支持图片图标
// 2. 支持自定义图标

import {defineProps} from "vue";

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
})

</script>
