import { TProject } from "../types/Project";

export const ApiMockResponse: TProject[] = [
  {
    id: 197649569934,
    title: "MyProject",
    description: "Project description",
    boards: [
      {
        id: 1,
        title: "QUEUE",
        cards: [
          {
            id: 1,
            title: "task #1",
            // labels: [{ color: "#cf61a1", text: "Urgent" }],
            date: "2023-10-10",
            creationDate: "2023-09-30",
            tasks: [
              {
                id: 5,
                completed: true,
                text: "subtask #1",
              },
              {
                id: 6,
                completed: true,
                text: "subtask #2",
              },
              {
                id: 7,
                completed: true,
                text: "subtask #3",
              },
            ],
            desc: "task #1 description",
            comments: [],
          },
          {
            id: 2,
            title: "task #2",
            // labels: [{ color: "#1ebffa", text: "Frontend" }],
            date: "",
            creationDate: "2023-09-27",
            tasks: [],
            comments: [
              {
                id: 1,
                text: "my first comment",
                related: [{ id: 2, text: "related comment" }],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "DEVELOPMENT",
        cards: [
          {
            id: 3,
            title: "task #3",
            // labels: [{ color: "#9975bd", text: "Database" }],
            date: "",
            creationDate: "2023-09-28",
            tasks: [{ id: 8, completed: false, text: "subtask #4" }],
            comments: [],
          },
        ],
      },
      {
        id: 3,
        title: "DONE",
        cards: [
          {
            id: 4,
            title: "task #4",
            // labels: [{ color: "#8da377", text: "figma" }],
            date: "2023-09-28",
            creationDate: "2023-09-29",
            tasks: [],
            comments: [],
          },
        ],
      },
    ],
  },
];
