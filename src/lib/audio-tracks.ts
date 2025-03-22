// Audio tracks for the music player
// Each track has id, title, artist, src path, and color for visualization

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  color: string;
}

export const tracks: Track[] = [
  {
    id: 'light-of-you',
    title: 'Light of You',
    artist: 'Swif7',
    src: '/audio/music/ES_Light of You - Swif7.mp3',
    color: '#00aaff',
  },
  {
    id: 'dont-want-it',
    title: 'Don\'t Want It',
    artist: 'Hallman',
    src: '/audio/music/ES_Don\'t Want It - Hallman.mp3',
    color: '#a855f7',
  },
  {
    id: 'look-to-the-future',
    title: 'Look to the Future',
    artist: 'Purple Dive',
    src: '/audio/music/ES_Look to the Future - Purple Dive.mp3',
    color: '#10b981',
  },
  {
    id: 'taint',
    title: 'Taint',
    artist: 'Hampus Naeselius',
    src: '/audio/music/ES_Taint - Hampus Naeselius.mp3',
    color: '#ec4899',
  },
  {
    id: 'wish-you-well',
    title: 'Wish You Well',
    artist: 'Purple Dive',
    src: '/audio/music/ES_Wish You Well - Purple Dive.mp3',
    color: '#f97316',
  }
]; 