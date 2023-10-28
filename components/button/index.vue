<template>
    <view class="petal-btn" :style="style">
        <slot>
            <text v-text="props.text"></text>
        </slot>
    </view>
</template>

<script setup>

import {computed, ref, defineProps} from "vue";

const props = defineProps({
    text: {
        type: String,
        default: '按钮'
    },
    block: {
        type: Boolean,
        default: false
    },
    round: {
        type: Number,
        default: -1
    },
    width: {
        type: Number,
        default: -1
    },
    height: {
        type: Number,
        default: -1
    },
    fontSize: {
        type: Number,
        default: -1
    },
    fontColor: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'v-normal'
    },
    color: {
        type: String,
        default: 'v-white'
    },
    background: {
        type: String,
        default: 'v-primary'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const sizeMap = {
    "mini": {w: 0, h: 40, fontSize: 16, round: 20},
    "small": {w: 0, h: 60, fontSize: 22, round: 30},
    "normal": {w: 0, h: 80, fontSize: 32, round: 40},
    "large": {w: 0, h: 100, fontSize: 40, round: 50}
}

const sizeObj = computed(() => {
    let fontSize = (props.fontSize === -1 ? sizeMap[props.size].fontSize : props.fontSize)
    return {
        w: props.width === -1 ? 'auto' : props.width + 'rpx',
        h: (props.height === -1 ? sizeMap[props.size].h : props.height) + 'rpx',
        fontSize: fontSize + 'rpx',
        round: (props.round === -1 ? sizeMap[props.size].round : props.round) + 'rpx',
        padding: fontSize + 'rpx'
    }
})

const colorObj = computed(() => {
    let color = props.color,
        background = props.background;
    if (color.startsWith('v-'))
        color = 'var(--pui-color-' + color.substring(2) + ')'

    if (background.startsWith('v-'))
        background = 'var(--pui-color-' + background.substring(2) + ')'

    return {
        color,
        background
    }
})

const style = ref({
    color: colorObj.value.color,
    background: colorObj.value.background,
    fontSize: sizeObj.value.fontSize,
    padding: '0 ' + sizeObj.value.padding,
    borderRadius: sizeObj.value.round,
    height: sizeObj.value.h,
    width: sizeObj.value.w,
    lineHeight: sizeObj.value.h,
    fontWeight: 700,
    display: props.block ? 'block' : 'inline-block',
})

</script>


<style scoped>

.petal-btn {
    text-align: center;
}


</style>