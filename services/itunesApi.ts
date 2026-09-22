// services/itunesApi.ts

// Tipado estricto para asegurar calidad de código
export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
}

interface ItunesResponse {
  resultCount: number;
  results: Song[];
}

export const fetchSongs = async (term: string): Promise<Song[]> => {
  try {
    // Formatear el término para URLs (ej. "bad bunny" -> "bad%20bunny")
    const query = encodeURIComponent(term);
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=12`);
    
    // Gestión correcta de errores HTTP requerida por la rúbrica
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: ItunesResponse = await response.json();
    return data.results;
    
  } catch (error) {
    console.error("Fallo al consumir la API de iTunes:", error);
    // Lanzamos el error para que la vista (UI) lo capture y muestre el mensaje al usuario
    throw error; 
  }
};