/* eslint-disable no-undef */

import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { store } from "./utils";
function App() {
  const [inputCurrent, setInputCurrent] = useState("");
  const [inputPre, setInputPre] = useState("");
  const [inputCurl, setInputCurl] = useState("");

  const [valueConvert, setValueConvert] = useState("");

  const handleInputCurrent = (e) => {
    const value = e.target.value;
    store.set({
      inputCurrent: value,
    });
    setInputCurrent(value);
  };
  const handleInputPre = (e) => {
    const value = e.target.value;
    store.set({
      inputPre: value,
    });
    setInputPre(value);
  };
  const handleInputCurl = (e) => {
    const value = e.target.value;
    store.set({
      inputCurl: value,
    });
    setInputCurl(value);
  };

  const handleConvert = () => {
    const regex = new RegExp(inputCurrent, "g");
    const value = inputCurl.replace(regex, inputPre);
    navigator.clipboard.writeText(value);
    setValueConvert(value);
  };
  useEffect(()=>{
    chrome.storage.local.get(null, function(data) {
      setInputCurrent(data?.inputCurrent);
      setInputPre(data?.inputPre);
      setInputCurl(data?.inputCurl);
      setValueConvert(data?.valueConvert);
    });
  },[])


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding:"20px"
      }}
    >
      <div style={{ display: "flex", gap: 10, marginBottom: "10px" }}>
        <Input placeholder="" value={inputCurrent} onChange={handleInputCurrent} />
        <Input value={inputPre} onChange={handleInputPre} />
      </div>
      <Input.TextArea
        autoSize={{ minRows: 10, maxRows: 11 }}
        value={inputCurl}
        onChange={handleInputCurl}
      />
      <Button style={{ marginTop: "10px" }} onClick={handleConvert}>
        Convert
      </Button>
      <div style={{marginTop: "10px"}}>{valueConvert}</div>
    </div>
  );
}

export default App;
