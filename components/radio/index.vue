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
</script>

<template>
    <view
        :class="{
            'petal-radio': true,
            'petal-radio-dark': puiStore.dark,
            'petal-radio-checked': value,
            'petal-radio-disabled': disabled
        }"
        @click="toggle"
    >
        <view v-if="modelValue" class="petal-radio-inner"></view>
    </view>

</template>

<style scoped>

.petal-radio {
    width: 40rpx;
    height: 40rpx;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.petal-radio-dark {
    background: none;
    border: 1px solid #666;
}
.petal-radio-checked {
    background: #007aff;
    border: 1px solid #007aff;
}

.petal-radio-disabled {
    background: #ddd;
    border: 1px solid #ccc;
}
.petal-radio-inner {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
</style>