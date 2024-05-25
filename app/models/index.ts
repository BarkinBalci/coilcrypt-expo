import { Login, typeLogin } from './Login';
import { Identity, typeIdentity } from './Identity';
import { Card, typeCard } from './Card';
import { Note, typeNote } from './Note';
import { Vault } from './Vault';


export const schemas = [Login, Identity, Note, Card];
export type ItemType = typeLogin | typeNote | typeCard | typeIdentity;