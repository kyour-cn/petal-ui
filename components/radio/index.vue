<script setup>
import {usePetalUiStore} from "../../stores/petal-ui";
import {computed} from "vue";

const puiStore = usePetalUiStore()

const props = defineProps({
  modelValue: Boolean,
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'update:modelValue'
])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const toggle = () => {
  if (props.disabled) {
    return
  }
  value.value = true;
}

const style = computed(() => {
  const obj = {}
  if (value.value) {
    obj.background = puiStore.theme.primary
    obj.border = '1px solid ' + puiStore.theme.primary
  }
  return obj
})
</script>

<template>
  <view
    :class="{
      'petal-radio': true,
      'petal-radio-dark': puiStore.dark,
      'petal-radio-disabled': disabled
    }"
    @click="toggle"
    :style="style"
  >
    <view v-if="modelValue" class="petal-radio-inner"></view>
  </view>

</template>

<style scoped lang="scss">

.petal-radio {
  width: 40rpx;
  height: 40rpx;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-dark {
    background: none;
    border: 1px solid #666;
  }

  &-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &-inner {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
}
</style>
