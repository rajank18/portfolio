import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const TypewriterEffect = ({ words, className = '' }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(word.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <motion.span
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: currentText === words[currentWordIndex] && !isDeleting ? [1, 0.1, 1] : 1,
        }}
        transition={{
          duration: 0.8,
          repeat: currentText === words[currentWordIndex] && !isDeleting ? Infinity : 0,
          repeatDelay: 0.2,
        }}
        className="inline-block w-[2px] h-5 bg-black ml-1"
      />
    </div>
  );
};
