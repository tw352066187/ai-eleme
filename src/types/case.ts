// 案例进度概览相关类型定义

/**
 * 案件标签类型
 */
export interface CaseTag {
  id: string
  text: string
  type: 'location' | 'level' | 'category' | 'suspect' | 'victim' | 'record'
  color: string
}

/**
 * 进度阶段状态
 */
export type ProgressStatus = 'completed' | 'in-progress' | 'pending'

/**
 * 进度阶段信息
 */
export interface ProgressStage {
  id: string
  name: string
  status: ProgressStatus
  count: {
    completed: number
    total: number
  }
}

/**
 * 基础信息
 */
export interface BasicInfo {
  reporter: string
  phone: string
  reportTime: string
  status: string
  alarmNature: string
  jurisdiction: string
  responsibleUnit: string
  issuer: string
}

/**
 * 案件完整信息
 */
export interface CaseInfo {
  id: string
  reporter: string
  phone: string
  reportTime: string
  status: string
  alarmNature: string
  jurisdiction: string
  responsibleUnit: string
  issuer: string
  alarmContent: string
  disposalSituation: string
  tags: CaseTag[]
  progressStages: ProgressStage[]
  timeLimit: string
}

/**
 * API 响应类型
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

/**
 * 案件操作类型
 */
export interface CaseAction {
  id: string
  name: string
  enabled: boolean
}
