import React, { useRef, useState } from 'react'
import './Card.css'
import { Footer } from './Footer'

const Card = () => {
    const audioRef = useRef(null)
    const [isPlay, setIsPlay] = useState({ play: false })
    const [show, setShow] = useState({})
    const getData = () => {
        const data = JSON.parse(localStorage.getItem("cardData"))
        return data
    }
    const handleDivClick = () => {
        switchPlay()
        if (audioRef.current) {
            if (isPlay.play) {
                audioRef.current.play();
                setShow(prev => ({ ...prev, show: true }))
            } else {
                audioRef.current.pause()
            }
        }
    };

    const switchPlay = () => {
        setIsPlay(prev => ({ ...prev, play: !prev.play }))
    }

    return (
        <div className="w-full h-screen p-6 bg-slate-900 relative overflow-hidden">
            <img alt='hamil' src='hamil.png' className='absolute -left-2 bottom-0 scale-[4] filter brightness-50 opacity-20 z-[1]' />
            <div>
                <h1 className='text-6xl text-slate-300'>Ibu</h1>
                <h1 className='text-2xl text-slate-500'>Aku Punya Sesuatu Untuk Mu</h1>
            </div>
            <div className='grid place-items-center'>
                <audio ref={audioRef} controls className='hidden'>
                    <source src="/ibu.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>

                <div className='grid place-items-center w-full relative z-10 mt-7 h-60 overflow-hidden bg-yellow-400 rounded-tr-2xl rounded-tl-2xl'>

                    <div className='w-20 h-20 bg-red-800 rounded-full'></div>

                    {show.show && (
                        <div className='surat absolute -top-7 left-0 grid place-items-center w-full z-10 mt-7 h-60 bg-white rounded-tr-2xl rounded-tl-2xl'>
                            <div className='relative grid place-items-center h-full'>
                                <div>
                                    <h1 className='text-pink-600 text-4xl text-center font-extrabold'>Selamat Hari Ibu</h1>
                                    <p className='text-pink-600 text-4xl text-center font-extrabold'>{getData().to}</p>
                                </div>
                                <p className='absolute bottom-2 text-center font-medium tracking-tight'>Dari {getData().from} Anak Mu Yang Sangat Lucu</p>
                            </div>
                        </div>
                    )}

                </div>

                <button className='px-9 py-2 rounded-md text-white tracking-widest font-bold mt-5 bg-slate-950 relative z-10 shadow-2xl' onClick={() => handleDivClick()}>Buka</button>
            </div>
            <Footer />
        </div>
    )
}

export default Card