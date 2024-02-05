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
            'petal-checkbox': true,
            'petal-checkbox-dark': puiStore.dark,
            'petal-checkbox-checked': value,
            'petal-checkbox-disabled': disabled
        }"
        @click="toggle"
    >
        <PuiIcon v-if="modelValue" name="petal-icon-ok-filled" color="#fff"/>
    </view>

</template>

<style scoped>

.petal-checkbox {
    width: 40rpx;
    height: 40rpx;
    border: 1px solid #ccc;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.petal-checkbox-dark {
    background: none;
    border: 1px solid #666;
}
.petal-checkbox-checked {
    background: #007aff;
    border: 1px solid #007aff;
}
.petal-checkbox-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>