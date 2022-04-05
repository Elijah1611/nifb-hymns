import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import songs from "../songs.json";
import parse from "html-react-parser";
import Link from "next/link";

const Hymn = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    setSelectedSong(songs.filter((song) => song.number === parseInt(id)));
  }, [id, selectedSong, setSelectedSong]);

  return (
    selectedSong && (
      <div className="flex flex-col justify-center items-center mx-4">
        <h1 className="text-3xl my-10">
          #{selectedSong[0]?.number} - {selectedSong[0]?.name}
        </h1>

        <h2 className="mb-2 text-xl font-bold">Chrous</h2>
        <div className="mb-10">
          {selectedSong.map((song) => {
            return song.chorus.map((verse, idx) => <p key={idx}>{verse}</p>);
          })}
        </div>
        <h2 className="mb-2 text-xl font-bold">Verses</h2>
        <div className="mb-10">
          {songs
            .filter((song) => song.number === parseInt(id))
            .map((song) => {
              return song.verses.map((verse, idx) => {
                return (
                  <div key={idx}>
                    {verse.map((line, idx) => {
                      return (
                        <p key={idx} className="text-xs md:text-base">
                          {parse(`${line}`)}
                        </p>
                      );
                    })}
                  </div>
                );
              });
            })}
        </div>
        <Link href="/" passhref>
          <a>Back</a>
        </Link>
      </div>
    )
  );
};

export default Hymn;
