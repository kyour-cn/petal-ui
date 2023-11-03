<template>
    <text :class="props.name"></text>
</template>

<script setup>

import {defineProps} from "vue";

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
})

</script>
