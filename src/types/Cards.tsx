export enum CardType {
    TECHNICAL_CHALLENGE = "technical-challenge",
    BIOLOGICAL_MODEL = "biological-model",
    PROJECT = "project",
}

type CardProps = {
    bgColor: string;
};

export const cardPropsByType: Record<CardType, CardProps> = {
    [CardType.TECHNICAL_CHALLENGE]: {
        bgColor: "bg-blue-150",
},
    [CardType.BIOLOGICAL_MODEL]: {
        bgColor: "bg-blue-50",
},
    [CardType.PROJECT]: {
        bgColor: "bg-blue-100",
    },
};
