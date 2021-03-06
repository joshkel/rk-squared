import * as skillTypes from './skillTypes';

// NOTE: parse's options are not currently exposed. They're not currently used.
export function parse(input: string): skillTypes.SkillEffect;

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
