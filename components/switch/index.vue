<template>
    <view
        class="petal-switch"
        :class="{'switch-on': value}"
        :style="{
            backgroundColor: style.backgroundColor
        }"
        @click="toggle"
    >
        <view class="switch-circle"/>
    </view>
</template>

<script setup>
import {computed} from 'vue';
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    modelValue: Boolean
})

const emits = defineEmits([
    'update:modelValue'
])

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

const toggle = () => {
    value.value = !value.value;
}

const style = computed(() => {
    return {
        backgroundColor: puiStore.theme[value.value ? 'primary' : 'bg-light']
    }
})

</script>

<style scoped>
.petal-switch {
    width: 100rpx;
    height: 50rpx;
    border-radius: 50rpx;
    position: relative;
    cursor: pointer;
}

.switch-circle {
    width: 42rpx;
    height: 42rpx;
    background-color: #FFFFFF;
    border-radius: 50%;
    position: absolute;
    top: 4rpx;
    left: 4rpx;
    transition: all 0.3s ease;
}

.switch-on .switch-circle {
    transform: translateX(50rpx);
}
</style>
