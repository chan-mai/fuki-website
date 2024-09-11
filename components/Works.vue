<script setup lang="ts">
    let contents = ref([]);

    const respose: any = await useMicroCMSGetList({
        endpoint: 'works',
        queries: {
            orders: '-createdAt',
            limit: 100
        }
    });

    // 順次contentsへpush
    respose.data.value.contents.forEach((content: any) => {
        // console.log(content);
        contents.value.push(content);
    });

    console.log(contents.value);
</script>
<template>
    <section class="grid grid-cols-2 md:grid-cols-3 gap-4 my-8 max-w-5xl mx-auto" style="min-height: 300px">
    <NuxtLink :to="'/works/'+content.id" v-for="content in contents" :key="content.id">
        <div class="relative">
            <img
            class="rounded object-cover w-full h-full"
            loading="lazy"
            :src="content.image[0].url"
            />
            <div
            class="absolute top-0 left-0 rounded w-full h-full bg-black bg-opacity-30 grid place-items-center opacity-0 hover:opacity-100 transition-opacity duration-200"
            >
            <a class="px-6 py-2 rounded-full bg-black text-white">{{ content.title }}</a>
            </div>
        </div>
    </NuxtLink>
    </section>
</template>
