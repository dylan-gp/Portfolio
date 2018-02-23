import React from 'react';
import { SpaceLogicAnimation } from '../../animation-utils';
import AnimationView from '../presentation/Animation';


export default class SpaceAnimation extends React.Component {
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
  start = () => 
    !this.frameId ? this.frameId = requestAnimationFrame(this.animate) : '';

  stop = () =>
    cancelAnimationFrame(this.frameId);

  resize = () =>
    this.spaceAnimation.resetCamera();

  animate = () => {
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
  renderScene = () =>
    this.spaceAnimation
      .renderer
      .render(
        this.spaceAnimation.scene, 
        this.spaceAnimation.camera
      );

  setRef = mount =>
    this.mount = mount;

  render = () =>
    <AnimationView
      music={false}
      setRef={this.setRef}
    />;
}