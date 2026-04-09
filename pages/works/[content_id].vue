<script setup lang="ts">
    const route = useRoute();

    let content_id: string = route.params?.content_id as string;
    let content: any = ref([]);

    const respose: any = await useMicroCMSGetObject({
        endpoint: 'works',
        queries: {
            filters: `id[equals]${content_id}`
        }
    });
    content.value = respose.data.value.contents[0];

    useHead({
        title: "fuki's website | " + content.value.title,
        meta: [
            { hid: 'og:type',        property: 'og:type',        content: 'article' },
            { hid: 'og:title',       property: 'og:title',       content: "fuki's website | " + content.value.title },
            { hid: 'description',    name: 'description',        content: content.value.description },
            { hid: 'og:description', property: 'og:description', content: content.value.description },
            { hid: 'og:image',       property: 'og:image',       content: content.value.image[0].url },
        ],
    });

    const galleryImages = computed(() => content.value.image?.slice(1) ?? []);
</script>

<template>
    <div class="w-full px-4 pt-6 max-w-5xl mx-auto mb-20">

        <!-- back nav -->
        <NuxtLink
            to="/"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 dark:text-neutral-500 hover:text-rose-400 transition-colors mb-10"
        >
            <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6L8 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Works
        </NuxtLink>

        <!-- main: hero image + info -->
        <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-16">

            <!-- hero image (クリップなし、丸角のみ) -->
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-rose-50 dark:bg-neutral-800">
                <img
                    class="w-full h-full object-cover"
                    :src="content.image[0].url"
                    :alt="content.title"
                />
            </div>

            <!-- info panel -->
            <div class="flex flex-col justify-start pt-4 md:pt-8">

                <!-- eyebrow -->
                <span class="text-xs font-mono tracking-widest text-rose-400 mb-3">— illustration</span>

                <!-- title -->
                <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-2">{{ content.title }}</h1>

                <!-- wavy underline -->
                <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg" class="w-32 mb-8 text-rose-200 dark:text-rose-800">
                    <path d="M0,5 C25,10 50,0 75,5 C100,10 125,0 150,5 C175,10 187,3 200,5" fill="none" stroke="currentColor" stroke-width="1.5"/>
                </svg>

                <!-- description -->
                <div class="border-l-2 border-rose-200 dark:border-rose-800 pl-4 mb-8">
                    <p class="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{{ content.description }}</p>
                </div>

                <!-- external link -->
                <a
                    v-if="content.url"
                    :href="content.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-xs font-mono text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
                >
                    <span
                        class="px-3 py-1.5 border border-rose-200 dark:border-rose-800 hover:border-rose-400 transition-colors truncate max-w-xs"
                        style="clip-path: polygon(0 0, 88% 0, 100% 25%, 100% 100%, 12% 100%, 0 75%)"
                    >
                        {{ content.url }}
                    </span>
                </a>

            </div>
        </div>

        <!-- gallery section (2枚目以降) -->
        <template v-if="galleryImages.length > 0">
            <!-- divider -->
            <div class="flex items-center gap-4 mb-2">
                <div class="flex-1 border-t-2 border-dashed border-gray-200 dark:border-neutral-700"></div>
                <span class="text-xs font-mono tracking-widest text-rose-400">— Gallery —</span>
                <div class="flex-1 border-t-2 border-dashed border-gray-200 dark:border-neutral-700"></div>
            </div>
            <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg" class="w-24 mx-auto mb-8 text-rose-200 dark:text-rose-800">
                <path d="M0,5 C25,10 50,0 75,5 C100,10 125,0 150,5 C175,10 187,3 200,5" fill="none" stroke="currentColor" stroke-width="1.5"/>
            </svg>

            <!-- gallery grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 items-start">
                <div
                    v-for="(img, i) in galleryImages"
                    :key="img.url"
                    class="aspect-square overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-800"
                    :style="{
                        borderRadius: ['32px 8px 24px 8px / 8px 32px 8px 24px', '8px 32px 8px 24px / 24px 8px 32px 8px', '24px 8px 32px 8px / 8px 24px 8px 32px', '8px 24px 8px 32px / 32px 8px 24px 8px'][i % 4],
                        marginTop: i % 3 === 1 ? '24px' : i % 3 === 2 ? '48px' : '0'
                    }"
                >
                    <img
                        class="w-full h-full object-cover"
                        loading="lazy"
                        :src="img.url"
                        :alt="content.title"
                    />
                </div>
            </div>
        </template>

    </div>
</template>
