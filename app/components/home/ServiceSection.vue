<script setup lang="ts">
import { definitionPoints } from '~/data/home'
</script>

<template>
  <section
    id="service"
    class="section-y"
  >
    <div class="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionTitle
          eyebrow="What is EaaS"
          :title="'유지보수와 신규 개발,\n둘 다 멈추지 않도록'"
        />
        <blockquote class="mt-8 border-l-4 border-primary pl-5 text-lg leading-relaxed font-semibold md:text-xl">
          개발팀은 있지만, 유지보수와 신규 개발을 동시에 수행하기 어려운 기업을 위한 지속적인 Engineering Service
        </blockquote>
        <p class="mt-6 leading-relaxed text-muted md:text-lg">
          EaaS는 고객의 기존 시스템과 개발 환경을 분석하고 필요한 Engineering Resource를 제공하여
          유지보수, Bug Fix, 기능 개발, 기술 개선까지 지속적으로 지원합니다.
        </p>
        <p class="mt-4 leading-relaxed text-muted md:text-lg">
          단순히 개발자를 보내는 것이 아니라, 고객사의 시스템을 이해하고 함께 운영하는 Engineering Team이 됩니다.
        </p>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2">
        <li
          v-for="(point, index) in definitionPoints"
          :key="point.title"
        >
          <BaseCard
            :tone="index === 0 ? 'highlight' : 'surface'"
            class="h-full"
          >
            <h3 class="text-lg font-bold">
              {{ point.title }}
            </h3>
            <p class="mt-2 text-[15px] leading-relaxed text-muted">
              {{ point.description }}
            </p>
          </BaseCard>
        </li>
      </ul>
    </div>
  </section>
</template>
