import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import HslToHex from '../components/HslToHex'
import PropertyLine from '../components/PropertyLine'
export default function Home() {

  //const [currentColor, setCurrentColor] = useState('#ee2')
  const [hue, setHue] = useState(33)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)
  const [HEXColor, setHEXColor] = useState(HslToHex(hue, saturation, lightness))
  const [textColor, setTextColor] = useState("black")

  let currentColor = `hsl(${hue},${saturation}%,${lightness}%)`
  //let HEXColor = HslToHex(hue, saturation, lightness)


  function ToHSL(hex) {
    let HEX_LEN = hex.toString().split("#").length
    if (HEX_LEN === 2) {
      setHEXColor(hex)
    }
    if (HEX_LEN === 1) {
      setHEXColor("#" + hex)
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toString());

    if (result === null) {
      return [0, 0, 0]
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);
    //console.log(`hsl(${h},${s},${l})`);

    return ([h, s, l]);

  }

  const handleWorkingHexInput = (hex) => {
    let hsl = ToHSL(hex)
    console.log(hsl);
    let h = hsl[0]
    let s = hsl[1]
    let l = hsl[2]
    //console.log(h);
    setHue(h)
    setSaturation(s)
    setLightness(l)
  }

  const handleTextColorInput = (hex) => {
    let HEX_LEN = hex.toString().split("#").length
    if (HEX_LEN === 2) {
      setTextColor(hex)
    }
    if (HEX_LEN === 1) {
      setTextColor("#" + hex)
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toString());

    if (result === null) {
      return "black"
    }
  }
  useEffect(() => {
    setHEXColor(HslToHex(hue, saturation, lightness))
  }, [hue, saturation, lightness])

  return (
    <>
      <Head>
        <title>HSL Color Picker</title>
        <meta name="description" content="HSL color picker - Color / shades picking tool - Easily convertible from HSL to HEX" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
      </Head>

      <div className="container mx-auto flex flex-row items-start justify-center gap-36 p-16 border ">
        <div className="flex flex-col justify-start items-center space-y-4">
          <div className="flex flex-row justify-start items-center space-x-8">
            <div className='w-32 h-32' style={{ backgroundColor: HEXColor }}></div>
          </div>
          <div className=" flex flex-row justify-between items-center w-[300px]">

            <div className=" flex flex-row ">
              <p className='mr-4'>Working color </p>
              <p>{HEXColor}</p>
            </div>

            <input type="text" name="hue" className='custom-input' id="hue" value={HEXColor} onChange={(e) => { handleWorkingHexInput(e.target.value) }} />
          </div>

          <PropertyLine label={"H"} value={hue} max={360} setValue={setHue} />
          <PropertyLine label={"S"} value={saturation} setValue={setSaturation} />
          <PropertyLine label={"L"} value={lightness} setValue={setLightness} />

        </div>

        <div className="flex flex-col justify-start items-start gap-4 ">
          <div className="w-32 h-32 text-5xl p-3 flex flex-row justify-start items-center" style={{ backgroundColor: HEXColor, color: textColor }}>
            <p>Abc</p>
          </div>
          <div className=" flex flex-row justify-between items-center w-[300px]">

            <div className=" flex flex-row ">
              <p className='mr-4'>Working color </p>
              <p>{HEXColor}</p>
            </div>

            <input type="text" name="hue" className='custom-input' id="hue" value={HEXColor} onChange={(e) => { handleWorkingHexInput(e.target.value) }} />
          </div>

          <div className=" flex flex-row justify-between items-center w-[300px]">
            <div className="flex flex-row">
              <p className='mr-4'>Text color</p>
              <p>{textColor}</p>
            </div>

            <input type="text" name="hue" className='custom-input ' id="hue" value={textColor} onChange={(e) => { handleTextColorInput(e.target.value) }} />
          </div>
        </div>

      </div>

      <footer className='bottom-0 absolute container p-20 border-t-2 border-natural-500'>
        <div className="flex flex-row justify-start items-center space-x-8">
          <p>Create By Aziz Abdullaev for working with colors based on knowledge from Refactoring UI.</p>
          <a href="https://github.com/azyzz228/hsl-color-picker" target={"_blank"} ><i className="fa-brands fa-github text-4xl transition hover:scale-110"></i></a>
        </div>
      </footer>
    </>
  )
}
