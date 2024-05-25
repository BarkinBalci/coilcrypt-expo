import Realm, { BSON } from 'realm';

export interface typeLogin {
    _id: BSON.ObjectId;
    userId: string;
    iv: string;
    type: string;
    passwordHistory: string[];
    name: string;
    url?: string;
    username?: string;
    password?: string;
    favorite: boolean;
    repromt: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Login extends Realm.Object implements typeLogin {
    _id: BSON.ObjectId = new BSON.ObjectId();
    userId!: string;
    iv: string;
    type: string = 'login';
    passwordHistory: string[] = [];
    name!: string;
    url?: string;
    username?: string;
    password?: string;
    favorite: boolean = false;
    repromt: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    static primaryKey = '_id';
}