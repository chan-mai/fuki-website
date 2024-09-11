<script setup lang="ts">
    const socialAccounts = ref([
     {
        "name": "Bluesky",
        "url": "https://bsky.app/profile/fuuuuki.bsky.social",
        "icon": "simple-icons:bluesky",
     },
     {
        "name": "Misskey",
        "url": "https://misskey.flowers/@fuki",
        "icon": "simple-icons:misskey",
     },
     {
        "name": "Pixiv",
        "url": "https://www.pixiv.net/users/32685096",
        "icon": "simple-icons:pixiv",
     },
    ]);
</script>

<template>
    <section class="my-4">
        <ul class="flex justify-center gap-4">
            
            
            <li v-for="account in socialAccounts" :key="account.name">
                <a
                    :href="account.url"
                    target="_blank"
                    rel="noopener"
                    :aria-label="account.name"
                    class="p-2 inline-block rounded-full border border-gray-300 text-gray-300 hover:text-gray-800 hover:border-gray-800 cursor-pointer transition-colors dark:border-gray-600 dark:text-gray-600 dark:hover:border-gray-300 dark:hover:text-gray-300"
                >
                <Icon :name="account.icon" class="w-[20px] h-[20px]" />
            </a>
            </li>
            
        </ul>
    </section>
</template>