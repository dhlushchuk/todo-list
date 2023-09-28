import { FC, useEffect, useState, MouseEvent } from "react";
import {
  getProjectFromLocalStorage,
  updateLocalStorageCurrentProject,
} from "../api";
import { TBoard, TCard } from "../types/Project";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { setBoards, setCurrentProject } from "../redux/project/project.actions";
import BoardItem from "../components/board-item/BoardItem";
import { RootState } from "../redux/rootReducer";
import { useParams } from "react-router-dom";

import "../styles/Board.styles.scss";

const projectSelector = (state: RootState) => state.project;

const Board: FC = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useAppSelector(projectSelector);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const project = getProjectFromLocalStorage(Number(params.id));
      if (project) dispatch(setCurrentProject(project));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    params.cardId
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [params.cardId]);

  const [targetBoard, setTargetBoard] = useState({
    boardId: 0,
  });

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const [draggableCard, setDraggableCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const addCardHandler = (boardId: number, title: string) => {
    const boardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === boardId
    );
    if (boardIndex < 0) return;

    const tempBoardsList = [...currentProject.boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      creationDate: Date.now(),
      date: "",
      tasks: [],
      desc: "",
    });
    dispatch(setBoards(tempBoardsList));
  };

  const removeCard = (
    e: MouseEvent<HTMLButtonElement>,
    boardId: number,
    cardId: number
  ) => {
    e.stopPropagation();
    const boardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === boardId
    );
    if (boardIndex < 0) return;

    const tempBoardsList = [...currentProject.boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item: TCard) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    dispatch(setBoards(tempBoardsList));
  };

  const updateCard = (boardId: number, cardId: number, card: TCard) => {
    const boardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === boardId
    );
    if (boardIndex < 0) return;

    const tempBoardsList = [...currentProject.boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item: TCard) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    dispatch(setBoards(tempBoardsList));
  };

  const onDragEnd = (boardId: number, cardId: number) => {
    const sourceBoardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === boardId
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = currentProject.boards[
      sourceBoardIndex
    ]?.cards?.findIndex((item: TCard) => item.id === cardId);
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === targetCard.boardId
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = currentProject.boards[
      targetBoardIndex
    ]?.cards?.findIndex((item: TCard) => item.id === targetCard.cardId);
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...currentProject.boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );
    dispatch(setBoards(tempBoardsList));

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId,
      cardId,
    });
  };

  const onDragBoardEnter = (boardId: number) => {
    if (targetBoard.boardId === boardId) return;
    setTargetBoard({
      boardId,
    });
  };

  const onDragStart = (boardId: number, cardId: number) => {
    setDraggableCard({
      boardId,
      cardId,
    });
  };

  const dropCardHandler = () => {
    const sourceBoardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === draggableCard.boardId
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = currentProject.boards[
      sourceBoardIndex
    ]?.cards?.findIndex((item: TCard) => item.id === draggableCard.cardId);
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = currentProject.boards.findIndex(
      (item: TBoard) => item.id === targetBoard.boardId
    );
    if (targetBoardIndex < 0) return;

    const tempBoardsList = [...currentProject.boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(0, 0, sourceCard);
    dispatch(setBoards(tempBoardsList));

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });

    setDraggableCard({
      boardId: 0,
      cardId: 0,
    });
  };

  useEffect(() => {
    if (currentProject) updateLocalStorageCurrentProject(currentProject);
  }, [currentProject]);

  return (
    <div className="tasks-container">
      <div className="tasks-card">
        {currentProject?.boards.map((item: TBoard) => (
          <BoardItem
            key={item.id}
            board={item}
            addCard={addCardHandler}
            removeCard={removeCard}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragBoardEnter={onDragBoardEnter}
            updateCard={updateCard}
            onDropCard={dropCardHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
