// import React, { useState, useEffect } from 'react';
// import { Inter } from 'next/font/google'
// import Render from './Render/Render'
// import Chat_Bot from './components/Chat_Bot';
// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {

//   const [id, setId] = useState('');
//   const [idLoaded, setIdLoaded] = useState(false);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('id');
//     if (storedUserId) {
//       setId(storedUserId);
//     }
//     setIdLoaded(true);
//   }, []);


//   return (
//     <>
//       {idLoaded ? (id ? <Chat_Bot /> : <Render />) : null}
//     </>
//   )
// }





import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import Render from './Render/Render'
import Chat_Bot from './components/Chat_Bot';
import { useRouter } from 'next/router'; // Import the router

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter(); // Initialize the router

  const [id, setId] = useState('');
  const [idLoaded, setIdLoaded] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      setId(storedUserId);
    } else {
      // If 'id' is not found, redirect to the Render component
      router.push('/');
    }
    setIdLoaded(true);
  }, []);

  return (
    <>
      {idLoaded ? (id ? <Chat_Bot /> : <Render />) : null}
    </>
  )
}
