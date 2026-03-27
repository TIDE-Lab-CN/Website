export const RESEARCH_DIRECTIONS = [
  { id: 'time-series', label: '时序', color: '#3245ff' },
  { id: 'imaging', label: '图像', color: '#bc52ee' },
  { id: 'digital-health', label: '医学', color: '#d83333' },
  { id: 'engineering', label: '工程', color: '#f041ff' },
] as const;

export const SITE_METADATA = {
  title: 'TIDE Lab',
  description: 'Time-series, Imaging, Digital health, Engineering Research Center',
};

export type DirectionID = (typeof RESEARCH_DIRECTIONS)[number]['id'];

export function getValidDirectionIds(): [string, ...string[]] {
  return RESEARCH_DIRECTIONS.map(direction => direction.id) as [string, ...string[]];
}
