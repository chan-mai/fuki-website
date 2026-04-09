<script setup lang="ts">
    const props = defineProps<{
        title: string
        index?: string
    }>();
</script>

<template>
    <div class="flex flex-col items-center my-12 mx-2">
        <div class="flex items-center gap-4 w-full max-w-5xl">
            <div class="flex-1 border-t-2 border-dashed border-gray-300 dark:border-neutral-700"></div>
            <div class="flex flex-col items-center">
                <span v-if="index" class="text-xs font-mono tracking-widest text-rose-400 dark:text-rose-400 mb-1">{{ index }}</span>
                <h2 class="text-2xl font-bold tracking-tight px-2">{{ title }}</h2>
            </div>
            <div class="flex-1 border-t-2 border-dashed border-gray-300 dark:border-neutral-700"></div>
        </div>
        <svg viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg" class="w-32 mt-2 text-rose-200 dark:text-rose-800">
            <path d="M0,6 C25,12 50,0 75,6 C100,12 125,0 150,6 C175,12 187,3 200,6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
    </div>
</template>
