/* VIEW: login screen */
(()=>{
const {icon}=AS;
AS.views.login={
  render(){return `<div class="auth">
  <div class="brand"><div class="logo"><img src="assets/logo.png" alt="AuditSim"></div>
   <div class="eyebrow">AUDIT TRAINING, REIMAGINED</div><h1>Build confidence in every audit.</h1>
   <p>Practice real-world scenarios, sharpen your judgement, and keep learning with AuditSim.</p>
   <ul class="feats"><li><i>${icon("check",16)}</i>Learn at your own pace</li><li><i>${icon("check",16)}</i>Track every student’s progress</li><li><i>${icon("check",16)}</i>Secure email verification</li></ul></div>
  <form class="card acard" id="lf" novalidate><h2>Welcome back</h2><p class="sub">Sign in to continue to your AuditSim workspace.</p>
   <div class="role">${icon("cap",20)} Teacher Login</div>
   <div class="field"><input class="in" id="em" type="email" placeholder="Email address" autocomplete="username"></div>
   <div class="field"><input class="in" id="pw" type="password" placeholder="Password" autocomplete="current-password"><button type="button" class="eye" id="eye" aria-label="Show password">${icon("eyeoff")}</button></div>
   <div style="text-align:right"><button type="button" class="link" id="fg">Forgot password?</button></div>
   <div class="err" id="er" role="alert"></div>
   <button class="btn lg" id="go" type="submit">Log In</button>
   <div class="or">or</div>
   <button type="button" class="gbtn" id="gg">${AS.googleIcon} Continue with Google</button>
   <p class="hint">Teacher access only · Demo: teacher@auditsim.online / teacher123</p></form></div>`},
  bind(h){const $=AS.$;
    $("#eye").onclick=()=>{const p=$("#pw"),s=p.type==="password";p.type=s?"text":"password";$("#eye").innerHTML=icon(s?"eye":"eyeoff")};
    $("#lf").onsubmit=e=>{e.preventDefault();h.submit($("#em").value.trim(),$("#pw").value)};
    $("#fg").onclick=h.forgot;$("#gg").onclick=h.google},
  error(m){AS.$("#er").textContent=m},
  busy(b){const g=AS.$("#go");if(!g)return;g.disabled=b;g.textContent=b?"Please wait…":"Log In"}
};
})();
