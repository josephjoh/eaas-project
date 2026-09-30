<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      본문 바로가기
    </a>
    <AppHeader />
    <main
      id="main"
      class="flex-1"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
