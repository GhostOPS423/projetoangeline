import { useEffect, useState } from "react";
import { subscribeStore } from "@/lib/store";

/**
 * Returns an integer that increments any time the local store is mutated
 * (in the current tab via dispatched event, or in another tab via the
 * native `storage` event). Use as a dependency in useEffect to re-read.
 */
export function useStoreSync(): number {
  const [tick, setTick] = useState(0);
  useEffect(() => subscribeStore(() => setTick((t) => t + 1)), []);
  return tick;
}
