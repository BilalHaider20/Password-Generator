import React, { useCallback } from 'react'
import { useState,useEffect,useRef } from 'react'
function App() {
  const [length, setlength] = useState(8);
  const [isNumberAllowed, setNumber] = useState(false);
  const [isCharacterAllowed, setCharacter] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);
  const PasswordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxyz";
    if (isNumberAllowed)
      str += "1234567890";
    if (isCharacterAllowed)
      str += "!@#$%&*()";
    for (let i = 0; i <length; i++)
    {
      let Char = Math.floor(Math.random() * str.length );
      password += str.charAt(Char);
    }
    setpassword(password);
  },[isCharacterAllowed,isNumberAllowed,length,setpassword])
  
  useEffect(() =>
  {
    PasswordGenerator()
  }, [length, isNumberAllowed, isCharacterAllowed, PasswordGenerator])
  
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  },[password]);
  return (
    <div className="bg-[url('./images/background.jpg')] bg-repeat-no-repeat bg-cover w-full h-screen text-white flex items-center ">
      <div className='text-3xl text-center mx-auto bg-gray-800 rounded-lg w-[50%]'>
        Password Generator
      <div className='flex flex-wrap justify-center align-center gap-2' >
          <input type="text " value={password} ref={passwordRef} readOnly className='my-2 text-red-500 outline-none w-[70%]'/>
        <label htmlFor=""><button className='my-2 text-[15px] bg-blue-600 rounded-lg h-11 px-3 ' onClick={copyPassword}>Copy</button></label>
        </div>
        <div>
          <input type="range" min={5} max={50} value={length} onChange={(e)=>setlength(e.target.value)}/>
        </div>
        <div className='text-[15px] text-orange-500'>
          <div>length:{length}</div>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <input type="checkbox" defaultChecked={isCharacterAllowed} onChange={() => { setCharacter((prev) => !prev) }}/>
          <label htmlFor="characterinput" className='px-1'>character</label>
        </div>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <input type="checkbox" defaultChecked={isNumberAllowed} onChange={() => { setNumber((prev) => !prev) }} />
          <label htmlFor="numberinput" className='px-2'>number</label>
        </div>
    </div>
      </div>
    </div>
  )
}

export default App