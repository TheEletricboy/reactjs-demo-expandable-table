import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type TOverlay = {
  id: string;
  /** Function with optional access to `removeOverlay` to be used within the ReactNode's onClick */
  content: (removeOverlay: () => void) => React.ReactNode;
  label?: string;
  isVisible: boolean;
  type?: string;
  /** Gets called at the end of `removeOverlay` and `clearAllOverlays`. Also has the overlay `id`in case it's needed */
  onClose?: (id?: string) => void;
  props?: Record<string, any>;
}

type TOverlayContext = {
  overlays: TOverlay[];
  topOverlay: TOverlay | undefined,
  addOverlay: (overlay: TOverlay) => void;
  removeOverlay: (id: string) => void;
  clearAllOverlays: (executeAllOnClose?: boolean) => void;
}

export const OverlayContext = createContext<TOverlayContext | null>(null);

const defaultOverlays: TOverlay[] = [];

export const OverlayContextProvider = ({children}: {children: React.ReactNode}) => {
  const [overlays, setOverlays] = useState<TOverlay[]>(defaultOverlays);
  const topOverlay = useMemo(() => overlays
    .slice()
    .reverse()
    .find((overlay) => overlay.isVisible), [overlays],
  );

  const addOverlay = useCallback((overlay: TOverlay) => setOverlays(prevState => [...prevState, overlay]), [setOverlays]);

  const removeOverlay = useCallback((id: string) => {
    setOverlays(prevState => prevState.filter((overlay) => overlay.id !== id));
    const overlay = overlays.find(overlay => overlay.id === id);
    overlay?.onClose?.(overlay.id);
  }, [overlays]);

  const clearAllOverlays = useCallback((executeAllOnClose = false) => {
    if(executeAllOnClose) {
      overlays.forEach((overlay) => overlay.onClose?.(overlay.id));
    }
    setOverlays(defaultOverlays);
  }, [overlays]);

  const value = useMemo(() => {
    return ({
      overlays,
      topOverlay,
      addOverlay,
      removeOverlay,
      clearAllOverlays,
    });
  }, [overlays, topOverlay, addOverlay, removeOverlay, clearAllOverlays]);

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
