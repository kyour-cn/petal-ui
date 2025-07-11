<script setup>
import {ref, watchEffect} from 'vue';

// TODO: 计划任务如下
// 1. 支持对其触发按钮元素
// 2. 完善细节样式优化

const props = defineProps({
  direction: {
    type: String,
    default: 'top',
    validator: (val) => ['top', 'bottom', 'left', 'right'].includes(val),
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const show = ref(props.show);

const toggleShow = () => {
  show.value = !show.value
};

watchEffect(() => {
  if (!['top', 'bottom', 'left', 'right'].includes(props.direction)) {
    throw new Error(`Invalid direction prop: ${props.direction}`);
  }
});
</script>

<template>
  <view v-if="show" class="petal-popover-overlay" @click="toggleShow"/>
  <view class="petal-popover">
    <view @click="toggleShow">
      <slot></slot>
    </view>
    <view
      v-if="show"
      :class="{
                'popover-content': true,
                [`popover-${direction}`]: true
            }"
    >
      <slot name="reference"></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">

.petal-popover-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.petal-popover {
  position: relative;
  display: inline-block;

  .popover-content {
    position: absolute;
    background-color: #fff;
    z-index: 1000;
    padding: 20rpx;
    border-radius: 20rpx;
    box-shadow: 0 0 50rpx rgba(0, 0, 0, 0.2);
  }

  .popover-top {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -10rpx);
  }

  .popover-bottom {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10rpx);
  }

  .popover-left {
    right: 100%;
    top: 50%;
    transform: translate(-10rpx, -50%);
  }

  .popover-right {
    left: 100%;
    top: 50%;
    transform: translate(10rpx, -50%);
  }
}

</style>
