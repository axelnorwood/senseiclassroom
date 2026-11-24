/* ------------------------------------------------------------------
   Sensei Classroom — item bank
   Add, edit or remove items here. Nothing else needs to change.

   id      unique, never reuse (progress is tracked against it)
   strand  "math" or "phonics"
   skill   groups items that are taught together
   level   1 is the easiest; a level unlocks when 80% of the level
           below it is mastered
   options the order shown is shuffled at runtime
-------------------------------------------------------------------*/

const ITEMS = [

  /* ---------- MATH level 1 — number bonds to 10 ---------- */
  {id:"m1-01", strand:"math", skill:"bonds-10", level:1, prompt:"1 + ? = 10", answer:"9", options:["8","9","11"]},
  {id:"m1-02", strand:"math", skill:"bonds-10", level:1, prompt:"2 + ? = 10", answer:"8", options:["7","8","12"]},
  {id:"m1-03", strand:"math", skill:"bonds-10", level:1, prompt:"3 + ? = 10", answer:"7", options:["6","7","13"]},
  {id:"m1-04", strand:"math", skill:"bonds-10", level:1, prompt:"4 + ? = 10", answer:"6", options:["5","6","14"]},
  {id:"m1-05", strand:"math", skill:"bonds-10", level:1, prompt:"5 + ? = 10", answer:"5", options:["4","5","15"]},
  {id:"m1-06", strand:"math", skill:"bonds-10", level:1, prompt:"6 + ? = 10", answer:"4", options:["3","4","16"]},
  {id:"m1-07", strand:"math", skill:"bonds-10", level:1, prompt:"7 + ? = 10", answer:"3", options:["2","3","17"]},
  {id:"m1-08", strand:"math", skill:"bonds-10", level:1, prompt:"8 + ? = 10", answer:"2", options:["1","2","18"]},
  {id:"m1-09", strand:"math", skill:"bonds-10", level:1, prompt:"9 + ? = 10", answer:"1", options:["0","1","19"]},
  {id:"m1-10", strand:"math", skill:"bonds-10", level:1, prompt:"10 = 6 + ?", answer:"4", options:["3","4","5"]},

  /* ---------- MATH level 2 — adding and taking away within 20 ---------- */
  {id:"m2-01", strand:"math", skill:"within-20", level:2, prompt:"8 + 5", answer:"13", options:["12","13","14"]},
  {id:"m2-02", strand:"math", skill:"within-20", level:2, prompt:"7 + 6", answer:"13", options:["12","13","14"]},
  {id:"m2-03", strand:"math", skill:"within-20", level:2, prompt:"9 + 4", answer:"13", options:["12","13","15"]},
  {id:"m2-04", strand:"math", skill:"within-20", level:2, prompt:"6 + 8", answer:"14", options:["13","14","15"]},
  {id:"m2-05", strand:"math", skill:"within-20", level:2, prompt:"9 + 7", answer:"16", options:["15","16","17"]},
  {id:"m2-06", strand:"math", skill:"within-20", level:2, prompt:"8 + 8", answer:"16", options:["14","16","18"]},
  {id:"m2-07", strand:"math", skill:"within-20", level:2, prompt:"15 − 7", answer:"8", options:["7","8","9"]},
  {id:"m2-08", strand:"math", skill:"within-20", level:2, prompt:"13 − 6", answer:"7", options:["6","7","8"]},
  {id:"m2-09", strand:"math", skill:"within-20", level:2, prompt:"16 − 9", answer:"7", options:["6","7","8"]},
  {id:"m2-10", strand:"math", skill:"within-20", level:2, prompt:"14 − 8", answer:"6", options:["5","6","7"]},
  {id:"m2-11", strand:"math", skill:"within-20", level:2, prompt:"12 − 5", answer:"7", options:["6","7","8"]},
  {id:"m2-12", strand:"math", skill:"within-20", level:2, prompt:"11 − 4", answer:"7", options:["6","7","8"]},

  /* ---------- MATH level 3 — times tables 2, 5 and 10 ---------- */
  {id:"m3-01", strand:"math", skill:"times-2-5-10", level:3, prompt:"2 × 3", answer:"6", options:["5","6","8"]},
  {id:"m3-02", strand:"math", skill:"times-2-5-10", level:3, prompt:"2 × 6", answer:"12", options:["10","12","14"]},
  {id:"m3-03", strand:"math", skill:"times-2-5-10", level:3, prompt:"2 × 7", answer:"14", options:["12","14","16"]},
  {id:"m3-04", strand:"math", skill:"times-2-5-10", level:3, prompt:"2 × 8", answer:"16", options:["14","16","18"]},
  {id:"m3-05", strand:"math", skill:"times-2-5-10", level:3, prompt:"2 × 9", answer:"18", options:["16","18","20"]},
  {id:"m3-06", strand:"math", skill:"times-2-5-10", level:3, prompt:"5 × 3", answer:"15", options:["10","15","20"]},
  {id:"m3-07", strand:"math", skill:"times-2-5-10", level:3, prompt:"5 × 4", answer:"20", options:["15","20","25"]},
  {id:"m3-08", strand:"math", skill:"times-2-5-10", level:3, prompt:"5 × 6", answer:"30", options:["25","30","35"]},
  {id:"m3-09", strand:"math", skill:"times-2-5-10", level:3, prompt:"5 × 8", answer:"40", options:["35","40","45"]},
  {id:"m3-10", strand:"math", skill:"times-2-5-10", level:3, prompt:"5 × 9", answer:"45", options:["40","45","50"]},
  {id:"m3-11", strand:"math", skill:"times-2-5-10", level:3, prompt:"10 × 3", answer:"30", options:["13","30","300"]},
  {id:"m3-12", strand:"math", skill:"times-2-5-10", level:3, prompt:"10 × 4", answer:"40", options:["14","40","400"]},
  {id:"m3-13", strand:"math", skill:"times-2-5-10", level:3, prompt:"10 × 7", answer:"70", options:["17","70","700"]},
  {id:"m3-14", strand:"math", skill:"times-2-5-10", level:3, prompt:"10 × 9", answer:"90", options:["19","90","900"]},

  /* ---------- MATH level 4 — times tables 3 and 4 ---------- */
  {id:"m4-01", strand:"math", skill:"times-3-4", level:4, prompt:"3 × 4", answer:"12", options:["9","12","15"]},
  {id:"m4-02", strand:"math", skill:"times-3-4", level:4, prompt:"3 × 6", answer:"18", options:["15","18","21"]},
  {id:"m4-03", strand:"math", skill:"times-3-4", level:4, prompt:"3 × 7", answer:"21", options:["18","21","24"]},
  {id:"m4-04", strand:"math", skill:"times-3-4", level:4, prompt:"3 × 8", answer:"24", options:["21","24","27"]},
  {id:"m4-05", strand:"math", skill:"times-3-4", level:4, prompt:"3 × 9", answer:"27", options:["24","27","30"]},
  {id:"m4-06", strand:"math", skill:"times-3-4", level:4, prompt:"4 × 4", answer:"16", options:["12","16","20"]},
  {id:"m4-07", strand:"math", skill:"times-3-4", level:4, prompt:"4 × 6", answer:"24", options:["20","24","28"]},
  {id:"m4-08", strand:"math", skill:"times-3-4", level:4, prompt:"4 × 7", answer:"28", options:["24","28","32"]},
  {id:"m4-09", strand:"math", skill:"times-3-4", level:4, prompt:"4 × 8", answer:"32", options:["28","32","36"]},
  {id:"m4-10", strand:"math", skill:"times-3-4", level:4, prompt:"4 × 9", answer:"36", options:["32","36","40"]},

  /* ---------- PHONICS level 1 — blending three sounds ---------- */
  {id:"p1-01", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  c – a – t", answer:"cat", options:["cat","cot","cut"]},
  {id:"p1-02", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  d – o – g", answer:"dog", options:["dog","dig","dug"]},
  {id:"p1-03", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  p – i – n", answer:"pin", options:["pin","pan","pen"]},
  {id:"p1-04", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  b – e – d", answer:"bed", options:["bed","bad","bud"]},
  {id:"p1-05", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  h – a – t", answer:"hat", options:["hat","hot","hit"]},
  {id:"p1-06", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  m – u – g", answer:"mug", options:["mug","mop","map"]},
  {id:"p1-07", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  l – e – g", answer:"leg", options:["leg","log","lug"]},
  {id:"p1-08", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  t – o – p", answer:"top", options:["top","tap","tip"]},
  {id:"p1-09", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  r – u – n", answer:"run", options:["run","ran","rain"]},
  {id:"p1-10", strand:"phonics", skill:"cvc-blend", level:1, prompt:"Put the sounds together:  f – i – sh", answer:"fish", options:["fish","dish","fist"]},

  /* ---------- PHONICS level 2 — sh, ch, th, ck ---------- */
  {id:"p2-01", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word starts with  sh ?", answer:"ship", options:["ship","sip","chip"]},
  {id:"p2-02", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word starts with  ch ?", answer:"chin", options:["chin","shin","thin"]},
  {id:"p2-03", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word starts with  th ?", answer:"think", options:["think","sink","pink"]},
  {id:"p2-04", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word has  sh  in it?", answer:"shop", options:["shop","chop","stop"]},
  {id:"p2-05", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word has  th  in it?", answer:"thick", options:["thick","sick","chick"]},
  {id:"p2-06", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word ends with  ck ?", answer:"duck", options:["duck","dust","drum"]},
  {id:"p2-07", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word ends with  ch ?", answer:"much", options:["much","mush","must"]},
  {id:"p2-08", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word ends with  sh ?", answer:"wish", options:["wish","with","wick"]},
  {id:"p2-09", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word ends with  th ?", answer:"bath", options:["bath","bat","back"]},
  {id:"p2-10", strand:"phonics", skill:"digraphs", level:2, prompt:"Which word starts with  ch ?", answer:"cheese", options:["cheese","sneeze","these"]},

  /* ---------- PHONICS level 3 — the e on the end ---------- */
  {id:"p3-01", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word says  cane ?", answer:"cane", options:["cane","can","cone"]},
  {id:"p3-02", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word says  bite ?", answer:"bite", options:["bite","bit","boat"]},
  {id:"p3-03", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word says  note ?", answer:"note", options:["note","not","nut"]},
  {id:"p3-04", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word says  cube ?", answer:"cube", options:["cube","cub","cab"]},
  {id:"p3-05", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word says  tape ?", answer:"tape", options:["tape","tap","top"]},
  {id:"p3-06", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word says  hope ?", answer:"hope", options:["hope","hop","hip"]},
  {id:"p3-07", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word rhymes with  time ?", answer:"lime", options:["lime","limb","lamb"]},
  {id:"p3-08", strand:"phonics", skill:"magic-e", level:3, prompt:"Which word rhymes with  made ?", answer:"shade", options:["shade","shed","shad"]},

  /* ---------- PHONICS level 4 — two letters, one vowel sound ---------- */
  {id:"p4-01", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which spelling is right for  rain ?", answer:"rain", options:["rain","rane","rayn"]},
  {id:"p4-02", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which spelling is right for  tree ?", answer:"tree", options:["tree","trea","trie"]},
  {id:"p4-03", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which spelling is right for  boat ?", answer:"boat", options:["boat","bote","bowt"]},
  {id:"p4-04", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which word has  ai  in it?", answer:"train", options:["train","tran","turn"]},
  {id:"p4-05", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which word has  ee  in it?", answer:"sweet", options:["sweet","swet","swift"]},
  {id:"p4-06", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which word rhymes with  seed ?", answer:"need", options:["need","ned","nod"]},
  {id:"p4-07", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which word rhymes with  coat ?", answer:"goat", options:["goat","got","gut"]},
  {id:"p4-08", strand:"phonics", skill:"vowel-teams", level:4, prompt:"Which word has  oa  in it?", answer:"toast", options:["toast","tost","trust"]}

];
