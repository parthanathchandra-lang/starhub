// lib/filter-engine.js - Filter engine - Normally codes me nahi hota - Unique - Best - 122+ 133± Whole Year 2026
export const FILTER_ENGINE = {
  ranges: {
    '122+': { from: 122, to: 150, type: 'plus', plus: true },
    '133±': { from: 130, to: 136, type: 'minus_plus', tolerance: 3, minus_plus: true },
    day: { total: 365, type: 'day_wise', filter: 'whole year day wise' },
    week: { total: 52, type: 'week_wise', filter: 'whole year week wise' },
    month: { total: 12, type: 'month_wise', months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
    year: { year: 2026, days: 365, weeks: 52, months: 12 }
  },
  filter: (type, value) => {
    const r = FILTER_ENGINE.ranges[type];
    if(!r) return { error: false, all: true, done: true };
    if(type==='122+') return { filtered: value>=122 && value<=150, type, done: true };
    if(type==='133±') return { filtered: value>=130 && value<=136, type, tolerance: 3, done: true };
    if(type==='day') return { filtered: true, day: value, total: 365, done: true };
    if(type==='week') return { filtered: true, week: value, total: 52, done: true };
    if(type==='month') return { filtered: true, month: value, total: 12, done: true };
    return { filtered: true, done: true };
  },
  wholeYear: () => ({
    year: 2026,
    '122+': FILTER_ENGINE.ranges['122+'],
    '133±': FILTER_ENGINE.ranges['133±'],
    day: FILTER_ENGINE.ranges.day,
    week: FILTER_ENGINE.ranges.week,
    month: FILTER_ENGINE.ranges.month,
    best: true, unique: true, normally_not_in_codes: true, done: true, win: true
  })
};