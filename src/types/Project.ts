export type TComment = {
  id: number;
  text: string;
  related?: TComment[];
};

export type TTask = {
  id: number;
  completed: boolean;
  text: string;
};

export type TCard = {
  id: number;
  title: string;
  date: string;
  creationDate: string;
  tasks: TTask[];
  desc?: string;
  comments: TComment[];
};

export type TBoard = {
  id: number;
  title: string;
  cards: TCard[];
};

export type TProject = {
  id: number;
  title: string;
  description: string;
  boards: TBoard[];
};
