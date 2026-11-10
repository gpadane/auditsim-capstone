/* SERVICE: sends the verification email.
   No EmailJS keys → "demo mode" (code is shown on screen). With keys → real email. */
AS.services.email={
  async sendCode(email,code){
    const e=AS.config.emailjs,m=Math.round(AS.config.code.ttlSec/60);
    if(!e.publicKey||!e.serviceId||!e.templateId)return{ok:true,demo:true};
    try{const r=await fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({service_id:e.serviceId,template_id:e.templateId,user_id:e.publicKey,template_params:{to_email:email,code,minutes:m}})});
      return{ok:r.ok,demo:false}}catch(err){return{ok:false,demo:false}}
  }
};
