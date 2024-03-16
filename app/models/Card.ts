import Realm, { BSON } from 'realm';

export class Card extends Realm.Object {
    _id: BSON.ObjectId = new BSON.ObjectId();
    userId!: string;
    type: string = 'card';

    name!: string;
    ownerName: string;
    number: string;
    expirationDate: string;
    cvv: string;

    favorite: boolean = false;
    repromt: boolean = false;

    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    static primaryKey = '_id';
}