"use client";

import styles from "../page.module.css";

import { Suspense } from "react";
import { useParty } from "@/hooks/useParty";
import { useShotglass } from "@/hooks/useShotglass";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const params = useSearchParams();
  const shotglass = params.get("shotglass")!;

  const { data: partyData } = useParty();
  const { data: shotglassData } = useShotglass({ uuid: shotglass });

  return (
    <div className={styles.page}>
      <p style={{ fontSize: "18px", margin: "10px 0" }}>
        {JSON.stringify(partyData)}
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
