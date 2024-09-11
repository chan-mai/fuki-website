<script setup lang="ts">
    const route = useRoute();

    // propsからidを取得
    let content_id: string = route.params?.content_id as string;
    let content: any = ref([]);

    const respose: any = await useMicroCMSGetObject ({
        endpoint: 'works',
        queries: {
            filters: `id[equals]${content_id}`
        }
    });
    content.value = respose.data.value.contents[0];    

    useHead({
        title: "fuki's website | " + content.value.title,
        meta: [
            {
            hid: 'og:type',
            property: 'og:type',
            content: 'article',
            },
            {
            hid: 'og:title',
            property: 'og:title',
            content: "fuki's website | " + content.value.title,
            },
            {
            hid: 'description',
            name: 'description',
            content: content.value.description,
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: content.value.description,
            },
            {
            hid: 'og:image',
            property: 'og:image',
            content: content.value.image[0].url,
            },
        ],
    });
</script>
<template>

    <div class="w-full px-4 pt-4 max-w-5xl mx-auto mb-10">

        <h1 class="mt-10 text-4xl font-bold mb-4 scrollbox">{{ content.title }}</h1>

        <!-- About -->
        <div class="mt-5 mb-10">
            <p class="text-sm text-gray-600 dark:text-neutral-400">
                {{ content.description }}
            </p>

            <!-- Link -->
            <div v-if="content.url" class="mt-5">
                <a class="text-[13px] text-rose-500 underline hover:text-rose-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-rose-500 dark:hover:text-rose-400" :href="content.url" target="_blank">{{ content.url }}</a>
            </div>
            <!-- End Link -->
        </div>
        <!-- End About -->

        <!-- Images -->
        <div class="mb-10 grid grid-cols-2 md:grid-cols-3 gap-4 my-8 mx-auto overflow-x-auto">
            <div v-for="img in content.image" :key="content.image.url" class="rounded">
                <img class="rounded w-full bg-black bg-opacity-30 grid place-items-center" :src="img.url">
            </div>
        </div>
        <!-- End Images -->

    </div>
    
</template>

