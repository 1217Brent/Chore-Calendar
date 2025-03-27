import { Timestamp } from "firebase/firestore";

export default interface Chore {
    id: string;
    chore: string;
    due_date: Timestamp;
    status: boolean;
    user: string;
}

