<script setup lang="ts">
import { getPackage } from '~/data/packages'

const pkg = getPackage('maintenance')

usePageSeo({
  title: pkg.name,
  description: `${pkg.purpose}. ${pkg.summary}`,
})
</script>

<template>
  <ServicePackageDetail :pkg="pkg" />
</template>
