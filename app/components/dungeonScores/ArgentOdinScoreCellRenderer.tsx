import * as React from 'react';

import { ICellRendererParams } from '@ag-grid-community/core';

import {
  formatEstimatedScore,
  formatScore,
  shouldUseEstimatedScore,
} from '../../actions/dungeonScores';
import { DungeonWithScore } from '../../selectors/dungeonsWithScore';
import { CheckIcon } from './CheckIcon';

export class ArgentOdinScoreCellRenderer extends React.Component<ICellRendererParams> {
  static ID = 'CARDIA_SCORE_CELL';

  render() {
    const { value } = this.props;
    const dungeon = value as DungeonWithScore;
    if (!dungeon) {
      return null;
    }
    const useEstimated = shouldUseEstimatedScore(dungeon.score, dungeon.estimatedScore);
    const score = useEstimated ? dungeon.estimatedScore : dungeon.score;
    const showTooltips = score && !score.won;
    return (
      <span
        data-tip={showTooltips ? dungeon.id : undefined}
        data-for={ArgentOdinScoreCellRenderer.ID}
      >
        {score && (useEstimated ? formatEstimatedScore(score) : formatScore(score))}
        <CheckIcon checked={dungeon.isMaster} className={'ml-1'} />
      </span>
    );
  }
}
