/* CONTROLLER: app shell, router, header menus */
(()=>{
const {$}=AS,M=AS.models,S=AS.views.shell;
const ROUTES=[["dashboard","grid","Dashboard","AuditSim Teacher Dashboard"],["students","users","Manage Students","Manage Students"],["reviews","clip","Review Submissions","Review Submissions"],["reports","chart","Reports & Analytics","Reports & Analytics"],["generate","spark","Generate Cases","Generate Audit Cases"],["profile","user","Teacher Profile","Teacher Profile"]];
const A=AS.controllers.app={
  enter(){$("#auth").hidden=true;$("#auth").innerHTML="";const app=$("#app");app.hidden=false;
    app.innerHTML=S.render(M.auth.user(),ROUTES);
    $("#nav").onclick=e=>{const b=e.target.closest("button");if(b){location.hash=b.dataset.r;S.drawer(false)}};
    $("#bg").onclick=()=>S.drawer(true);$("#bd").onclick=()=>S.drawer(false);
    $("#so").onclick=A.logout;
    $("#bell").onclick=e=>{e.stopPropagation();const d=$("#dd");if(!d.hidden){d.hidden=true;return}
      d.innerHTML=S.notes(M.notes.all());d.hidden=false;M.notes.markRead();A.refreshBadge();
      const c=$("#clr");if(c)c.onclick=()=>{M.notes.clear();d.hidden=true;AS.views.ui.toast("Notifications cleared");A.route()}};
    $("#me").onclick=e=>{e.stopPropagation();const d=$("#dd");if(!d.hidden){d.hidden=true;return}
      d.innerHTML=S.profile(M.auth.user());d.hidden=false;$("#dp").onclick=()=>{d.hidden=true;location.hash="profile"};$("#do").onclick=A.logout};
    A.refreshUser();A.refreshBadge();A.route()},
  route(){if(!M.auth.isLoggedIn()||$("#app").hidden)return;let id=location.hash.slice(1);
    let r=ROUTES.find(x=>x[0]===id)||ROUTES[0];S.setActive(r[0],r[3]);$("#dd").hidden=true;
    const v=$("#view");v.style.animation="none";void v.offsetWidth;v.style.animation="";
    AS.controllers.pages[r[0]]();window.scrollTo(0,0)},
  refreshBadge(){S.badge(M.notes.unread())},
  refreshUser(){S.setUser(M.auth.user())},
  logout(){M.auth.logout();$("#app").innerHTML="";$("#app").hidden=true;location.hash="";AS.controllers.auth.showLogin();AS.views.ui.toast("Signed out")}
};
})();
