<script setup>
import PuiIcon from "../icon"
import PuiButton from "../button"
import PuiText from "../text"
import {computed} from "vue"
import {usePetalUiStore} from "../../stores/petal-ui"

const puiStore = usePetalUiStore()

const emits = defineEmits([
  'update:modelValue',
  'input-click',
  'changing',
  'change',
  'search'
])

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  button: {
    type: Boolean,
    default: true
  }
})

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const onSearch = () => {
  emits('search', value.value)
}

const onInputClick = () => {
  emits('input-click')
}

const style = computed(() => {
  return {
    backgroundColor: puiStore.theme['bg-body'],
    color: puiStore.theme['title']
  }
})

</script>

<template>
  <view
    class="petal-search"
    :style="style"
  >
    <view class="search-icon">
      <PuiIcon
        name="petal-icon-search"
        :size="50"
        :color="puiStore.theme['subtitle']"
      />
    </view>
    <view class="petal-search-input" @click="onInputClick">
      <PuiText
        v-if="props.disabled"
        :text="value || props.placeholder"
        color="subtitle"
        :size="28"
      />
      <input
        v-else
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        v-model="value"
        style="font-size: 28rpx"
        @confirm="onSearch"
      />
    </view>
    <view v-if="props.button" class="petal-search-btn">
      <view :style="{borderRight: puiStore.theme['divider'] + ' solid 2rpx'}">&nbsp;</view>
      <slot name="button">
        <PuiButton
          type="primary"
          size="small"
          background="rgba(0,0,0,0)"
          color="primary"
          :font-size="26"
          @click="onSearch"
        >
          搜索
        </PuiButton>
      </slot>
    </view>
  </view>
</template>

<style scoped lang="scss">

.petal-search {
  border-radius: 50rpx;
  padding: 10rpx;
  margin: 10rpx 20rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;

  .search-icon, .petal-search-btn {
    margin-left: 10rpx;
    display: flex;
    align-items: center;
  }

  &-input {
    flex: 1;
    display: flex;
    padding: 10rpx;
  }
}

</style>
