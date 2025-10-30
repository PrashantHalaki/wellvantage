import { Lead } from './types';

export const mockLeads: Lead[] = [
  {
    id: 1,
    lastInteraction: "10 October, 2025",
    basicDetails: {
      firstName: "John",
      lastName: "Doe",
      phone: "9876543210",
      countryCode: "+91",
      email: "john.doe@example.com",
      gender: "male",
      dob: "15 January, 1990",
      height: 175,
      heightUnit: "cm",
      weight: 70,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "active",
      goal: "lose-weight",
      fitnessFocus: "cardio",
      preferredGymTime: "morning",
      preferredWorkoutIntensity: "moderate",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "01 October, 2025",
      assignedTo: "ram-mohan",
      interestLevel: "Hot",
      followUpStatus: "contacted",
      preferredPackage: "premium",
      preferredPtPackage: "pt-premium",
      leadSource: "social-media",
      notes: [
        { id: 1, date: "01 October, 2025", note: "Very interested in cardio classes." }
      ]
    }
  },
  {
    id: 2,
    lastInteraction: "20 September, 2025",
    basicDetails: {
      firstName: "Jane",
      lastName: "Smith",
      phone: "9123456789",
      countryCode: "+1",
      email: "jane.smith@example.com",
      gender: "female",
      dob: "20 May, 1985",
      height: 160,
      heightUnit: "cm",
      weight: 60,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "sedentary",
      goal: "improve-health",
      fitnessFocus: "yoga",
      preferredGymTime: "evening",
      preferredWorkoutIntensity: "light",
      medConcern: "asthma",
      prevGymExperience: "no",
    },
    status: {
      inquiryDate: "15 September, 2025",
      assignedTo: "ratna-pathak",
      interestLevel: "Warm",
      followUpStatus: "needs-followup",
      preferredPackage: "basic",
      preferredPtPackage: "pt-basic",
      leadSource: "referral",
      notes: [
        { id: 2, date: "15 September, 2025", note: "Prefers yoga and light workouts." }
      ]
    }
  },
  {
    id: 3,
    lastInteraction: "10 August, 2025",
    basicDetails: {
      firstName: "Alex",
      lastName: "Johnson",
      phone: "9988776655",
      countryCode: "+44",
      email: "alex.johnson@example.com",
      gender: "other",
      dob: "10 July, 1995",
      height: 180,
      heightUnit: "cm",
      weight: 80,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "very-active",
      goal: "gain-muscle",
      fitnessFocus: "strength",
      preferredGymTime: "afternoon",
      preferredWorkoutIntensity: "intense",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "5 August, 2025",
      assignedTo: "ram-mohan",
      interestLevel: "Hot",
      followUpStatus: "converted",
      preferredPackage: "premium",
      preferredPtPackage: "pt-premium",
      leadSource: "walk-in",
      notes: [
        { id: 3, date: "5 August, 2025", note: "Looking for strength training." }
      ]
    }
  },
  {
    id: 4,
    lastInteraction: "25 July, 2025",
    basicDetails: {
      firstName: "Priya",
      lastName: "Kumar",
      phone: "9871234560",
      countryCode: "+91",
      email: "priya.kumar@example.com",
      gender: "female",
      dob: "12 March, 1992",
      height: 165,
      heightUnit: "cm",
      weight: 55,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "moderate",
      goal: "maintain",
      fitnessFocus: "gym-workout",
      preferredGymTime: "morning",
      preferredWorkoutIntensity: "moderate",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "22 July, 2025",
      assignedTo: "ratna-pathak",
      interestLevel: "Warm",
      followUpStatus: "contacted",
      preferredPackage: "basic",
      preferredPtPackage: "package",
      leadSource: "advertisement",
      notes: [
        { id: 4, date: "22 July, 2025", note: "Wants to maintain current fitness." }
      ]
    }
  },
  {
    id: 5,
    lastInteraction: "20 June, 2025",
    basicDetails: {
      firstName: "Rahul",
      lastName: "Sharma",
      phone: "9001122334",
      countryCode: "+91",
      email: "rahul.sharma@example.com",
      gender: "male",
      dob: "30 November, 1988",
      height: 170,
      heightUnit: "cm",
      weight: 75,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "active",
      goal: "gain-muscle",
      fitnessFocus: "strength",
      preferredGymTime: "evening",
      preferredWorkoutIntensity: "intense",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "18 June, 2025",
      assignedTo: "ram-mohan",
      interestLevel: "Hot",
      followUpStatus: "converted",
      preferredPackage: "premium",
      preferredPtPackage: "pt-premium",
      leadSource: "referral",
      notes: [
        { id: 5, date: "18 June, 2025", note: "Interested in muscle gain programs." }
      ]
    }
  },
  {
    id: 6,
    lastInteraction: "12 May, 2025",
    basicDetails: {
      firstName: "Sara",
      lastName: "Lee",
      phone: "8009988776",
      countryCode: "+1",
      email: "sara.lee@example.com",
      gender: "female",
      dob: "25 September, 1997",
      height: 158,
      heightUnit: "cm",
      weight: 52,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "sedentary",
      goal: "improve-health",
      fitnessFocus: "yoga",
      preferredGymTime: "night",
      preferredWorkoutIntensity: "light",
      medConcern: "diabetes",
      prevGymExperience: "no",
    },
    status: {
      inquiryDate: "10 May, 2025",
      assignedTo: "ratna-pathak",
      interestLevel: "Cold",
      followUpStatus: "needs-followup",
      preferredPackage: "basic",
      preferredPtPackage: "package",
      leadSource: "social-media",
      notes: [
        { id: 6, date: "10 May, 2025", note: "Needs special attention for diabetes." }
      ]
    }
  },
  {
    id: 7,
    lastInteraction: "5 April, 2025",
    basicDetails: {
      firstName: "David",
      lastName: "Brown",
      phone: "7001234567",
      countryCode: "+44",
      email: "david.brown@example.com",
      gender: "male",
      dob: "5 December, 1980",
      height: 182,
      heightUnit: "cm",
      weight: 85,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "moderate",
      goal: "maintain",
      fitnessFocus: "gym-workout",
      preferredGymTime: "afternoon",
      preferredWorkoutIntensity: "moderate",
      medConcern: "hypertension",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "1 April, 2025",
      assignedTo: "ram-mohan",
      interestLevel: "Warm",
      followUpStatus: "contacted",
      preferredPackage: "basic",
      preferredPtPackage: "pt-basic",
      leadSource: "walk-in",
      notes: [
        { id: 7, date: "1 April, 2025", note: "Has hypertension, prefers moderate workouts." }
      ]
    }
  },
  {
    id: 8,
    lastInteraction: "18 March, 2025",
    basicDetails: {
      firstName: "Emily",
      lastName: "Clark",
      phone: "6009988771",
      countryCode: "+1",
      email: "emily.clark@example.com",
      gender: "female",
      dob: "18 April, 1993",
      height: 168,
      heightUnit: "cm",
      weight: 58,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "active",
      goal: "lose-weight",
      fitnessFocus: "cardio",
      preferredGymTime: "morning",
      preferredWorkoutIntensity: "intense",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "15 March, 2025",
      assignedTo: "ratna-pathak",
      interestLevel: "Hot",
      followUpStatus: "converted",
      preferredPackage: "premium",
      preferredPtPackage: "pt-premium",
      leadSource: "advertisement",
      notes: [
        { id: 8, date: "15 March, 2025", note: "Wants to lose weight quickly." }
      ]
    }
  },
  {
    id: 9,
    lastInteraction: "12 February, 2025",
    basicDetails: {
      firstName: "Amit",
      lastName: "Patel",
      phone: "9007766554",
      countryCode: "+91",
      email: "amit.patel@example.com",
      gender: "male",
      dob: "22 August, 1983",
      height: 172,
      heightUnit: "cm",
      weight: 78,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "sedentary",
      goal: "improve-health",
      fitnessFocus: "yoga",
      preferredGymTime: "evening",
      preferredWorkoutIntensity: "light",
      medConcern: "asthma",
      prevGymExperience: "no",
    },
    status: {
      inquiryDate: "10 February, 2025",
      assignedTo: "ram-mohan",
      interestLevel: "Cold",
      followUpStatus: "needs-followup",
      preferredPackage: "basic",
      preferredPtPackage: "package",
      leadSource: "referral",
      notes: [
        { id: 9, date: "10 February, 2025", note: "Asthma patient, prefers yoga." }
      ]
    }
  },
  {
    id: 10,
    lastInteraction: "10 January, 2025",
    basicDetails: {
      firstName: "Sneha",
      lastName: "Reddy",
      phone: "8001234567",
      countryCode: "+91",
      email: "sneha.reddy@example.com",
      gender: "female",
      dob: "30 June, 1999",
      height: 162,
      heightUnit: "cm",
      weight: 54,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "very-active",
      goal: "gain-muscle",
      fitnessFocus: "strength",
      preferredGymTime: "morning",
      preferredWorkoutIntensity: "intense",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "5 January, 2025",
      assignedTo: "ratna-pathak",
      interestLevel: "Hot",
      followUpStatus: "converted",
      preferredPackage: "premium",
      preferredPtPackage: "pt-premium",
      leadSource: "social-media",
      notes: [
        { id: 10, date: "5 January, 2025", note: "Wants to build muscle mass." }
      ]
    }
  },
  {
    id: 11,
    lastInteraction: "10 October, 2025",
    basicDetails: {
      firstName: "Jonny",
      lastName: "Doe",
      phone: "9876543210",
      countryCode: "+91",
      email: "jonny.doe@example.com",
      gender: "male",
      dob: "15 January, 1990",
      height: 175,
      heightUnit: "cm",
      weight: 70,
      weightUnit: "kg",
    },
    preferences: {
      activityLevel: "active",
      goal: "lose-weight",
      fitnessFocus: "cardio",
      preferredGymTime: "morning",
      preferredWorkoutIntensity: "moderate",
      medConcern: "none",
      prevGymExperience: "yes",
    },
    status: {
      inquiryDate: "01 October, 2025",
      assignedTo: "ram-mohan",
      interestLevel: "Hot",
      followUpStatus: "contacted",
      preferredPackage: "premium",
      preferredPtPackage: "pt-premium",
      leadSource: "social-media",
      notes: [
        { id: 1, date: "01 October, 2025", note: "Very interested in cardio classes." }
      ]
    }
  },
]
