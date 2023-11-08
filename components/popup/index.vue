<template>
    <view
        class="petal-popup-mask"
        v-if="value"
        :style="{
            zIndex: props.zIndex
        }"
    >
        <view
            class="petal-popup"
            :style="position"
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

import {computed, nextTick, ref} from "vue";

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
    'update:modelValue'
])

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

// 动画位移
let offset = ref(-props.height)

const move = () => {
    setTimeout(() => {
        offset.value += 20
        if (offset.value >= 0) {
            offset.value = 0
        }else{
            move()
        }
    }, 10)
}

nextTick(() => {
    move()
})

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
    background: rgba(0, 0, 0, 0.3);
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
