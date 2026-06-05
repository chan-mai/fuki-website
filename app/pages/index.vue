<script setup lang="ts">
    import { CONTACT_URL, SITE } from '#shared/constant';

    useHead({
        title: SITE.name,
        meta: [
            {
            hid: "og:type",
            property: "og:type",
            content: "article",
            },
            {
            hid: "og:title",
            property: "og:title",
            content: SITE.name,
            },
            {
            hid: "description",
            name: "description",
            content: SITE.description,
            },
            {
            hid: "og:description",
            property: "og:description",
            content: SITE.description,
            },
            {
            hid: "og:image",
            property: "og:image",
            content: SITE.ogImage,
            },
        ],
    });

    const tags = ["イラスト", "キャラクターデザイン", "コンセプトアート", "デジタル彩色"];
</script>
<template>
    <!-- Hero -->
    <section class="pt-10 pb-0 flex flex-col items-center px-4">
        <!-- profile image with irregular frame -->
        <div
            class="w-52 h-52 mb-6 p-1.5 border-2 border-dashed border-rose-200 dark:border-rose-900"
            style="border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%"
        >
            <div
                class="w-full h-full bg-rose-50 dark:bg-neutral-800 overflow-hidden"
                style="border-radius: 60% 40% 44% 56% / 58% 42% 58% 42%"
            >
                <img src="@/assets/image/icon.webp" class="w-full h-full object-cover" alt="fuki icon" />
            </div>
        </div>

        <h1 class="text-2xl font-bold text-center mb-3">
            Hey 👋 I'm fuki
        </h1>
        <div class="text-5xl md:text-6xl font-bold text-center max-w-3xl mb-3 relative">
            <div class="absolute top-10 opacity-20 transform left-1/2 -translate-x-1/2 text-red-300 z-0 w-full">
                <svg class="max-w-xs md:max-w-lg mx-auto w-full" viewbox="0 0 625 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 46c1.035 2.276 1.035 2.276 1.036 2.275h.002l.011-.006.048-.021.198-.089c.176-.08.443-.197.796-.353.707-.31 1.763-.767 3.145-1.35a406.34 406.34 0 0112.06-4.841c10.438-4.011 25.451-9.363 43.72-14.716C99.57 16.19 149.07 5.5 201 5.5v-5C148.43.5 98.43 11.312 61.61 22.1c-18.42 5.398-33.563 10.796-44.108 14.848a411.168 411.168 0 00-12.209 4.9 243.513 243.513 0 00-4.039 1.746 96.86 96.86 0 00-.268.121l-.015.007-.004.002c-.002 0-.002 0 1.033 2.276zM201 5.5c51.827 0 96.622 13.509 138.315 26.573 41.555 13.021 80.28 25.705 119.331 23.423l-.292-4.992c-37.949 2.218-75.724-10.098-117.544-23.202C299.128 14.24 253.673.5 201 .5v5zm257.646 49.996c38.873-2.272 80.4-14.874 112.112-26.845a615.88 615.88 0 0038.831-16.199 484.157 484.157 0 0011.08-5.243 292.1 292.1 0 003.713-1.852l.197-.1.05-.027.014-.006.004-.002c.001 0 .001-.001-1.147-2.222L622.351.78h-.002l-.011.006a611.127 611.127 0 01-53.346 23.187c-31.538 11.905-72.511 24.303-110.638 26.531l.292 4.992z" fill="currentColor"/>
                </svg>
            </div>
            <div class="relative">meccha tsuyotsuyo Illustrator</div>
        </div>

        <p class="font-light text-center max-w-sm mb-5 text-gray-600 dark:text-neutral-400">
            {{ SITE.tagline }}
        </p>

        <!-- skill tags -->
        <ul class="flex flex-wrap justify-center gap-2 mb-7">
            <li
                v-for="(tag, i) in tags"
                :key="tag"
                class="text-xs px-3 py-1 border border-rose-200 dark:border-rose-900 text-rose-400 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-950/30"
                :style="i % 3 === 0
                    ? 'clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)'
                    : i % 3 === 1
                    ? 'clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 70%)'
                    : 'clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 30%)'"
            >
                {{ tag }}
            </li>
        </ul>

        <a
            :href="CONTACT_URL"
            rel="noopener noreferrer"
            target="_blank"
            class="px-6 py-3 font-semibold text-base bg-black text-white hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
            style="clip-path: polygon(0 0, 92% 0, 100% 20%, 100% 100%, 8% 100%, 0 80%)"
        >Contact</a>
    </section>
    <!-- Hero End -->

    <!-- wave divider -->
    <div class="mt-10">
        <WavyDivider variant="up" color-class="text-gray-100 dark:text-neutral-900" />
    </div>

    <!-- SocialLinks -->
    <div class="bg-gray-100 dark:bg-neutral-900 py-2">
        <ContentTitle title="SocialLinks" index="— 01 —" />
        <SocialLinks />
    </div>

    <!-- wave divider (flipped) -->
    <WavyDivider color-class="text-gray-100 dark:text-neutral-900" />

    <!-- Works -->
    <div class="mt-2 mb-10">
        <ContentTitle title="Works" index="— 02 —" />
        <Works />
    </div>

</template>
