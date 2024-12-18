import { IUser } from "./auth-context";

export interface IFile {
    id: Number;
    title: string;
    content: string;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}