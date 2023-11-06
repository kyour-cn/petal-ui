<template>
    <view
        class="petal-switch"
        :class="{'switch-on': value}"
        @click="toggle"
    >
        <view class="switch-circle"/>
    </view>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
    modelValue: Boolean
})

const emits = defineEmits([
    'update:modelValue'
])

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

const toggle = () => {
    value.value = !value.value;
}
</script>

<style scoped>
.petal-switch {
    width: 100rpx;
    height: 50rpx;
    background-color: #CCC;
    border-radius: 50rpx;
    position: relative;
    cursor: pointer;
}

.switch-on {
    background-color: #254FF7;
}

.switch-circle {
    width: 42rpx;
    height: 42rpx;
    background-color: #FFFFFF;
    border-radius: 50%;
    position: absolute;
    top: 4rpx;
    left: 4rpx;
    transition: all 0.3s ease;
}

.switch-on .switch-circle {
    transform: translateX(50rpx);
}
</style>
