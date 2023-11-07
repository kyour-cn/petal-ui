<template>
    <slider
        :model="value"
        :step="props.step"
        @changing="sliderChangeing"
        @change="sliderChange"
        style="height: 20rpx"
    />
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

const sliderChangeing = (e) => {
    value.value = e.detail.value;
    emits('changing', e.detail.value)
};

const sliderChange = (e) => {
    value.value = e.detail.value;
    emits('change', e.detail.value)
};

</script>

<style scoped>
:deep(.uni-slider-wrapper) .uni-slider-handle-wrapper {
    height: 20rpx;
}

:deep(.uni-slider-wrapper) .uni-slider-bar {
    height: 10px;
}
</style>