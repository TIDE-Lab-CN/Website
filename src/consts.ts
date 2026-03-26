export const RESEARCH_DIRECTIONS = [
    { id: 'time-series', label: 'Time-series', color: '#3245ff' },
    { id: 'imaging', label: 'Imaging', color: '#bc52ee' },
    { id: 'digital-health', label: 'Digital Health', color: '#d83333' },
    { id: 'engineering', label: 'Engineering', color: '#f041ff' },
] as const;

export const SITE_METADATA = {
    title: 'TIDE Lab',
    description: 'Time-series, Imaging, Digital health, Engineering Research Center',
};

export type DirectionID = (typeof RESEARCH_DIRECTIONS)[number]['id'];

export function getValidDirectionIds(): [string, ...string[]] {
    return RESEARCH_DIRECTIONS.map(direction => direction.id) as [string, ...string[]];
}