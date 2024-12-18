import { IUser } from "./auth-context";

export interface IFile {
    id: Number;
    title: string;
    content: string;
    user: IUser;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}