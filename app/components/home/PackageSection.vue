<script setup lang="ts">
import { servicePackages } from '~/data/packages'
</script>

<template>
  <section
    id="packages"
    class="section-y bg-surface"
  >
    <div class="container-page">
      <SectionTitle
        eyebrow="Service Packages"
        :title="'필요한 만큼 선택하는\n세 가지 Package'"
        description="유지보수 중심에서 전담 Engineering Team까지, 고객사의 상황에 맞게 시작하고 확장할 수 있습니다."
        align="center"
      />
      <ul class="mt-12 grid gap-5 lg:grid-cols-3">
        <li
          v-for="pkg in servicePackages"
          :key="pkg.slug"
        >
          <PackageCard
            :pkg="pkg"
            location="home_packages"
          />
        </li>
      </ul>
      <p class="mt-8 text-center text-sm text-muted">
        팀 구성, 계약 기간, 응답 시간 등 세부 조건은 상담을 통해 고객사 환경에 맞게 정합니다.
      </p>
    </div>
  </section>
</template>
