import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  songInfo,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
  currentSong,
}) => {
  // events
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const libraryActiveHandler = (songActive) => {
    songs.forEach((s) => {
      s.active = false;
    });
    songActive.active = true;
  };

  const skipTrackHandler = async (status) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (status === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      libraryActiveHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (status === "skip-back") {
      if (currentIndex - 1 === -1) {
        currentIndex = songs.length - 1;
      }
      await setCurrentSong(songs[currentIndex - 1]);
      libraryActiveHandler(songs[currentIndex - 1]);
    }

    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min="0"
          max={songInfo.durationTime || 0}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
          name=""
          id=""
        />
        <p>{songInfo.durationTime ? getTime(songInfo.durationTime) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
};

export default Player;
