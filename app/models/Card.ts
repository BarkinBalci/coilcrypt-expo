import Realm, { BSON } from 'realm';

export interface typeCard {
    _id: BSON.ObjectId;
    userId: string;
    iv: string;
    type: string;
    name: string;
    ownerName?: string;
    number?: string;
    expirationDate?: string;
    cvv?: string;
    favorite: boolean;
    repromt: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Card extends Realm.Object implements typeCard {
    _id: BSON.ObjectId = new BSON.ObjectId();
    userId!: string;
    iv: string;
    type: string = 'card';
    name!: string;
    ownerName?: string;
    number?: string;
    expirationDate?: string;
    cvv?: string;
    favorite: boolean = false;
    repromt: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    static primaryKey = '_id';
}