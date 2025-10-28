export interface User {
  id: string
  firstName: string
  lastName: string
  emailAddress: string
  isGymOwner: boolean
  onboardingCompleted: boolean
  phoneNumber: string
  countryCode: string
  phoneVerified?: boolean
  role: {
    title: string
  }
}
