import { createAction } from 'typesafe-actions';

import * as _ from 'lodash';

import { EnlirSoulBreakOrLegendMateria } from '../data/enlir';
import { ItemType } from '../data/items';

export enum ShowSoulBreaksType {
  ALL = 0,
  GL = 1,
  OWNED = 2,

  DEFAULT = ALL,
}

export interface Prefs {
  showItemType: { [t in ItemType]: boolean };

  showSoulBreaks?: ShowSoulBreaksType;

  lastFilename?: {
    [key: string]: string;
  };
}

export function filterSoulBreaks(showSoulBreaks?: ShowSoulBreaksType, owned?: Set<number>) {
  if (showSoulBreaks == null) {
    showSoulBreaks = ShowSoulBreaksType.DEFAULT;
  }
  switch (showSoulBreaks) {
    case ShowSoulBreaksType.ALL:
      return _.constant(true);
    case ShowSoulBreaksType.GL:
      return (item: EnlirSoulBreakOrLegendMateria) => item.gl;
    case ShowSoulBreaksType.OWNED:
      if (owned == null) {
        return _.constant(true);
      } else {
        return (item: EnlirSoulBreakOrLegendMateria) => owned.has(item.id);
      }
  }
}

export function getLastFilename(prefs: Prefs, key: string, defaultFilename: string): string {
  if (!prefs.lastFilename || !prefs.lastFilename[key]) {
    return defaultFilename;
  } else {
    return prefs.lastFilename[key];
  }
}

export const showItemType = createAction('SHOW_ITEM_TYPE', (type: ItemType, show: boolean) => ({
  type: 'SHOW_ITEM_TYPE',
  payload: {
    type,
    show,
  },
}));

export const showItemTypes = createAction(
  'SHOW_ITEM_TYPES',
  (updates: { [t in ItemType]?: boolean }) => ({
    type: 'SHOW_ITEM_TYPES',
    payload: {
      updates,
    },
  }),
);

export const updatePrefs = createAction('UPDATE_PREFS', (updates: Partial<Prefs>) => ({
  type: 'UPDATE_PREFS',
  payload: updates,
}));

export const setLastFilename = createAction(
  'SET_LAST_FILENAME',
  (key: string, lastFilename: string) => ({
    type: 'SET_LAST_FILENAME',
    payload: {
      key,
      lastFilename,
    },
  }),
);

export type PrefsAction = ReturnType<
  typeof showItemType | typeof showItemTypes | typeof updatePrefs | typeof setLastFilename
>;
