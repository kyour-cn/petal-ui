<script setup>
import PuiIcon from '../icon/index.vue'
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
  value.value = !value.value;
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
      'petal-checkbox': true,
      'petal-checkbox-dark': puiStore.dark,
      'petal-checkbox-disabled': disabled
    }"
    @click="toggle"
    :style="style"
  >
    <PuiIcon v-if="modelValue" name="petal-icon-ok-filled" color="#fff"/>
  </view>

</template>

<style scoped lang="scss">

.petal-checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 1px solid #ccc;
  border-radius: 10rpx;
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
}
</style>
