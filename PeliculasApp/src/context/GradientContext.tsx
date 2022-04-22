import React, {createContext, useState} from 'react';

interface GradientColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: GradientColors;
  prevColors: GradientColors;
  setMainColors: (colors: GradientColors) => void;
  setPrevMainColors: (colors: GradientColors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<GradientColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<GradientColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (colors: GradientColors) => {
    setColors(colors);
  };

  const setPrevMainColors = (colors: GradientColors) => {
    setPrevColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
