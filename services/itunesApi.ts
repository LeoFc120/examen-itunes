// interface Song que actúa como nuestro "molde" estricto para saber que datos esperar exactamente
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
    // En este apartado podemos definir si music o musicVideo
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=24`);
    
    if (!response.ok) {
      return null; // Retornamos null si Apple rechaza la conexión
    }
    const data = await response.json();
    return data.results;
    console.log("JSON de Apple:", data);
  } catch (error) {
    console.error("Fallo de red al consumir la API....", error);
    return null; 
  }
};