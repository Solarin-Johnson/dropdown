export type TransactionType = "credit" | "debit";

type Transaction = {
  id: number;
  title: string;
  category: string;
  icon: string;
  amount: number;
  type: TransactionType;
  date: string; // ISO format
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    title: "X",
    category: "Salary",
    icon: "💸",
    amount: 132434.0,
    type: "credit",
    date: "2023-10-03",
  },
  {
    id: 2,
    title: "Birthday",
    category: "Gifts",
    icon: "🎁",
    amount: 12.0,
    type: "credit",
    date: "2023-09-29",
  },
  {
    id: 3,
    title: "Pizza Hut",
    category: "Restaurants",
    icon: "🍕",
    amount: 22748.08,
    type: "debit",
    date: "2023-09-26",
  },
  {
    id: 4,
    title: "Spotify Premium",
    category: "Subscription",
    icon: "🎵",
    amount: 35344.74,
    type: "debit",
    date: "2023-09-08",
  },
];
