<script setup lang="ts">
import { securityPrinciples } from '~/data/home'
</script>

<template>
  <section
    id="security"
    class="section-y bg-surface"
  >
    <div class="container-page">
      <SectionTitle
        eyebrow="Security"
        :title="'고객 시스템에 접근하는 만큼,\n보안을 우선합니다'"
        description="EaaS는 고객사의 Repository, Cloud, Database에 접근해 일합니다. 그래서 접근 권한과 정보 관리를 운영의 기본 원칙으로 둡니다."
      />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="principle in securityPrinciples"
          :key="principle.title"
        >
          <BaseCard class="h-full">
            <span class="flex size-10 items-center justify-center rounded-md bg-primary-soft text-primary">
              <BaseIcon
                name="shield"
                class="size-5"
              />
            </span>
            <h3 class="mt-4 text-lg font-bold">
              {{ principle.title }}
            </h3>
            <p class="mt-2 text-[15px] leading-relaxed text-muted">
              {{ principle.description }}
            </p>
          </BaseCard>
        </li>
      </ul>
      <p class="mt-8 text-sm text-muted">
        실제 접근 범위와 관리 방식은 계약 시 고객사의 보안 정책에 맞춰 함께 정합니다.
      </p>
    </div>
  </section>
</template>
