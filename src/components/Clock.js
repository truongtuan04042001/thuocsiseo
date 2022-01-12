import React, { useEffect, useState } from "react";

const Clock = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    //console.log(time);
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);

    return () => getTimeUntil(deadline);
  }, [deadline]);

  return (
    <div className="Clock-parent" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div className="Clock-days">
        <div className="Clock_days_title">
          {leading0(days)}
        </div>
        <div style={{color:'black'}}>Ngày</div>
      </div>
      <div className="Clock-hours">
        <div className="Clock_hours_title">
          {leading0(hours)}
        </div>
        <div style={{color:'black'}}>Giờ</div>
      </div>
      <div className="Clock-minutes">
        <div className="Clock_minutes_title">
          {leading0(minutes)}
        </div>
        <div style={{color:'black'}}>Phút</div>
      </div>
      <div className="Clock-seconds">
        <div className="Clock_seconds_title">
          {leading0(seconds)}
        </div>
        <div style={{color:'black'}}>Giây</div>
      </div>
    </div>
  );
};

export default Clock;
