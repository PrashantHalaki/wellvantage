import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

export const LeftCover = ({ onBackClick }: { onBackClick: () => void }) => {
  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-8 left-8 text-black hover:bg-primary-foreground/10'
        onClick={onBackClick}
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
    </>
  );
};
