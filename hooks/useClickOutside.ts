import { RefObject, useEffect, useRef } from "react";

/**
 *
 * @param handler
 * @returns ref для использования на элементе
 */
const useClickOutside = <T>(handler?: (event: Event) => void): RefObject<T> => {
  const ref = useRef<T>(null);
  const handlerRef = useRef<typeof handler>();
  handlerRef.current = handler;

  useEffect(() => {
    const cb = (event: Event) => {
      const handler = handlerRef.current;
      const parent = ref.current;
      if (
        typeof handler === "function" &&
        event.target instanceof Node &&
        parent instanceof Node &&
        !parent.contains(event.target)
      ) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", cb);

    return () => {
      document.removeEventListener("mousedown", cb);
    };
  }, []);

  return ref;
};

export default useClickOutside;
