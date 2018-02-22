import React from 'react';
import { SpaceLogicAnimation } from '../../animation-utils';
import AnimationView from '../presentation/Animation';


export default class SpaceAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.resize = this.resize.bind(this);
    this.setRef = this.setRef.bind(this);
  }
  componentDidMount() {
    this.spaceAnimation = new SpaceLogicAnimation(
      {
        camera: [50, 16/9, 1, 10000],
        renderer: {}
      }
    );
    this.spaceAnimation
      .setCameraPosition()
      .setDirectionalLight()
      .setFirstSpotLight()
      .setSecondSpotLight()
      .setStars()
      .setRenderer(window.devicePixelRatio)
      .setPlanet()
      .setScene();
		window.addEventListener('resize', this.resize);
    this.mount.appendChild(this.spaceAnimation.renderer.domElement);
    this.start();
  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.spaceAnimation.renderer.domElement);
    window.removeEventListener('resize', this.resize);
  }
  start() {
    if (!this.frameId) this.frameId = requestAnimationFrame(this.animate);
  }
  stop() {
    cancelAnimationFrame(this.frameId);
  }
  resize() {
    this.spaceAnimation.resetCamera();
  }
  animate() {
    this.renderScene();
    this.spaceAnimation.setAnimate();
    if (window.scrollY >= this.mount.offsetTop - window.innerHeight 
      && window.scrollY < this.mount.offsetTop + this.mount.offsetHeight)
      this.frameId = window.requestAnimationFrame(this.animate);
    else
      setTimeout(
        () => 
          this.frameId = window.requestAnimationFrame(this.animate),
          2000
      );
  }
  renderScene() {
    this.spaceAnimation
      .renderer
      .render(
        this.spaceAnimation.scene, 
        this.spaceAnimation.camera
      );
  }
  setRef(mount) {
    this.mount = mount;
  }
  render() {
    return <AnimationView music={false} setRef={this.setRef} />
  }
}