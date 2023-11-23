<template>
    <view class="petal-text" :style="style">
        {{props.text}}
    </view>
</template>

<script setup>
import {usePetalUiStore} from "../../stores/petal-ui";
import {computed} from "vue";

const puiStore = usePetalUiStore()

const props = defineProps({
    // 文字内容
    text: {
        type: String,
        default: ''
    },
    // 文字颜色
    color: {
        type: String,
        default: 'title'
    },
    // 文字大小
    size: {
        type: Number,
        default: 28
    },
    // 文字行高
    lineHeight: {
        type: Number,
        default: 36
    },
    // 文字对齐方式
    align: {
        type: String,
        default: 'left'
    },
    // 文字粗细
    weight: {
        type: String,
        default: 'normal'
    }
})

const style = computed(() => {
    return {
        color: puiStore.theme[props.color] || props.color,
        fontSize: props.size + 'rpx',
        lineHeight: props.lineHeight + 'rpx',
        textAlign: props.align,
        fontWeight: props.weight
    }
})

</script>


<style scoped>


</style>
