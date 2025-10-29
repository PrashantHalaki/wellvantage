import { useState, useEffect } from 'react';
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BasicDetails, CustomNote, Lead, LeadStatus, Preferences } from '@/utils/types';
import { DatePicker } from '../ui/datepicker';
import { toast } from 'sonner';

type TabType = 'Basic' | 'Preferences' | 'Status';

export default function LeadForm({
  setMode,
  setLeads,
  selectedLead,
  lead,
}: {
  setMode: (mode: 'view' | 'edit') => void;
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  selectedLead: number | null;
  lead: Lead | undefined;
}) {
  const [activeTab, setActiveTab] = useState<TabType>('Basic');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState<number | undefined>();
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState<number | undefined>();
  const [weightUnit, setWeightUnit] = useState('kg');

  const [activityLevel, setActivityLevel] = useState('');
  const [wellnessGoals, setWellnessGoals] = useState('');
  const [fitnessFocus, setFitnessFocus] = useState('');
  const [preferredGymTime, setPreferredGymTime] = useState('');
  const [preferredWorkoutIntensity, setPreferredWorkoutIntensity] = useState('');
  const [medicalConcerns, setMedicalConcerns] = useState('');
  const [previousGymExperience, setPreviousGymExperience] = useState('');

  const [inquiryDate, setInquiryDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [interestLevel, setInterestLevel] = useState('');
  const [followUpStatus, setFollowUpStatus] = useState('');
  const [preferredPackage, setPreferredPackage] = useState('');
  const [preferredPtPackage, setPreferredPtPackage] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [customNotes, setCustomNotes] = useState<CustomNote[]>([]);

  useEffect(() => {
    if (lead) {
      setFirstName(lead.basicDetails.firstName || '');
      setLastName(lead.basicDetails.lastName || '');
      setEmail(lead.basicDetails.email || '');
      setPhone(lead.basicDetails.phone || '');
      setCountryCode(lead.basicDetails.countryCode || '');
      setGender(lead.basicDetails.gender || '');
      setDob(lead.basicDetails.dob || '');
      setHeight(lead.basicDetails.height || undefined);
      setHeightUnit(lead.basicDetails.heightUnit || 'cm');
      setWeight(lead.basicDetails.weight || undefined);
      setWeightUnit(lead.basicDetails.weightUnit || 'kg');

      setActivityLevel(lead.preferences.activityLevel || '');
      setWellnessGoals(lead.preferences.goal || '');
      setFitnessFocus(lead.preferences.fitnessFocus || '');
      setPreferredGymTime(lead.preferences.preferredGymTime || '');
      setPreferredWorkoutIntensity(lead.preferences.preferredWorkoutIntensity || '');
      setMedicalConcerns(lead.preferences.medConcern || '');
      setPreviousGymExperience(lead.preferences.prevGymExperience || '');

      setInquiryDate(lead.status.inquiryDate || '');
      setAssignedTo(lead.status.assignedTo || '');
      setInterestLevel(lead.status.interestLevel || '');
      setFollowUpStatus(lead.status.followUpStatus || '');
      setPreferredPackage(lead.status.preferredPackage || '');
      setPreferredPtPackage(lead.status.preferredPtPackage || '');
      setLeadSource(lead.status.leadSource || '');
      setCustomNotes(lead.status.notes || []);
    }
  }, [lead]);

  const addCustomNote = () => {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCustomNotes([{ id: Date.now(), date: today, note: '' }, ...customNotes]);
  };

  const updateBasicDetails = () => {
    if (selectedLead === null) return;
    setLeads((prevLeads: Lead[]) => {
      const updatedLeads: Lead[] = [...prevLeads];
      const updatedBasicDetails: BasicDetails = {
        firstName,
        lastName,
        email,
        phone,
        countryCode,
        gender,
        dob,
        height,
        heightUnit: heightUnit as 'cm' | 'ft',
        weight,
        weightUnit: weightUnit as 'kg' | 'lbs',
      };
      updatedLeads[selectedLead] = {
        ...updatedLeads[selectedLead],
        basicDetails: updatedBasicDetails,
      };
      return updatedLeads;
    });
    toast.success('Basic details updated successfully');
  };

  const updatePreferenceDetails = () => {
    if (selectedLead === null) return;
    setLeads((prevLeads: Lead[]) => {
      const updatedLeads: Lead[] = [...prevLeads];
      const updatedPreferences: Preferences = {
        activityLevel,
        goal: wellnessGoals,
        fitnessFocus,
        preferredGymTime,
        preferredWorkoutIntensity,
        medConcern: medicalConcerns,
        prevGymExperience: previousGymExperience,
      };
      updatedLeads[selectedLead] = {
        ...updatedLeads[selectedLead],
        preferences: updatedPreferences,
      };
      return updatedLeads;
    });
    toast.success('Preferences updated successfully');
  };

  const updateStatusDetails = () => {
    if (selectedLead === null) return;
    setLeads((prevLeads: Lead[]) => {
      const updatedLeads: Lead[] = [...prevLeads];
      const updatedStatus: LeadStatus = {
        inquiryDate,
        assignedTo,
        interestLevel: interestLevel as 'Cold' | 'Warm' | 'Hot',
        lastInteraction: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        followUpStatus,
        preferredPackage,
        preferredPtPackage,
        leadSource,
        notes: customNotes,
      };
      updatedLeads[selectedLead] = {
        ...updatedLeads[selectedLead],
        status: updatedStatus,
      };
      return updatedLeads;
    });
    toast.success('Status updated successfully');
  };

  return (
    <div className='h-full bg-background overflow-auto'>
      {/* Header */}
      <div className='border-b border-border bg-white sticky top-0 z-10'>
        <div className='px-4 sm:px-6 flex lg:px-8 py-4 sm:py-6'>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full text-foreground hover:bg-accent'
            onClick={() => setMode('view')}
          >
            <ArrowLeft className='h-6 w-6' />
          </Button>
          <h1 className='pl-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground lg:ml-0 ml-12'>
            Lead Management
          </h1>
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 py-6'>
        {/* Tabs */}
        <div className='flex gap-8 mb-8 border-b border-border'>
          <button
            onClick={() => setActiveTab('Basic')}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === 'Basic' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Basic
            {activeTab === 'Basic' && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary' />
            )}
          </button>
          <button
            onClick={() => setActiveTab('Preferences')}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === 'Preferences'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Preferences
            {activeTab === 'Preferences' && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary' />
            )}
          </button>
          <button
            onClick={() => setActiveTab('Status')}
            className={`pb-3 px-1 text-lg font-medium transition-colors relative ${
              activeTab === 'Status'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Status
            {activeTab === 'Status' && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary' />
            )}
          </button>
        </div>

        {/* Basic Tab */}
        {activeTab === 'Basic' && (
          <div className='max-w-4xl'>
            <h2 className='text-2xl font-semibold text-foreground mb-6'>Basic Details</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>First Name*</Label>
                <Input
                  className='bg-white'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value?.trim().replace(/[^A-Za-z ]/g, ''));
                  }}
                />
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Last Name*</Label>
                <Input
                  className='bg-white'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value?.trim().replace(/[^A-Za-z ]/g, ''));
                  }}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Phone</Label>
                <div className='flex gap-2'>
                  <Select
                    defaultValue='+91'
                    value={countryCode}
                    onValueChange={(val) => {
                      setCountryCode(val);
                    }}
                  >
                    <SelectTrigger className='w-24 bg-muted'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='+91'>+91</SelectItem>
                      <SelectItem value='+1'>+1</SelectItem>
                      <SelectItem value='+44'>+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className='flex-1 bg-white'
                    type='number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value?.trim().replace(/[^0-9]/g, ''))}
                  />
                </div>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Email</Label>
                <Input
                  type='email'
                  className='bg-white'
                  value={email}
                  onChange={(e) => setEmail(e.target.value?.trim())}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Gender</Label>
                <Select
                  value={gender}
                  onValueChange={(val) => {
                    setGender(val);
                  }}
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='male'>Male</SelectItem>
                    <SelectItem value='female'>Female</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Date of Birth</Label>
                <DatePicker value={dob} onDateSelect={(date) => setDob(date)} />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Height</Label>
                <div className='flex gap-2'>
                  <Input
                    className='flex-1 bg-white'
                    type='number'
                    value={height}
                    onChange={(e) => setHeight(Number(e?.target?.value))}
                  />
                  <Select
                    defaultValue='cm'
                    value={heightUnit}
                    onValueChange={(val) => setHeightUnit(val as 'cm' | 'ft')}
                  >
                    <SelectTrigger className='w-20 bg-[#E8F5E9] text-primary border-primary/20'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cm'>cm</SelectItem>
                      <SelectItem value='ft'>ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Weight</Label>
                <div className='flex gap-2'>
                  <Input
                    className='flex-1 bg-white'
                    type='number'
                    value={weight}
                    onChange={(e) => setWeight(e.target.valueAsNumber)}
                  />
                  <Select
                    defaultValue='kg'
                    value={weightUnit}
                    onValueChange={(val) => setWeightUnit(val as 'kg' | 'lbs')}
                  >
                    <SelectTrigger className='w-20 bg-[#E8F5E9] text-primary border-primary/20'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='kg'>kg</SelectItem>
                      <SelectItem value='lbs'>lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className='flex justify-center'>
              <Button
                className='px-24 py-6 text-lg bg-primary hover:bg-accent'
                onClick={updateBasicDetails}
              >
                Update
              </Button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'Preferences' && (
          <div className='max-w-4xl'>
            <h2 className='text-2xl font-semibold text-foreground mb-6'>Preference</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Activity Level</Label>
                <Select
                  defaultValue='very-active'
                  value={activityLevel}
                  onValueChange={(val) =>
                    setActivityLevel(val as 'very-active' | 'active' | 'moderate' | 'sedentary')
                  }
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='very-active'>Very active</SelectItem>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='moderate'>Moderate</SelectItem>
                    <SelectItem value='sedentary'>Sedentary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Wellness Goals</Label>
                <Select
                  defaultValue='lose-weight'
                  value={wellnessGoals}
                  onValueChange={(val) =>
                    setWellnessGoals(
                      val as 'lose-weight' | 'gain-muscle' | 'maintain' | 'improve-health'
                    )
                  }
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='lose-weight'>Lose weight</SelectItem>
                    <SelectItem value='gain-muscle'>Gain muscle</SelectItem>
                    <SelectItem value='maintain'>Maintain fitness</SelectItem>
                    <SelectItem value='improve-health'>Improve health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Primary Fitness Focus</Label>
                <Select
                  defaultValue='gym-workout'
                  value={fitnessFocus}
                  onValueChange={(val) =>
                    setFitnessFocus(val as 'gym-workout' | 'cardio' | 'strength' | 'yoga')
                  }
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='gym-workout'>Gym workout</SelectItem>
                    <SelectItem value='cardio'>Cardio</SelectItem>
                    <SelectItem value='strength'>Strength training</SelectItem>
                    <SelectItem value='yoga'>Yoga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Preferred Gym Time</Label>
                <Select
                  defaultValue='morning'
                  value={preferredGymTime}
                  onValueChange={(val) =>
                    setPreferredGymTime(val as 'morning' | 'afternoon' | 'evening' | 'night')
                  }
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='morning'>Morning</SelectItem>
                    <SelectItem value='afternoon'>Afternoon</SelectItem>
                    <SelectItem value='evening'>Evening</SelectItem>
                    <SelectItem value='night'>Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Preferred Workout Intensity</Label>
                <Select
                  defaultValue='light'
                  value={preferredWorkoutIntensity}
                  onValueChange={(val) =>
                    setPreferredWorkoutIntensity(val as 'light' | 'moderate' | 'intense')
                  }
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>Light</SelectItem>
                    <SelectItem value='moderate'>Moderate</SelectItem>
                    <SelectItem value='intense'>Intense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Medical Concerns</Label>
                <Select
                  defaultValue='diabetes'
                  value={medicalConcerns}
                  onValueChange={(val) =>
                    setMedicalConcerns(val as 'diabetes' | 'hypertension' | 'asthma' | 'none')
                  }
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='diabetes'>Diabetes</SelectItem>
                    <SelectItem value='hypertension'>Hypertension</SelectItem>
                    <SelectItem value='asthma'>Asthma</SelectItem>
                    <SelectItem value='none'>None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Previous Gym Experience</Label>
                <Select
                  defaultValue='yes'
                  value={previousGymExperience}
                  onValueChange={(val) => setPreviousGymExperience(val as 'yes' | 'no')}
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='yes'>Yes</SelectItem>
                    <SelectItem value='no'>No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex justify-center'>
              <Button
                className='px-24 py-6 text-lg bg-primary hover:bg-accent'
                onClick={updatePreferenceDetails}
              >
                Update
              </Button>
            </div>
          </div>
        )}

        {/* Status Tab */}
        {activeTab === 'Status' && (
          <div className='max-w-4xl'>
            <h2 className='text-2xl font-semibold text-foreground mb-6'>Status</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Inquiry Date</Label>
                <DatePicker value={inquiryDate} onDateSelect={setInquiryDate} />
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>
                  Assigned To Admin/Receptionist
                </Label>
                <Select defaultValue='ram-mohan' value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ram-mohan'>Ram Mohan</SelectItem>
                    <SelectItem value='ratna-pathak'>Ratna Pathak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Interest Level</Label>
                <Select defaultValue='hot' value={interestLevel} onValueChange={setInterestLevel}>
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Hot'>Hot</SelectItem>
                    <SelectItem value='Warm'>Warm</SelectItem>
                    <SelectItem value='Cold'>Cold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Follow Up Status</Label>
                <Select
                  defaultValue='needs-followup'
                  value={followUpStatus}
                  onValueChange={setFollowUpStatus}
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='needs-followup'>Needs Follow Up</SelectItem>
                    <SelectItem value='contacted'>Contacted</SelectItem>
                    <SelectItem value='converted'>Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <Label className='text-foreground/80 mb-2 block'>Preferred Package</Label>
                <Select
                  defaultValue='package'
                  value={preferredPackage}
                  onValueChange={setPreferredPackage}
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='package'>Package</SelectItem>
                    <SelectItem value='basic'>Basic Package</SelectItem>
                    <SelectItem value='premium'>Premium Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-foreground/80 mb-2 block'>
                  Preferred PT Package (If Any)
                </Label>
                <Select
                  defaultValue='package'
                  value={preferredPtPackage}
                  onValueChange={setPreferredPtPackage}
                >
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='package'>Package</SelectItem>
                    <SelectItem value='pt-basic'>PT Basic</SelectItem>
                    <SelectItem value='pt-premium'>PT Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='mb-6'>
              <Label className='text-foreground/80 mb-2 block'>How They Heard About The Gym</Label>
              <Select defaultValue='social-media' value={leadSource} onValueChange={setLeadSource}>
                <SelectTrigger className='bg-white max-w-md'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='social-media'>Social Media</SelectItem>
                  <SelectItem value='referral'>Referral</SelectItem>
                  <SelectItem value='advertisement'>Advertisement</SelectItem>
                  <SelectItem value='walk-in'>Walk-in</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Notes */}
            <div className='mb-8'>
              <div className='flex items-center justify-between mb-4'>
                <Label className='text-foreground/80'>Custom notes</Label>
                <Button
                  variant={'ghost'}
                  size='icon'
                  className='rounded-full w-8 h-8 bg-primary hover:bg-accent text-white'
                  onClick={addCustomNote}
                >
                  <PlusIcon className='w-4 h-4' />
                </Button>
              </div>

              <div className='space-y-4'>
                {customNotes.map((eachNote, index) => (
                  <div
                    key={'' + index + eachNote.id}
                    className='grid grid-cols-[200px_1fr] gap-4 items-start'
                  >
                    <div className='relative'>
                      <DatePicker
                        value={eachNote.date}
                        onDateSelect={(date) => {
                          const updatedNotes = [...customNotes];
                          updatedNotes[index].date = date;
                          setCustomNotes(updatedNotes);
                        }}
                      />
                    </div>
                    <Textarea
                      value={eachNote.note}
                      onChange={(e) => {
                        const updatedNotes = [...customNotes];
                        updatedNotes[index].note = e.target.value;
                        setCustomNotes(updatedNotes);
                      }}
                      placeholder='Enter note...'
                      className={`min-h-[60px] resize-none bg-white`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-center'>
              <Button
                className='px-24 py-6 text-lg bg-primary hover:bg-accent'
                onClick={updateStatusDetails}
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
