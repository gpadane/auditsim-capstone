/* VIEW: shared UI pieces (toast, modal) */
(()=>{
AS.views.ui={
  toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2800)},
  modal(html){const el=document.createElement("div");el.className="mod";el.innerHTML="<div>"+html+"</div>";
    const close=()=>{el.remove();document.removeEventListener("keydown",k)};
    const k=e=>e.key==="Escape"&&close();document.addEventListener("keydown",k);
    el.onclick=e=>{if(e.target===el)close()};AS.$("#layer").append(el);
    const x=AS.$("[data-x]",el);if(x)x.onclick=close;return{el,close}}
};
})();
