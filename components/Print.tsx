"use client"
import React, { useRef } from 'react';
import ExpandText from './ExpandText';
import { Heart, Share } from 'lucide-react';
import htmlToImage from 'html-to-image';
import download from 'downloadjs';

interface PublicConfessionCardProps {
  from: string;
  content: string;
  createdAt: Date;
}

const PublicConfessionCard: React.FC<PublicConfessionCardProps> = ({ from, content, createdAt }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (cardRef.current) {
      htmlToImage.toPng(cardRef.current)
        .then((dataUrl) => {
          download(dataUrl, 'confession-card.png');
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    }
  };

  return (
    <>
      <div className='max-w-md w-full bg-secondary p-5 rounded-lg' ref={cardRef}>
        <div className='flex gap-5'>
          <p className='w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center font-bold font-serif'>
            {from.charAt(0).toUpperCase()}
          </p>
          <div>
            <p className='text-lg font-semibold'>
              {from}
            </p>
            <p className='text-sm text-muted-foreground'>
              {createdAt.toDateString()}
            </p>
          </div>
        </div>
        <ExpandText content={content} />
        <div className='flex justify-between mt-4'>
          <Heart className="text-rose-500" size={20} />
          <Share className="" size={20} />
        </div>
      </div>
      <button onClick={handleDownload}>Download Image</button>
    </>
  );
};

export default PublicConfessionCard;
