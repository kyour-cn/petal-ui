<script setup>

import {computed, ref, watch} from "vue"
import {usePetalUiStore} from "../../stores/petal-ui"
import {normalizePadding, px2Rpx} from "../../lib/utils.js"

const puiStore = usePetalUiStore()

const props = defineProps({
  // 弹出层是否显示
  modelValue: {
    type: Boolean,
    default: 0
  },
  // 弹出层标题
  title: {
    type: String,
    default: ''
  },
  // 弹出层高度
  height: {
    type: Number,
    default: 500
  },
  // 弹出层宽度 -1表示自适应
  width: {
    type: Number,
    default: -1
  },
  // 点击遮罩层是否关闭弹出层
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  // 弹出位置
  position: {
    type: String,
    default: 'center'
  },
  padding: {
    type: [Number, Array],
    default: 0
  },
  zIndex: {
    type: Number,
    default: 1000
  }
})

const emits = defineEmits([
  'update:modelValue',
  // 打开关闭状态变化
  'change',
  // 点击遮罩层
  'clickOverlay'
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
let offset = ref(value.value ? 0 : -props.height)

let officeStep = Math.floor((puiStore.windowInfo.screenHeight - (puiStore.windowInfo.screenHeight - props.height)) / 40)

// 移入移出位移动画
const move = () => {
  offset.value = value.value ? offset.value + officeStep : offset.value - officeStep
  if (value.value && offset.value >= 0) {
    offset.value = 0

    // 弹性动画
    if (props.position !== 'center') elasticAnimation()
  } else if (!value.value && offset.value <= -props.height) {
    offset.value = -props.height
  } else {
    setTimeout(move, 5)
  }
}

// 弹性动画
let elasticDirection = true
let elasticHeight = ref(0)
const elasticAnimation = () => {
  if (!elasticDirection && elasticHeight.value === 0) {
    elasticDirection = true
    return
  }

  if (elasticDirection && elasticHeight.value < 20) {
    elasticHeight.value += 5
  } else if (!elasticDirection && elasticHeight.value > 0) {
    elasticHeight.value -= 5
  } else {
    elasticDirection = !elasticDirection
  }
  setTimeout(elasticAnimation, 10)
}

// 点击遮罩层
const onClickOverlay = () => {
  if (props.closeOnClickOverlay) {
    value.value = false
  }
  emits('clickOverlay')
}

const style = computed(() => {
  const obj = {
    height: props.height + elasticHeight.value + 'rpx',
    background: puiStore.theme['bg-popup']
  }

  // 如果是中间弹出，使用透明度渐入渐出
  if (props.position === 'center') {
    obj.opacity = 1 - Math.abs(offset.value) / props.height
  }

  // 边距
  let padding = normalizePadding(Array.isArray(props.padding) ? props.padding : [props.padding])

  // 宽度
  if (props.width > 0) {
    obj.width = props.width + 'rpx'
  } else {
    obj.width = 'calc(100% - ' + (padding[1] + padding[3]) + 'rpx)'
  }

  // 适配不同位置的样式
  switch (props.position) {
    case 'top':
      obj.top = offset.value + 'rpx'
      obj.borderRadius = '0 0 40rpx 40rpx'
      padding[0] = 0
      // 适配安全区域
      obj.paddingTop = px2Rpx(puiStore.windowInfo.safeAreaInsets.top, puiStore.windowInfo.screenWidth) + padding[0] + 'rpx'
      break
    case 'bottom':
      obj.bottom = offset.value + 'rpx'
      obj.borderRadius = '40rpx 40rpx 0 0'
      padding[2] = 0
      // 适配安全区域
      obj.paddingBottom = px2Rpx(puiStore.windowInfo.safeAreaInsets.bottom, puiStore.windowInfo.screenWidth) + padding[2] + 'rpx'
      break
    case 'center':
    default:
      obj.top = 'calc(50% - ' + (props.height / 2) + 'rpx)'
      obj.borderRadius = '40rpx'
      break
  }
  obj.margin = padding.join('rpx ') + 'rpx'
  return obj
})

const overlayStyle = computed(() => {
  const ratio = Math.abs(offset.value) / props.height
  const opacity = (1 - ratio) * (puiStore.dark ? 0.7 : 0.5)

  return {
    zIndex: props.zIndex,
    background: 'rgba(0, 0, 0,' + opacity + ')'
  }
})

</script>

<template>
  <view
    class="petal-popup-overlay"
    v-if="offset !== -props.height"
    :style="overlayStyle"
    @click="onClickOverlay"
  >
    <view
      class="petal-popup"
      :style="style"
      @click.stop=""
    >
      <view class="popup-body">
        <view
          v-if="props.title"
          class="popup-title"
          :style="{
            background: puiStore.theme['bg-body']
          }"
        >
          <text>{{ props.title }}</text>
        </view>
        <slot name="default"/>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.petal-popup-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.petal-popup {
  position: fixed;
  width: 100%;
  overflow-y: scroll;

  .popup-title {
    padding: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
    // 固定在顶部
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .popup-body {
    padding: 0 20rpx;
  }
}


</style>
