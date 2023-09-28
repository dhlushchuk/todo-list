import { FC, MouseEvent } from "react";
import formatDate from "../../helpers/formatDate";
import { TCard } from "../../types/Project";
import CardInfoModal from "../card-info-modal/CardInfoModal";
import { useNavigate, useParams } from "react-router-dom";
import RoundButton from "../ui-kit/button/RoundButton";
import TrashCanIcon from "../../assets/icons/TrashCan";

import "./TaskCard.styles.scss";

interface CardProps {
  card: TCard;
  boardId: number;
  removeCard: (
    e: MouseEvent<HTMLButtonElement>,
    boardId: number,
    cardId: number
  ) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragStart: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: TCard) => void;
}

const TaskCard: FC<CardProps> = (props) => {
  const {
    card,
    boardId,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
    onDragStart,
  } = props;

  const navigate = useNavigate();
  const { id, title, desc, date, tasks } = card;

  const params = useParams();

  return (
    <>
      {Number(params.cardId) === id && (
        <CardInfoModal
          onClose={() => navigate("/project/" + params.id)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        key={card.id}
        draggable
        onDragStart={() => onDragStart(boardId, id)}
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => navigate("/project/" + params.id + "/card/" + id)}
      >
        <div className="card-top">
          <div
            className="card-title"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          <div className="card-delete-button">
            <RoundButton onClick={(e) => removeCard(e, boardId, id)}>
              <TrashCanIcon width="16" height="16" color="red" />
            </RoundButton>
          </div>
        </div>
        <div>
          <p title={desc}></p>
        </div>
        <div className="card-footer">
          {date && <p className="card-footer-item">{formatDate(date)}</p>}
          {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
