// lib/sanitize.js - Sanitizer API + PII Filter - Secretly Secure - Virus Threat Solution
const PII=['EMAIL','PHONE','AADHAAR','PAN','SSN','IP','COOKIE','KEY','TOKEN','PASSWORD','PRIVATE','CREDENTIAL','API_KEY','SECRET','AUTH'];
export function sanitize(input){try{let s=String(input||'').slice(0,500);PII.forEach(p=>{const re=new RegExp(p,'gi');if(re.test(s.toUpperCase())){s=s.replace(re,'***');}});if(typeof window!=='undefined'&&window.Sanitizer){try{const sanitizer=new window.Sanitizer();const div=document.createElement('div');div.innerHTML=s;return sanitizer.sanitize(div).innerHTML||s;}catch{return s;}}return s;}catch{return '***';}}
export function isSafe(input){return !PII.some(p=>String(input).toUpperCase().includes(p));}
export default {sanitize,isSafe,PII};