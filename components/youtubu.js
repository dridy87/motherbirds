
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';

export default function Example(props) {
    // const [videoId, setVideoId] = useState(props.videoId);
    const [player, setPlayer] = useState(null);
    const [isReady, setReady] = useState(false);

    useEffect(() => {

        if(player != null){
            player.playVideo()
        }

        console.log(props)

    });

    const onReady = (event) => {
        console.log(`YouTube Player object for videoId: "${props.videoId}" has been saved to state.`);
        setPlayer(event.target);
        setReady(true);
    };


    const opts = {
        width: 'fit-content',
        height: '250',
      };


    return (
        <div>
            <YouTube opts={opts} videoId={props.videoId} onReady={onReady} />
        </div>
    );
}

