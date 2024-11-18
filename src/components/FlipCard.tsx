import "../assets/css/FlipCard.css";
import { FlipCardProp } from "../type";

const FlipCard = ({ artistName, artistImg, artistQuote }: FlipCardProp) => {
  return (
    <div className='flip-card'>
      <div className='flip-card-inner'>
        <div
          className='front-flip-card'
          style={{ backgroundImage: `url(${artistImg})` }}
        ></div>
        <div className='back-flip-card'>
          <div className='back-flip-content'>
            <h3>{artistName}</h3>
            <p>{artistQuote}</p>
            <a href='#'>Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
