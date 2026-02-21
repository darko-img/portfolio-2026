export interface Video {
  id: number;
  title: string;
  year: number;
  videoUrl?: string
  previewUrl?: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: 'Nussknagger #1',
    year: 2024,
    videoUrl: 'https://vimeo.com/1078458176',
    previewUrl: '/previews/nuss-logo-2024.mp4'
  },
  {
    id: 2,
    title: 'Nussknagger #2',
    year: 2024,
    videoUrl: 'https://vimeo.com/1078624279',
    previewUrl: '/previews/cube-nuss-2024.mp4'
  },
  {
    id: 3,
    title: 'Formen',
    year: 2017,
    videoUrl: 'https://vimeo.com/1078637488',
    previewUrl: '/previews/formen-2017.mp4'
  },
  {
    id: 4,
    title: 'Nino',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/nino-2024.mp4'
  },
  {
    id: 5,
    title: 'Formen #2',
    year: 2024,
    videoUrl: 'https://vimeo.com/1078455810',
    previewUrl: '/previews/formen-2-2024.mp4'

  },
  {
    id: 6,
    title: 'Tatort',
    year: 2017,
    videoUrl: 'https://vimeo.com/1078457155',
    previewUrl: '/previews/tatort-2017.mp4'
  },
  {
    id: 7,
    title: 'Glashaus',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/glashaus-2024.mp4'
  },
  {
    id: 8,
    title: 'Nussknagger #3',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/nuss-repro-2024.mp4'
  },
  {
    id: 9,
    title: 'Quad/Sphere',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/quad-sphere-2024.mp4'
  },
  {
    id: 10,
    title: 'Kopf',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/kopf-2024.mp4'
  },
  {
    id: 11,
    title: 'Zucker',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/zucker-2024.mp4'
  },
  {
    id: 12,
    title: 'Grube',
    year: 2024,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    previewUrl: '/previews/grube-2024.mp4'
  },
];
