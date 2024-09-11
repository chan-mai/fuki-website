<script setup lang="ts">
    const props = defineProps<{
        title: string
    }>();

    const title = ref(props.title);

</script>

<template>
    <h2 class="flex justify-center items-center my-12 mx-2 text-2xl text-center relative before:content-[''] after:content-[''] before:inline-block after:inline-block before:mx-4 after:mx-4 before:w-2 after:w-2 before:h-4 after:h-4 before:text-2xl after:text-2xl before:mb-2 after:mt-2 before:border-t before:border-l after:border-r after:border-b before:border-gray-400 after:border-gray-400">
    {{ title }}
    </h2>
</template>
