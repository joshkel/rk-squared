import { enlir, EnlirRelic } from './enlir';

interface AnimaWave {
  color: string;
  released?: boolean;
  estimatedMonth: number;
  estimatedYear: number;
}

export const animaWaves: { [wave: number]: AnimaWave } = {
  1: {
    color: '#6daf50',
    released: true,
    estimatedMonth: 6,
    estimatedYear: 2019,
  },
  2: {
    color: '#d22d2d',
    released: true,
    estimatedMonth: 10,
    estimatedYear: 2019,
  },
  3: {
    color: '#2283c3',
    released: false,
    estimatedMonth: 5,
    estimatedYear: 2020,
  },
};

export function getRelicAnimaWave({ id }: EnlirRelic): AnimaWave | null {
  const anima = enlir.relicSoulBreaks[id]
    ? enlir.relicSoulBreaks[id].anima
    : enlir.relicLegendMateria[id]
    ? enlir.relicLegendMateria[id].anima
    : null;
  return anima != null ? animaWaves[anima] : null;
}
