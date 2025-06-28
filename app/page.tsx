import supabase from "@/utils/supabase";
import styles from "./page.module.css";

export default async function Home() {
  const loadParty = async () => {
    const { data, error } = await supabase.from("party").select("*");
    if (error) {
      console.error(error);
    }
    console.log(data);
  };

  console.log(await loadParty());
  return <div className={styles.page}></div>;
}
