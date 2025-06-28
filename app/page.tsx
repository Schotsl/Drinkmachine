"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";

const BarcodeScanner = dynamic(() => import("react-qr-barcode-scanner"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  const handleScan = (error: unknown, result?: { text: string }) => {
    if (!result) {
      return;
    }

    router.push(`/overview?shotglass=${result.text}`);
  };

  return (
    <div className={styles.page}>
      <BarcodeScanner width={500} height={500} onUpdate={handleScan} />
    </div>
  );
}
