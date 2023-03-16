import { User } from "src/app/model/user.model";

export interface UserState {
    user: User;
    loading: boolean;
    error: string;
    isCreated: boolean;
}