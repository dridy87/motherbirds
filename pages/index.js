import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { DataScroller } from 'primereact/datascroller';
import YoutubePlayer from "../components/youtubu";

import store, { addTimeline } from '../common/store';
import { Provider } from 'react-redux';
import Axios from "axios";

import styles from '../components/header.module.css'
export default function Home() {

 
  const [videoId, setVideoId] = useState(null);
  const [data, setData] = useState([]);
  const API_URL =
    "/api/billboard";

  function getData() {
    setData(null);
    Axios.get(API_URL).then((res) => {
      setData(res.data);
      setVideoId(res.data[0].videoId)
    })
  }

  useEffect(()=>{
    getData();
  },[])
  

  const itemTemplate = (data) => {
    return (
      <div className="product-item"  >
        <img src={`${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name}
          onClick={() => {
            setVideoId(data.videoId);
            // let today = new Date();

            // store.dispatch(addTimeline({ time: today.toLocaleString(), data: data }));
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
      <React.StrictMode>
      <div className={styles.container}>
        <Head>
          <title>Billboard Chart YouTube</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
        
          <YoutubePlayer videoId={videoId} data={data}   />
          <div className="datascroller-demo">
            <div className="card">
              <DataScroller value={data} itemTemplate={itemTemplate}
                rows={10} inline scrollHeight="530px" header="List of Billboard Chart" />
            </div>

          </div>
        </main>
        
      </div>
      </React.StrictMode>
    </Provider>
  )
}
