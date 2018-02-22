import React from 'react';
import { MusicLogicAnimation } from '../../animation-utils';
import AnimationView from '../presentation/Animation';


export default class MusicAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);
    this.setRef = this.setRef.bind(this);
  }
  componentDidMount() {
    this.musicAnimation = new MusicLogicAnimation({
      camera: [75, 16/9, 10, 1000],
      renderer: { antialias: true, alpha: true }
    });
    this.musicAnimation
      .setWidthAndHeight(
        window.innerWidth,
        window.innerWidth * 9/16
      )
      .setSpeakers()
      .setText()
      .setMoon()
      .setPlane()
      .setSpotLight()
      .setPartyText()
      .setSpotLightColor()
      .setCameraPosition()
      .setRenderer(window.devicePixelRatio)
      .setScene();
    this.mount.appendChild(this.musicAnimation.renderer.domElement);
    window.addEventListener('resize', this.resize);
    if (!window.fake) this.start();
  }
  componentWillUnmount() {
    this.stop();
    window.removeEventListener('mousedown', this.onDocumentMouseDown);
    window.removeEventListener('touchstart', this.onDocumentTouchStart);
    window.removeEventListener('resize', this.resize);
    this.mount.removeChild(this.musicAnimation.renderer.domElement);
  }
  start() {
    if (!this.frameId) this.frameId = requestAnimationFrame(this.animate);
  }
  stop() {
    cancelAnimationFrame(this.frameId);
  }
  resize() {
    this.musicAnimation.setWidthAndHeight(
      window.innerWidth,
      window.innerWidth * 9/16
    );
    this.musicAnimation.resetCamera();
  }
  animate(timestamp) {
    this.renderScene();
    this.musicAnimation.setAnimate();
    if (window.scrollY >= this.mount.offsetTop - window.innerHeight
      && window.scrollY < this.mount.offsetTop + this.mount.offsetHeight)
      setTimeout(() => this.frameId = window.requestAnimationFrame(this.animate), 1000 / 30 );
    else
      setTimeout(() => this.frameId = window.requestAnimationFrame(this.animate), 2000 );
  }
  renderScene() {
    this.musicAnimation
      .renderer
      .render(
        this.musicAnimation.scene, 
        this.musicAnimation.camera
      );
  }
  onPlay() {
    this.musicAnimation.play = !this.musicAnimation.play;
    this.musicAnimation.music = !this.musicAnimation.music;
    if (this.musicAnimation.play) this.musicAnimation.audio.play();
    else this.musicAnimation.audio.pause();
  }
  setRef(mount) {
    this.mount = mount;
  }
  render() {
    return <AnimationView music={true} onPlay={this.onPlay} setRef={this.setRef} />
  }
}