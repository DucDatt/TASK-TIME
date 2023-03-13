export interface User{
    displayName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
    uid: string | undefined;
    _id: string;
    createdAt: number;
    updatedAt: number;
}