import Realm, { BSON } from 'realm';

export class Note extends Realm.Object {
    _id: BSON.ObjectId = new BSON.ObjectId();
    userId!: string;
    iv: string;
    type: string = 'note';
    
    name!: string;
    content: string;

    favorite: boolean = false;
    repromt: boolean = false;

    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    static primaryKey = '_id';
}