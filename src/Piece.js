import React from 'react';
import './Piece.css';
import CodersCodeImg from './CodersCode.png';
import closeIcon from './closeIcon.png';
import githubIconLight from './GitHub-Mark-Light-120px-plus.png'
import githubIconDark from './GitHub-Mark-120px-plus.png'
import goto from './goto.png';


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
          <img className="close-icon" src={closeIcon} onClick={() => this.props.popDown('coders')} />
          <div className="piece-img-container" >
            <img className="piece-img" 
              ref={(img) => this.piece = img}
              src={this.props.image1}
            />
          </div>
          <div className="small-piece-container">
            <img className="small-piece-img"
              src={this.props.image2}
              onClick={(e) => this.swapImg(e)}
            />
            <img className="small-piece-img"
              src={this.props.image3}
              onClick={(e) => this.swapImg(e)}
            />
          </div>
          <div className="piece-icons" >
            {this.props.githubClient ? 
              <a href={this.props.githubClient}>
                <img className="piece-gh-icon-light" src={githubIconLight} />
              </a> :
              ''
            }
            {this.props.githubAPI ? 
              <a href={this.props.githubAPI}>
                <img className="piece-gh-icon-dark" src={githubIconDark} />
              </a> :
              ''
            }
            <a href={this.props.pageLink}>
              <img className="goto-icon" src={goto}/>
            </a>
          </div>
        </div>
      </div>
    )
  }
} 