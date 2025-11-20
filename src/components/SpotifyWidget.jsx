import { useState, useEffect } from 'react';
import { getNowPlaying } from '../lib/spotify';

const SpotifyWidget = () => {
  const [spotifyData, setSpotifyData] = useState({
    isPlaying: false,
    title: 'Not Playing',
    artist: 'Spotify',
    albumImageUrl: null,
    songUrl: '#',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const data = await getNowPlaying();
        if (data.title) {
          setSpotifyData(data);
        }
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchSpotifyData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="spotify-widget">
        <div className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-green-500/30">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-gray-700 animate-pulse rounded"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spotify-widget">
      <a 
        href={spotifyData.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all group"
      >
        {/* Album Art or Spotify Icon */}
        <div className="shrink-0">
          {spotifyData.albumImageUrl ? (
            <img 
              src={spotifyData.albumImageUrl} 
              alt={spotifyData.album}
              className="w-16 h-16 rounded shadow-lg"
            />
          ) : (
            <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          )}
        </div>
        
        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            {spotifyData.isPlaying ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Now Playing
              </>
            ) : (
              '🎵 Last Played'
            )}
          </p>
          <p className="text-white font-semibold truncate group-hover:text-green-400 transition-colors">
            {spotifyData.title}
          </p>
          <p className="text-gray-300 text-sm truncate">{spotifyData.artist}</p>
        </div>
        
        {/* Playing animation */}
        {spotifyData.isPlaying && (
          <div className="flex items-end gap-1 h-8">
            <div className="w-1 bg-green-500 rounded-full animate-music-bar-1"></div>
            <div className="w-1 bg-green-500 rounded-full animate-music-bar-2"></div>
            <div className="w-1 bg-green-500 rounded-full animate-music-bar-3"></div>
          </div>
        )}
      </a>
    </div>
  );
};

export default SpotifyWidget;
