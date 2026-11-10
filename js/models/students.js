/* MODEL: students */
(()=>{
const c=AS.collection("students",[
 {n:"Juan Dela Cruz",c:12,s:92,d:"11/07/2026"},{n:"Maria Santos",c:10,s:88.5,d:"11/06/2026"},
 {n:"Pedro Reyes",c:8,s:81,d:"11/05/2026"},{n:"Ana Garcia",c:15,s:94.5,d:"11/07/2026"}]);
AS.models.students={
  all:c.all,
  add(n){const a=c.all();a.push({n,c:0,s:0,d:new Date().toLocaleDateString("en-US")});c.set(a)},
  remove(i){const a=c.all();a.splice(i,1);c.set(a)},
  avg(){const a=c.all().filter(x=>x.c>0);return a.length?a.reduce((t,x)=>t+x.s,0)/a.length:0},
  status:s=>s.c>0&&s.s<85?"attn":"active"
};
})();
