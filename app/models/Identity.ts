import Realm, { BSON } from 'realm';

export type typeIdentity = {
    _id: BSON.ObjectId;
    userId: string;
    iv: string;
    type: string;
    name: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: string;
    identityNumber?: string;
    email?: string;
    phone?: string;
    favorite: boolean;
    repromt: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class Identity extends Realm.Object {
    _id: BSON.ObjectId = new BSON.ObjectId();
    userId!: string;
    iv: string;
    type: string = 'identity';

    name!: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: string;
    identityNumber?: string;
    email?: string;
    phone?: string;

    favorite: boolean = false;
    repromt: boolean = false;

    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    static primaryKey = '_id';
}
