/* MODEL: authentication, session, verification code */
(()=>{
const C=()=>AS.config,S=AS.session;let ch=null;
AS.models.auth={
  user:()=>AS.store.get("user",{name:"Teacher",email:C().teachers[0].email}),
  setName(n){const u=this.user();u.name=n;AS.store.set("user",u)},
  isLoggedIn:()=>S.get("in",false)===true,
  isTeacher:e=>C().teachers.some(t=>t.email===e.toLowerCase()),
  checkCredentials(email,pw){const t=C().teachers.find(t=>t.email===email.toLowerCase());
    if(!t)return{ok:false,msg:"This email is not registered as a teacher account."};
    return t.password===pw?{ok:true}:{ok:false,msg:"Incorrect email or password."}},
  startChallenge(email){const n=C().code.length,a=new Uint32Array(1);crypto.getRandomValues(a);
    const code=String(a[0]%Math.pow(10,n)).padStart(n,"0");
    ch={email,code,exp:Date.now()+C().code.ttlSec*1000,tries:0};return code},
  verify(code){
    if(!ch)return{ok:false,locked:true,msg:"Session expired. Please log in again."};
    if(Date.now()>ch.exp){ch=null;return{ok:false,msg:"Code expired. Please request a new one."}}
    if(++ch.tries>C().code.maxTries){ch=null;return{ok:false,locked:true,msg:"Too many attempts. Please log in again."}}
    if(code!==ch.code)return{ok:false,msg:`Incorrect code. ${C().code.maxTries-ch.tries} attempts left.`};
    const e=ch.email;ch=null;this.complete(e);return{ok:true}},
  complete(email){const u=this.user();u.email=email;AS.store.set("user",u);S.set("in",true)},
  logout(){S.del("in");ch=null}
};
})();
