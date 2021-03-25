import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { DataScroller } from 'primereact/datascroller';
import YoutubePlayer from "../components/youtubu";
import useSWR from 'swr';
import store, { addTimeline } from '../common/store';
import { Provider } from 'react-redux'
const fetcher = (url) => fetch(url).then((res) => {
  return res.json()
})
// This function gets called at build time

import {
  useSession, signIn, signOut
} from 'next-auth/client'

import styles from '../components/header.module.css'



export default function Home() {

  const [ session, loading ] = useSession();
  const [videoId, setVideoId] = useState();
  const { data, error } = useSWR('/api/billboard', fetcher, {

    onSuccess: (data) => {
      if (videoId == undefined)
        setVideoId(data[0].videoId)
    }
  })

  // function getStringDate(data){
  //   let time = new Date(data[0]);

  //   console.log(time.getFullYear(), time.getMonth() + 1, time.getDate());
  //   console.log('시초가', data[1])
  //   console.log('고가', data[2])
  //   console.log('저가', data[3])
  //   console.log('종가', data[4])
  //   console.log('거래량', data[5])
  // }

  // function getStringDate1(data){
  //   let time = new Date(data[0]);

  //   return console.log(time.getFullYear(), time.getMonth() + 1, time.getDate());
    
  // }

  // async function getStaticProps() {
  
  //   const res = await fetch(`https://api.alphasquare.co.kr/data/v2/price/candle-history/004270?freq=day`)
  //   const data = await res.json()
  //   // console.log(data)

  //   // let time = new Date(1605139200000);

  //   // console.log(time.getFullYear(), time.getMonth() + 1, time.getDate());

  //   let c = 0;
  //   data.forEach(aa=>{
  //     c += aa[5]
  //   })

  //   console.log(parseInt( c/data.length));

  //   let temp = data.slice(500,600);
    
  //   console.log(temp);
  //   getStringDate(temp[temp.length -1]);
    
  //   let t = temp.filter(t=>t[5] > parseInt( c/data.length)* 10);

  //   console.log(t)
  //   t.forEach(element => {
  //     //  getStringDate(element) 
      
  //     element[1]
  //     getStringDate1(element)
  //     console.log( '이후 눌림목 체크' )
  //      let tttt = data.find(a => element[0] < a[0] && element[1] > a[4] )

  //      if(tttt != undefined)
  //      getStringDate(tttt) 
  //     //  tttt.filter(time => {
  //     //   getStringDate(time) 
  //     //  })
  //     //  console.log(tttt)

  //   });

    

  //   // console.log(t);

    



    
  // }
  // getStaticProps()

  const itemTemplate = (data) => {
    return (
      <div className="product-item"  >
        <img src={`${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name}
          onClick={() => {
            setVideoId(data.videoId);
            let today = new Date();

            store.dispatch(addTimeline({ time: today.toLocaleString(), data: data }));
          }} />
        <div className="product-detail">
          <div className="product-name">{data.rank}. {data.title}</div>
          <div className="product-description">{data.artist}</div>

        </div>

        <div className="product-action">


        </div>
      </div>
    );
  }



  if (!data) return <div>Loading...</div>
  return (


    <Provider store={store}>
      
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>

        <div className ="header">
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}

        </div>
        

          <YoutubePlayer videoId={videoId}   />
          <div className="datascroller-demo">
            <div className="card">
              <DataScroller value={data} itemTemplate={itemTemplate}
                rows={5} inline scrollHeight="470px" header="List of Billboard Chart" />
            </div>

          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </Provider>
  )
}
