import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './championDetail.css';

const a = 'http://127.0.0.1:5000';

/**
 * Details of champion
 * @returns 
 */
function ChampionDetail({user}) {
  //get the id of the champion
  let { id } = useParams();

  const [flagLoaded, setFlagLoaded] = useState(false);
  const [details, setDetails] = useState(null);
  const [advantage, setAdvantage] = useState([]);
  const [disadvantage, setDisadvantage] = useState([]);

  useEffect(() => {
    if (!flagLoaded) {
      async function getData() {
        axios
          .get(a + `/champion/complete/info?id=${id}`)
          .then((res) =>
          {
            setDetails(res.data['Query Result'][0]);
          })
          .catch((error) =>
          {
            console.log(error)
          })
      }
      async function getCounters() {
        axios
          .get(a + `/champion/counter?id=${id}`)
          .then((res) =>
          {
            processCounters(res.data['Query Result']);
          })
          .catch((error) =>
          {
            console.log(error)
          })
      }
      getData();
      getCounters();
      setFlagLoaded(true);
    }
  }, [id, details, setDetails, flagLoaded, setFlagLoaded]);

  const processCounters = (array) => {
    for (let i = 0; i < array.length; i+=1) {
      if (array[i].Counter_Relation === 'Counter') {
        setAdvantage(prev => [...prev, array[i]]);
      }
      if (array[i].Counter_Relation === 'Be Countered') {
        setDisadvantage(prev => [...prev, array[i]]);
      }
    }
  }

  const alertSuccess = (mess) => alert('Success: ' + mess);
  const alertError = (mess) => alert('Error: ' + mess);

  const buttonHandler = () => {
    //add current champion to favourite
    axios
      .put(a + `/user/favourite?user_id=${user.userID}&champion_id=${id}`)
      .then((res) =>
      {
        if (res.data.hasOwnProperty('Response')) {
          alertSuccess(res.data['Response']);
        }
        if (res.data.hasOwnProperty('Error_message')) {
          alertError(res.data['Error_message']);
        }
      })
      .catch((error) =>
      {
        console.log(error)
      })
  }

  if (!details) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    )
  }

  return (
    <main className="champion-details-main">
      <div className="champion-details-container">
 
        {/* Left Column */}
        <div className="champion-left-column">
          <div className='champion-image'>
            <img src={details.Image_Url} alt=""/>
          </div>
          
          <div className='champion-name'>
            <h4>Name</h4>
            <span>{details.Name}</span>
          </div>

          <div className='champion-class'>
            <h4>Class</h4>
            <span>{details.Class}</span>
          </div>

          <div className='champion-resource'>
            <h4>Resource</h4>
            <span>{details.Resource}</span>
          </div>

          <div className='champion-range-type'>
            <h4>Range Type</h4>
            <span>{details.Range_Type}</span>
          </div>

          <div className='champion-region'>
            <h4>Region</h4>
            <span>{details.Region}</span>
          </div>

          <div className='champion-adaptive-type'>
            <h4>Adaptive Type</h4>
            <span>{details.Adaptive_Type}</span>
          </div>
        </div>
      
      
        {/* Right Column */}
        <div className="champion-right-column">
      
          {/* champion background story */}
          <div className="champion-description">
            <span>{details.Name}</span>
            <h1>Background Story</h1>
            <p>{details.Background_Story}</p>
          </div>
      
          {/* champion ratings */}
          <div className="champion-ratings">
      
            {/* Damage */}
            <span>Damage</span>
            <div className="ratings-container">
              <div className="Damage" style={{width: `${details.Damage / 3 * 100}%`}}>{details.Damage}</div>
            </div>

            {/* Toughness */}
            <span>Toughness</span>
            <div className="ratings-container">
              <div className="Toughness" style={{width: `${details.Toughness / 3 * 100}%`}}>{details.Toughness}</div>
            </div>

            {/* Control */}
            <span>Control</span>
            <div className="ratings-container">
              <div className="Control" style={{width: `${details.Control / 3 * 100}%`}}>{details.Control}</div>
            </div>

            {/* Mobility */}
            <span>Mobility</span>
            <div className="ratings-container">
              <div className="Mobility" style={{width: `${details.Mobility / 3 * 100}%`}}>{details.Mobility}</div>
            </div>

            {/* Utility */}
            <span>Utility</span>
            <div className="ratings-container">
              <div className="Utility" style={{width: `${details.Utility / 3 * 100}%`}}>{details.Utility}</div>
            </div>
          </div>
      
          {/* button add to favourite */}
          <div className="champion-button">
            {user.userID !== '-1' ? 
              (<button className='button-add-favourite' onClick={buttonHandler}>Add To Favourite</button>)
              :
              (<></>)
            }
          </div>
        </div>
      </div>
      
      {/* Skills */}
      <div className="champion-skills-container">
        {details.hasOwnProperty('Passive') ? 
          (
          <div className='skill-container'>
            <span>Passive</span>
            <div>{details.Passive}</div>
          </div>
          )
          :
          (<></>)
        }
        {details.hasOwnProperty('Skill_Q') ? 
          (
          <div className='skill-container'>
            <span>Skill Q</span>
            <div>{details.Skill_Q}</div>
          </div>
          )
          :
          (<></>)
        }
        {details.hasOwnProperty('Skill_W') ? 
          (
          <div className='skill-container'>
            <span>Skill W</span>
            <div>{details.Skill_W}</div>
          </div>
          )
          :
          (<></>)
        }
        {details.hasOwnProperty('Skill_E') ? 
          (
          <div className='skill-container'>
            <span>Skill E</span>
            <div>{details.Skill_E}</div>
          </div>
          )
          :
          (<></>)
        }
        {details.hasOwnProperty('Skill_R') ? 
          (
          <div className='skill-container'>
            <span>Skill R</span>
            <div>{details.Skill_R}</div>
          </div>
          )
          :
          (<></>)
        }
      </div>

      {/* Counters */}
      <div className='match-up-champion-list'>
        <div className='match-up-left-column'>
          <div className='match-up-champion-list-label'>Advantage Againt</div>
          
          {advantage && advantage.map(champion => {
            return (
              <div className="item-counter-champion" key={champion.Against_Champion_ID}>
                <img src={champion.Against_URL} alt=''/>
                <div className='counter-champion-label'>{champion.Against_Champion_Name}</div>
              </div>
            )
          })}
        </div>

        <div className='match-up-right-column'>
          <div className='match-up-champion-list-label'>Disadvantage Againt</div>

          {disadvantage && disadvantage.map(champion => {
            return (
              <div className="item-counter-champion" key={champion.Against_Champion_ID}>
                <img src={champion.Against_URL} alt=''/>
                <div className='counter-champion-label'>{champion.Against_Champion_Name}</div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default ChampionDetail;
