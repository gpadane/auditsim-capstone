/* Bootstrap */
document.addEventListener("click",()=>{const d=AS.$("#dd");if(d)d.hidden=true});
addEventListener("hashchange",()=>AS.controllers.app.route());
if(AS.models.auth.isLoggedIn())AS.controllers.app.enter();else AS.controllers.auth.showLogin();
