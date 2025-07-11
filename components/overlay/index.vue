<script setup>

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 1000
  },
  background: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)'
  }
});

</script>

<template>
  <view
    v-if="show"
    class="petal-overlay"
    :style="{
      zIndex: zIndex,
      background: background
    }"
    @touchmove.stop.prevent="() => {}"
  >
    <view class="petal-overlay-content">
      <slot>
      </slot>
    </view>
  </view>
</template>

<style scoped lang="scss">

.petal-overlay {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-content {
    margin: auto;
  }
}
</style>
