<script setup>
import {computed} from "vue";

const props = defineProps({
    // 字体图标class名称
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

// 当前图标是否是图片。
const isImg = computed(() => {
    return props.name.includes('/') ||
        props.name.substring(0, 5) === 'data:' ||
        props.name.substring(0, 4) === 'http';
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

<template>
    <text
        v-if="!isImg"
        :class="props.name"
        :style="{
            fontSize: props.size + 'rpx',
            color: props.color
        }"
        @click="onClick"
    />
    <image
        v-else
        :src="props.name"
        :style="{
            width: props.size + 'rpx',
            height: props.size + 'rpx'
        }"
        @click="onClick"
    />
</template>
