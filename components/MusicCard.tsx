"use client";
import { useState } from "react";
import { Song } from "../services/itunesApi";
//Este fue uno de los componentes en los cuales se consulto mas con la IA ya que se buscaba que cuando se le diera play se escuchara una parte de la cancion
//Y que si se le daba play a otra la anterior de pausara para no tener audio sobre-puesto, al igual que este se integraron varias transiciones como la del 
//borde amarillo cuando se reproduce alguna parte de cancion sobre nuestra etiqueta/card junto a un pequeño zoom a la portada del album 
export const MusicCard = ({ song, onSelect }: { song: Song; onSelect: () => void }) => {
  
  
  // 1. Estado para saber si esta tarjeta está reproduciendo audio
  const [isPlaying, setIsPlaying] = useState(false);

  // NUEVA FUNCIÓN: Controla que solo suene un audio a la vez
  const handlePlay = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const reproductorGlobal = document.getElementsByTagName('audio');
    for (let i = 0; i < reproductorGlobal.length; i++) {
      if (reproductorGlobal[i] !== e.target) {
        reproductorGlobal[i].pause();
      }
    }
    setIsPlaying(true);
    
    // NUEVO: Le avisamos a la página principal que abra el modal
    onSelect(); 
  };

  return (
    <div 
      className={`bg-white border-2 overflow-hidden transition-all duration-300 p-4 flex flex-col items-center text-stone-900 
        ${isPlaying 
          ? 'border-[#FFB126] shadow-[6px_6px_0px_0px_#FFB126] -translate-y-2' 
          : 'border-[#020202] shadow-[6px_6px_0px_0px_#020202)] hover:-translate-y-2'
        }`}
    >
      
      {/* Contenedor de la imagen para hacer el efecto de zoom */}
      <div className="w-full overflow-hidden border-2 border-[#020202] mb-4">
        <img
          src={song.artworkUrl100.replace('100x100', '300x300')} 
          alt={song.trackName}
          // 2. Si está sonando, la imagen hace un zoom in suave
          className={`w-full aspect-square object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
        />
      </div>
      
      <h2 className="text-xl font-black text-center truncate w-full uppercase" title={song.trackName}>
        {song.trackName}
      </h2>
      
      <p className="text-[#85756E] mb-6 text-sm text-center font-bold truncate w-full">
        {song.artistName}
      </p>
        
      {song.previewUrl && (
        <audio 
          controls 
          className="w-full h-10 mt-auto custom-audio"
          // 3. Escuchamos los eventos del audio para cambiar el estado
          onPlay={handlePlay}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={song.previewUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};