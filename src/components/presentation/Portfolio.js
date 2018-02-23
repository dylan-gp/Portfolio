import React from 'react';
import codersCodeImg from '../../images/coders-code-laptop.png';
import eviluatorImg from '../../images/eviluator-laptop.png';
import codersCodeLogo from '../../images/tcc-logo.png';
import eviluatorLogo from '../../images/evil-logo.png';
import z2ytLogo from '../../images/z2yt-logo.png';
import zoomImg from '../../images/zoom-laptop.png';
import portfolioImg from '../../images/portfolio-laptop.png';
import portfolioLogo from '../../images/portfolio-logo.png';
import '../../styling/Portfolio.css';

export default (props) => (
  <div className="port-container" ref={props.setRef}>
    <h1 className="about-title">dylansPortfolio</h1>
    <ul ref={ul => this.list = ul } className="portfolio-list">
      {
        PortfolioItems
          .map(
            item => 
              <PortfolioListItem item={item} />
          )
      }
    </ul>
  </div>
);

const PortfolioListItem = (props) => (
  <li className="portfolio-item-list" id={props.item.name}>
    <a
      className="portfolio-item-overlay"
      href={props.item.link}
      target="_blank"
    >
      <img
        className="portfolio-overlay-img"
        src={props.item.logo}
        alt={`${props.item.name} logo`}
      />
    </a>
    <div className="portfolio-item-img-container" >
      <img
        className="portfolio-item-img"
        src={props.item.img}
        alt={props.item.name}
      />
    </div>
  </li>
);

const PortfolioItems = [
  {
    name: 'Coders Code',
    img: codersCodeImg,
    logo: codersCodeLogo,
    link: 'http://www.thecoderscode.com/'
  },
  {
    name: 'Eviluator',
    img: eviluatorImg,
    logo: eviluatorLogo,
    link: 'https://www.youtube.com/watch?v=PNu4itiHiSQ&t=3m48s'
  },
  {
    name: 'Zoom To Youtube',
    img: zoomImg,
    logo: z2ytLogo,
    link: 'https://github.com/LocalZoomToYouTube/z2ytScript'
  },
  {
    name: 'Portfolio',
    img: portfolioImg,
    logo: portfolioLogo,
    link: 'https://github.com/dys2/Portfolio'
  }
];