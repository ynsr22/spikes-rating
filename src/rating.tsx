import React, { useState, useRef } from 'react';
import Star from './components/Star';
import ResetButton from './components/Reset';
import './index.css';

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [Hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rating !== null) return; // Don't update hover state if rating is selected
    if (!containerRef.current) return;
  
    const stars = containerRef.current.children;
    if (stars.length === 0) return; // Ensure stars are present
  
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
  
    const firstStarLeft = stars[0].getBoundingClientRect().left - containerRect.left;
    const lastStarRight = stars[stars.length - 1].getBoundingClientRect().right - containerRect.left;
  
    // Check if the mouse is outside the stars area
    if (x < firstStarLeft || x > lastStarRight) {
      setHover(null);
      return;
    }
  
    for (let i = 0; i < stars.length; i++) {
      const starRect = stars[i].getBoundingClientRect();
      const starLeftEdge = starRect.left - containerRect.left;
      const starRightEdge = starRect.right - containerRect.left;
  
      // Calculate the midpoint between current star and next star (or current star's right edge if it's the last star)
      const nextStarLeftEdge = i < stars.length - 1 
        ? stars[i + 1].getBoundingClientRect().left - containerRect.left
        : starRightEdge;
      const transitionPoint = (starRightEdge + nextStarLeftEdge) / 2;
  
      if (x >= starLeftEdge && x <= transitionPoint) {
        setHover(i + 1);
        return;
      }
    }
  };  

  const handleClick = (star: number): void => {
    if (rating === null) {
      setRating(star);
    }
  };

  return (
<div className="relative shadow bg-[#FFFFFF] rounded-md w-[353px] h-[326px] border border-[#E0E0E0] text-center">
<div>
        <button
          className="absolute top-[24px] right-[24px] flex items-center justify-center w-[32px] h-[32px] hover:bg-[#F2F2F2] hover:rounded-[4px]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => {
            setRating(null);
            setHover(null);
          }}
        >
          <ResetButton hovering={Hovering} />
        </button>
      </div>
  <h2 className="absolute top-[72px] px-[24px] left-0 right-0 text-[#333333] font-montserrat font-[600] text-[24px] leading-[31.2px]">
    Quel note donnerais-tu à ce challenge ?
  </h2>

      <p className="relative mt-[150px] px-[24px] font-montserrat font-[400] text-[16px] leading-[24px] text-[#333333]">
        Bon j'espère que tu vas mettre 5 évidemment, si ce n'est pas le cas viens me dire pourquoi !
      </p>
      <div
        ref={containerRef}
        className="relative flex top-[24px] justify-center space-x-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => rating === null && setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= (rating || hover || 0)}
            selected={star <= (rating || 0)}
            onClick={() => handleClick(star)}
            isHovered={star === hover && rating === null}
            ratingSelected={rating !== null}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;