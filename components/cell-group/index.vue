<template>
    <view
        :class="{
          'pui-cell-group': true,
          'pui-cell-group-dark': puiStore.dark
        }"
        :style="style"
    >
        <slot name="default"/>
    </view>
</template>

<script setup>

import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

// 计算属性
const style = computed(() => {
    return {
        color: puiStore.theme['title'],
        background: puiStore.theme['bg-body'],
    }
})

</script>

<script>
// 小程序去除自定义组件节点
export default {
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>
<style scoped>

.pui-cell-group {
    padding: 10rpx 0;
    margin: 20rpx;
    border-radius: 30rpx;
}

.pui-cell-group :deep(.pui-cell:not(:last-child)) {
    position: relative;
}

.pui-cell-group :deep(.pui-cell:not(:last-child)::after) {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 20rpx;
    bottom: 0;
    left: 20rpx;
    border-bottom: 1px solid #E8E8E8;
}

.pui-cell-group-dark :deep(.pui-cell:not(:last-child)::after) {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 20rpx;
    bottom: 0;
    left: 20rpx;
    border-bottom: 1px solid #4C4D4F;
}

</style>