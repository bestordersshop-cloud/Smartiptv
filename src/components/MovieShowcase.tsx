import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Star } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function MovieShowcase() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch('/api/movies/trending');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMovies(data.results.slice(0, 12));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand"></div>
      </div>
    );
  }

  if (error || movies.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-brand font-bold text-sm tracking-[4px] uppercase block mb-3">Cinema Experience</span>
            <h2 className="text-4xl md:text-6xl font-bebas leading-none">Trending Movies</h2>
          </div>
          <p className="text-white/40 max-w-md text-sm md:text-base">
            Instantly stream the latest blockbusters and award-winning cinema directly from our updated VOD library.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-brand/50 transition-all">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-brand p-4 rounded-full scale-75 group-hover:scale-100 transition-transform shadow-xl">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black flex items-center gap-1 border border-white/10">
                  <Star className="w-3 h-3 fill-brand text-brand" />
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <h4 className="font-bold text-sm line-clamp-1 group-hover:text-brand transition-colors">{movie.title}</h4>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
                {movie.release_date ? movie.release_date.split('-')[0] : '2024'} • Movie
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
