import React, { useState } from 'react';
import sbd from 'sbd';

function Npl() {
  const [inputText, setInputText] = useState('');
  const [sentences, setSentences] = useState([]);
  const [count1,setCount1] = useState();
  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const result = sbd.sentences(inputText);
    setCount1(result.length)
    setSentences(result);
  }
  function resizeInput() {
    var input = document.getElementById('myInput');
    input.style.height = input.value.length/6 + "px";
  }
  
  return (
    <div>
      <form onSubmit={handleFormSubmit} className='mb-5'>
        <textarea style={{width:"100%",height:"100px"}} id='myInput' onInput={resizeInput} className="form-control" type='text' value={inputText} onChange={handleInputChange} ></textarea><br></br>
        <button type="submit">Split sentences</button><br></br>
      </form>
      <ul>
      {count1>0 &&<h3>Số luợng câu sau khi xử lý là: {count1}</h3>}
        {sentences.map((sentence, index) => (
          <li key={index}>{sentence}</li>
        ))}
      </ul>
    </div>
  );
}

export default Npl;
