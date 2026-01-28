import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    { name: 'UAE', flag: '🇦🇪', description: 'Leading digital innovation hub' },
    { name: 'Saudi Arabia', flag: '🇸🇦', description: 'Vision 2030 transformation' },
    { name: 'India', flag: '🇮🇳', description: 'Largest AI talent pool' },
    { name: 'Australia', flag: '🇦🇺', description: 'Tech-forward economy' },
    { name: 'Uzbekistan', flag: '🇺🇿', description: 'Emerging tech market' },
    { name: 'Georgia', flag: '🇬🇪', description: 'Growing startup ecosystem' },
    { name: 'Latvia', flag: '🇱🇻', description: 'Digital innovation leader' },
    { name: 'Armenia', flag: '🇦🇲', description: 'Tech talent hub' },
    { name: 'Bhutan', flag: '🇧🇹', description: 'Sustainable development focus' },
    { name: 'Nepal', flag: '🇳🇵', description: 'Emerging digital market' },
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
                  <div className="text-5xl md:text-6xl lg:text-7xl mb-3 md:mb-4">{country.flag}</div>
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
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
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
