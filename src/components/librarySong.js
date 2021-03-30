import React from "react";

const LibrarySong = ({ songs, song, setCurrentSong, isPlaying, audioRef }) => {
  const clickSongHandler = async () => {
    await setCurrentSong(song);
    songs.forEach((s) => {
      s.active = false;
    });
    song.active = true;
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  return (
    <div
      className={`librarySong ${song.active ? "selected" : ""}`}
      onClick={clickSongHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-des">
        <p className="librarySong__name">{song.name}</p>
        <p className="librarySong__artist">{song.artist}</p>
      </div>
    </div>
  );
};

export default LibrarySong;
