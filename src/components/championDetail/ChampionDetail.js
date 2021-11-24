import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Details of champion
 * @returns 
 */
function ChampionDetail() {
  //get the id of the champion
  let { id } = useParams();

  //TODO
  return (
    <div>
      Detail
    </div>
  )
}

export default ChampionDetail;
