import { Login } from './Login';
import { Identity } from './Identity';
import { Card } from './Card';
import { Note } from './Note';
import { Vault } from './Vault';


export const schemas = [Login, Identity, Note, Card];
export type tLogin = Login & { type: 'login' };
export type tIdentity = Identity & { type: 'identity' };
export type tNote = Note & { type: 'note' };
export type tCard = Card & { type: 'card' };

export type Item = tLogin | tIdentity | tCard | tNote;

export * from './Card';
export * from './Identity';
export * from './Login';
export * from './Note';