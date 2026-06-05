<script setup lang="ts">
    import { SOCIAL_ACCOUNTS } from '#shared/constant';

    const socialAccounts = SOCIAL_ACCOUNTS;

    const num = (i: number) => String(i + 1).padStart(2, '0');

    const root = ref<HTMLElement | null>(null);
    const gsap = useGsap();

    useScrollReveal(root, (el) => {
        gsap.from(el.querySelectorAll('li'), {
            opacity: 0,
            y: 28,
            stagger: 0.1,
            duration: 0.7,
            ease: 'ease02',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
    });
</script>

<template>
    <!-- 罫線を使わず、余白と大きなタイポ階調で構造化 / ホバーは色のみ変化 (引き算) -->
    <section ref="root" class="max-w-5xl mx-auto px-6 sm:px-10 py-8">
        <ul class="grid sm:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 sm:gap-y-16">
            <li v-for="(account, i) in socialAccounts" :key="account.name">
                <a
                    :href="account.url"
                    target="_blank"
                    rel="noopener"
                    :aria-label="account.name"
                    class="group block"
                >
                    <!-- index ＋ icon (極小ラベル) -->
                    <div class="flex items-center justify-between mb-2.5">
                        <span class="font-mono text-[11px] tracking-[0.3em] text-rose-400 tabular-nums">{{ num(i) }}</span>
                        <Icon
                            :name="account.icon"
                            class="w-5 h-5 text-gray-400 dark:text-neutral-500 transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-rose-500 dark:group-hover:text-rose-400"
                        />
                    </div>

                    <!-- 主役: 大きな太字プラットフォーム名 -->
                    <div class="font-black uppercase tracking-tight leading-[0.95] text-[2.5rem] sm:text-5xl text-gray-900 dark:text-neutral-100 transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-rose-500 dark:group-hover:text-rose-400">
                        {{ account.name }}
                    </div>

                    <!-- meta: 極小 mono (副) -->
                    <div class="mt-3 font-mono text-xs text-gray-500 dark:text-neutral-400 tracking-wide">{{ account.shortHandle }}</div>
                    <div class="mt-1 text-xs text-gray-400 dark:text-neutral-500 leading-relaxed">{{ account.description }}</div>
                </a>
            </li>
        </ul>
    </section>
</template>
