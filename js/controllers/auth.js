/* CONTROLLER: login + email verification flow */
(()=>{
const M=AS.models.auth,Ui=AS.views.ui,L=AS.views.login,Vf=AS.views.verify;let pending=null;
const root=()=>AS.$("#auth");
const C=AS.controllers.auth={
  showLogin(){Vf.stop();root().hidden=false;AS.$("#app").hidden=true;root().innerHTML=L.render();
    L.bind({submit:(e,p)=>C.submit(e,p),forgot:C.forgot,google:C.google})},
  async submit(email,pw){
    if(!email||!pw)return L.error("Please enter your email and password.");
    if(!/^\S+@\S+\.\S+$/.test(email))return L.error("Enter a valid email address.");
    const r=M.checkCredentials(email,pw);if(!r.ok)return L.error(r.msg);
    L.error("");L.busy(true);await C.sendCode(email);L.busy(false)},
  async sendCode(email,isResend){
    const code=M.startChallenge(email),res=await AS.services.email.sendCode(email,code);
    if(!res.ok){if(!isResend)L.error("Couldn’t send the email. Check your connection and try again.");else Ui.toast("Couldn’t send the email.");return}
    pending=email;
    if(isResend){Vf.setDemo(res.demo?code:null);Vf.cooldown();Vf.reset();Vf.error("");Ui.toast("A new code was sent.")}
    else{root().innerHTML=Vf.render(email,res.demo?code:null);
      Vf.bind({submit:c=>C.verify(c),back:C.showLogin,resend:()=>C.sendCode(pending,true)})}},
  verify(code){const r=M.verify(code);
    if(r.ok){Vf.stop();AS.controllers.app.enter();Ui.toast("Verified. Welcome back!");return}
    Vf.error(r.msg);Vf.reset();if(r.locked)setTimeout(C.showLogin,1500)},
  forgot(){const m=Ui.modal(`<h3>Reset password</h3><p style="color:var(--mu);margin-bottom:14px">Enter your teacher email and we’ll send a reset link.</p><input class="in" id="fe" type="email" placeholder="Email address"><div class="row"><button class="btn soft sm" data-x>Cancel</button><button class="btn sm" id="fs">Send link</button></div>`);
    AS.$("#fs",m.el).onclick=()=>{const v=AS.$("#fe",m.el).value.trim();if(!/^\S+@\S+\.\S+$/.test(v))return Ui.toast("Enter a valid email");m.close();Ui.toast("If that account exists, a reset link was sent.")}},
  google(){Ui.toast("Signing in with Google (demo)…");setTimeout(()=>{M.complete(AS.config.teachers[0].email);AS.controllers.app.enter()},800)}
};
})();
