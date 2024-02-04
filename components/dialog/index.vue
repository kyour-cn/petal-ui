<script setup>

const props = defineProps({
    title: {
        type: String,
        default: '提示'
    },
    content: {
        type: String,
        default: '提示内容'
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    confirmColor: {
        type: String,
        default: '#007AFF'
    },
    cancelColor: {
        type: String,
        default: '#999999'
    }
})

</script>

<template>
    <view class="petal-dialog-overlay"/>
    <view class="petal-dialog">
        <view class="petal-dialog-content">
            <view v-if="props.title" class="petal-dialog-title">
                <text>{{props.title}}</text>
            </view>
            <slot name="default">
                <view>{{props.content}}</view>
            </slot>
        </view>
        <!-- action slot -->
        <slot name="action">
            <view
                class="petal-dialog-action"
            >
                <!-- TODO: action button -->
            </view>
        </slot>
    </view>
</template>

<style scoped>

.petal-dialog-overlay {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
}

.petal-dialog {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1001;
}

.petal-dialog-title {
    padding-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
}

.petal-dialog-content {
    background: white;
    padding: 30rpx;
    margin: 20rpx;
    border-radius: 40rpx;
}

</style>