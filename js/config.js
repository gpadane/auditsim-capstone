/* Settings. Edit here. */
AS.config={
  // Teacher accounts (demo only — in production, verify on a server)
  teachers:[{email:"teacher@auditsim.online",password:"teacher123"}],
  code:{length:6,ttlSec:300,maxTries:5,resendSec:30},
  // To send REAL verification emails: create a free EmailJS account, then fill these in.
  // Template variables expected: {{to_email}}, {{code}}, {{minutes}}
  emailjs:{serviceId:"",templateId:"",publicKey:""}
};
