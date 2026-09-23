import { Song } from "../services/itunesApi";

export const MusicCard = ({ song }: { song: Song }) => {
  return (
    <div className="bg-neutral-800 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col items-center border border-neutral-700 text-white">
      <img
        src={song.artworkUrl100.replace('100x100', '300x300')} 
        alt={song.trackName}
        className="w-full aspect-square object-cover rounded-lg mb-4 shadow-md"
      />
      <h2 className="text-lg font-bold text-center truncate w-full" title={song.trackName}>
        {song.trackName}
      </h2>
      <p className="text-neutral-400 mb-6 text-sm text-center truncate w-full">
        {song.artistName}
      </p>
      
      {song.previewUrl && (
        <audio controls className="w-full h-9 mt-auto custom-audio">
          <source src={song.previewUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};