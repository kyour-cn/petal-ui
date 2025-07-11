<script setup>

import {computed, ref} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";
import PuiIcon from "../icon"

const puiStore = usePetalUiStore()

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
  // 标题
  title: {
    type: String,
    default: 'Title'
  },
  // 输入框提示
  placeholder: {
    type: String,
    default: ''
  },
  // 描述信息
  label: {
    type: String,
    default: ''
  },
  // 类型
  type: {
    type: String,
    default: ''
  },
  // 是否必填
  required: {
    type: Boolean,
    default: false
  },
  // 空值
  empty: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
  // 验证规则
  rules: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits([
  "update:modelValue",
  "change",
  "click"
]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
    emits('change', value)
  }
})

// 表单验证
let validateState = ref(false)
// 手动触发验证
const validate = () => {
  validateState.value = true
}
// 验证错误信息
const validateErrMsg = computed(() => {
  if (!validateState.value) return false
  if (props.required && value.value === props.empty) return '内容不能为空'
  if (props.rules.length === 0) return false

  for (let i = 0; i < props.rules.length; i++) {
    const rule = props.rules[i]
    // 判断规则是否闭包函数
    if (rule && typeof rule === 'function') {
      return rule(value.value)
    }
    // TODO: 待实现内置验证规则
  }
  return false
})

const onClick = () => {
  emits('click')
}

const style = computed(() => {

  let rightIcon = ''

  return {
    labelColor: puiStore.theme['label'],
    valueColor: puiStore.theme['subtitle'],
    rightIcon
  }
})

</script>

<script>
// 小程序去除自定义组件节点
export default {
  options: {
    virtualHost: true
  }
}
</script>

<template>

  <view
    class="petal-form-item"
    @click="onClick"
  >
    <view class="item-box">
      <view
        class="title"
        :style="{
          paddingLeft: props.required ? '0' : '7px'
        }"
      >
        <text v-if="props.required" class="required">*</text>
        <text v-text="props.title"/>
      </view>
      <view
        class="value"
        :style="{
          color: style.valueColor
        }"
      >
        <slot name="value">
          <input
            v-if="props.type === 'text'"
            v-model="value"
            class="value-input"
            type="text"
            @blur="validate"
            :placeholder="props.placeholder ? props.placeholder : '请输入' + props.title"
          >
          <text v-else v-text="value"/>
        </slot>
      </view>
      <PuiIcon
        v-if="style.rightIcon"
        class="right-icon"
        :name="style.rightIcon"
        :color="style.valueColor"
      />
    </view>
    <view
      v-if="props.label !== ''"
      class="label"
      :style="{
        color: style.labelColor
      }"
    >
      <slot name="label">
        <text v-text="props.label"></text>
      </slot>
    </view>
    <view v-if="validateErrMsg" class="error">
      <text>{{ validateErrMsg }}</text>
    </view>
  </view>

</template>

<style scoped lang="scss">

.petal-form-item {
  padding: 0 20rpx;

  .item-box {
    display: flex;
    align-items: center
  }

  .title {
    padding: 30rpx 0;
    flex: none;
    font-size: 32rpx;
    width: 6em;
  }

  .required {
    color: red;
  }

  .value {
    display: flex;
    flex: 1;
    font-size: 28rpx;
    justify-content: right;
  }

  .value .value-input {
    flex: 1;
  }

  .label {
    padding-bottom: 20rpx;
    margin-left: 15rpx;
  }

  .error {
    padding-bottom: 20rpx;
    color: red;
    margin-left: 6em;
    margin-top: -20rpx;
  }
}

</style>
