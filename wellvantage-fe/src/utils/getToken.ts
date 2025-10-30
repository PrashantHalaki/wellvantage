export const getSessionToken = (): string | null => {
  const token = localStorage.getItem('id_token')
  return token || null
}

export const clearSessionToken = (): void => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('user')
}

export const setSessionToken = (token: string): void => {
  localStorage.setItem('id_token', token)
}
