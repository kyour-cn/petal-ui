<script setup>
import {computed} from 'vue'
import {usePetalUiStore} from "../../stores/petal-ui"

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
    value.value = !value.value
}

const style = computed(() => {
    return {
        backgroundColor: puiStore.theme[value.value ? 'primary' : 'bg-light']
    }
})

</script>

<template>
    <view
        :class="{
            'petal-switch': true,
            'petal-switch-disabled': props.disabled,
            'petal-switch-on': value
        }"
        :style="{
            backgroundColor: style.backgroundColor
        }"
        @click="toggle"
    >
        <view class="switch-circle"/>
    </view>
</template>

<style scoped lang="scss">
.petal-switch {
    width: 100rpx;
    height: 50rpx;
    border-radius: 50rpx;
    position: relative;
    cursor: pointer;

    &-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .switch-circle {
        width: 42rpx;
        height: 42rpx;
        background-color: #FFFFFF;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 21rpx);
        left: 5rpx;
        transition: all 0.3s ease;
    }

    &-on .switch-circle {
        transform: translateX(50rpx);
    }
}

</style>
