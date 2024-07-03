import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@#@%^@&*():{}~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed,])

  return (
    <>
      <h1 className='text-center text-5xl text-green-700 tracking-tighter mt-[50px] font-extrabold w'>
        Password Generator
      </h1>
      <div className='mx-auto mt-10  bg-zinc-900 rounded-xl p-10 max-w-4xl'>
        <div className='flex items-center justify-center gap-5 mb-[55px]'>
          <input type="text" value={password} placeholder='Password' readOnly ref={passwordRef} className='font-semibold bg-zinc-700 black w-full  px-4 py-2 rounded-[20px]' />
          <button className='text-cyan-500 bg-zinc-800 px-4 py-2 rounded-lg font-semibold' onClick={copyPasswordToClipboard}>Copy</button>
        </div>  
        <div className='flex items-center  gap-5 mb-24'>
          <input type="range" min={6} max={50} value={length} className='slider' onChange={(e) => {setLength(e.target.value)}} />
          <label className='text-cyan-100 font-semibold '>Length: {length}</label>
        </div>
        <div className='flex items-center justify-center gap-44 text-lg text-zinc-500 font-bold ' >
          <div className='flex items-center justify-center gap-2'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" className='cursor-pointer' onChange={() => { setNumberAllowed((prev) => !prev )}} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input className='cursor-pointer' type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={() => { setCharAllowed((prev) => !prev )}} />
            <label htmlFor="characterInput" >Characters</label>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
