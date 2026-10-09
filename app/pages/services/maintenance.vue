<script setup lang="ts">
import { getPackage } from '~/data/packages'

const pkg = getPackage('maintenance')

usePageSeo({
  title: pkg.name,
  description: `${pkg.purpose}. ${pkg.summary}`,
  breadcrumbs: [
    { name: '서비스', path: '/services' },
    { name: pkg.name, path: `/services/${pkg.slug}` },
  ],
})

useServiceJsonLd(pkg)
</script>

<template>
  <ServicePackageDetail :pkg="pkg" />
</template>
