<template>
    <view class="petal-search">
        <PuiIcon
            class="search-icon"
            name="petal-icon-search"
            :size="50"
            color="#ccc"
        />
        <view class="petal-search-input">
            <input
                type="text"
                :placeholder="props.placeholder"
                :disabled="props.disabled"
                style="font-size: 28rpx"
            />
        </view>
        <view class="petal-search-btn">
            <view style="border-right: #CCCCCC solid 2rpx;">&nbsp;</view>
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
        </view>
    </view>
</template>

<script setup>
import PuiIcon from "../icon"
import PuiButton from "../button"
import {computed} from "vue";

const emits = defineEmits([
    'update:modelValue',
    'changing',
    'change',
    'onSearch'
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
    }
})

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

const onSearch = () => {
    emits('onSearch', value.value)
}

</script>

<style scoped>

.petal-search {
    background: white;
    border-radius: 50rpx;
    padding: 10rpx;
    margin: 10rpx 20rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
}

.search-icon,.petal-search-btn {
    margin-left: 10rpx;
    display: flex;
    align-items: center;
}

.petal-search-input {
    flex: 1;
    padding: 10rpx;
}
</style>