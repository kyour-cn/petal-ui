<template>
  <view class="pui-cell-group" :style="style">
      <slot name="default" />
  </view>
</template>

<script setup>

import {computed, ref} from "vue";


import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

// 计算属性
const style = computed(() => {
    return {
        color: 'var(--pui-color-title'+(puiStore.isDark ? '-dark':'')+')',
        background: 'var(--pui-bg-body'+(puiStore.isDark ? '-dark':'')+')',
    }
})

// const style = ref({
//     // color: colorObj.value.background,
//     background: 'var(--pui-bg-body'+(isDark.value ? '-dark':'')+')',
// })

</script>

<style scoped>

.pui-cell-group {
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 30rpx;
}

.pui-cell-group :deep(.pui-cell:not(:last-child)) {
    border-bottom: 1px solid #eee;
    padding: 20rpx 0;
}

</style>