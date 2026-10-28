"use client";

import { useSyncExternalStore } from "react";

/**
 * Tutorial progress: which steps the reader has ticked off.
 * Stored in localStorage (per browser) and shared between components through a custom event.
 */
const KEY = "keploy-go-tutorial:done-steps";
const EVENT = "keploy-progress-change";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

let cache: string[] | null = null;
let cacheRaw: string | null = null;

function snapshot(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw !== cacheRaw || cache === null) {
    cacheRaw = raw;
    cache = read();
  }
  return cache;
}

const EMPTY: string[] = [];
function serverSnapshot(): string[] {
  return EMPTY;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useDoneSteps(): string[] {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

export function setStepDone(id: string, done: boolean) {
  const current = new Set(read());
  if (done) current.add(id);
  else current.delete(id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...current]));
  } catch {
    /* storage unavailable: progress simply won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function resetSteps() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}
