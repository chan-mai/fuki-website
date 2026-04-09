<script setup lang="ts">
const error = useError()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-neutral-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">

        <!-- decorative background pattern -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="error-pattern" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="5" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.5"/>
                    <circle cx="60" cy="8" r="2" fill="#fda4af" opacity="0.4"/>
                    <line x1="34" y1="28" x2="44" y2="28" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                    <line x1="39" y1="23" x2="39" y2="33" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                    <path d="M 8 58 L 14 48 L 20 58 Z" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.5"/>
                    <path d="M 60 38 L 66 44 L 60 50 L 54 44 Z" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                    <circle cx="48" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                    <circle cx="54" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                    <circle cx="60" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#error-pattern)"/>
        </svg>

        <!-- content -->
        <div class="relative z-10 text-center max-w-md">

            <!-- error code -->
            <p class="text-xs font-mono tracking-widest text-rose-400 mb-4">— error —</p>
            <h1 class="text-8xl md:text-9xl font-black text-neutral-800 dark:text-neutral-100 leading-none mb-2">
                {{ error?.statusCode ?? 404 }}
            </h1>

            <!-- wavy underline -->
            <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg" class="w-40 mx-auto mb-8 text-rose-200 dark:text-rose-800">
                <path d="M0,5 C25,10 50,0 75,5 C100,10 125,0 150,5 C175,10 187,3 200,5" fill="none" stroke="currentColor" stroke-width="1.5"/>
            </svg>

            <p class="text-sm font-mono text-gray-500 dark:text-neutral-400 mb-10">
                ページが見つかりませんでした
            </p>

            <!-- back button -->
            <button
                @click="handleError"
                class="inline-flex items-center gap-2 text-xs font-mono text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
            >
                <span
                    class="px-5 py-2.5 border border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600 transition-colors"
                    style="clip-path: polygon(0 0, 88% 0, 100% 25%, 100% 100%, 12% 100%, 0 75%)"
                >
                    ← ホームへ戻る
                </span>
            </button>

        </div>
    </div>
</template>
