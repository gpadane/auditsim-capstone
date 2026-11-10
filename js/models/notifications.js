/* MODEL: notifications / activity */
(()=>{
const c=AS.collection("notes",[
 {t:"Juan Dela Cruz completed a case",w:"2 hours ago"},{t:"Maria Santos scored 88.5%",w:"3 hours ago"},
 {t:"New student registered: Carlos Mendoza",w:"1 day ago"}]);
AS.models.notes={all:c.all,
  unread:()=>AS.store.get("unread",2),
  add(t){const a=c.all();a.unshift({t,w:"just now"});c.set(a);AS.store.set("unread",this.unread()+1)},
  markRead(){AS.store.set("unread",0)},
  clear(){c.set([]);AS.store.set("unread",0)}};
})();
