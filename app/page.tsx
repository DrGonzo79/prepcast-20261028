"use client";
import {FormEvent,useMemo,useState} from "react";
import {scoreSpot,spots} from "../lib/scoring";

export default function Home(){
  const [spotId,setSpotId]=useState(spots[0].id); const [rain,setRain]=useState(25); const [temp,setTemp]=useState(72);
  const [submitted,setSubmitted]=useState(false); const [gross,setGross]=useState(""); const [logged,setLogged]=useState<number[]>([]); const [error,setError]=useState("");
  const spot=spots.find(s=>s.id===spotId) || spots[0]; const brief=useMemo(()=>scoreSpot(spot,rain,temp),[spot,rain,temp]);
  function generate(e:FormEvent){e.preventDefault();setError("");setSubmitted(true)}
  function logOutcome(e:FormEvent){e.preventDefault();const value=Number(gross);if(!Number.isFinite(value)||value<0||value>50000){setError("Enter actual gross between $0 and $50,000.");return} setLogged([...logged,value]);setGross("");setError("")}
  return <main>
    <header><div className="brand"><span>PC</span> PrepCast</div><div className="demo">DEMO · FICTIONAL DATA</div></header>
    <section className="hero"><p className="eyebrow">THE 6:00 AM SPOT CALL</p><h1>Prep for the day you’ll have.<br/><em>Not the one you hope for.</em></h1><p>Turn tomorrow’s forecast, venue fee, and your own sales history into one explainable call.</p></section>
    <section className="workspace">
      <form className="controls" onSubmit={generate} aria-label="Brief inputs"><div><p className="step">01 · PICK THE RUN</p><label htmlFor="spot">Tomorrow’s spot</label><select id="spot" value={spotId} onChange={e=>{setSpotId(e.target.value);setSubmitted(false)}}>{spots.map(s=><option key={s.id} value={s.id}>{s.name} · {s.day}</option>)}</select></div>
        <div className="range"><label htmlFor="rain">Rain probability <strong>{rain}%</strong></label><input id="rain" type="range" min="0" max="100" value={rain} onChange={e=>{setRain(Number(e.target.value));setSubmitted(false)}}/></div>
        <div className="range"><label htmlFor="temp">Service temperature <strong>{temp}°F</strong></label><input id="temp" type="range" min="20" max="120" value={temp} onChange={e=>{setTemp(Number(e.target.value));setSubmitted(false)}}/></div>
        <div className="spotmeta"><span>3 visits on file</span><span>{spot.feeType==="flat"?`$${spot.feeValue} fee`:`${spot.feeValue}% fee`}</span><span>{spot.baselineUnits} unit baseline</span></div><button className="primary" type="submit">Generate morning brief →</button>
      </form>
      <article className={`brief ${submitted?"ready":""}`} aria-live="polite"><p className="step">02 · THE CALL</p>{!submitted?<div className="empty"><span>☀</span><h2>Your brief is ready to run</h2><p>Adjust the demo forecast and generate an explainable recommendation.</p></div>:<><div className="callrow"><div className={`call ${brief.call.toLowerCase()}`}>{brief.call}</div><div className="score"><b>{brief.score}</b><span>SPOT SCORE</span></div></div><h2>{spot.name}</h2><p className="lede">Prep <b>{brief.prepUnits} units</b>. Expected gross <b>${brief.expectedGross.toLocaleString()}</b> with estimated contribution of <b>${brief.expectedProfit.toLocaleString()}</b>.</p><div className="metrics"><div><span>WEATHER DRAG</span><b>−{brief.weatherDrag}%</b></div><div><span>PREP VS BASELINE</span><b>{brief.prepUnits-spot.baselineUnits} units</b></div></div><ul>{brief.reasons.map(r=><li key={r}>{r}</li>)}</ul><form className="outcome" onSubmit={logOutcome}><label htmlFor="gross">Close the loop: actual gross</label><div><input id="gross" inputMode="numeric" placeholder="$ e.g. 1125" value={gross} onChange={e=>setGross(e.target.value)}/><button>Log outcome</button></div>{error&&<p role="alert">{error}</p>}{logged.length>0&&<p className="success">✓ {logged.length} demo outcome{logged.length>1?"s":""} logged locally</p>}</form></>}</article>
    </section>
    <section className="how"><p className="eyebrow">WHY THIS CALL</p><h2>No black box. Three signals, shown.</h2><div><article><b>01</b><h3>Forecast</h3><p>Rain and temperature apply visible demand haircuts.</p></article><article><b>02</b><h3>Spot economics</h3><p>Flat or percentage venue fees change the true call.</p></article><article><b>03</b><h3>Your history</h3><p>Only the truck’s own prior sales set the baseline.</p></article></div></section>
    <footer><b>PrepCast</b><span>Prototype only · no live weather, SMS, AI, or backend deployment</span></footer>
  </main>
}
