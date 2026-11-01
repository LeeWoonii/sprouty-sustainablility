(() => {
  // [question, [answers], index of right answer, fun fact]
  const Q = [
  ["Which bin is best for an empty plastic bottle?",["Recycling bin","Garden","River"],0,"Recycling turns old bottles into new things!"],
  ["What should you do with the tap while brushing your teeth?",["Leave it running","Turn it off","Turn it up"],1,"Turning it off saves lots of clean water."],
  ["Which energy never runs out?",["Sunshine","Coal","Oil"],0,"The sun and the wind are renewable energy."],
  ["What is best for a short trip to school?",["Walking or cycling","A big car","A plane"],0,"Walking keeps the air clean and keeps you fit."],
  ["What do bees do for plants?",["Help them make seeds and fruit","Eat their roots","Paint them"],0,"Bees carry pollen from flower to flower."],
  ["Leftover fruit peels can become...",["Compost for the soil","Plastic","Glass"],0,"Compost feeds the soil so new plants grow strong."],
  ["When you leave a room, you should switch off the...",["Light","Fridge","Wall"],0,"Switching off lights saves energy."],
  ["Why do we plant trees?",["They clean the air and give animals homes","They make noise","They stop the sun"],0,"One tree can be home to many birds and insects."],
  ["Which bottle is best for the planet?",["One you refill","One you use once","One with no lid"],0,"A refillable bottle means less rubbish."],
  ["How can we keep rivers clean?",["Never throw litter in them","Pour oil in them","Paint them"],0,"Clean rivers mean clean drinking water and happy fish."],
  ["What can you do with clothes that are too small?",["Give them to someone who needs them","Bury them","Hide them"],0,"Sharing clothes means fewer new ones are made."],
  ["Which snack helps you grow strong and healthy?",["Fruit and vegetables","Only sweets","Nothing"],0,"Healthy food gives your body energy to learn and play."],
  ["Every child should be able to...",["Go to school and learn","Stay away from books","Never play"],0,"Learning helps everyone build a better world."],
  ["What is a good way to reuse an old jar?",["Use it as a pencil pot","Throw it in the sea","Break it"],0,"Reusing saves things from becoming rubbish."],
  ["Which gas do trees take in from the air?",["Carbon dioxide","Helium","Smoke"],0,"Trees take in carbon dioxide and give out oxygen for us to breathe."],
  ["Which of these is renewable energy?",["Wind power","Petrol","Natural gas"],0,"Wind keeps blowing, so we can use it again and again."],
  ["What does 'recycle' mean?",["Turn old things into new things","Throw things away","Bury things"],0,"Recycling saves materials and energy."],
  ["What are the three Rs?",["Reduce, reuse, recycle","Run, read, rest","Rain, river, road"],0,"Reducing comes first: the best rubbish is the rubbish we never make."],
  ["Why are coral reefs important?",["Many sea animals live and hide in them","They make the waves","They make salt"],0,"Reefs are busy underwater cities full of life."],
  ["What happens when the Earth gets warmer and warmer?",["Ice melts and the sea rises","The sea disappears","Days get longer"],0,"Melting ice makes sea levels rise and can flood homes."],
  ["What is the greenest way to dry clothes?",["On a line in the sun","In a machine every time","On a heater"],0,"The sun and wind dry clothes for free."],
  ["Why is food grown near you good for the planet?",["Less fuel is used to carry it","It has no taste","It is always free"],0,"Shorter journeys mean less pollution."],
  ["Which sea animal can be harmed by plastic bags?",["Turtles","Camels","Squirrels"],0,"Turtles can mistake floating bags for jellyfish."],
  ["What is the water cycle?",["Water rises, makes clouds and falls as rain","Water going round a bike","Water stuck in the ground"],0,"The sun warms water, it rises, forms clouds and falls again."],
  ["What can you do with a broken toy?",["Try to fix it or share its parts","Throw it in the sea","Bury it"],0,"Repairing things keeps them out of the bin."],
  ["Which uses less water?",["A short shower","A very long bath","Leaving the hose on"],0,"A short shower can save many buckets of water."],
  ["Which is a fair thing to do?",["Share and let everyone play","Leave someone out","Take all the toys"],0,"Fairness means everyone gets a turn."],
  ["Where should old batteries go?",["A special recycling point","The garden","A river"],0,"Batteries hold chemicals that can harm soil and water."],
  ["Why do we need clean air?",["So our lungs stay healthy","Only plants need it","Air does not matter"],0,"Clean air helps people, animals and plants stay well."],
  ["A forest is cut down. What happens to the animals living there?",["They lose their homes","They get a new house","Nothing changes"],0,"Protecting forests protects the animals that live in them."],
  ["Which makes less rubbish?",["A lunchbox you can wash","Plastic wrap every day","Throwaway plates"],0,"Reusable things mean less to throw away."],
  ["How can solar panels help?",["They turn sunlight into electricity","They make rain","They clean the sea"],0,"Solar power is clean energy that doesn't make smoke."]
  ];
  
  const EMOJI=["\u{1F41E}","\u{1F438}","\u{1F41D}","\u{1F98B}"], PLANT=["\u{1F330}","\u{1F331}","\u{1F33F}","\u{1FAB4}","\u{1F333}","\u{1F338}"];
  const DICE=["\u2680","\u2681","\u2682"], LAST=39, MAXH=6;
  const SQ={0:"start",39:"finish"};
  Object.entries({animal:[2,15,27,35],sun:[4,16,24,31],bin:[10,21,37],flood:[7,19,29],litter:[13,26,33]}).forEach(([t,a])=>a.forEach(i=>SQ[i]=t));
  const ICON={start:"\u{1F3E1}",finish:"\u{1F389}",sun:"\u2600\uFE0F",bin:"\u267B\uFE0F",flood:"\u{1F30A}",litter:"\u{1F5D1}\uFE0F",animal:"\u{1F994}",q:"\u2753"};
  const EV={
   animal:["\u{1F994}","Animal rescue!","You found a lost baby hedgehog and helped it get home. You earn a water drop!",2],
   sun:["\u2600\uFE0F","Solar panels!","A school gets solar panels and uses clean energy. The planet gets a heart!",1],
   bin:["\u267B\uFE0F","Recycling day!","Everyone sorts their rubbish. The planet gets a heart!",1],
   flood:["\u{1F30A}","Big storm!","Heavy rain floods the path. Answer a question to fix it, or the planet loses a heart!",-1],
   litter:["\u{1F5D1}\uFE0F","Litter!","Rubbish is blocking the stream. Answer a question to clean it up, or the planet loses a heart!",-1]
  };
  
  const $=id=>document.getElementById(id);
const pick=a=>a[Math.random()*a.length|0];
const cheer=()=>"\u{1F331} "+pick(["Yay!","Super!","You got it!","Wow, great job!","Sprouty is proud!"]);
const oops=()=>"\u{1F331} "+pick(["Oops!","Almost!","Good try!","Sprouty believes in you!"]);
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
  const store={
   get(){try{return JSON.parse(localStorage.getItem("gardenTrail")||"{}")}catch(e){return{}}},
   set(o){try{localStorage.setItem("gardenTrail",JSON.stringify(o))}catch(e){}}
  };
  let S, deck=[];
  const draw=()=>{if(!deck.length)deck=shuffle(Q);return deck.pop()};
  const cur=()=>S.players[S.turn];
  const canSpeak="speechSynthesis" in window;
  const speak=t=>{if(!canSpeak)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.9;speechSynthesis.speak(u)};
  
  // ---------- dialogs ----------
  function dlg(html,btns,say){
   $("dlgBody").innerHTML=html;
   const b=$("dlgBtns");b.innerHTML="";
   btns.forEach(([label,fn,cls])=>{const x=document.createElement("button");x.className="btn btn-lg "+(cls||"btn-success");x.textContent=label;x.onclick=fn;b.appendChild(x)});
   const s=$("say");s.hidden=!(say&&canSpeak);s.onclick=()=>speak(say);
   $("modal").hidden=false;
  }
  const close=()=>{$("modal").hidden=true;if(canSpeak)speechSynthesis.cancel()};
  function info(ic,title,text,cb){
   dlg(`<div class="big">${ic}</div><h2>${title}</h2><p>${text}</p>`,[["OK",()=>{close();cb()}]],title+". "+text);
  }
  function quiz(q,cb){
   const opts=shuffle(q[1].map((t,i)=>[t,i===q[2]]));
   dlg(`<div class="big">\u2753</div><h2>${q[0]}</h2><p id="fact" class="fact"></p>`,
    opts.map(([t,ok])=>[t,e=>{
     $("dlgBtns").querySelectorAll(".opt").forEach((b,j)=>{b.disabled=true;if(opts[j][1])b.classList.add("right")});
     if(!ok)e.currentTarget.classList.add("wrong");
     $("fact").textContent=(ok?cheer():oops())+" "+q[3];
     const n=document.createElement("button");
     n.className="btn btn-lg btn-success mt-2";n.textContent="Next";
     n.onclick=()=>{close();cb(ok)};
     $("dlgBtns").appendChild(n);n.focus();
    },"opt btn-outline-success"]),
    q[0]+" "+q[1].join(". Or. "));
  }
  
  // ---------- rendering ----------
  function render(msg){
   let h=`<div id="hearts" aria-label="Planet health ${S.health} of ${MAXH}">Planet: ${"\u2764\uFE0F".repeat(S.health)}${"\u{1F5A4}".repeat(MAXH-S.health)}</div>`;
   S.players.forEach((p,i)=>{
    h+=`<div class="pl ${i===S.turn?"on":""}"><span class="plant">${PLANT[Math.min(5,Math.ceil(p.pts/2))]}</span><span>${p.e} ${p.name}: ${p.pts} water drop${p.pts===1?"":"s"}</span></div>`;
   });
   $("hud").innerHTML=h;
   let b="";
   for(let i=0;i<=LAST;i++){
    const t=SQ[i]||"q",row=i/6|0,col=row%2?5-i%6:i%6;
    const tok=S.players.filter(p=>p.pos===i).map(p=>p.e).join("");
    b+=`<div class="cell ${t}" style="grid-row:${row+1};grid-column:${col+1}"><span>${ICON[t]}</span><span class="tokens">${tok}</span></div>`;
   }
   $("board").innerHTML=b;
   if(msg)$("msg").textContent=msg;
  }
  
  // ---------- game flow ----------
  function start(n){Sprouty.resetSession();
   S={n,turn:0,health:MAXH,busy:false,
    players:Array.from({length:n},(_,i)=>({name:n===1?"You":"Player "+(i+1),e:EMOJI[i],pos:0,pts:0}))};
   $("menu").hidden=true;$("game").hidden=false;$("dice").textContent=DICE[0];
   $("roll").disabled=false;
   render(`${cur().name}, roll the dice!`);
  }
  function roll(){
   if(S.busy)return;
   S.busy=true;$("roll").disabled=true;
   const g=S,d=$("dice");let t=0;
   const iv=setInterval(()=>{
    if(g!==S||S.dead){clearInterval(iv);return}
    d.textContent=DICE[Math.random()*3|0]+" "+DICE[Math.random()*3|0];
if(++t>8){clearInterval(iv);offer(1+(Math.random()*3|0),1+(Math.random()*3|0))}
   },70);
  }
  // Two dice: the player chooses one. Each shows the square it would land on.
function offer(a,b){
 const p=cur(),d=$("dice");d.innerHTML="";
 $("msg").textContent=`${p.name}, pick a dice to move! The icon shows where you will land.`;
 [a,b].forEach(v=>{
  const x=document.createElement("button");
  x.className="btn btn-outline-success die";
  x.innerHTML=`${DICE[v-1]} <small>\u2192 ${ICON[SQ[Math.min(LAST,p.pos+v)]||"q"]}</small>`;
  x.setAttribute("aria-label","Move "+v+" squares");
  x.onclick=()=>{d.textContent=DICE[v-1];move(v)};
  d.appendChild(x);
 });
}
function move(r){
   const p=cur(),g=S;
   const go=()=>{
    if(g!==S||S.dead)return;
    if(r>0&&p.pos<LAST){p.pos++;r--;render();setTimeout(go,250)}else land(p);
   };
   go();
  }
  // +1 water drop; every 3 right answers in a row earns a bonus drop
  function gain(p){p.pts++;Sprouty.add(1);p.streak=(p.streak||0)+1;if(p.streak%3===0){p.pts++;return " Streak bonus: +1 extra drop!"}return ""}
  const title=w=>w>=5?"Planet Hero":w>=3?"Gardener":w>=1?"Sprout":"";
  function land(p){
   const t=SQ[p.pos]||"q";
   if(t==="finish")return next(`${p.name} reached the Garden Party!`);
   if(t==="q")return quiz(draw(),ok=>{let b="";if(ok)b=gain(p);else p.streak=0;next(ok?`${p.name} earned a water drop!${b}`:"Good try!")});
   const [ic,title,text,d]=EV[t];
   if(d===2)return info(ic,title,text,()=>next(`${p.name} helped an animal!${gain(p)}`));
   if(d>0)return info(ic,title,text,()=>{S.health=Math.min(MAXH,S.health+1);next("The planet got stronger!")});
   info(ic,title,text,()=>quiz(draw(),ok=>{
    if(ok){next("You fixed it!"+gain(p))}
    else{p.streak=0;S.health--;next("The planet lost a heart.")}
   }));
  }
  function next(msg){
   if(S.health<=0)return end(false);
   if(S.players.every(p=>p.pos>=LAST))return end(true);
   do{S.turn=(S.turn+1)%S.n}while(cur().pos>=LAST);
   S.busy=false;$("roll").disabled=false;
   render(`${msg} ${cur().name}, your turn!`);
  }
  function end(win){
   render();
   const st=store.get();
   if(win){st.wins=(st.wins||0)+1;store.set(st);Sprouty.add(10)}
   const star=[...S.players].sort((a,b)=>b.pts-a.pts)[0];
   const gardens=S.players.map(p=>`<div>${PLANT[Math.min(5,Math.ceil(p.pts/2))]} ${p.name}: ${p.pts}</div>`).join("");
   const html=win
    ?`<div class="big">\u{1F389}</div><h2>You saved the planet together!</h2>${gardens}${S.n>1?`<p class="mt-2">Star gardener: ${star.e} ${star.name}</p>`:""}`
    :`<div class="big">\u{1F331}</div><h2>The planet needs more help</h2><p>Every answer makes you stronger. Try again!</p>${gardens}`;
   dlg(html+`<p class="fact">\u{1F330} +${Sprouty.session()} seeds earned!</p>`,[["Play again",()=>{close();start(S.n)}],["Menu",()=>{close();menu()},"btn-outline-success"]],win?"You saved the planet together!":"The planet needs more help. Try again!");
  }
  function menu(){setTimeout(()=>{$("stats").textContent+=($("stats").textContent?" · ":"")+"\u{1F330} "+Sprouty.coins()+" seeds"},0);
   if(S)S.dead=true;
   $("game").hidden=true;$("menu").hidden=false;
   const w=store.get().wins||0;
   $("stats").textContent=w?`Planets saved: ${w} (${title(w)})`:"";
  }
  
  // ---------- setup ----------
  [1,2,3,4].forEach(n=>{
   const b=document.createElement("button");
   b.className="btn btn-lg btn-success";
   b.textContent=n===1?"Solo":`Team of ${n}`;
   b.onclick=()=>start(n);
   $("count").appendChild(b);
  });
  $("roll").onclick=roll;
  $("toMenu").onclick=()=>dlg(`<div class="big">\u{1F3E1}</div><h2>Leave this game?</h2><p>Your garden will be lost.</p>`,[["Keep playing",close],["Leave game",()=>{close();menu()},"btn-outline-danger"]]);
  menu();
  })();