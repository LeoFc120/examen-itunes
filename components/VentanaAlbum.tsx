import { Song } from "../services/itunesApi";

//Una ventana que se agrego al final ya que se busco que no se viera tan simple a lo cual se uso la IA para poder crear la estructura de la ventana 
//al igual que una transicion para poder darle algo de vida de la cual funciona de la siguiente manera: Song recibe toda la informacion que proporciona Apple
//para que solo tome el "año" usando nuestra linea 13 ' const year = new Date(song.releaseDate).getFullYear(); '
//Como funciona la animacion esta es basada en CSS la cual usamos "fadeIn y popIn" para que esta traves de una etiqueta <style> integrada para poder hacer una aparicion suave y difuminada.
//Documentacion que se reviso https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date?utm_source=gemini


interface ModalProps {
  song: Song;
  onClose: () => void;
}

export const SongModal = ({ song, onClose }: ModalProps) => {
  const year = new Date(song.releaseDate).getFullYear();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* 1. Inyectamos nuestra animación suave directamente aquí */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.80) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animacion-fondo { animation: fadeIn 1.2s ease-out forwards; }
        .animacion-modal { animation: popIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animacion-fondo"
        onClick={onClose}
      ></div>
      <div className="bg-[#EADEDA] border-4 border-[#020202] shadow-[8px_8px_0px_0px_#020202] max-w-3xl w-full flex flex-col md:flex-row relative z-10 animacion-modal">
        <button 
          onClick={onClose} 
          className="absolute -top-5 -right-5 bg-[#650307] text-white border-4 border-[#020202] w-12 h-12 font-black text-xl hover:-translate-y-1 shadow-[4px_4px_0px_0px_#020202] hover:shadow-[6px_6px_0px_0px_#020202] transition-all flex items-center justify-center z-20"
        >
          X
        </button>
        <div className="md:w-1/2 border-b-4 md:border-b-0 md:border-r-4 border-[#020202]">
           <img 
             src={song.artworkUrl100.replace('100x100', '600x600')} 
             alt={song.trackName} 
             className="w-full h-full object-cover aspect-square" 
           />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center bg-white">
          <span className="inline-block bg-[#FFB126] text-[#020202] font-black uppercase px-3 py-1 border-2 border-[#020202] w-max mb-4 shadow-[2px_2px_0px_0px_#020202]">
            {song.primaryGenreName}
          </span>
          <h2 className="text-4xl font-black uppercase text-[#020202] mb-2 leading-tight">
            {song.trackName}
          </h2>
          <p className="text-2xl font-bold text-[#85756E] mb-8">
            {song.artistName}
          </p>
          <div className="space-y-4 border-t-2 border-dashed border-[#85756E] pt-6">
            <div>
              <p className="text-xs font-black uppercase text-[#85756E] tracking-widest">Álbum Original</p>
              <p className="font-bold text-[#020202] text-lg">{song.collectionName}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-[#85756E] tracking-widest">Año de Lanzamiento</p>
              <p className="font-bold text-[#020202] text-lg">{year}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};