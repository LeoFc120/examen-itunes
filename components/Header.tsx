//El Header agrupa el titulo principal al igual que el estado de carga (Loader) con una animación de pulso (animate-pulse) al igual que el recuadro de error por si un busqueda no funciona.

export const Header = () => {
  return (
    <h1 className="text-5xl font-black text-center mb-8 tracking-tighter uppercase text-stone-900 drop-shadow-md">
      Buscador
    </h1>
  );
};

export const Loader = () => (
  <div className="text-center text-xl text-red-600 animate-pulse font-medium mb-8">
    Buscando canciones.....
  </div>
);

export const ErrorAlert = ({ message }: { message: string }) => (
  <div className="text-center text-red-800 bg-red-200 border border-red-500 px-6 py-3 rounded-lg max-w-md mx-auto mb-8">
    {message}
  </div>
);