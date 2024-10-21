export interface PanelProgressBarProps {
  progressItems: ProgressItemProps[];
  className?: string;
}

const ActionTypes = Object.freeze({
  SUBMIT: "submit",
  NEXT: "next",
  PREVIOUS: "previous",
})

type ActionTypeKeys = keyof typeof ActionTypes;
export type ActionType = typeof ActionTypes[ActionTypeKeys];

type PropId = "Introduction" | "Experience" | "Qualities" |"PetSize" | "AnimalType" | "BreedType" | "Result";

export interface ProgressItemProps {
  question: string;
  id: PropId,

  actions: ActionType[],
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
  id: number;
  name: string;
  type: string;
  imgUrl: string;
  breed: string;
}