import { getImage } from 'astro:assets';

export type PhotoData = {
  src: string;
  alt: string;
  order: number;
};

const imageFiles = import.meta.glob<{ default: ImageMetadata; }>(
  '/src/content/activities/photos/*.{jpeg,jpg,png,gif,webp}',
  { eager: true },
);

const photosData: PhotoData[] = (await Promise.all(
  Object.keys(imageFiles).map(async (path) => {
    const imageModule = imageFiles[path].default;
    const fileName = path.split('/').pop()?.split('.')[0] || 'TIDE Lab Photo';

    const optimizedImage = await getImage({
      src: imageModule,
      format: 'webp',
    });

    return {
      src: optimizedImage.src,
      alt: fileName,
      order: parseInt(fileName.match(/^\d+/)?.[0] || '999'),
    };
  }),
)).sort((a, b) => a.order - b.order);

const sortedPhotosData = photosData.sort((a, b) => a.order - b.order);

export const getPhotos = () => {
  return sortedPhotosData;
};
