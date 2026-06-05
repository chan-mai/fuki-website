<script setup lang="ts">
    defineProps<{
        title: string
        index?: string
    }>();

    const root = ref<HTMLElement | null>(null);
    const gsap = useGsap();
    const SplitText = useSplitText();

    useScrollReveal(root, (el) => {
        const heading = el.querySelector('[data-title]') as HTMLElement;
        const split = SplitText.create(heading, { type: 'chars' });
        gsap.from(split.chars, {
            yPercent: 120,
            opacity: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: 'ease01',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
        gsap.from(el.querySelectorAll('[data-fade]'), {
            opacity: 0,
            y: 8,
            duration: 0.5,
            ease: 'ease02',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
        return () => split.revert();   // unmount時にSplitTextのDOM改変を戻す
    });
</script>

<template>
    <div ref="root" class="flex flex-col items-center my-12 mx-2">
        <div class="flex items-center gap-4 w-full max-w-5xl">
            <div data-fade class="flex-1 border-t-2 border-dashed border-gray-300"></div>
            <div class="flex flex-col items-center">
                <span v-if="index" data-fade class="text-xs font-mono tracking-widest text-rose-400 mb-1">{{ index }}</span>
                <h2 data-title class="text-2xl font-bold tracking-tight px-2 overflow-hidden">{{ title }}</h2>
            </div>
            <div data-fade class="flex-1 border-t-2 border-dashed border-gray-300"></div>
        </div>
        <svg data-fade viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg" class="w-32 mt-2 text-rose-200">
            <path d="M0,6 C25,12 50,0 75,6 C100,12 125,0 150,6 C175,12 187,3 200,6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
    </div>
</template>
