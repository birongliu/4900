export interface PanelProgressBarProps {
  progressItems: {
    status: "completed" | "incomplete" | "current";
    completedColor: {
      from: `from-[${string}]`;
      to: `to-[${string}]`;
      type?: string;
    };
    question: string;
  }[];
  className?: string;
}

const ActionTypes = Object.freeze({
  SUBMIT: "submit",
  NEXT: "next",
  PREVIOUS: "previous",
});

type ActionTypeKeys = keyof typeof ActionTypes;
export type ActionType = (typeof ActionTypes)[ActionTypeKeys];

type PropId =
  | "Introduction"
  | "Experience"
  | "Qualities"
  | "PetSize"
  | "AnimalType"
  | "BreedType"
  | "Result";

export interface ProgressItemProps {
  question: string;
  id: PropId;

  actions: ActionType[];
  completedColor: {
    from: `from-[${string}]`;
    to: `to-[${string}]`;
  };
  component: (options: OnboardingComponentProps) => React.ReactNode;
  status: "completed" | "incomplete" | "current";
}

export interface OnboardingComponentProps {
  data: string | string[];
  currentItem: ProgressItemProps;
  formData: FormData;
  nextData: { id: PropId; data: string };
  previousData: { id: PropId; data: string };
  handleFormData: (data: string | string[]) => void;
}

export type FormData = {
  [key in PropId]: string;
};

export interface OnboardingResultOptions {
  key: string;
  value: string;
}

export interface Pet {
  userID: string | null;
  id: string;
  isAdopted: boolean;
  name: string;
  breeds: [];
  type: string;
  url: string;
  breed: string;
}

export interface AIOutput {
  id: string;
  type: string;
  breed: string;
  name: string;
  description: string;
  imgUrl: string;
}

export interface PaginationProps {
  id: string;
  name: string;
  url: string;
}
