import React from "react";
import LibrarySong from "./librarySong";

const Library = ({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "library-active" : ""}`}>
      <h2>Library</h2>
      <div className="librarySongs">
        {songs.map((song) => {
          return (
            <LibrarySong
              songs={songs}
              song={song}
              setCurrentSong={setCurrentSong}
              key={song.id}
              isPlaying={isPlaying}
              audioRef={audioRef}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
