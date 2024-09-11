<script setup lang="ts">
    // 現在の年数を取得
    const nowYear: string = (new Date).getFullYear();
</script>
<template>
    <footer class="w-full text-center p-4 text-xs text-gray-400">
        <p>
            © {{ nowYear }} fuki All rights reserved.
        </p>
    </footer>
</template>
