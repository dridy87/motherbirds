import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { DataScroller } from 'primereact/datascroller';

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://localhost/api/billboard')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { 
      posts,
    },
  }
}

export default function Home({ posts }) {

  const [player, setPlayer] = useState(null);


  const opts = {
    height: '300',

  };

  const onReady = (event) => {
    // eslint-disable-next-line
    console.log(`YouTube Player object for videoId: "${props.videoId}" has been saved to state.`);
    setPlayer(event.target);


    player.playVideo();
  };

  const onPlayVideo = () => {
    player.playVideo();
  };

  const onPauseVideo = () => {
    player.pauseVideo();
  };

  const onChangeVideo = () => {
    setVideoId(videoId === videoIdA ? videoIdB : videoIdA);
  };

  const itemTemplate = (data) => {
    return (
      <div className="product-item">
        <img src={`${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
        <div className="product-detail">
          <div className="product-name">{data.title}</div>

        </div>

        <div className="product-action">
          <span className="product-price">{data.artist}</span>
          {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.rank === 'OUTOFSTOCK'}></Button> */}
          {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
        </div>
      </div>
    );
  }


  if (!posts) return <div>Loading...</div>
  return (
    

    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <YouTube opts={opts}  videoId={posts[0].videoId} />
      <div className="datascroller-demo">
          <div className="card">
          <DataScroller value={posts} itemTemplate={itemTemplate}
            rows={5} inline scrollHeight="470px"  header="List of Products" />
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
  )
}
