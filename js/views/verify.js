/* VIEW: email verification code screen */
(()=>{
const {icon,esc}=AS;let timer;
AS.views.verify={
  render(email,demoCode){const n=AS.config.code.length;return `<div class="auth" style="grid-template-columns:1fr">
  <div class="card acard"><div class="vicon">${icon("shield",32)}</div><h2>Verify your email</h2>
  <p class="sub">We sent a ${n}-digit code to <b>${esc(email)}</b>. It expires in ${Math.round(AS.config.code.ttlSec/60)} minutes.</p>
  <div class="otp" id="otp">${Array.from({length:n},()=>'<input inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Code digit">').join("")}</div>
  <div class="err" id="er" role="alert"></div>
  <button class="btn lg" id="vb">Verify &amp; Continue</button>
  <div class="row"><button class="link" id="bk">← Back to login</button><button class="link" id="rs" disabled></button></div>
  <div class="demo" id="demo" ${demoCode?"":"hidden"}>Demo inbox — email sending isn’t connected yet.<br>Your verification code:<b id="dc">${demoCode||""}</b></div></div></div>`},
  bind(h){const $=AS.$,ins=AS.$$("#otp input"),get=()=>ins.map(x=>x.value).join("");
    ins.forEach((el,i)=>{
      el.oninput=()=>{el.value=el.value.replace(/\D/g,"").slice(-1);if(el.value&&ins[i+1])ins[i+1].focus();if(get().length===ins.length)h.submit(get())};
      el.onkeydown=e=>{if(e.key==="Backspace"&&!el.value&&ins[i-1])ins[i-1].focus()};
      el.onpaste=e=>{e.preventDefault();const t=(e.clipboardData.getData("text")||"").replace(/\D/g,"").slice(0,ins.length);t.split("").forEach((c,k)=>ins[k].value=c);if(t.length===ins.length)h.submit(t)}});
    $("#vb").onclick=()=>get().length===ins.length?h.submit(get()):this.error("Enter the full code.");
    $("#bk").onclick=h.back;$("#rs").onclick=h.resend;ins[0].focus();this.cooldown()},
  error(m){AS.$("#er").textContent=m;if(m){const o=AS.$("#otp");o.classList.remove("bad");void o.offsetWidth;o.classList.add("bad")}},
  reset(){AS.$$("#otp input").forEach(x=>x.value="");AS.$("#otp input").focus()},
  setDemo(c){const d=AS.$("#demo");if(d&&c){d.hidden=false;AS.$("#dc").textContent=c}},
  cooldown(){clearInterval(timer);let s=AS.config.code.resendSec;const b=AS.$("#rs");
    const t=()=>{if(!b)return;b.disabled=s>0;b.textContent=s>0?`Resend code in ${s}s`:"Resend code";if(s--<=0)clearInterval(timer)};t();timer=setInterval(t,1000)},
  stop(){clearInterval(timer)}
};
})();
