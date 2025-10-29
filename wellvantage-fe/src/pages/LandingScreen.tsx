import { JSX, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const carouselSlides = [
  {
    image: '/image.png',
    text: 'More Members, More Revenue. Smarter Gym Management.',
  },
  {
    image: '/image2.png',
    text: 'Transform Your Gym with Powerful Management Tools.',
  },
  {
    image: '/image3.png',
    text: 'Streamline Operations and Boost Member Engagement.',
  },
];

export const LandingScreen = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`bg-white w-screen h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <section
        className={`${
          isMobile ? 'w-full h-1/2' : 'w-1/2  h-full'
        } relative flex items-center justify-center`}
      >
        <img
          className='h-full w-full object-cover transition-opacity duration-500'
          alt='Gym management'
          src={carouselSlides[currentSlide].image}
        />

        <div
          className='absolute top-[43px] left-[27px] right-[27px] font-medium text-white text-[37px] text-center tracking-[0] leading-[normal] px-4'
          style={{ textShadow: '1px 1px black' }}
        >
          {carouselSlides[currentSlide].text}
        </div>

        <div className='absolute bottom-[49px] left-1/2 -translate-x-1/2 flex gap-3.5'>
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${
                currentSlide === index ? 'bg-[#28a745]' : 'bg-[#d9d9d9]'
              } w-[21px] h-[21px] rounded-[10.5px] transition-colors cursor-pointer hover:opacity-80`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section
        className={`${
          isMobile ? 'w-full pt-4' : 'w-1/2 '
        } h-full flex flex-col items-center justify-center gap-8 px-8`}
      >
        <div className='flex flex-col items-center gap-2'>
          <div className='font-bold text-[#28a745] text-[40px] text-center tracking-[0] leading-[35px] whitespace-nowrap'>
            Welcome to
          </div>

          <div className='flex items-center gap-4'>
            <div className='w-[72px] h-[69px] bg-[url(/wellvantage-logo.png)] bg-contain' />
            <div className='font-semibold text-[#333333] text-[34px] tracking-[0] leading-[normal]'>
              Wellvantage
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            navigate('/signup');
          }}
          className="w-full max-w-[393px] h-[55px] bg-[#28a745] hover:bg-[#218838] rounded-[15px] [font-family:'Roboto_Flex',Helvetica] font-semibold text-white text-[25px] tracking-[0] leading-[normal]"
        >
          Gym Owner - Sign Up
        </Button>
      </section>
    </div>
  );
};
