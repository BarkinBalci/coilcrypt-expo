import Realm, { BSON } from 'realm';

export class Vault extends Realm.Object {
    _id: BSON.ObjectId = new BSON.ObjectId();
    userId!: string;
    encKeyValidation: string;

    type: string = 'vault';

    name: string = 'Main';

    static primaryKey = '_id';
}