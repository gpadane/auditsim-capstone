/* MODEL: student submissions */
(()=>{
const c=AS.collection("subs",[
 {id:1,n:"Juan Dela Cruz",t:"Inventory Count Variance",s:92,st:"Pending"},
 {id:2,n:"Maria Santos",t:"Revenue Cut-off Testing",s:88.5,st:"Pending"},
 {id:3,n:"Pedro Reyes",t:"Payroll Ghost Employee",s:81,st:"Pending"},
 {id:4,n:"Ana Garcia",t:"Bank Reconciliation",s:94.5,st:"Pending"}]);
AS.models.submissions={all:c.all,
  setStatus(id,st){const a=c.all();const x=a.find(s=>s.id===id);if(x){x.st=st;c.set(a)}}};
})();
