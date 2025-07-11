<script setup>

import {computed, onMounted, provide} from "vue"
import {usePetalUiStore} from "../../stores/petal-ui"

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
  // 是否固定在底部
  fixed: {
    type: Boolean,
    default: true
  },
  // 固定在底部时是否显示占位
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
})

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
    paddingBottom: props.fixed ? puiStore.windowInfo.safeAreaInsets.bottom + 'px' : '0',
    position: props.fixed ? 'fixed' : 'static'
  }
})

</script>

<template>
  <view
    v-if="props.fixed && props.placeholder"
    class="petal-tabbar-placeholder"
    :style="{
      paddingBottom: style.paddingBottom,
    }"
  />
  <view
    class="petal-tabbar"
    :style="{
      background: style.bgColor,
      zIndex: props.zIndex,
      paddingBottom: style.paddingBottom,
      position: style.position
    }"
  >
    <slot name="default">
      None
    </slot>
  </view>
</template>

<style scoped>

.petal-tabbar-placeholder {
  height: 120rpx;
  width: 100%;
}

.petal-tabbar {
  width: 100%;
  height: 120rpx;
  font-weight: 700;
  align-items: center;
  display: flex;
  bottom: 0;
}

</style>
