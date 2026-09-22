"use client";

import Image from "next/image";
import { useState } from "react";
import { fetchSongs, Song } from "../services/itunesApi";

export default function Home() {
  // 1. Gestión de estados (Requisito de la rúbrica)

  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Manejo asíncrono y prevención de errores

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Evita peticiones vacías

    setLoading(true);
    setError(null);
    setSongs([]); // Limpiamos resultados anteriores

    try {
      const results = await fetchSongs(searchTerm);
      if (results.length === 0) {
        setError("No se encontraron resultados para tu búsqueda.");
      } else {
        setSongs(results);
      }
    } catch (err) {
      setError("Ocurrió un error al conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false); // Siempre quitamos el estado de carga al terminar
    }
  };

  return (

    <main className="min-h-screen bg-stone-200 text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 tracking-tight">Buscador Musical</h1>
        
        {/* Barra de Búsqueda */}
        <form onSubmit={handleSearch} className="flex gap-4 justify-center mb-12">
          <input
            type="text"
            placeholder="Busca artistas o canciones..."
            className="w-full max-w-md px-5 py-3 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-lg transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-red-600 hover:bg-indigo-500 rounded-full font-semibold transition-all disabled:bg-indigo-900 disabled:text-gray-400 shadow-lg"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>


        {/* Retroalimentación Visual: Estado Loading */}
        {loading && (
          <div className="flex justify-center mb-8">
            <div className="text-xl text-indigo-400 animate-pulse font-medium">
              Cargando pistas de audio...
            </div>
          </div>
        )}

        {/* Retroalimentación Visual: Estado Error */}
        {error && (
          <div className="flex justify-center mb-8">
            <div className="text-center text-red-200 bg-red-900/50 border border-red-500 px-6 py-3 rounded-lg max-w-md">
              {error}
            </div>
          </div>
        )}

        {/* Cuadrícula de Resultados (100% Responsiva) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((song) => (
            //atras del Hover: se puede colocar 'shadow-xl hover:shadow-orange-600/40' para darle color de fondo
            <div key={song.trackId} className="bg-neutral-800 rounded-xl overflow-hidden  hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col items-center border border-neutral-700">
              <img
                // Truco para mejor resolución: la API da 100x100, la cambiamos a 300x300
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
              
              {/* Reproductor de Audio nativo */}
              {song.previewUrl && (
                <audio controls className="w-full h-9 mt-auto custom-audio">
                  <source src={song.previewUrl} type="audio/mpeg" />
                </audio>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}