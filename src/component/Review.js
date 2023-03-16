import React, {  useState,useEffect } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef,db } from '../firebase/Firebase';
import { addDoc, doc, updateDoc,query,where ,getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appstate } from '../App';


function Review({id,prevRating, userRated }) {
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate();
  const[rating,setRating]=useState(0);
  const[loading, setLoading] = useState(false)
  const [form,setForm] = useState("")
  const[data,setData] = useState([])
  const[reviewsLoading,setReviewsLoading]=useState(false);
  const[newAdd, setNewAdd]=useState(0)

  const sendReview = async() =>{
    setLoading(true)
    try{
      if(useAppstate.login){
      await addDoc(reviewsRef,{
        moviesid:id,
        name: useAppstate.userName,
        rating: rating,
        thought: form,
        timestamp: new Date().getTime()

      })
      const docRef = doc(db,"Reviewy",id)
      await updateDoc(docRef,{
        rating: prevRating + rating,
        rated:userRated + 1

      })
      setRating(0)
      setForm("")
      setNewAdd(newAdd + 1)
      swal({
        title: "Review Send",
        icon:"success",
        buttons: false,
        timer: 3000
       })
      }else{
        navigate('/login')
      }
    }
 
    catch (error){
      swal({
        title: error.message,
        icon:"error",
        buttons: false,
        timer: 3000
       })
    }
    setLoading(false)
  }
  useEffect(() => {
    async function getData() {
        setReviewsLoading(true);
        setData([]);
        let quer = query(reviewsRef, where('moviesid', '==', id))
        const querySnapshot = await getDocs(quer);

        querySnapshot.forEach((doc) => { 
            setData((prev) => [...prev, doc.data()])
        })

        setReviewsLoading(false);
    }
    getData();
},[newAdd])
  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
    <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
    />
    <input 
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='Share Your thoughts...'
        className='w-full p-2 outline-none header'
    />
    <button onClick={sendReview} className='bg-green-600 flex justify-center w-full p-2'>
        {loading ? <TailSpin height={20} color="white" /> : 'Share'}
    </button>
{console.log(id)}
    {reviewsLoading ? 
        <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div>
    :
    <div className='mt-4'>
        {data.map((e, i) => {
          
            return(
                <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                    <div className='flex items-center'>
                        <p className='text-blue-500'>{e.name}</p>
                        <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                    </div>
                    <ReactStars
                        size={15}
                        half={true}
                        value={e.rating}
                        
                        edit={false}
                    />

                    <p>{e.thought}</p>
                </div>     
            )
        })}
    </div>
    }
</div>
)
}

export default Review