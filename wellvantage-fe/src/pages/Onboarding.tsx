import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LeftCover } from '@/components/LeftCover';

export default function Onboarding() {
  const { user, completeOnboarding, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    gymName: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    phoneCode: '+91',
    phoneNumber: '',
    agreedToPolicy: false,
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtp, setShowOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    } else if (user.onboarded) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid phone number.',
        variant: 'destructive',
      });
      return;
    }

    setShowOtp(true);
    toast({
      title: 'OTP Sent',
      description: 'A verification code has been sent to your phone.',
    });
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the complete 6-digit OTP.',
        variant: 'destructive',
      });
      return;
    }

    // Mock OTP verification - in real app, verify with backend
    setIsOtpVerified(true);
    toast({
      title: 'Phone Verified',
      description: 'Your phone number has been verified successfully.',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOtpVerified) {
      toast({
        title: 'Phone Verification Required',
        description: 'Please verify your phone number before continuing.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.agreedToPolicy) {
      toast({
        title: 'Privacy Policy Required',
        description: 'Please agree to the privacy policy to continue.',
        variant: 'destructive',
      });
      return;
    }

    completeOnboarding();
    toast({
      title: 'Welcome to Wellvantage!',
      description: 'Your gym profile has been created successfully.',
    });
  };

  if (!user) return null;

  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Panel - Brand - Fixed on desktop */}
      <div className='lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-1/2 bg-primary flex items-center justify-center relative py-12 lg:py-0'>
        <LeftCover onBackClick={signOut} />
      </div>

      {/* Right Panel - Onboarding Form - Scrollable, offset on desktop */}
      <div className='flex-1 lg:ml-[50%] flex items-start justify-center p-4 lg:p-8 bg-background overflow-y-auto'>
        <div className='w-full max-w-xl py-4 lg:py-8'>
          <div className='text-center mb-6 lg:mb-8'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-2'>Details</h2>
            <p className='text-lg font-semibold text-foreground mb-3'>
              Let's build your gym's digital HQ! 🏋️
            </p>
            <p className='text-sm text-muted-foreground'>
              Enter your name, address & contact so we can tailor everything for your business.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4 lg:space-y-6'>
            <div>
              <Label htmlFor='gymName'>Gym Name*</Label>
              <Input
                id='gymName'
                value={formData.gymName}
                onChange={(e) => handleInputChange('gymName', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='firstName'>
                Gym Owner's First Name*
                <span className='block text-xs text-muted-foreground font-normal'>
                  (will have access to all features of the app)
                </span>
              </Label>
              <Input
                id='firstName'
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='lastName'>Last Name*</Label>
              <Input
                id='lastName'
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='addressLine1'>Address Line 1*</Label>
              <Input
                id='addressLine1'
                value={formData.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='addressLine2'>Address Line 2*</Label>
              <Input
                id='addressLine2'
                value={formData.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='city'>City*</Label>
              <Input
                id='city'
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='state'>State*</Label>
              <Input
                id='state'
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label htmlFor='country'>Country*</Label>
              <Input
                id='country'
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
                className='mt-1.5'
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <div className='flex gap-2 mt-1.5'>
                <Select
                  value={formData.phoneCode}
                  onValueChange={(value) => handleInputChange('phoneCode', value)}
                  disabled={isOtpVerified}
                >
                  <SelectTrigger className='w-24'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='+91'>+91</SelectItem>
                    <SelectItem value='+1'>+1</SelectItem>
                    <SelectItem value='+44'>+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder='Phone number'
                  className='flex-1'
                  disabled={isOtpVerified}
                />
                {!isOtpVerified && !showOtp && (
                  <Button
                    type='button'
                    onClick={handleVerify}
                    className='bg-accent hover:bg-accent/90'
                  >
                    Verify
                  </Button>
                )}
                {isOtpVerified && (
                  <Button
                    type='button'
                    className='bg-green-600 hover:bg-green-600 cursor-default'
                    disabled
                  >
                    Verified ✓
                  </Button>
                )}
              </div>
            </div>

            {showOtp && !isOtpVerified && (
              <div>
                <Label>Enter OTP</Label>
                <div className='flex gap-2 mt-1.5 justify-center'>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type='text'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className='w-12 h-12 text-center text-lg'
                    />
                  ))}
                </div>
                <div className='flex justify-center mt-4'>
                  <Button
                    type='button'
                    onClick={handleVerifyOtp}
                    className='bg-accent hover:bg-accent/90'
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='privacy'
                checked={formData.agreedToPolicy}
                onCheckedChange={(checked) =>
                  handleInputChange('agreedToPolicy', checked as boolean)
                }
              />
              <label
                htmlFor='privacy'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                I agree to the{' '}
                <a href='#' className='text-primary hover:underline'>
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <Button
              type='submit'
              className='w-full h-12 text-lg bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!isOtpVerified || !formData.agreedToPolicy}
            >
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
