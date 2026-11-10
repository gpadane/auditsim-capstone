/* CONTROLLERS: one per page. Fetch from models → render view → wire events */
(()=>{
const {$,$$}=AS,M=AS.models,V=AS.views.pages,Ui=AS.views.ui,view=h=>$("#view").innerHTML=h;
const data=()=>({name:M.auth.user().name,students:M.students.all(),subs:M.submissions.all(),notes:M.notes.all(),cases:M.cases.count(),sessions:M.cases.sessions(),avg:M.students.avg(),status:M.students.status,areas:M.cases.areas});
const confirm=(title,msg,label,fn)=>{const m=Ui.modal(`<h3>${title}</h3><p style="color:var(--mu)">${msg}</p><div class="row"><button class="btn soft sm" data-x>Cancel</button><button class="btn danger sm" id="ok">${label}</button></div>`);$("#ok",m.el).onclick=()=>{m.close();fn()}};
const P=AS.controllers.pages={
dashboard(){view(V.dashboard(data()));$$("[data-go]").forEach(b=>b.onclick=()=>location.hash=b.dataset.go)},
students(){view(V.students(data()));
 $("#q").oninput=e=>{const q=e.target.value.toLowerCase();$$("#tb tr").forEach(r=>r.hidden=!r.dataset.n.includes(q))};
 $("#add").onclick=()=>{const m=Ui.modal(`<h3>Add student</h3><input class="in" id="sn" placeholder="Full name"><div class="row"><button class="btn soft sm" data-x>Cancel</button><button class="btn sm" id="ok">Add</button></div>`);
  $("#ok",m.el).onclick=()=>{const n=$("#sn",m.el).value.trim();if(!n)return Ui.toast("Enter a name");M.students.add(n);M.notes.add("New student registered: "+n);m.close();AS.controllers.app.refreshBadge();P.students();Ui.toast("Student added")}};
 $$("[data-v]").forEach(b=>b.onclick=()=>{const s=M.students.all()[b.dataset.v];const m=Ui.modal(`<h3>${AS.esc(s.n)}</h3><p>Cases completed: <b>${s.c} / 20</b></p><p>Average score: <b>${s.s.toFixed(1)}%</b></p><p>Last activity: ${s.d}</p><div class="row"><button class="btn sm" data-x>Close</button></div>`)});
 $$("[data-d]").forEach(b=>b.onclick=()=>{const s=M.students.all()[b.dataset.d];confirm("Remove "+AS.esc(s.n)+"?","This cannot be undone.","Remove",()=>{M.students.remove(+b.dataset.d);P.students();Ui.toast("Student removed")})})},
reviews(){view(V.reviews(data()));
 $$("[data-a]").forEach(b=>b.onclick=()=>{M.submissions.setStatus(+b.dataset.a,"Approved");P.reviews();Ui.toast("Submission approved")});
 $$("[data-rt]").forEach(b=>b.onclick=()=>{const m=Ui.modal(`<h3>Return with feedback</h3><textarea class="in" id="fb" rows="4" placeholder="Feedback for the student"></textarea><div class="row"><button class="btn soft sm" data-x>Cancel</button><button class="btn sm" id="ok">Return</button></div>`);
  $("#ok",m.el).onclick=()=>{M.submissions.setStatus(+b.dataset.rt,"Returned");m.close();P.reviews();Ui.toast("Returned to student")}})},
reports(){const d=data();view(V.reports(d));
 $("#csv").onclick=()=>{const t="Student,Cases,Average\n"+d.students.map(s=>`"${s.n}",${s.c},${s.s}`).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"text/csv"}));a.download="auditsim-report.csv";document.body.append(a);a.click();a.remove();Ui.toast("Report exported")}},
generate(){view(V.generate(data()));
 $("#gen").onclick=()=>{const o=$("#out");o.innerHTML='<div class="spin"></div>';
  setTimeout(()=>{const c=M.cases.generate($("#area").value);o.innerHTML=V.caseResult(c);
   $("#sc").onclick=()=>{M.cases.save();M.notes.add("New case saved: "+c.title);AS.controllers.app.refreshBadge();$("#sc").disabled=true;Ui.toast("Case saved")}},1200)}},
profile(){view(V.profile(M.auth.user()));
 $("#sv").onclick=()=>{const n=$("#pn").value.trim();if(!n)return Ui.toast("Name is required");M.auth.setName(n);AS.controllers.app.refreshUser();Ui.toast("Profile updated")}}
};
})();
