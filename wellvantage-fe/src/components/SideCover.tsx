import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const SideCover = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className='lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-1/2 bg-primary flex items-center justify-center relative py-12 lg:py-0'>
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-4 left-4 lg:top-8 lg:left-8 text-primary-black hover:bg-primary-foreground/10'
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className='h-6 w-6' />
      </Button>
      <div className='text-center px-4'>
        <div className='mb-6 lg:mb-8 flex justify-center'>
          <div className='w-32 h-32 lg:w-64 lg:h-64 rounded-2xl lg:rounded-[3rem] flex items-center justify-center'>
            <img className='w-full' src='/wellvantage-logo.png' alt='Wellvantage Logo' />
          </div>
        </div>
        <h1 className='text-3xl lg:text-5xl font-bold text-primary-foreground mb-2'>Wellvantage</h1>
      </div>
    </div>
  );
};
