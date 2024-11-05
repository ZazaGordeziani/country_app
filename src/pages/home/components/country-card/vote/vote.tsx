import { useParams } from "react-router-dom";
import { PropsWithChildren } from "react";
import styles from "./vote.module.css";

const text = {
  likeKa: "მოწონება",
  likeEn: "Like",
};

export const Vote: React.FC<
  PropsWithChildren<{
    voteCount: number;
    onUpVote: () => void;
    isDeleted?: boolean;
  }>
> = ({ voteCount, onUpVote, isDeleted = false }) => {
  const { lang } = useParams();

  return (
    <div className={styles.cap}>
      {lang === "ka" ? text.likeKa : text.likeEn}: {voteCount}{" "}
      <button
        style={{ color: "blue", cursor: isDeleted ? "not-allowed" : "pointer" }}
        onClick={onUpVote}
        disabled={isDeleted} // Disable the button if isDeleted is true
      >
        UP
      </button>
    </div>
  );
};

export default Vote;
