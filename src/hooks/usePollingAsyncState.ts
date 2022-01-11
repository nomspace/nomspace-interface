import { useCallback, useEffect, useState } from "react";

export function usePollingAsyncState<T>(
  initialState: T,
  pollDelay: number,
  asyncGetter: () => Promise<T> | undefined
): [T, () => void] {
  const [state, setState] = useState<T>(initialState);
  const fn = useCallback(() => {
    asyncGetter()
      ?.then((v) => {
        setState(v);
      })
      .catch(console.warn);
  }, [asyncGetter]);
  useEffect(() => {
    fn();
    const timer = setInterval(fn, pollDelay);
    return () => {
      clearInterval(timer);
    };
  }, [asyncGetter, fn, pollDelay]);

  // TODO: Dummy refetch for now
  return [state, () => {}];
}
