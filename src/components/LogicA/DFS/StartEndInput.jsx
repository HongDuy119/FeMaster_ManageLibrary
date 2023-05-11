import React from "react";

function StartEndInput({ start, end, setStart, setEnd }) {
  const handleStartChange = (event) => {
    setStart(parseInt(event.target.value));
  };

  const handleEndChange = (event) => {
    setEnd(parseInt(event.target.value));
  };

  return (
    <div>
      <label>
        Đỉnh bắt đầu:
        <input type="number" value={start} onChange={handleStartChange} />
      </label>
      <label>
        Đỉnh kết thúc:
        <input type="number" value={end} onChange={handleEndChange} />
      </label>
    </div>
  );
}

export default StartEndInput;
