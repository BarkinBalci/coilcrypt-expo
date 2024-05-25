    import Realm, { BSON } from 'realm';

    export type typeNote = {
        _id: BSON.ObjectId;
        userId: string;
        iv: string;
        type: string;
        name: string;
        content?: string;
        favorite: boolean;
        repromt: boolean;
        createdAt: Date;
        updatedAt: Date;
    };

    export class Note extends Realm.Object implements typeNote {
        _id: BSON.ObjectId = new BSON.ObjectId();
        userId!: string;
        iv: string;
        type: string = 'note';
        name!: string;
        content?: string;
        favorite: boolean = false;
        repromt: boolean = false;
        createdAt: Date = new Date();
        updatedAt: Date = new Date();

        static primaryKey = '_id';
    }