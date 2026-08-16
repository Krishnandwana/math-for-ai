"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/lib/progress-store";

export default function ProgressHydrator() {
  useEffect(() => {
    useProgressStore.persist.rehydrate();
  }, []);
  return null;
}
