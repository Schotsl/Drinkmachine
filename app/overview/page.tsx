"use client";

import styles from "../page.module.css";

import { Suspense } from "react";
import { useCurrentParty } from "@/hooks/useParty";
import { useShotglass } from "@/hooks/useShotglass";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const params = useSearchParams();
  const shotglass = params.get("shotglass")!;

  const { data: currentParty } = useCurrentParty();
  const { data: shotglassData } = useShotglass({ uuid: shotglass });

  if (!currentParty) {
    return <div>No party found</div>;
  }

  return (
    <div className={styles.page}>
      <p style={{ fontSize: "18px", margin: "10px 0" }}>
        {JSON.stringify(currentParty)}
        {JSON.stringify(shotglassData)}
      </p>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
