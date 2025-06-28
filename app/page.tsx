import styles from "./page.module.css";

import { useParty } from "@/hooks/useParty";

export default function Home() {
  const { data: partyData, isLoading, error } = useParty();

  if (isLoading) {
    return <div className={styles.page}>Loading parties...</div>;
  }

  if (error) {
    return (
      <div className={styles.page}>Error loading parties: {error.message}</div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Parties</h1>

      <ul>
        <li key={partyData?.uuid}>{JSON.stringify(partyData)}</li>
      </ul>
    </div>
  );
}
