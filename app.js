const PHASES = [
  {title:"طراحی", p:100},
  {title:"فونداسیون", p:100},
  {title:"زیرزمین", p:100},
  {title:"لابی", p:60},
  {title:"طبقات", p:0},
  {title:"نازک‌کاری", p:0}
];

function calc(){
  let sum = 0;
  PHASES.forEach(x => sum += x.p);
  let avg = Math.round(sum / PHASES.length);

  document.getElementById("progressText").innerText = avg + "%";
  document.getElementById("barFill").style.width = avg + "%";
}

function render(){
  document.getElementById("timeline").innerHTML =
    PHASES.map((p,i)=>`
      <div class="phase">
        <div class="phase-title" onclick="toggle(${i})">
          <span>${p.title}</span>
          <span>${p.p}%</span>
        </div>
        <div class="phase-body" id="p${i}">
          <input type="file" onchange="upload(event,${i})">
          <div id="g${i}"></div>
        </div>
      </div>
    `).join("");
}

function toggle(i){
  let el = document.getElementById("p"+i);
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function upload(e,i){
  alert("فعلاً آپلود غیرفعال است.");
}

function load(i){}

function qr(){}

function init(){
  render();
  calc();
}

init();
