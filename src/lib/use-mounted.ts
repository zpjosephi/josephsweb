import { useSyncExternalStore } from "react";

// Returns false on the server and on the first client render (matching SSR
// markup), then true after hydration. The lint-clean way to gate
// client-only UI without a setState-in-effect mount flag.
const subscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}
