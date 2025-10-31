// Subject areas/disciplines (top level)
export type SubjectArea =
  | 'Mathematics'
  | 'Science'
  | 'Language & Literature'
  | 'Social Sciences'
  | 'Arts & Humanities'
  | 'Technology & Engineering'
  | 'Business & Economics'
  | 'Health & Medicine'
  | 'Physical Education & Sports'
  | 'Vocational & Technical'

// Level of study
export type AcademicLevel =
  | 'Elementary'
  | 'Middle School'
  | 'High School'
  | 'Undergraduate'
  | 'Graduate'
  | 'Professional'
  | 'Continuing Education'

// Difficulty level
export type DifficultyLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert'

// Subject type/nature
export type SubjectType =
  | 'Theoretical'
  | 'Practical'
  | 'Laboratory'
  | 'Studio'
  | 'Seminar'
  | 'Workshop'
  | 'Fieldwork'
  | 'Hybrid'

export type SubjectCategory = 'CORE' | 'APPLIED' | 'SPECIALIZED' | 'OTHER'

export type Subject = {
  id: number
  name: string
  code: string // e.g., "MATH101", "CS202"
  category: SubjectCategory
  area: SubjectArea
  level: AcademicLevel
  difficulty?: DifficultyLevel
  type: SubjectType
  prerequisites?: number[] // IDs of prerequisite subjects
  credits?: number
  description?: string
}
