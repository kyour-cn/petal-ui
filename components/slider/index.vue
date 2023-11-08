<template>
<view class="petal-slider">
    <view class="petal-slider-inner">
        <view class="petal-slider-bar" :style="{width: `${value.value}%`}">
            <view class="petal-slider-bar-inner"></view>
            <view class="petal-slider-bar-outer"></view>
        </view>
        <view
            class="petal-slider-handle"
            :style="{left: `${value.value}%`}"
            @touchstart="touchStart"
            @touchmove.native="touchMove"
            @touchend="touchEnd"
        >
            <view class="petal-slider-handle-inner"></view>
        </view>
    </view>
</view>

</template>

<script setup>
import {computed} from 'vue';

// TODO: 小程序无法自定义样式

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    },
    step: {
        type: Number,
        default: 1
    }
})

const emits = defineEmits([
    'update:modelValue',
    'changing',
    'change'
])

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

const touchStart = (e) => {
    console.log(e)
}
const touchMove = (e) => {

    console.log('横向移动距离：' + e.deltaX);

}
const touchEnd = () => {
}


const sliderChangeing = (e) => {
    console.log(e)
    // value.value = e.detail.value;
    // emits('changing', e.detail.value)
};

const sliderChange = (e) => {
    console.log(e)
    // value.value = e.detail.value;
    // emits('change', e.detail.value)
};

</script>

<style scoped>
.petal-slider {
    height: 20rpx;
    margin: 10rpx;
    background: #ccc;
    position: relative;
    border-radius: 10rpx;
}
.petal-slider-inner {
    height: 100%;
    width: 100%;
    position: relative;
}
.petal-slider-bar {
    height: 100%;
    background: #007aff;
    position: absolute;
    border-radius: 10rpx;
}
.petal-slider-bar-inner {
    height: 100%;
    background: #fff;
}
.petal-slider-bar-outer {
    height: 100%;
    background: #007aff;
}
.petal-slider-handle {
    width: 40rpx;
    height: 40rpx;
    background: #fff;
    border-radius: 20rpx;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}
</style>