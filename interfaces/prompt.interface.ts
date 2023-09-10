import { IUser } from "./user.interface";

export interface IPrompt {
   _id: string;
   creator: IUser;
   prompt: string;
   tag: string;
}
