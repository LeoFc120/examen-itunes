import React from "react";

interface BarraBusq {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export const BarraBusqueda = ({ searchTerm, setSearchTerm, handleSearch, loading }: BarraBusq) => {
  return (
    <form onSubmit={handleSearch} className="flex gap-4 justify-center mb-12">
      <input
        type="text"
        placeholder="Busca artistas o canciones..."
        className="w-full max-w-md px-5 py-3 border-2 border-black bg-white text-black focus:outline-none focus:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1) transition-all font-medium]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3 bg-[#650307] text-white border-2 border-[#020202] font-bold uppercase tracking-wider hover:bg-[#650307]  hover:translate-y-1 shadow-[4px_4px_0px_0px_#020202] hover:shadow-none transition-all disabled:bg-[#85756E] disabled:shadow-none"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
};