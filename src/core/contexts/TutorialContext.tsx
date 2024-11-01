import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { userPreferencesKeyLocalStorage } from "../utils/constants";

type TTutorialStep = {
  targetRef: React.RefObject<HTMLElement>;
  content: React.ReactNode;
}

type TTutorialContext = {
  isTutorialActive: boolean;
  currentStepIndex: number;
  steps: TTutorialStep[];
  startTutorial: (tutorialSteps: TTutorialStep[]) => void;
  nextStep: () => void;
} | {};

const TutorialContext = createContext<TTutorialContext | null>(null);

export const TutorialContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<TTutorialStep[]>([]);

  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem(userPreferencesKeyLocalStorage) || '{}');
    const hasCompletedTutorial = savedPrefs.hasCompletedTutorial ?? false;
    setIsTutorialActive(hasCompletedTutorial);
  }, []);

  const startTutorial = useCallback((tutorialSteps: TTutorialStep[]) => {
    setSteps(tutorialSteps);
    setCurrentStepIndex(0);
    setIsTutorialActive(true);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsTutorialActive(false);
      const savedPrefs = JSON.parse(localStorage.getItem(userPreferencesKeyLocalStorage) || '{}');
      localStorage.setItem(
        userPreferencesKeyLocalStorage,
        JSON.stringify({
          ...savedPrefs,
          hasCompletedTutorial: true,
        }),
      );
    }
  }, [currentStepIndex, steps.length]);

  const value = useMemo(() => ({
    isTutorialActive,
    currentStepIndex,
    steps,
    startTutorial,
    nextStep,
  }), [currentStepIndex, isTutorialActive, nextStep, startTutorial, steps]);

  return (
    <TutorialContext.Provider value={value} >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorialContext = () => {
  const context = useContext(TutorialContext);
  if (!context) throw new Error("No TutorialContext provider found, please check.");
  return context;
};
