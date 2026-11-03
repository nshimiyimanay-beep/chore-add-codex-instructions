(() => {
  "use strict";
  const base = new URL("../", document.baseURI);
  const items = [
    ["services","content/services.json",a=>Array.isArray(a)?a.filter(x=>x.visible!==false).length:0],
    ["team","content/team.json",a=>Array.isArray(a)?a.filter(x=>x.visible!==false).length:0],
    ["clients","content/clients.json",a=>Array.isArray(a)?a.filter(x=>x.visible!==false).length:0],
    ["projects","content/projects.json",a=>Array.isArray(a)?a.filter(x=>x.published===true).length:0]
  ];
  for (const [id,path,count] of items) {
    fetch(new URL(path,base),{cache:"no-cache"}).then(r => {if (!r.ok) throw Error("Unpublished"); return r.json();})
      .then(a => {const el=document.getElementById("count-"+id);if(el) el.textContent=count(a);})
      .catch(() => {const el=document.getElementById("count-"+id);if(el) el.textContent="—";});
  }
  const entries = document.querySelectorAll(".sidebar nav a");
  entries.forEach(a => a.addEventListener("click", () => {
    entries.forEach(x=>x.classList.remove("active"));a.classList.add("active");
  }));
})();