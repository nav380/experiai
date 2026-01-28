import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, icons } from 'lucide-react';

/**
 * Country Carousel Component - Swipeable carousel for target countries
 * Mobile-friendly with touch support and arrow navigation
 */
export default function CountryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const countries = [
    { name: 'UAE', icon: 'https://flagsapi.com/AE/flat/64.png', description: 'Leading digital innovation hub' },
    { name: 'Saudi Arabia', icon: 'https://flagsapi.com/SA/flat/64.png', description: 'Vision 2030 transformation' },
    { name: 'India', icon: 'https://flagsapi.com/IN/flat/64.png', description: 'Largest AI talent pool' },
    { name: 'Australia', icon: 'https://flagsapi.com/AU/flat/64.png', description: 'Tech-forward economy' },
    { name: 'Uzbekistan', icon: 'https://flagsapi.com/UZ/flat/64.png', description: 'Emerging tech market' },
    { name: 'Georgia', icon: 'https://flagsapi.com/GE/flat/64.png', description: 'Growing startup ecosystem' },
    { name: 'Latvia', icon: 'https://flagsapi.com/LV/flat/64.png', description: 'Digital innovation leader' },
    { name: 'Armenia', icon: 'https://flagsapi.com/AM/flat/64.png', description: 'Tech talent hub' },
    { name: 'Bhutan', icon: 'https://flagsapi.com/BT/flat/64.png', description: 'Sustainable development focus' },
    { name: 'Nepal', icon: 'https://flagsapi.com/NP/flat/64.png', description: 'Emerging digital market' },

  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 5,
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, countries.length - itemsToShow);

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
    setDragOffset(0);
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - startX;
    setDragOffset(offset);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    const offset = e.clientX - startX;

    if (Math.abs(offset) > 50) {
      if (offset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - startX;
    setDragOffset(offset);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    const offset = e.changedTouches[0].clientX - startX;

    if (Math.abs(offset) > 50) {
      if (offset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragOffset(0);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsToShow)}% + ${dragOffset}px))`,
            }}
          >
            {countries.map((country, idx) => (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="p-3 md:p-4 lg:p-6 mx-1 md:mx-2 lg:mx-3 bg-card border border-border rounded-sm hover:border-primary transition-all duration-300 text-center h-full">
                  <div className="text-5xl md:text-6xl lg:text-7xl mb-3 md:mb-4"><img src={country.icon} className='mx-auto'/></div>
                  <p className="text-foreground font-semibold text-sm md:text-base mb-2">{country.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{country.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 p-2 bg-primary text-background rounded-full hover:bg-accent transition-colors"
            aria-label="Previous countries"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>
        )}

        {currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 p-2 bg-primary text-background rounded-full hover:bg-accent transition-colors"
            aria-label="Next countries"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>
        )}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6 md:mt-8">
        {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                ? 'bg-primary w-8'
                : 'bg-border w-2 hover:bg-muted-foreground'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
