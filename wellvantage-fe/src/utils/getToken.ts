export const getSessionToken = (): string | null => {
  const token = localStorage.getItem('sessionId')
  return token || null
}

export const clearSessionToken = (): void => {
  localStorage.removeItem('sessionId')
  localStorage.removeItem('user')
}

export const setSessionToken = (token: string): void => {
  localStorage.setItem('sessionId', token)
}
