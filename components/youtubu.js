
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';

export default function Example(props) {
    // const [videoId, setVideoId] = useState(props.videoId);
    const [player, setPlayer] = useState(null);
    const [isReady, setReady] = useState(false);

    useEffect(() => {

        if(player != null){
            let index = props.data.findIndex(t => t.videoId == props.videoId);
            player.loadPlaylist(props.data.map(t=>t.videoId), index)
            // player.playVideo()
        }

       

    });

    const onReady = (event) => {
        if(props.videoId != null){
            console.log(`YouTube Player object for videoId: "${props.videoId}" has been saved to state.`);
            setPlayer(event.target);
            setReady(true);
        }
        
    };


    const opts = {
        width: '100%',
        height: '300',
        autoplay: 1
      };


    return (
        <div className="youtubu">
            <YouTube opts={opts} videoId={props.videoId} onReady={onReady} />
        </div>
    );
}

