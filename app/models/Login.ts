import Realm, { BSON } from 'realm';

export class Login extends Realm.Object {
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