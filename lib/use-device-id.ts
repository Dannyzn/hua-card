"use client";

import { useSyncExternalStore } from "react";

const KEY = "hua-device-id";

/** 模块级缓存，避免 hydration 首帧与服务端不一致 */
let cachedClientId = "";

function ensureClientId(): string {
  if (typeof window === "undefined") return "";
  if (!cachedClientId) {
    let v = localStorage.getItem(KEY);
    if (!v) {
      v = crypto.randomUUID();
      localStorage.setItem(KEY, v);
    }
    cachedClientId = v;
  }
  return cachedClientId;
}

/**
 * 首帧在客户端也返回 ""（与 getServerSnapshot 一致），随后在 microtask 中写入真实 ID 并触发重渲染。
 */
export function useDeviceId(): string {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      queueMicrotask(() => {
        ensureClientId();
        onStoreChange();
      });
      return () => {};
    },
    () => (typeof window === "undefined" ? "" : cachedClientId),
    () => ""
  );
}
