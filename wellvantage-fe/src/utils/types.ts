export type CustomNote = {
  id: number;
  date: string;
  note: string;
}

export type BasicDetails = {
  firstName: string;
  lastName: string;
  phone?: string;
  countryCode?: string;
  email?: string;
  gender?: string;
  dob?: string;
  height?: number;
  heightUnit?: 'cm' | 'ft';
  weight?: number;
  weightUnit?: 'kg' | 'lbs';
}

export type Preferences = {
  activityLevel?: string;
  goal?: string;
  fitnessFocus?: string;
  preferredGymTime?: string;
  preferredWorkoutIntensity?: string;
  medConcern?: string;
  prevGymExperience?: string;
}

export type LeadStatus = {
  inquiryDate?: string;
  assignedTo?: string;
  interestLevel?: 'Cold' | 'Warm' | 'Hot';
  lastInteraction?: string;
  followUpStatus?: string;
  preferredPackage?: string;
  preferredPtPackage?: string;
  leadSource?: string;
  notes?: CustomNote[];
}

export type Lead = {
  id: number;
  basicDetails: BasicDetails;
  preferences: Preferences;
  status: LeadStatus;
}

