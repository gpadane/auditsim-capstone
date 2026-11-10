/* MODEL: audit cases */
(()=>{
const R=a=>a[Math.random()*a.length|0];
AS.models.cases={
  count:()=>AS.store.get("caseCount",48),sessions:()=>AS.store.get("sessions",153),
  areas:["Inventory","Revenue","Payroll","Cash & Bank","Fixed Assets"],
  generate(area){const co=R(["Reyes Trading","Santos Foods Inc.","Luzon Hardware","Mabini Textiles"]);
    const amt=(Math.random()*900000+100000|0).toString().replace(/\B(?=(\d{3})+$)/g,",");
    return{title:`${area} Audit – ${co}`,co,area,amt,
      text:`You are auditing ${co}. During year-end testing of ${area.toLowerCase()}, you found an unreconciled difference of ₱${amt}. Identify the likely causes, the audit procedures you would perform, and the proposed adjusting entry.`}},
  save(){AS.store.set("caseCount",this.count()+1)}
};
})();
