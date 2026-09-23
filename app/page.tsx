"use client";
import { useState } from "react";
import { fetchSongs, Song } from "../services/itunesApi";
import { MusicCard } from "../components/MusicCard"; 
import { BarraBusqueda } from "@/components/BarraBusq";
import { Header, Loader, ErrorAlert } from "../components/Header";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    // Si quieres cambiar el fondo general (bg-stone-200), lo haces aquí
    <main className="min-h-screen bg-stone-240 text-stone-900 p-8 font-sans">
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
            <MusicCard key={song.trackId} song={song} />
          ))}

        </div>
      </div>
    </main>
  );
}