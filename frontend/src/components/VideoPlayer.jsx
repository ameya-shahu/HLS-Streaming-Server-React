import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { videoSource } = props;

  const videoPlayerOptions = {
    fluid: true,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
        playToggle: true,
        volumePanel: {
            inline: false
        },
        fullscreenToggle: true
        },
        plugins: {
          httpSourceSelector: { default: "low" }
        },
    sources: [
      {
        src: videoSource,
        type: "application/x-mpegURL"
      }
    ]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, videoPlayerOptions, () => {
        videojs.log("player is ready");
        handlePlayerReady && handlePlayerReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(videoPlayerOptions.autoplay);
      player.src(videoPlayerOptions.sources);
    }
  }, [videoPlayerOptions, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
    >
      <div ref={videoRef} style={{ width: '100%' }}/>
    </div>
  );
};

export default VideoPlayer;