import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

const Trello = () => {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourSelector);
  const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMinute(+e.currentTarget.value);
  };
  const onHourChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHour(+e.currentTarget.value);
  };
  return (
    <div>
      <input
        type="number"
        onChange={onMinutesChange}
        value={minute}
        placeholder="Minutes"
      />
      <input
        onChange={onHourChange}
        type="number"
        value={hour}
        placeholder="Hours"
      />
    </div>
  );
};

export default Trello;
