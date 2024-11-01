import { useParams } from "react-router-dom";
import { PropsWithChildren } from "react";
import styles from "./vote.module.css";
// import { sign } from "crypto";

const text = {
  likeKa: "მოწონება",
  likeEn: "Like",
};

export const Vote: React.FC<
  PropsWithChildren<{ voteCount: number; onUpVote: () => void }>
> = ({ voteCount, onUpVote }) => {
  const { lang } = useParams();
  return (
    <div className={styles.cap}>
      {lang === "ka" ? text.likeKa : text.likeEn}: {voteCount}{" "}
      <button style={{ color: "blue", cursor: "pointer" }} onClick={onUpVote}>
        UP
      </button>
    </div>
  );
};

export default Vote;
