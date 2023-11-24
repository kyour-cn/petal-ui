<template>
    <view
        v-if="props.placeholder"
        class="petal-tabbar-placeholder"
    />
    <view
        class="petal-tabbar"
        :style="{
            background: style.bgColor,
            zIndex: props.zIndex,
            paddingBottom: style.paddingBottom
        }"
    >
        <slot name="default">
            None
        </slot>
    </view>
</template>

<script setup>

import {computed, onMounted, provide, ref} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    // 是否可以切换
    allowChange: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: 'Title'
    },
    placeholder: {
        type: Boolean,
        default: true
    },
    zIndex: {
        type: Number,
        default: 999
    },
})

const emits = defineEmits([
    'update:modelValue',
    'change'
])

provide('allowChange', props.allowChange)

// 给子组件提供一个index
let indexCount = 1
provide('index', () => {
    return indexCount++
});

onMounted(() => {
    // 重置index索引
    indexCount = 1
})

const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emits('update:modelValue', value)
        emits('change', value)
    }
})

// 当前活动的item
provide('activeIndex', value)

const style = computed(() => {
    return {
        titleColor: puiStore.theme['title'],
        bgColor: puiStore.theme['bg-tabbar'],
        paddingBottom: puiStore.safeAreaInsets.bottom + 'px'
    }
})

</script>

<style scoped>

.petal-tabbar-placeholder {
    height: 120rpx;
    width: 100%;
}

.petal-tabbar {
    width: 100%;
    height: 120rpx;
    font-weight: 700;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 999;
}

</style>