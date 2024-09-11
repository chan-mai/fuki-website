<script setup lang="ts">
    let contents: any = ref([]);

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
            <img
            class="rounded object-cover w-full h-full"
            loading="lazy"
            :src="content.image[0].url"
            :alt="content.title"
            />
    </NuxtLink>
    </section>
</template>
