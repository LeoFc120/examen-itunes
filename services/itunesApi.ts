// services/itunesApi.ts

// Tipado estricto para asegurar calidad de código
export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  releaseDate: string;
  primaryGenreName: string;
  artworkUrl100: string;
  previewUrl: string;
}

interface ItunesResponse {
  resultCount: number;
  results: Song[];
}

export const fetchSongs = async (term: string) => {
  try {
    const query = encodeURIComponent(term);
    // Tu código actual
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=24`);
    
    if (!response.ok) {
      return null; // Retornamos null si Apple rechaza la conexión
    }

    const data = await response.json();
    return data.results;
    
  } catch (error) {
    console.error("Fallo de red al consumir la API:", error);
    // En lugar de usar 'throw error' (que es lo que provoca la pantalla roja), 
    // retornamos null de forma controlada.
    return null; 
  }
};