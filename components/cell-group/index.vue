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

<style scoped>

.pui-cell-group {
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 30rpx;
}

.pui-cell-group :deep(.pui-cell:not(:last-child)) {
    border-bottom: 1px solid #CECECE;
    padding: 20rpx 0;
}

.pui-cell-group-dark :deep(.pui-cell:not(:last-child)) {
    border-bottom: 1px solid #4C4D4F;
}

</style>