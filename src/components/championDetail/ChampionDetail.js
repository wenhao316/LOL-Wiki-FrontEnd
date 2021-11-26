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

  const [details, setDetails] = useState(null);
  const [skillRatings, setSkillRatings] = useState({Damage: '1', Toughness: '2', Control: '3', Mobility: '2', Utility: '1'})

  useEffect(() => {
    if (!details) {
      async function getData() {
        axios
          .get(a + `/champion?id=${id}`)
          .then((res) =>
          {
            setDetails(res.data['Query Result'][0]);
          })
          .catch((error) =>
          {
            console.log(error)
          })
      }
      getData();
    }

    // if (!skillRatings) {
    //   //TODO
    //   async function getRatings() {
    //     axios
    //       .get(a + `TODO`)
    //       .then((res) =>
    //       {
    //         setSkillRatings(res.data['Query Result'][0]);
    //         console.log(res.data['Query Result']);
    //       })
    //       .catch((error) =>
    //       {
    //         console.log(error)
    //       })
    //   }
    //   getRatings();
    // }
  }, [id, details, setDetails, skillRatings, setSkillRatings]);

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

  if (!details || !skillRatings) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    )
  }

  return (
    <main className="champion-details-container">
 
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
            <div className="Damage" style={{width: `${skillRatings.Damage / 3 * 100}%`}}>{skillRatings.Damage}</div>
          </div>

          {/* Toughness */}
          <span>Toughness</span>
          <div className="ratings-container">
            <div className="Toughness" style={{width: `${skillRatings.Toughness / 3 * 100}%`}}>{skillRatings.Toughness}</div>
          </div>

          {/* Control */}
          <span>Control</span>
          <div className="ratings-container">
            <div className="Control" style={{width: `${skillRatings.Control / 3 * 100}%`}}>{skillRatings.Control}</div>
          </div>

          {/* Mobility */}
          <span>Mobility</span>
          <div className="ratings-container">
            <div className="Mobility" style={{width: `${skillRatings.Mobility / 3 * 100}%`}}>{skillRatings.Mobility}</div>
          </div>

          {/* Utility */}
          <span>Utility</span>
          <div className="ratings-container">
            <div className="Utility" style={{width: `${skillRatings.Utility / 3 * 100}%`}}>{skillRatings.Utility}</div>
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
    </main>
  )
}

export default ChampionDetail;
