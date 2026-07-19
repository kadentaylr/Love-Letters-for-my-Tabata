function openLetter(){
document.querySelector(".envelope").classList.add("open");
setTimeout(()=>{
document.getElementById("overlay").style.display="none";
document.getElementById("content").classList.remove("hidden");
},900);
}
const target=new Date("2026-07-28T11:00:00");
function update(){
const diff=target-new Date();
if(diff<0){document.getElementById("timer").textContent="Together ❤️";return;}
const d=Math.floor(diff/86400000);
const h=Math.floor(diff%86400000/3600000);
const m=Math.floor(diff%3600000/60000);
const s=Math.floor(diff%60000/1000);
document.getElementById("timer").textContent=`${d} days ${h}h ${m}m ${s}s`;
}
setInterval(update,1000);update();
