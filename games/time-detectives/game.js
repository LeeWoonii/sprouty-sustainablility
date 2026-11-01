(() => {
    const BANDS=["A few weeks or months","A few years","Decades (tens of years)","Centuries (hundreds of years or more)"];
    const TICKS=["Today","2 months later","5 years later","50 years later","500 years later"];
    const GONE=[1,2,3,99];            // time-machine step at which each band has rotted away
    const ACTS=["Compost","Recycle","Reuse","Bin"];
    // item: [emoji, name, band, best action, fact]
    const CASES=[
     {name:"The Messy Beach",e:"\u{1F3D6}\uFE0F",bg:"#fdeccb",items:[
      ["\u{1F34C}","Banana peel",0,0,"Food scraps rot fast, and in a compost heap they become rich soil."],
      ["\u{1F9F4}","Plastic bottle",3,[1,2],"Plastic never truly disappears. Recycling keeps it in use."],
      ["\u{1F4F0}","Newspaper",0,1,"Paper rots quickly, but recycling it saves trees."],
      ["\u{1FAA5}","Plastic toothbrush",3,3,"Most toothbrushes can't be recycled. Try a bamboo one next time!"],
      ["\u{1F37E}","Glass bottle",3,[1,2],"Glass lasts a very long time, but it can be recycled again and again."]]},
     {name:"The Kitchen",e:"\u{1F373}",bg:"#dff1e6",items:[
      ["\u{1F34E}","Apple core",0,0,"Apple cores are perfect for compost or a worm farm."],
      ["\u{1F4E6}","Cardboard box",0,1,"Cardboard goes soggy and breaks down, but recycling it is even better."],
      ["\u{1FAD9}","Glass jar",3,[2,1],"A jar can hold pencils, snacks or paint. Reusing beats recycling!"],
      ["\u{1F34A}","Orange peel",0,0,"Peels go in the compost. They feed the soil."],
      ["\u{1F964}","Plastic cup",3,[2,1],"A washable cup you use again and again makes far less rubbish."]]},
     {name:"The School Yard",e:"\u{1F3EB}",bg:"#dcebfa",items:[
      ["\u{1F45F}","Old trainers",2,2,"Shoes that still fit someone can be given away instead of thrown out."],
      ["\u{1F4C4}","Scrap paper",0,1,"Draw on both sides, then recycle it."],
      ["\u{1F9E6}","Wool sock",1,2,"Wool is natural and rots in a few years, but a sock with a hole can become a puppet!"],
      ["\u{1F96A}","Sandwich crust",0,0,"Crusts can go in the compost, or feed the birds if it's bread only."],
      ["\u{1F58A}\uFE0F","Plastic pen",3,2,"A refillable pen lasts for years and makes less rubbish."]]}
    ];
    CASES[0].items.push(
 ["🥫","Tin can",2,1,"Metal cans can be recycled again and again."],
 ["🛍️","Plastic bag",3,2,"Carry a bag you can use again and again, and never let it blow away."],
 ["🧻","Paper towel",0,0,"Used paper towels can go in the compost."],
 ["🥜","Peanut shells",0,0,"Shells rot into soil in a few months."],
 ["🎣","Fishing line",3,3,"Line can trap animals for centuries. Always pick it up and bin it safely."]);
CASES[1].items.push(
 ["🥬","Lettuce leaves",0,0,"Veg scraps make great compost."],
 ["☕","Coffee grounds",0,0,"Coffee grounds are a favourite snack for garden soil."],
 ["🧽","Plastic sponge",3,3,"A cloth you can wash or a natural loofah makes less rubbish."],
 ["🍴","Plastic fork",3,2,"A metal fork can be washed and used thousands of times."],
 ["🍞","Stale bread",0,0,"Bread can go in the compost, or become breadcrumbs."]);
CASES[2].items.push(
 ["📏","Plastic ruler",3,2,"A ruler can last for years. Pass it on when you're finished."],
 ["🥕","Uneaten carrot",0,0,"Veg that can't be eaten can go in the compost."],
 ["🧥","Old jumper",1,2,"Wool jumpers can be passed on to someone who needs one."],
 ["📓","Old notebook",0,1,"Paper can be recycled once the pages are used up."],
 ["🍬","Sweet wrapper",3,3,"Most wrappers can't be recycled. Choosing less packaging helps."]);
const MAX=CASES.length*10;
const draw5=c=>shuffle(CASES[c].items).slice(0,5);
    
    const $=id=>document.getElementById(id);
const pick=a=>a[Math.random()*a.length|0];
const cheer=()=>"\u{1F331} "+pick(["Yay!","Super!","You got it!","Wow, great job!","Sprouty is proud!"]);
const oops=()=>"\u{1F331} "+pick(["Oops!","Almost!","Good try!","Sprouty believes in you!"]);
    const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
    const store={
     get(){try{return JSON.parse(localStorage.getItem("timeDetectives")||"{}")}catch(e){return{}}},
     set(o){try{localStorage.setItem("timeDetectives",JSON.stringify(o))}catch(e){}}
    };
    const canSpeak="speechSynthesis" in window;
    const speak=t=>{if(!canSpeak)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.9;speechSynthesis.speak(u)};
    const title=s=>s>=MAX*.85?"Master Detective":s>=MAX*.6?"Super Detective":"Junior Detective";
    let S,timer;
    
    // ---------- dialogs ----------
    function dlg(html,btns,say){
     $("dlgBody").innerHTML=html;
     const b=$("dlgBtns");b.innerHTML="";
     btns.forEach(([label,fn,cls])=>{const x=document.createElement("button");x.className="btn btn-lg "+(cls||"btn-success");x.textContent=label;x.onclick=fn;b.appendChild(x)});
     const s=$("say");s.hidden=!(say&&canSpeak);s.onclick=()=>speak(say);
     $("modal").hidden=false;
    }
    const close=()=>{clearTimeout(timer);$("modal").hidden=true;if(canSpeak)speechSynthesis.cancel()};
    
    // ---------- game steps ----------
    function render(){
     const c=CASES[S.c];
     $("hud").innerHTML=`<span>${c.e} Case ${S.c+1}/${CASES.length}: ${c.name}</span><span>\u2B50 ${S.stars}</span>`;
     const sc=$("scene");sc.style.background=c.bg;sc.innerHTML="";
     S.set.forEach((it,i)=>{
      const b=document.createElement("button");
      const done=S.done.has(i);
      b.className="item";b.disabled=done;
      b.innerHTML=done?`${it[0]}<small>Solved</small>`:`${it[0]}<small>Investigate</small>`;
      b.setAttribute("aria-label",done?it[1]+", solved":"Investigate mystery item");
      b.onclick=()=>guess(i);
      sc.appendChild(b);
     });
    }
    function guess(i){
     const it=S.set[i];
     dlg(`<div class="big">${it[0]}</div><h2>${it[1]}</h2><p>If this is left outside, how long will it stay around?</p>`,
      BANDS.map((t,b)=>[t,()=>travel(i,b),"opt btn-outline-success"]),
      `${it[1]}. If this is left outside, how long will it stay around?`);
    }
    function travel(i,g){
     const it=S.set[i],ok=g===it[2];
     if(ok){S.stars++;Sprouty.add(1)}
     dlg(`<p class="fact">${ok?cheer()+" +1 star. ":oops()+" "}It lasts: ${BANDS[it[2]]}.</p>
      <div class="big" id="tmEm"></div><p id="tmTxt" class="mb-1"></p>
      <input id="tm" type="range" min="0" max="4" value="0" class="form-range" aria-label="Time machine">
      <div id="tmTick" class="fw-bold"></div>`,
      [["What should we do with it?",()=>{close();act(i)}]],
      `${ok?"Great guess!":"Not quite."} It lasts ${BANDS[it[2]]}.`);
     const show=t=>{
      const gone=t>=GONE[it[2]];
      $("tm").value=t;$("tmTick").textContent=TICKS[t];
      $("tmEm").textContent=gone?"\u{1F331}":it[0];
      $("tmEm").style.opacity=gone?1:Math.max(.35,1-t*(it[2]===3?.1:.25)).toFixed(2);
      $("tmTxt").textContent=gone?"Gone! It turned into soil.":t===0?"This is how it looks today.":it[2]===3&&t===4?"Still here, or broken into tiny pieces!":"Still here, but slowly breaking down.";
     };
     $("tm").oninput=e=>{clearTimeout(timer);show(+e.target.value)};
     let t=0;show(0);
     const step=()=>{if(++t<=4){show(t);timer=setTimeout(step,900)}};
     timer=setTimeout(step,900);
    }
    function act(i){
     const it=S.set[i];
     const good=[].concat(it[3]),opts=shuffle(ACTS.map((a,k)=>[a,good.includes(k)]));
     dlg(`<div class="big">${it[0]}</div><h2>What is the best thing to do with ${it[1].toLowerCase()}?</h2><p id="fact" class="fact"></p>`,
      opts.map(([a,ok])=>[a,e=>{
       $("dlgBtns").querySelectorAll(".opt").forEach((b,j)=>{b.disabled=true;if(opts[j][1])b.classList.add("right")});
       if(!ok)e.currentTarget.classList.add("wrong");else{S.stars++;Sprouty.add(1)}
       $("fact").textContent=(ok?cheer()+" +1 star. ":oops()+" ")+it[4]+(good.length>1?` ${good.map(k=>ACTS[k]).join(" and ")} both work!`:"");
       const n=document.createElement("button");
       n.className="btn btn-lg btn-success mt-2";n.textContent="Next";
       n.onclick=()=>{close();S.done.add(i);S.done.size===S.set.length?caseDone():render()};
       $("dlgBtns").appendChild(n);n.focus();
      },"opt btn-outline-success"]),
      `What is the best thing to do with ${it[1]}?`);
    }
    function caseDone(){Sprouty.add(5);
     render();
     const last=S.c===CASES.length-1;
     if(!last)return dlg(`<div class="big">\u{1F50D}</div><h2>Case closed!</h2><p>You have ${S.stars} stars so far.</p>`,
      [["Next case",()=>{close();S.c++;S.done=new Set();S.set=draw5(S.c);render()}]],"Case closed!");
     Sprouty.add(10);const st=store.get();st.best=Math.max(st.best||0,S.stars);st.played=(st.played||0)+1;store.set(st);
     dlg(`<div class="big">\u{1F3C6}</div><h2>All cases solved!</h2><p>${S.stars} of ${MAX} stars</p><p class="fact">You are a ${title(S.stars)}!</p>${Sprouty.beat(S.stars)}<p>\u{1F330} +${Sprouty.session()} seeds earned!</p>`,
      [["Challenge a friend",()=>Sprouty.share(S.stars,MAX),"btn-warning"],["Play again",()=>{close();start()}],["Menu",()=>{close();menu()},"btn-outline-success"]],`All cases solved! You are a ${title(S.stars)}.`);
    }
    function start(){Sprouty.resetSession();S={c:0,done:new Set(),stars:0,set:draw5(0)};$("menu").hidden=true;$("play").hidden=false;render()}
    function menu(){setTimeout(()=>{$("challenge").textContent=Sprouty.challengeText();$("stats").textContent+=($("stats").textContent?" · ":"")+"\u{1F330} "+Sprouty.coins()+" seeds"},0);
     $("play").hidden=true;$("menu").hidden=false;
     const b=store.get().best;
     $("stats").textContent=b?`Best score: ${b}/${MAX} (${title(b)})`:"";
    }
    
    $("start").onclick=start;
    $("toMenu").onclick=()=>dlg(`<div class="big">\u{1F3E1}</div><h2>Leave this mystery?</h2><p>Your stars will be lost.</p>`,
     [["Keep playing",close],["Leave",()=>{close();menu()},"btn-outline-danger"]]);
    menu();
    })();