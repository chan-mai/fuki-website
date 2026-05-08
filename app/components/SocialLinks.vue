<script setup lang="ts">
    const socialAccounts = ref([
     {
        name: "X",
        url: "https://x.com/fuuuuuki_0910",
        icon: "simple-icons:x",
        handle: "@fuuuuuki_0910",
        description: "お問い合わせはこちら",
     },
     {
        name: "Bluesky",
        url: "https://bsky.app/profile/fuuuuki.bsky.social",
        icon: "simple-icons:bluesky",
        handle: "@fuuuuki.bsky.social",
        description: "日常やイラストを投稿しています",
     },
     {
        name: "Misskey",
        url: "https://misskey.io/@Fuuuuuki",
        icon: "simple-icons:misskey",
        handle: "@Fuuuuuki@misskey.io",
        description: "近況やラフを気軽に共有",
     },
     {
        name: "Pixiv",
        url: "https://www.pixiv.net/users/32685096",
        icon: "simple-icons:pixiv",
        handle: "fuki / user:32685096",
        description: "完成イラストを掲載しています",
     },
    ]);

    const cardRadii = [
        '36px 8px 24px 8px / 8px 36px 8px 24px',
        '8px 36px 8px 24px / 24px 8px 36px 8px',
        '24px 8px 36px 8px / 8px 24px 8px 36px',
    ];

    const iconRadii = [
        '16px 4px 12px 4px / 4px 16px 4px 12px',
        '4px 16px 4px 12px / 12px 4px 16px 4px',
        '12px 4px 16px 4px / 4px 12px 4px 16px',
    ];
</script>

<template>
    <section class="my-4 max-w-5xl mx-auto px-4">
        <ul class="flex flex-col sm:flex-row gap-4">
            <li
                v-for="(account, i) in socialAccounts"
                :key="account.name"
                class="flex-1"
            >
                <a
                    :href="account.url"
                    target="_blank"
                    rel="noopener"
                    :aria-label="account.name"
                    class="group flex gap-4 items-start p-4 border border-gray-200 dark:border-neutral-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors"
                    :style="{ borderRadius: cardRadii[i] }"
                >
                    <div
                        class="shrink-0 w-10 h-10 flex items-center justify-center border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 group-hover:border-rose-400 dark:group-hover:border-rose-600 transition-colors"
                        :style="{ borderRadius: iconRadii[i] }"
                    >
                        <Icon :name="account.icon" class="w-5 h-5 text-rose-400 dark:text-rose-400 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors" />
                    </div>
                    <div class="min-w-0">
                        <div class="font-bold text-sm tracking-wide">{{ account.name }}</div>
                        <div class="text-xs font-mono text-gray-500 dark:text-neutral-400 truncate mt-0.5">{{ account.handle }}</div>
                        <div class="text-xs text-gray-400 dark:text-neutral-500 mt-1.5">{{ account.description }}</div>
                    </div>
                </a>
            </li>
        </ul>
    </section>
</template>
