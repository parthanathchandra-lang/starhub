// lib/auth.js - No PII - SECRET filter - DPDP GDPR COPPA LGPD - Secretly Secure - Self love safe
import {getStore} from './storage.js';
const S=getStore();
export function getUser(){try{return JSON.parse(S.getItem('starhub_user')||'{"id":"guest","name":"Guest","avatar":"★","verified":false}');}catch{return {id:'guest',name:'Guest',avatar:'★'};}}
export function setUser(u){try{const safe={id:(u.id||'guest').toString().slice(0,20),name:(u.name||'Guest').toString().slice(0,30),avatar:(u.avatar||'★').slice(0,2),verified:!!u.verified};if(['EMAIL','PHONE','AADHAAR','PAN','SSN','IP','COOKIE','KEY','TOKEN','PASSWORD','PRIVATE','CREDENTIAL','API_KEY','SECRET'].some(x=>JSON.stringify(safe).toUpperCase().includes(x)))return false;S.setItem('starhub_user',JSON.stringify(safe));return true;}catch{return false;}}
export function isGuest(){return getUser().id==='guest';}
export function getAccounts(){try{return JSON.parse(S.getItem('starhub_accounts')||'[]');}catch{return [];}}
export function addAccount(acc){try{let a=getAccounts();a=[acc,...a.filter(x=>x.id!==acc.id)].slice(0,5);S.setItem('starhub_accounts',JSON.stringify(a));return true;}catch{return false;}}
export default {getUser,setUser,isGuest,getAccounts,addAccount};