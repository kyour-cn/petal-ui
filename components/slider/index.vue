<script setup>

// TODO: 计划任务如下
// √ 1. 动态主题色支持
// 2. 增加icon属性
// 3. 步长支持

import {computed, getCurrentInstance, nextTick, ref} from 'vue'
import {usePetalUiStore} from "../../stores/petal-ui"

const puiStore = usePetalUiStore()

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    step: {
        type: Number,
        default: 1
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    }
})

const emits = defineEmits([
    'update:modelValue',
    'changing',
    'change'
])

const instance = getCurrentInstance()

const allWidth = ref(0)

nextTick(() => {
    let view = uni.createSelectorQuery().in(instance)
        .select(".petal-slider-inner")
    view.fields({
        size: true,
        scrollOffset: true,
        rect: true
    }, data => {

        startX = data.left
        allWidth.value = data.width

        let newValue = value.value

        // 初始化位置
        if(value.value < props.min) {
            newValue = props.min
        }else if(value.value > props.max) {
            newValue = props.max
        }

        // 计算位置
        if (newValue > 0) {
            let x = newValue * (allWidth.value / props.max)
            if (positionX.value < x) {
                positionX.value = x
            }
        }
        value.value = newValue
    }).exec()
})

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

// x轴位置
const positionX = ref(0)

// 元素位于屏幕开始位置
let startX = 0

const touchMove = (e) => {

    // 这里是手指在页面上的坐标，需要减去在页面的偏移量
    let x = e.touches[0].clientX - startX
    x = x > allWidth.value? allWidth.value : x
    x = x > 0 ? x : 0

    // 计算min
    if (props.min > 0) {
        let min = props.min * (allWidth.value / props.max)
        if (x < min) {
            x = min
        }
    }
    positionX.value = x
    value.value = Math.round(positionX.value * (props.max / allWidth.value))

    emits("changing", value.value)
}

const touchEnd = () => {
    emits("change", value.value)
}

</script>

<template>
    <view class="petal-slider">
        <view class="petal-slider-inner">
            <view class="petal-slider-bar" :style="{width: `${positionX}px`, background: puiStore.theme.primary}"/>
            <view
                class="petal-slider-handle"
                :style="{left: (positionX - 10) + 'px'}"
                @touchmove.native="touchMove"
                @touchend="touchEnd"
            />
        </view>
    </view>
</template>

<style scoped lang="scss">
.petal-slider {
    height: 20rpx;
    margin: 20rpx;
    background: #ccc;
    border-radius: 10rpx;

    &-inner {
        height: 100%;
        width: 100%;
        position: relative;
    }
    &-bar {
        height: 100%;
        position: absolute;
        border-radius: 10rpx 0 0 10rpx;
    }
    &-handle {
        width: 40rpx;
        height: 40rpx;
        background: #fff;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
        border-radius: 20rpx;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}

</style>