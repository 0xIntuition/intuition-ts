export const CHAPTERS = {
  CURRENT_CHAPTER: 2,
  TOTAL_CHAPTERS: 5,
  CHAPTERS: [
    { status: 'completed' as const }, // Chapter 1
    { status: 'in_progress' as const }, // Chapter 2
    { status: 'locked' as const }, // Chapter 3
    { status: 'locked' as const }, // Chapter 4
    { status: 'locked' as const }, // Chapter 5
  ],
}
