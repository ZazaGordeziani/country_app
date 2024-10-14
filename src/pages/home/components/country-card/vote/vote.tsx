import { PropsWithChildren } from "react";
import styles from "./vote.module.css";
// import { sign } from "crypto";

export const Vote: React.FC<
  PropsWithChildren<{ voteCount: number; onUpVote: () => void }>
> = ({ voteCount, onUpVote }) => {
  return (
    <div className={styles.cap}>
      Like: {voteCount}{" "}
      <span style={{ color: "blue", cursor: "pointer" }} onClick={onUpVote}>
        UP
      </span>
    </div>
  );
};

export default Vote;
