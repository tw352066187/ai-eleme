<script setup lang="ts">
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationSource,
  InlineCitationText,
} from '@/components/ai-elements/inline-citation'

const citation = {
  text: '该技术持续快速发展，新的突破性进展不断涌现',
  sources: [
    {
      title: '自然语言处理的进展',
      url: 'https://example.com/nlp-advances',
      description:
        '关于自然语言处理技术最新发展及其应用的综合研究。',
    },
    {
      title: '机器学习的突破',
      url: 'https://mlnews.org/breakthroughs',
      description:
        '过去一年中最重要的机器学习突破概述。',
    },
    {
      title: '医疗领域的人工智能：当前趋势',
      url: 'https://healthai.com/trends',
      description:
        '关于人工智能如何改变医疗保健和诊断的报告。',
    },
    {
      title: '人工智能的伦理问题',
      url: 'https://aiethics.org/overview',
      description:
        '关于人工智能发展中的伦理考量和挑战的讨论。',
    },
    {
      title: '深度学习模型的扩展',
      url: 'https://deeplearninghub.com/scaling-models',
      description:
        '关于扩展深度学习架构的技术挑战和解决方案的见解。',
    },
    {
      title: '自然语言理解基准测试',
      url: 'https://nlubenchmarks.com/latest',
      description:
        '自然语言理解系统的最新基准测试和评估指标总结。',
    },
  ],
}
</script>

<template>
  <p class="text-sm leading-relaxed">
    根据最近的研究，人工智能在自然语言处理方面取得了显著进展。
    <InlineCitation>
      <InlineCitationText>{{ citation.text }}</InlineCitationText>
      <InlineCitationCard>
        <InlineCitationCardTrigger
          :sources="citation.sources.map((source) => source.url)"
        />
        <InlineCitationCardBody>
          <InlineCitationCarousel>
            <InlineCitationCarouselHeader>
              <InlineCitationCarouselPrev />
              <InlineCitationCarouselNext />
              <InlineCitationCarouselIndex />
            </InlineCitationCarouselHeader>
            <InlineCitationCarouselContent>
              <InlineCitationCarouselItem
                v-for="source in citation.sources"
                :key="source.url"
              >
                <InlineCitationSource
                  :description="source.description"
                  :title="source.title"
                  :url="source.url"
                />
              </InlineCitationCarouselItem>
            </InlineCitationCarouselContent>
          </InlineCitationCarousel>
        </InlineCitationCardBody>
      </InlineCitationCard>
    </InlineCitation>.
  </p>
</template>
