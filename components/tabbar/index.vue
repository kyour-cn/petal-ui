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

// 给子组件提供一个index
let indexCount = 1
provide('index', () => {
    return indexCount++
});

onMounted(() => {
    // 重置index索引
    indexCount = 1
})

// 当前活动的item
let activeIndex = ref(1)
provide('activeIndex', activeIndex)

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
    height: 80rpx;
    width: 100%;
}

.petal-tabbar {
    height: 80rpx;
    display: flex;
    bottom: 0;
    font-weight: 700;
    width: 100%;
    position: fixed;
    z-index: 999;
}

/* 微信小程序会多一层组件容器，导致样式异常 */
.petal-tabbar :deep(pui-tabbar-item) {
    flex: 1;
}
</style>