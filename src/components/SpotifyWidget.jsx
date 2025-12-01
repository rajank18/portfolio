import { useState, useEffect } from 'react';
import { getNowPlaying } from '../lib/spotify';

const SpotifyWidget = () => {
  const [spotifyData, setSpotifyData] = useState({
    isPlaying: false,
    title: 'Not Playing',
    artist: 'Spotify',
    albumImageUrl: null,
    songUrl: '#',
    lastPlayed: null, // timestamp of last played song
  });
  const [loading, setLoading] = useState(true);
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const data = await getNowPlaying();
        if (data.title) {
          setSpotifyData(prev => ({ ...data, lastPlayed: Date.now() }));
          setInactive(false);
        } else {
          // If no song, check lastPlayed
          setSpotifyData(prev => ({ ...prev }));
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

    // Check inactivity every minute
    const inactivityInterval = setInterval(() => {
      setSpotifyData(prev => {
        if (prev.lastPlayed) {
          const now = Date.now();
          if (now - prev.lastPlayed > 2 * 60 * 60 * 1000) {
            setInactive(true);
          } else {
            setInactive(false);
          }
        }
        return prev;
      });
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(inactivityInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="border border-gray-200 dark:border-gray-700 pr-6 pl-6 p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-32 animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (inactive) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="border border-gray-200 dark:border-gray-700 pr-6 pl-6 p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-32"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 w-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No song played recently...
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <a 
        href={spotifyData.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-gray-200 dark:border-gray-700 pr-6 pl-6 p-4 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex items-center gap-6">
          {/* Album Art */}
          <div className="shrink-0 border-2  border-gray-500 ">
            {spotifyData.albumImageUrl ? (
              <img 
                src={spotifyData.albumImageUrl} 
                alt={spotifyData.album}
                className="w-20 h-20 object-cover "
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            )}
          </div>
          
          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {spotifyData.isPlaying ? (
                <span className="text-sm text-gray-500 dark:text-gray-400">▶︎</span>
              ) : (
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm1-10h4v2h-6V7h2z"/>
                </svg>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {spotifyData.isPlaying ? 'Now Playing' : 'Last Played'}
              </span>
              {spotifyData.isPlaying && (
                <div className="flex items-center gap-0.5 ml-1">
                  <div className="w-0.5 h-3 bg-green-500 animate-music-bar-1"></div>
                  <div className="w-0.5 h-3 bg-green-500 animate-music-bar-2"></div>
                  <div className="w-0.5 h-3 bg-green-500 animate-music-bar-3"></div>
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-1 truncate group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {spotifyData.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 truncate">
              {spotifyData.artist}
            </p>
          </div>

          {/* Spotify Icon */}
          <div className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SpotifyWidget;
