<template>
    <view
        class="petal-popup-mask"
        v-show="offset !== -props.height"
        :style="{
            zIndex: props.zIndex,
            background: 'rgba(0, 0, 0,'+((1 - (Math.abs(offset)/height)) * 0.5)+')'
        }"
        @click="value = false"
    >
        <view
            class="petal-popup"
            :style="position"
            @click.stop=""
        >
            <view class="petal-popup-body">
                <slot name="default">
                    {{position}}
                </slot>
            </view>
        </view>
    </view>
</template>

<script setup>

import {computed, ref, watch} from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: 0
    },
    height: {
        type: Number,
        default: 500
    },
    zIndex: {
        type: Number,
        default: 1000
    }
})

const emits = defineEmits([
    'update:modelValue',
    'change'
])

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

watch(value, () => {
    move()
    emits('change', value.value)
})

// 动画位移
let offset = ref(value.value? 0 : -props.height)

const move = () => {
    setTimeout(() => {
        offset.value = value.value ? offset.value + 10 : offset.value - 10
        if (value.value && offset.value >= 0) {
            offset.value = 0
        }else if(!value.value && offset.value <= -props.height) {
            offset.value = -props.height
        }else{
            move()
        }
    }, 5)
}

// 位置
const position = computed(() => {
    return {
        height: props.height + 'rpx',
        bottom: offset.value + 'rpx'
    }
})

</script>

<style scoped>
.petal-popup-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.petal-popup {
    border-radius:  40rpx 40rpx 0 0;
    position: fixed;
    width: 100%;
    background: #FFFFFF;
}
.petal-popup-body {
    padding: 20rpx;
}

</style>
