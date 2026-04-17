import React, { useCallback, useEffect, useState, useRef } from 'react'

const App = () => {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [passwordField, setPasswordField] = useState("")

  let passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "`~!@#$%^&*()_+-=[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)

      pass += str.charAt(char)
    }

    setPasswordField(pass)

  }, [length, numberAllowed, charAllowed, setPasswordField])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(passwordField)
    passwordRef.current?.select()
  }, [passwordField])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='text-orange-500 w-[90%] md:max-w-165 bg-gray-800 rounded-lg mx-auto my-10 py-4 px-6'>
      <input type="text" value={passwordField} className='py-2 px-4 bg-gray-200 outline-none w-[78%] md:w-[88%] rounded-bl rounded-ss' placeholder='Password' readOnly ref={passwordRef}/>
      <button className='text-white bg-black py-2 px-4 rounded-br rounded-se cursor-pointer' onClick={copyPasswordToClipboard}>Copy</button>
      <div className='flex flex-col md:flex-row mt-3 gap-2'>
        <input type="range" className='cursor-pointer' min={6} max={20} value={length} onChange={(e) => {setLength(e.target.value)}}/>
        <label>Length: ({length})</label>
        <div className='flex gap-x-2'>
          <input type="checkbox" id='number' defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} />
          <label htmlFor="number">Numbers</label>

          <input type="checkbox" id='character' defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}} />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
