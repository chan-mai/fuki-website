<template>
    <header class="w-full px-4 pt-4 max-w-5xl mx-auto">
      <nav class="flex items-center justify-between flex-wrap">
        <div class="flex gap-2 items-center">
          <a href="mailto:{{.}}" aria-label="EMail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="4" />
              <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
            </svg>
          </a>
          <a href="/" class="flex items-center font-bold">
            fuki's website
          </a>
        </div>
    
        <ul id="nav-menu" class="flex w-auto mt-0 space-x-2">
          <li>
            <a href="about" class="hover:text-blue-800 dark:hover:text-blue-300">About Me</a>
          </li>
        </ul>
      </nav>
    </header>
</template>
