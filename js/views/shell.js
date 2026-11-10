/* VIEW: app shell (sidebar + header) */
(()=>{
const {icon,esc}=AS;
AS.views.shell={
  render(user,routes,active){return `<div class="shell"><div class="backdrop" id="bd"></div>
  <aside id="side"><div class="slogo"><span><img src="assets/logo.png" alt=""></span><b>AUDITSIM</b><small>Audit Smarter. Learn Faster</small></div>
   <nav id="nav">${routes.map(r=>`<button data-r="${r[0]}">${icon(r[1])}${r[2]}</button>`).join("")}</nav>
   <div class="portal">${icon("cap",24)}<b>Teacher Portal</b>v1.0</div>
   <button class="so" id="so">${icon("logout",18)} Sign Out</button></aside>
  <main><header><button class="burger" id="bg" aria-label="Menu">${icon("menu",22)}</button><h3 id="ttl"></h3>
   <button class="bell" id="bell" aria-label="Notifications">${icon("bell",22)}<span class="dot" id="cnt" hidden></span></button>
   <button class="me" id="me"><span class="av" style="background:#f3ebff;color:#7c3aed" id="mav"></span><span id="mail"></span></button></header>
   <div class="dd" id="dd" hidden></div><section id="view"></section></main></div>`},
  setUser(u){AS.$("#mail").textContent=u.email;AS.$("#mav").textContent=u.name[0].toUpperCase()},
  setActive(id,title){AS.$$("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.r===id));AS.$("#ttl").textContent=title},
  badge(n){const c=AS.$("#cnt");c.hidden=!n;c.textContent=n},
  notes(list){return `<div class="it"><b>Notifications</b></div>`+(list.slice(0,6).map(n=>`<div class="it">${esc(n.t)}<small>${esc(n.w)}</small></div>`).join("")||'<div class="it"><small>You’re all caught up.</small></div>')+(list.length?'<button class="it link" id="clr">Clear all</button>':"")},
  profile(u){return `<div class="it"><b>${esc(u.name)}</b><small>${esc(u.email)}</small></div><button class="it" id="dp">My profile</button><button class="it" id="do">Sign out</button>`},
  drawer(open){AS.$("#side").classList.toggle("open",open);AS.$("#bd").classList.toggle("open",open)}
};
})();
