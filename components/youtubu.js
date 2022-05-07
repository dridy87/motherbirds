
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';

export default function Example(props) {
    // const [videoId, setVideoId] = useState(props.videoId);
    const [player, setPlayer] = useState(null);
    // const [isReady, setReady] = useState(false);

    useEffect(() => {
        
        if(player != null && props.videoId != null){
            let index = props.data.findIndex(t => t.videoId == props.videoId);
            player.loadPlaylist(props.data.map(t=>t.videoId), index)
        }

       

    });

    const onReady = (event) => {

        setPlayer(event.target);

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

