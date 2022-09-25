import React, { useEffect, useState } from 'react'

const StopWatch=()=>{

    const [timer, setTimer] = useState(0);
    const [render, setRender] = useState(false);
    const [revRender, setRevRender] = useState(false);

    useEffect(() => {
      let interval, revInterval;
      if(render){
        interval = setInterval(()=>{
            setTimer((prevTime)=>prevTime+10)
        },10)
      }

      else if(revRender){
        revInterval = setInterval(()=>{
            setTimer((prevTime)=>prevTime-10)
        },10)

        if(timer===0){
            setTimer(0);
            setRender(false);
            setRevRender(false);
        }
      }

      else if(!revRender){
        setRevRender(false);
        setRender(false);
        clearInterval(revInterval)
        clearInterval(interval)

      }

      else if(!render && !revRender){
        setTimer(0);
        setRevRender(false);
        setRender(false);
        clearInterval(revInterval)
        clearInterval(interval)
      }

        return()=>{
            clearInterval(interval);
            clearInterval(revInterval)
        }
    }, [timer, render, revRender])
    
  return (
    <div>
        <div>
            <span>{("0"+Math.floor((timer/3600000)%60)).slice(-2)}:</span>
            <span>{("0"+Math.floor((timer/60000)%60)).slice(-2)}:</span>
            <span>{("0"+Math.floor((timer/1000)%60)).slice(-2)}</span>
        </div>
        <div>
            <button onClick={()=>setRender(true)}>Start</button>
            <button onClick={()=>setRender(false)}>Pause</button>
            <button onClick={()=>{setRender(false); setRevRender(false); setTimer(0)}}>Reset</button>
            <button onClick={()=>{setRender(false);setRevRender(true);}}>Reverse</button>
        </div>
    </div>
    )
}

export default StopWatch;