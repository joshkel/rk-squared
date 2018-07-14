import * as React from 'react';

import { Dungeon } from '../../actions/dungeons';

import * as _ from 'lodash';

const styles = require('./DungeonBadge.scss');

/**
 * Shows dungeon status as a Bootstrap badge
 */
export const DungeonBadge = ({dungeons}: {dungeons: Dungeon[]}) => {
  if (!dungeons || !dungeons.length) {
    return null;
  }
  const total = dungeons.length;
  const mastered = _.sumBy(dungeons, d => +d.isMaster);
  const hasUnlocked = _.find(dungeons, d => d.isUnlocked && !d.isMaster);
  // TODO: Highlight in red if about to expire?
  // TODO: Add Cid missions
  // TODO: Add a tooltip explaining mastered / completed / total syntax
  const classes = `badge ${styles.component} ` + (hasUnlocked ? 'badge-primary' : 'badge-secondary');
  if (mastered === total) {
    return (
      <span className={classes}>
        {mastered} / {mastered} / {total}
      </span>
    );
  } else {
    const completed = _.sumBy(dungeons, d => +d.isComplete);
    const stamina = _.sumBy(dungeons, d => !d.isMaster ? d.totalStamina : 0);

    return (
      <span className={classes}>
        {mastered} / {completed} / {total}
        <br/>
        {stamina} stamina
      </span>
    );
  }
};