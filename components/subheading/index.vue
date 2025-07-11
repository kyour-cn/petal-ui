<script setup>
// TODO: 待完善

import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const style = computed(() => {
  return {
    color: puiStore.theme.subtitle
  }
})
</script>

<template>
  <view class="petal-subheading" :style="style">
    <view>
      <text>{{ props.title }}</text>
    </view>
  </view>
</template>

<style scoped>
.petal-subheading {
  margin: 20rpx 20rpx 0 40rpx;
}

</style>
