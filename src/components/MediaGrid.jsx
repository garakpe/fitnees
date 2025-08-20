import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const MediaGrid = ({ onMediaClick, uploadCount }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const storageRef = ref(storage, 'images');
        const result = await listAll(storageRef);
        const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
        const urls = await Promise.all(urlPromises);
        const items = urls.map((url, index) => ({ id: index, type: 'image', src: url }));
        setMediaItems(items);
      } catch (error) {
        console.error("Error fetching media from Firebase Storage:", error);
      }
      setLoading(false);
    };

    fetchMedia();
  }, [uploadCount]);

  if (loading) {
    return <p className="text-center">Loading media...</p>;
  }

  const getGridClass = (count) => {
    if (count === 2) return 'grid grid-cols-2 gap-1';
    if (count === 3) return 'grid grid-cols-3 gap-1';
    if (count === 4) return 'grid grid-cols-2 grid-rows-2 gap-1';
    if (count === 5) return 'grid grid-cols-6 grid-rows-2 gap-1';
    if (count >= 6) return 'grid grid-cols-3 grid-rows-2 gap-1';
    return 'grid grid-cols-1 gap-1'; // for 1 image
  };

  const getItemClass = (index, count) => {
    if (count === 5) {
      if (index === 0) return 'col-span-3 row-span-2';
      if (index === 1) return 'col-span-3 row-span-2';
      if (index === 2) return 'col-span-2';
      if (index === 3) return 'col-span-2';
      if (index === 4) return 'col-span-2';
    }
    if (count >= 6) {
        return 'aspect-square';
    }
    return 'aspect-square';
  };


  return (
    <div className={getGridClass(mediaItems.length)}>
      {mediaItems.map((item, index) => (
        <div
          key={item.id}
          className={`bg-gray-200 cursor-pointer ${getItemClass(index, mediaItems.length)}`}
          onClick={() => onMediaClick(item)}
        >
          <img src={item.src} alt={`media ${item.id}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;