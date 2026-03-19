import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useStreaming } from '../useStreaming'
import fc from 'fast-check'

// 模拟 Vue 的 onUnmounted
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onUnmounted: vi.fn()
  }
})

describe('useStreaming', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  /**
   * Feature: markstream-page-enhancement, Property 1: 流式渲染完整性
   * Validates: Requirements 2.1, 2.3
   *
   * *For any* 源 Markdown 内容，当流式渲染完成后，显示的内容应该与源内容完全一致。
   */
  it('Property 1: 流式渲染完成后内容与源内容一致', () => {
    fc.assert(
      fc.property(
        // 生成随机字符串作为 Markdown 内容
        fc.string({ minLength: 1, maxLength: 500 }),
        (sourceContent) => {
          const { content, startStreaming, isStreaming } = useStreaming()

          // 开始流式渲染
          startStreaming(sourceContent)

          // 快进所有定时器，直到渲染完成
          // 每个字符需要 30ms（默认速度）
          vi.advanceTimersByTime(sourceContent.length * 30 + 100)

          // 验证：渲染完成后内容应该与源内容完全一致
          expect(content.value).toBe(sourceContent)
          // 验证：渲染完成后 isStreaming 应为 false
          expect(isStreaming.value).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: markstream-page-enhancement, Property 2: 流式渲染状态一致性
   * Validates: Requirements 2.2, 2.3
   *
   * *For any* 流式渲染过程，当 content 长度小于源内容长度时，isStreaming 应为 true；
   * 当 content 长度等于源内容长度时，isStreaming 应为 false。
   */
  it('Property 2: 流式渲染过程中状态一致性', () => {
    fc.assert(
      fc.property(
        // 生成随机字符串（至少 10 个字符以便观察中间状态）
        fc.string({ minLength: 10, maxLength: 200 }),
        // 生成随机的采样点（0-100%）
        fc.integer({ min: 10, max: 90 }),
        (sourceContent, samplePercent) => {
          const { content, startStreaming, isStreaming } = useStreaming()

          // 开始流式渲染
          startStreaming(sourceContent)

          // 计算采样时间点
          const sampleIndex = Math.floor(sourceContent.length * samplePercent / 100)
          const sampleTime = sampleIndex * 30

          // 快进到采样点
          vi.advanceTimersByTime(sampleTime)

          // 验证中间状态：如果内容未完成，isStreaming 应为 true
          if (content.value.length < sourceContent.length) {
            expect(isStreaming.value).toBe(true)
          }

          // 继续快进直到完成
          vi.advanceTimersByTime(sourceContent.length * 30 + 100)

          // 验证完成状态
          expect(content.value.length).toBe(sourceContent.length)
          expect(isStreaming.value).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: markstream-page-enhancement, Property 4: 重置操作幂等性
   * Validates: Requirements 2.4
   *
   * *For any* 页面状态，执行重置操作后，content 应为空字符串，isStreaming 应为 false。
   * 多次执行重置操作应产生相同的结果。
   */
  it('Property 4: 重置操作幂等性', () => {
    fc.assert(
      fc.property(
        // 生成随机字符串作为初始内容
        fc.string({ minLength: 1, maxLength: 200 }),
        // 生成随机的重置次数 (1-5 次)
        fc.integer({ min: 1, max: 5 }),
        (sourceContent, resetCount) => {
          const { content, isStreaming, startStreaming, resetStreaming, sourceContent: src } = useStreaming()

          // 开始流式渲染
          startStreaming(sourceContent)

          // 快进一些时间，让渲染进行一部分
          vi.advanceTimersByTime(Math.floor(sourceContent.length * 15))

          // 执行多次重置
          for (let i = 0; i < resetCount; i++) {
            resetStreaming()

            // 每次重置后验证状态
            expect(content.value).toBe('')
            expect(isStreaming.value).toBe(false)
            expect(src.value).toBe('')
          }

          // 最终状态验证
          expect(content.value).toBe('')
          expect(isStreaming.value).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  // 单元测试：基本功能验证
  describe('基本功能', () => {
    it('初始状态正确', () => {
      const { content, isStreaming, speed } = useStreaming()

      expect(content.value).toBe('')
      expect(isStreaming.value).toBe(false)
      expect(speed.value).toBe(30)
    })

    it('startStreaming 开始渲染', () => {
      const { content, isStreaming, startStreaming } = useStreaming()

      startStreaming('Hello')

      expect(isStreaming.value).toBe(true)
      expect(content.value).toBe('')

      // 快进一个间隔
      vi.advanceTimersByTime(30)
      expect(content.value).toBe('H')
    })

    it('stopStreaming 停止渲染', () => {
      const { content, isStreaming, startStreaming, stopStreaming } = useStreaming()

      startStreaming('Hello World')
      vi.advanceTimersByTime(150) // 5 个字符

      stopStreaming()

      expect(isStreaming.value).toBe(false)
      const stoppedContent = content.value

      // 继续快进，内容不应该变化
      vi.advanceTimersByTime(300)
      expect(content.value).toBe(stoppedContent)
    })

    it('resetStreaming 重置状态', () => {
      const { content, isStreaming, startStreaming, resetStreaming, sourceContent } = useStreaming()

      startStreaming('Hello')
      vi.advanceTimersByTime(90) // 3 个字符

      resetStreaming()

      expect(content.value).toBe('')
      expect(isStreaming.value).toBe(false)
      expect(sourceContent.value).toBe('')
    })

    it('showComplete 立即显示完整内容', () => {
      const { content, isStreaming, startStreaming, showComplete } = useStreaming()

      startStreaming('Hello World')
      vi.advanceTimersByTime(60) // 2 个字符

      showComplete()

      expect(content.value).toBe('Hello World')
      expect(isStreaming.value).toBe(false)
    })

    it('setSpeed 设置渲染速度', () => {
      const { speed, setSpeed } = useStreaming()

      setSpeed(50)
      expect(speed.value).toBe(50)
    })

    it('progress 计算正确', () => {
      const { progress, startStreaming } = useStreaming()

      startStreaming('1234567890') // 10 个字符

      expect(progress.value).toBe(0)

      vi.advanceTimersByTime(150) // 5 个字符
      expect(progress.value).toBe(50)

      vi.advanceTimersByTime(150) // 完成
      expect(progress.value).toBe(100)
    })
  })
})
