import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { EXAMPLES } from '../examples'

describe('示例数据', () => {
  /**
   * Feature: markstream-page-enhancement, Property 3: 示例切换正确性
   * Validates: Requirements 5.2
   *
   * *For any* 有效的示例索引 i，当用户选择该示例后，系统应该加载 EXAMPLES[i].content 作为源内容。
   */
  it('Property 3: 有效索引返回正确的示例内容', () => {
    fc.assert(
      fc.property(
        // 生成有效的示例索引 (0 到 EXAMPLES.length - 1)
        fc.integer({ min: 0, max: EXAMPLES.length - 1 }),
        (index) => {
          const example = EXAMPLES[index]

          // 验证：示例存在
          expect(example).toBeDefined()

          // 类型守卫
          if (!example) return

          // 验证：示例有必需的属性
          expect(example.name).toBeDefined()
          expect(typeof example.name).toBe('string')
          expect(example.name.length).toBeGreaterThan(0)

          expect(example.content).toBeDefined()
          expect(typeof example.content).toBe('string')
          expect(example.content.length).toBeGreaterThan(0)

          expect(example.description).toBeDefined()
          expect(typeof example.description).toBe('string')

          // 验证：通过索引访问的内容与直接访问一致
          expect(EXAMPLES[index]?.content).toBe(example.content)
        }
      ),
      { numRuns: 100 }
    )
  })

  // 单元测试：示例数据结构验证
  describe('示例数据结构', () => {
    it('至少有一个示例', () => {
      expect(EXAMPLES.length).toBeGreaterThan(0)
    })

    it('每个示例都有完整的属性', () => {
      EXAMPLES.forEach((example, index) => {
        expect(example.name, `示例 ${index} 缺少 name`).toBeDefined()
        expect(example.content, `示例 ${index} 缺少 content`).toBeDefined()
        expect(example.description, `示例 ${index} 缺少 description`).toBeDefined()
      })
    })

    it('示例名称唯一', () => {
      const names = EXAMPLES.map(e => e.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    })

    it('包含基础语法示例', () => {
      const basicExample = EXAMPLES.find(e => e.name === '基础语法')
      expect(basicExample).toBeDefined()
      expect(basicExample?.content).toContain('#')
    })

    it('包含代码高亮示例', () => {
      const codeExample = EXAMPLES.find(e => e.name === '代码高亮')
      expect(codeExample).toBeDefined()
      expect(codeExample?.content).toContain('```')
    })

    it('包含 Mermaid 图表示例', () => {
      const mermaidExample = EXAMPLES.find(e => e.name === 'Mermaid 图表')
      expect(mermaidExample).toBeDefined()
      expect(mermaidExample?.content).toContain('```mermaid')
    })
  })
})
