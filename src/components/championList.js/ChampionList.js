import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './championList.css';

/**
 * Display the list of champions in database
 * @returns 
 */
function ChampionList() {
  const [champions, setChampions] = useState(null);

  useEffect(() => {
    if (!champions) {
      async function getData() {
        let a = 'http://127.0.0.1:5000';
        axios
          .get(a + `/champion/image`)
          .then((res) =>
          {
            setChampions(res.data['Query Result']);
          })
          .catch((error) =>
          {
            console.log(error)
          })
      }
      getData();
    }
  }, [champions, setChampions]);

  if (!champions) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    )
  }
  return (
    <div>
      <div className='list-container'>
        {
          champions.map((champion, index) => {
            return (
              <div className='item' key={index}>
                <Link className='link-champion' to={`/champion/${champion.Champion_ID}`} target='_blank' rel='noopener noreferrer'>
                  <img src={champion.Image_Url} alt=''/>
                  <div className='champion-label'>{champion.Name}</div>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChampionList
