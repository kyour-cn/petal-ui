<script setup>

const props = defineProps({
    autoplay: {
        type: Boolean,
        default: true
    },
    interval: {
        type: Number,
        default: 3000
    },
    duration: {
        type: Number,
        default: 1000
    },
    // 轮播图列表
    list: {
        type: Array,
        default: () => []
    },
    // 列表key，默认留空则表示item就是图片url
    listKey: {
        type: String,
        default: ''
    },
    vertical: {
        type: Boolean,
        default: false
    },
    previousMargin: {
        type: Number,
        default: 0
    },
    nextMargin: {
        type: Number,
        default: 0
    },
    // 轮播图间距
    itemMargin: {
        type: Number,
        default: 0
    },
    // 图片圆角
    radius: {
        type: Number,
        default: 0
    }
})

</script>

<template>

    <swiper
        :indicator-dots="true"
        :autoplay="props.autoplay"
        :interval="props.interval"
        :duration="props.duration"
        :vertical="props.vertical"
        :previous-margin="props.previousMargin + 'rpx'"
        :next-margin="props.nextMargin + 'rpx'"
    >
        <swiper-item v-if="props.list.length > 0" v-for="(item, key) in props.list" :key="key" class="swiper-item">
            <image
                class="swiper-item-image"
                :src="props.listKey ? item[props.listKey] :item"
                :style="{
                    margin: '0 '+props.itemMargin + 'rpx',
                    borderRadius: props.radius + 'rpx',
                }"
            />
        </swiper-item>
    </swiper>

</template>

<style scoped>
.swiper-item {
    display: flex;
}
.swiper-item-image {
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
}

</style>