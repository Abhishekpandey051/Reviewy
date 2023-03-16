
import {getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {ThreeDots } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { moviesRef } from '../firebase/Firebase';
import { Link } from 'react-router-dom';

export default function Card() { 
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const data1 = await getDocs(moviesRef)
      console.log(data1);
      data1.forEach((doc) => {
        setData((prv) => [...prv, {...(doc.data()),id:doc.id}])
      })
      setLoading(false);
    }
    getData();
  },[])
  return (
    <div className='flex flex-wrap justify-between px-3 mt-2'>
    {loading ? <div className='w-full flex justify-center items-center h-96'><ThreeDots height={40} color="white" justify-center /></div>:
    data.map((e, i) => {
        return (
          <Link to={`/detail/${e.id}`}><div key={i} className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
            <img className="h-60 md:h-72" alt='pic' src={e.image} />
            <h1>
              {e.title}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-500 mr-1">Rating:</span>
              <ReactStars
                size={20}
                half={true}
                value={e.rating/e.rated}
                edit={false}
              />
            </h1>
            <h1>
              <span className="text-gray-500">Year:</span> {e.year}
            </h1>
           
          </div></Link>
        );
      })
    }
    </div>
  );
};

