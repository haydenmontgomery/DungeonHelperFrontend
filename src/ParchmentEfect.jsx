import React, { useEffect, useRef } from 'react';
import './ParchmentEffect.scss';


const ParchmentEffect = () => {
  const parchmentRef = useRef(null);

  useEffect(() => {
    const updateParchmentHeight = () => {
      if (parchmentRef.current) {
        parchmentRef.current.style.height = `${document.body.scrollHeight}px`;
      }
    };

    updateParchmentHeight();
    window.addEventListener('resize', updateParchmentHeight);

    return () => {
      window.removeEventListener('resize', updateParchmentHeight);
    };
  }, []);

  return (
    <>
      <div id="parchment" ref={parchmentRef}></div>
      <svg>
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
    </>
  );
};

export default ParchmentEffect;
