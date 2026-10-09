<script setup lang="ts">
import { packageConsultationItems, servicePackages } from '~/data/packages'

usePageSeo({
  title: '서비스',
  description:
    'Engineering Maintenance, Engineering Growth, Dedicated Engineering. 유지보수부터 전담 Engineering Team까지 고객사 상황에 맞는 Package를 선택하세요.',
  breadcrumbs: [{ name: '서비스', path: '/services' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Services"
      :title="'필요한 만큼,\nEngineering Capacity를 확장하세요'"
      description="기존 시스템의 안정적인 운영부터 지속적인 기능 개발, 전담 Engineering Team 구성까지. 세 가지 Package로 시작하고 필요에 따라 확장할 수 있습니다."
    />

    <section class="section-y">
      <div class="container-page">
        <ul class="grid gap-5 lg:grid-cols-3">
          <li
            v-for="pkg in servicePackages"
            :key="pkg.slug"
          >
            <PackageCard
              :pkg="pkg"
              location="services_index"
            />
          </li>
        </ul>

        <div class="mt-16 grid gap-8 rounded-lg bg-surface p-7 md:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 class="text-xl font-bold md:text-2xl">
              세부 조건은 함께 설계합니다
            </h2>
            <p class="mt-3 leading-relaxed text-muted">
              같은 Package라도 시스템 규모와 개발 조직에 따라 필요한 구성이 다릅니다.
              상담과 System Discovery를 통해 아래 항목을 고객사에 맞게 정합니다.
            </p>
          </div>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in packageConsultationItems"
              :key="item"
              class="rounded-md border border-border bg-white px-3.5 py-2 text-sm font-medium"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <WhatWeDoSection class="bg-surface" />

    <CtaBanner
      location="services_index"
      :title="'어떤 Package가 맞을지\n고민되신다면'"
      description="현재 개발 환경과 고민을 알려주시면 적합한 Package를 함께 정해드립니다."
    />
  </div>
</template>
