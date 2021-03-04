
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';

export default function Example(props) {
    // const [videoId, setVideoId] = useState(props.videoId);
    const [player, setPlayer] = useState(null);
    const [isReady, setReady] = useState(false);

    useEffect(() => {

        if(player != null)
            player.playVideo()
        // 
    });

    const onReady = (event) => {
        // eslint-disable-next-line
        console.log(`YouTube Player object for videoId: "${props.videoId}" has been saved to state.`);
        setPlayer(event.target);
        setReady(true);
    };

    const onPlayVideo = () => {
        player.playVideo();
    };

    const onPauseVideo = () => {
        player.pauseVideo();
    };

    const onChangeVideo = () => {
       
    };

    const opts = {
        height: '250',
    
      };


    return (
        <div>
            <YouTube opts={opts} videoId={props.videoId} onReady={onReady} />
            <button type="button" onClick={onPlayVideo} disabled={!player}>
                Play
      </button>
            <button type="button" onClick={onPauseVideo} disabled={!player}>
                Pause
      </button>
            {/* <button type="button" onClick={onChangeVideo} disabled={!player}>
        Change Video
      </button> */}
        </div>
    );
}

