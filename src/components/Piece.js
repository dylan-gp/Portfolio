import React from 'react';
import '../styling/Piece.css';
import closeIcon from '../images/closeIcon.png';
import githubIconLight from '../images/GitHub-Mark-Light-120px-plus.png'
import githubIconDark from '../images/GitHub-Mark-120px-plus.png'
import goto from '../images/goto.png';


export default class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 1
    }
    this.swapImg = this.swapImg.bind(this);
  };
  swapImg(e) {
    const tempSRC = e.target.src;
    e.target.src = this.piece.src;
    this.piece.src = tempSRC;
  }
  render() {
    return (
      <div className="piece">
        <div className="piece-container">
          <img className="close-icon" alt="close" src={closeIcon} onClick={() => this.props.popDown('coders')} />
          <div className="piece-img-container" >
            <img className="piece-img" 
              alt="portfolio piece example"
              ref={(img) => this.piece = img}
              src={this.props.image1}
            />
          </div>
          <div className="small-piece-container">
            <img className="small-piece-img"
              alt="porfolio piece example"
              src={this.props.image2}
              onClick={(e) => this.swapImg(e)}
            />
            <img className="small-piece-img"
              alt="porfolio piece example"
              src={this.props.image3}
              onClick={(e) => this.swapImg(e)}
            />
          </div>
          <div className="piece-icons" >
            {this.props.githubClient ? 
              <a href={this.props.githubClient} rel="noopener noreferrer" target="_blank">
                <img className="piece-gh-icon-light" alt="github frontend" src={githubIconLight} />
              </a> :
              ''
            }
            {this.props.githubAPI ? 
              <a href={this.props.githubAPI} rel="noopener noreferrer" target="_blank">
                <img className="piece-gh-icon-dark" alt="github backend" src={githubIconDark} />
              </a> :
              ''
            }
            <a href={this.props.pageLink} rel="noopener noreferrer" target="_blank">
              <img className="goto-icon" alt="go to piece" src={goto}/>
            </a>
          </div>
        </div>
      </div>
    )
  }
} 