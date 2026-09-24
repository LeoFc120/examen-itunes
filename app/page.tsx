"use client";
import { useState } from "react";
import { fetchSongs, Song } from "../services/itunesApi";
import { MusicCard } from "../components/MusicCard"; 
import { BarraBusqueda } from "@/components/BarraBusq";
import { Header, Loader, ErrorAlert } from "../components/Header";
import { SongModal } from "../components/VentanaAlbum";
//Se utilizo el Hook useState para controlar 5 memorias distintas esta decision se tomo ya que se pidio orientacion y un ejemplo con la IA
// a lo cual el usuario escriba (searchTerm), las canciones recibidas (songs), 
// el estado de carga (loading), los errores (error) y la canción seleccionada para el modal (selectedSong). 
// La función handleSearch previene 
// que la página se recargue al enviar el formulario (e.preventDefault()), limpia los estados anteriores, llama a la API y 
// decide si mostrar un mensaje de error o llenar la cuadrícula con resultados.
//Se consulto tambien en esta documentacion: https://react.dev/reference/react/useState?utm_source=gemini

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; 
    
    setLoading(true);
    setError(null);
    setSongs([]); 
    
    try {
      const results = await fetchSongs(searchTerm);
      if (results.length === 0) setError("No se encontraron resultados para tu búsqueda.");
      else setSongs(results);
    } catch (err) {
      setError("Ocurrió un error al conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    // Se puede cambiar el fondo general (bg-stone-200), lo haces aquí y en grid-cols-1 podemos ver las columnas mostradas
    <main className="min-h-screen bg-[#EADEDA] text-[#020202] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <Header />
        
        <BarraBusqueda 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch} 
          loading={loading} 
        />

        {loading && <Loader />}
        {error && <ErrorAlert message={error} />}
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((song) => (
            <MusicCard 
              key={song.trackId} 
              song={song} 
              onSelect={() => setSelectedSong(song)} 
              />
          ))}
        </div>
      </div>
      {selectedSong && (
        <SongModal song={selectedSong} onClose={() => setSelectedSong(null)} />
      )}
    </main>
  );
}