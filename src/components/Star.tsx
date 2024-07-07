import React from 'react';

interface StarProps {
  filled: boolean;
  onClick: () => void;
  isHovered: boolean;
  selected: boolean;
  ratingSelected: boolean;
}

const Star: React.FC<StarProps> = React.memo(({
  filled,
  onClick,
  isHovered,
  selected,
  ratingSelected,
}) => {
  const getClassNames = () => {
    let classNames = 'relative w-10 h-10 flex justify-center items-center';
    if (!ratingSelected) classNames += ' cursor-pointer';
    if (isHovered) classNames += ' bg-[#7B61FF] bg-opacity-20 rounded-full';
    return classNames;
  };

  return (
    <button
      className={getClassNames()}
      onClick={onClick}
      disabled={ratingSelected}
      aria-label={selected ? 'Selected star' : 'Star'}
    >
      <svg
        className="w-8 h-8"
        fill={selected ? '#FF61B6' : filled ? '#7B61FF' : 'none'}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2.14298L20.0059 9.73562L20.2354 10.1705L20.7199 10.2543L29.1788 11.7179L23.1957 17.8741L22.853 18.2267L22.923 18.7134L24.145 27.2106L16.4412 23.4226L16 23.2057L15.5588 23.4226L7.85505 27.2106L9.07703 18.7134L9.14702 18.2267L8.80432 17.8741L2.82119 11.7179L11.2801 10.2543L11.7646 10.1705L11.9941 9.73562L16 2.14298Z"
          stroke={selected ? '#FF61B6' : ratingSelected ? '#E0E0E0' : '#7B61FF'}
          strokeWidth="2"
        />
      </svg>
    </button>
  );
});

export default Star;
