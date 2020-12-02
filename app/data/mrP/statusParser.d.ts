import * as statusTypes from './statusTypes';

export function parse(input: string): statusTypes.StatusEffect;

export class SyntaxError extends Error {
  name: 'SyntaxError';
  expected: string[] | null;
  found: string | null;
  location: {
    start: {
      offset: number;
      line: number;
      column: number;
    };
    end: {
      offset: number;
      line: number;
      column: number;
    };
  };
}
