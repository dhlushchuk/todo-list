import { FC, MouseEvent } from "react";
import TaskCard from "../task-card/TaskCard";
import CustomInput from "../input-component/InputComponent";
import { TBoard, TCard } from "../../types/Project";

import "./BoardItem.styles.scss";

interface BoardProps {
  board: TBoard;
  addCard: (boardId: number, title: string) => void;
  removeCard: (
    e: MouseEvent<HTMLButtonElement>,
    boardId: number,
    cardId: number
  ) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragStart: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  onDragBoardEnter: (boardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: TCard) => void;
  onDropCard: () => void;
}

const Board: FC<BoardProps> = (props) => {
  const {
    board,
    addCard,
    removeCard,
    onDragEnd,
    onDragBoardEnter,
    onDragStart,
    onDragEnter,
    updateCard,
    onDropCard,
  } = props;
  return (
    <div
      className="board"
      onDragEnd={() => onDropCard()}
      onDragEnter={() => onDragBoardEnter(board.id)}
    >
      <div className="board-inner" key={board?.id}>
        <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
        </div>
        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <TaskCard
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value: string) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
