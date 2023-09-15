export function getDueDate (): Date {
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 10)
  return dueDate
}
