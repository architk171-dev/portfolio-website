import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number | ((p: number) => number)) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  // The 3D scene is gone, so progress now follows what the hero needs:
  // web fonts and the portrait. A short ramp keeps the loader from flashing.
  useEffect(() => {
    let ready = false;
    const start = performance.now();
    const portrait = new Promise<void>((res) => {
      const img = new Image();
      img.onload = img.onerror = () => res();
      img.src = "/images/archit-pixar.webp";
    });
    Promise.all([document.fonts?.ready ?? Promise.resolve(), portrait]).then(() => {
      ready = true;
    });
    const timer = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / 1400);
      const target = ready ? 100 : Math.min(92, t * 100);
      setLoading((p) => (target > p ? Math.min(target, p + 4) : p));
    }, 40);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    return {
      isLoading: false,
      setIsLoading: () => {},
      setLoading: () => {},
    } as LoadingType;
  }
  return context;
};
