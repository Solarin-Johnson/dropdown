export type TransactionType = "credit" | "debit";

export type Transaction = {
  id: number;
  title: string;
  category: string;
  icon: string;
  amount: number;
  type: TransactionType;
  date: string;
  color: string;
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    title: "X",
    category: "Salary",
    icon: "💸",
    amount: 132434.0,
    type: "credit",
    date: "3 May, 2025",
    color: "#4caf50",
  },
  {
    id: 2,
    title: "Birthday",
    category: "Gifts",
    icon: "🎁",
    amount: 12.0,
    type: "credit",
    date: "12 May, 2025",
    color: "#2196f3",
  },
  {
    id: 3,
    title: "Pizza Hut",
    category: "Restaurants",
    icon: "🍕",
    amount: 22748.08,
    type: "debit",
    date: "13 May, 2025",
    color: "#ff9800",
  },
  {
    id: 4,
    title: "Spotify Premium",
    category: "Subscription",
    icon: "🎵",
    amount: 35344.74,
    type: "debit",
    date: "16 May, 2025",
    color: "#9c27b0",
  },
];
