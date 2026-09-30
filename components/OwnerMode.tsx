"use client";

import { useEffect } from "react";
import { syncOwnerParam } from "@/lib/owner";

export function OwnerMode() {
  useEffect(() => {
    syncOwnerParam();
  }, []);
  return null;
}
