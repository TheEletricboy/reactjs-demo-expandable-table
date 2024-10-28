import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type TOverlay = {
  id: string;
  content: React.ReactNode;
  label?: string;
  isVisible: boolean;
  type?: string;
  onClose?: () => void;
  props?: Record<string, any>;
}

type TOverlayContext = {
  overlays: TOverlay[];
  topOverlay: TOverlay | undefined,
  addOverlay: (overlay: TOverlay) => void;
  removeOverlay: (id: string) => void;
  clearAllOverlays: () => void;
}

export const OverlayContext = createContext<TOverlayContext | null>(null);

export const OverlayContextProvider = ({children}: {children: React.ReactNode}) => {
  const [overlays, setOverlays] = useState<TOverlay[]>([]);
  const topOverlay = useMemo(() => overlays.slice().reverse().find((overlay) => overlay.isVisible), [overlays]);

  const addOverlay = useCallback((overlay: TOverlay) => setOverlays(prevState => [...prevState, overlay]), [setOverlays]);

  const removeOverlay = useCallback((id: string) => {
    setOverlays(prevState => prevState.filter((overlay) => overlay.id !== id));
    const overlay = overlays.find(overlay => overlay.id === id);
    overlay?.onClose?.();
  }, [setOverlays]);

  const clearAllOverlays = useCallback(() => {
    overlays.forEach((overlay) => overlay.onClose && overlay.onClose());
    setOverlays([]);
  }, [setOverlays]);

  const value = useMemo(() => {
    return ({
      overlays,
      topOverlay,
      addOverlay,
      removeOverlay,
      clearAllOverlays,
    });
  }, [overlays, addOverlay, removeOverlay, clearAllOverlays]);

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
