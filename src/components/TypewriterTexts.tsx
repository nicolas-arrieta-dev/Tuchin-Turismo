import React, { useEffect, useState } from 'react';

interface TypewriterTextsProps {
  texts: string[];
  speed?: number;
  className?: string;
}

const TypewriterTexts: React.FC<TypewriterTextsProps> = ({ texts, speed = 100, className }) => {
  const [index, setIndex] = useState(0); // Frase actual
  const [subIndex, setSubIndex] = useState(0); // Letras escritas
  const [forward, setForward] = useState(true); // Escribiendo o borrando
  const [delay, setDelay] = useState(false); // Pausa después de escribir

  useEffect(() => {
    if (delay) return;

    const timeout = setTimeout(() => {
      if (forward) {
        if (subIndex < texts[index].length) {
          setSubIndex((prev) => prev + 1);
        } else {
          setDelay(true);
          setTimeout(() => {
            setForward(false);
            setDelay(false);
          }, 1500); // Tiempo de pausa al final de la frase
        }
      } else {
        if (subIndex > 0) {
          setSubIndex((prev) => prev - 1);
        } else {
          setForward(true);
          setIndex((prev) => (prev + 1) % texts.length); // Pasa a la siguiente frase
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, forward, index, texts, speed, delay]);

  return (
    <p className={className}>
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </p>
  );
};

export default TypewriterTexts;
