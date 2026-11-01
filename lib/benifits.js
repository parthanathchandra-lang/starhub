// lib/benefits.js - Benefits Solutions Problems - Alternative Sub Combination Circulation Resonance Complement Supporter Booster Helper Guided Safe Legal Privacy Protection Security
export const BENEFITS={
  valid:['free','safe','legal','good','instant','zero-storage','no-gps','no-cookie','secretly-secure','akela','sath','owner-net-off'],
  problems:['virus','threat','xss','injection','malware','gambling','casino','adult','piracy','fake','dead','duplicate','cache','history'],
  solutions:['sanitizer','pii-filter','no-cookie','no-tracking','dpdp','gdpr','coppa','lgpd','contain-strict','will-change','overscroll-none','backdrop-filter','self-clean','dead-link-filter','fakeWords-filter','badWords-filter','backup','rollback','autoHeal','generateReal','shadow-clean','cron','telegram-push','constitution-auto'],
  alternative:{piped:['invidious','piped','piped-video'],searx:['searx','searxng','searx.be'],nitter:['nitter','bibliogram','proxitok'],ffmpeg:['ffmpeg-wasm','mediapipe','webcodecs'],storage:['localStorage','indexedDB','cache','memory-map'],geo:['x-vercel-ip-country','cf-ipcountry','x-country'],ban:['NEW_BAN_*','RANGE_*','constitution.json']},
  sub:{'122+':[122,123,124,125,126,127],'133±':[128,129,130,131,132,133],day:[1,2,3,4,5],week:[1,52],month:[1,12],year:[2026]},
  combination:{minimum:['1 file','60 lines','no heat','60FPS','akela working'],maximum:['72 files','any possibility','100% big platform','sath working'],resonance:['feed+recommendation','auth+storage','law+constitution','search+thumbnail','clean+health','analytics+benefits']},
  circulation:{auto:['autoAddLess','filterEngine','lawAuto','getAll','getStore','checkLaw'],resonance:['forYou->trending->yourTaste->subscriptions','history->watchLater->likes->save->playlist','search->results->watch->details->library']},
  complement:{supporter:['sw.js offline cache','lib/storage.js history','lib/law.js area wise'],booster:['webgpu webnn sanitizer viewTransition popover anchor'],helper:['battery-saver memory-saver conn-saver edge-30 no-gps no-cookie'],guided:['safe legal privacy protection security secretly secure','procedures guided','constitution auto jan laga','teacher beneficial']},
};
export function getBenefits(){return BENEFITS;}
export function getSolutionFor(problem){return BENEFITS.solutions.filter(s=>s.includes(problem.split('')[0])||BENEFITS.problems.includes(problem));}
export default {BENEFITS,getBenefits,getSolutionFor};