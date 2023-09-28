import { useEffect, useState } from "react";
import Modal from "../ui-kit/modal/Modal";
import CustomInput from "../input-component/InputComponent";
import { TCard, TComment, TTask } from "../../types/Project";
import TextEditor from "../text-editor/TextEditor";
import { useParams } from "react-router-dom";

import "./CardInfoModal.styles.scss";
import RoundButton from "../ui-kit/button/RoundButton";
import TrashCanIcon from "../../assets/icons/TrashCan";

interface CardInfoProps {
  onClose: () => void;
  card: TCard;
  boardId: number;
  updateCard: (boardId: number, cardId: number, card: TCard) => void;
}

const CardInfoModal = (props: CardInfoProps) => {
  const { onClose, card, boardId, updateCard } = props;
  const [cardValues, setCardValues] = useState<TCard>({
    ...card,
  });

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const params = useParams();

  const addTask = (value: string) => {
    const task: TTask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({
      ...cardValues,
      tasks,
    });
  };

  const addComment = (value: string) => {
    const comment: TComment = {
      id: Date.now() + Math.random() * 2,
      text: value,
      related: [],
    };
    setCardValues({
      ...cardValues,
      comments: [...cardValues.comments, comment],
    });
  };

  const addRelatedComment = (value: string, id: number) => {
    const relatedComment: TComment = {
      id: Date.now() + Math.random() * 2,
      text: value,
    };
    const comment = cardValues.comments.find((comment) => comment.id === id);
    if (comment) {
      comment.related?.push(relatedComment);
      setCardValues({
        ...cardValues,
        comments: [...cardValues.comments],
      });
    }
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);

  return (
    <Modal isShow={Boolean(params.cardId)} close={onClose}>
      <div className="card-info">
        <div className="card-info-box">
          <div className="card-info-box-title">
            <p>Title</p>
          </div>
          <TextEditor
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>
        <div className="card-info-box">
          <div className="card-info-box-title">
            <p>Description</p>
          </div>
          <TextEditor
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>
        <div className="card-info-box">
          <div className="card-info-box-title">
            <p>Start Date</p>
          </div>
          <p>{new Date(cardValues.creationDate).toDateString()}</p>
        </div>
        <div className="card-info-box">
          <div className="card-info-box-title">
            <p>End Date</p>
          </div>
          <input
            title="date"
            type="date"
            defaultValue={cardValues.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>
        <div className="card-info-box">
          <div className="card-info-box-title">
            <p>Tasks</p>
          </div>
          <div className="card-info-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="card-info-box-task-checkbox">
                <input
                  title="task"
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <div className="card-info-box-task-delete-button">
                  <RoundButton onClick={() => removeTask(item.id)}>
                    <TrashCanIcon width="16" height="16" color="red" />
                  </RoundButton>
                </div>
              </div>
            ))}
          </div>
          <CustomInput
            text="Add a Task"
            placeholder="Enter task"
            onSubmit={addTask}
            displayClass="card-info-add-task"
          />
        </div>
        <div className="card-info-box">
          <div className="card-info-box-title">
            <p>Comments</p>
          </div>
          <div>
            {cardValues.comments?.map((item) => (
              <div key={item.id} className="card-info-box-comment">
                <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                <TextEditor
                  text="Reply"
                  placeholder="Enter comment"
                  onSubmit={(value) => addRelatedComment(value, item.id)}
                />
                {item.related?.map(({ id, text }) => (
                  <div
                    className="card-info-box-comment-related"
                    key={id}
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <TextEditor
            text="Add a Comment"
            placeholder="Enter comment"
            onSubmit={addComment}
            displayClass="card-info-add-comment"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CardInfoModal;
