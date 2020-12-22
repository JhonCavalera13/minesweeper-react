import React, { useState, useEffect } from "react";
let timeIntervalId;
export default function Timer({ gameOver, sendTime }) {
  let [time, setTime] = useState(0);

  useEffect(() => {
    function incrementTime() {
      setTimeout(() => {
        let newTime = time + 1;
        setTime(newTime);
      }, 1000);
    }
    incrementTime();
  }, [time]);
  
  return (
    <div style={{ color: "white", fontSize: 20, background: "#ccc", marginBottom: '10px' }}>
      <div>
        <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
          ⏰
        </span>
        {time}
      </div>
    </div>
  );
}