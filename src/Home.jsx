import { useEffect, useState } from "react"
import { Footer } from "./Footer"
import SweetAlert2 from "react-sweetalert2"
import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    from: "",
    to: "",
    message: ""
  })
  const [swalProps, setSwalProps] = useState({});

  useEffect(() => {
    console.log(swalProps)
  }, [swalProps])

  const handleSetData = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: [e.target.value]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const valueObjToArr = Object.values(data)
    if (valueObjToArr[0].length !== 0 && valueObjToArr[1].length !== 0 && valueObjToArr[2].length !== 0) {
      localStorage.setItem("cardData", JSON.stringify(data))
      setSwalProps({
        show: true,
        title: 'Succes',
        text: 'Here we go!',
        icon: 'success',
        confirmButtonText: `<i class="fa fa-thumbs-up"></i> Next!`,
      });
    } else {
      setSwalProps({
        show: true,
        title: 'Error',
        text: 'The Form Must Be Filled In',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
        // confirmButtonText: `<i class="fa fa-thumbs-up"></i> Next!`,
      });
    }
  }

  return (
    <div className="w-full h-screen p-6 flex flex-col justify-evenly bg-slate-900">
      <div className="w-full grid place-items-center ">
        <h1 className="text-3xl font-bold tracking-wide text-center text-slate-300">Mother's Greeting
          <span className="text-lime-500"> Card Maker</span>
        </h1>
      </div>

      <SweetAlert2   
        {...swalProps}
        didClose={() => {
          setData(prev => ({
            ...prev,
            from: "",
            to: "",
            message: ""
          }));
          setSwalProps(prev => ({
            ...prev,
            show: false
          }));
        }}
        onConfirm={result => {
          navigate('/card');
        }}
      />

      <div className="w-full h-4/5 flex justify-center">
        <form onSubmit={(e) => handleSubmit(e)}
          className="w-[90%] flex flex-col gap-7 mt-4"
          action="" method="">
          <div className="flex flex-col">
            <label className="text-slate-300 font-medium tracking-wide">From</label>
            <input name="from" value={data.from} onChange={(e) => handleSetData(e)}
              className="p-2 bg-transparent outline-none border-b-2 text-slate-200 text-sm border-slate-600"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-slate-300 font-medium tracking-wide">To</label>
            <input name="to" value={data.to} onChange={(e) => handleSetData(e)}
              className="p-2 bg-transparent outline-none border-b-2 text-slate-200 text-sm border-slate-600"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-slate-300 font-medium tracking-wide">Message</label>
            <textarea rows="5" value={data.message} name="message" onChange={(e) => handleSetData(e)}
              className="p-2 bg-transparent outline-none border-b-2 text-slate-200 text-sm border-slate-600"></textarea>
          </div>
          <div className="flex justify-evenly">
            <button className="px-10 py-2 bg-lime-500 rounded-md text-slate-900 font-bold text-lg transition-all hover:bg-lime-600">Generate</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Home