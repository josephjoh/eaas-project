<script setup lang="ts">
import { targetProfile, techStacks } from '~/data/home'
</script>

<template>
  <section
    id="target"
    class="section-y bg-surface"
  >
    <div class="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionTitle
          eyebrow="Target Customer"
          :title="'이런 기업을 위해\n만들었습니다'"
          description="자체 서비스를 운영하며 개발팀을 보유하고 있지만, 늘어나는 개발 수요를 내부 인력만으로 감당하기 어려운 기업에 가장 적합합니다."
        />
        <dl class="mt-10 grid gap-4 sm:grid-cols-2">
          <div
            v-for="item in targetProfile"
            :key="item.label"
            class="rounded-lg border border-border bg-white p-5"
          >
            <dt class="text-sm text-muted">
              {{ item.label }}
            </dt>
            <dd class="mt-1">
              <span class="block text-lg font-bold">{{ item.value }}</span>
              <span class="mt-1.5 block text-sm leading-relaxed text-muted">{{ item.description }}</span>
            </dd>
          </div>
        </dl>
      </div>

      <BaseCard class="md:p-9">
        <h3 class="text-xl font-bold">
          주요 기술 환경
        </h3>
        <p class="mt-2 text-[15px] text-muted">
          웹 서비스를 구성하는 대표적인 기술 환경을 중심으로 지원합니다.
        </p>
        <ul class="mt-6 flex flex-wrap gap-2">
          <li
            v-for="tech in techStacks"
            :key="tech"
            class="rounded-md border border-border bg-surface px-3.5 py-2 text-sm font-medium"
          >
            {{ tech }}
          </li>
        </ul>
        <p class="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted">
          위 기술은 대표적인 예시입니다. 목록에 없는 기술도 상담에서 고객사의 기술 환경을 확인한 뒤 지원 가능 여부를 안내해드립니다.
        </p>
      </BaseCard>
    </div>
  </section>
</template>
