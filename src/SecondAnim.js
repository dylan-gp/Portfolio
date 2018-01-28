import React from 'react';
import * as THREE from 'three';
import earth from './textures/earth_atmos_4096.jpg';

export default class SecondAnim extends React.Component {
  constructor(props) {
    super(props);
    this.planet = this.planet.bind(this);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.resize = this.resize.bind(this);
  }
  componentDidMount() {
    this.width = window.innerWidth;
    this.height = this.width * 9/16;
    this.camera = new THREE.PerspectiveCamera( 50, 16/9, 1, 10000 );
    this.camera.position.z = 500;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(this.width, this.height);
    this.planet();
    this.scene.fog = new THREE.Fog( 0x9c76f7, 3624.77, 9000 );
    this.scene.add(new THREE.AmbientLight( 0x000000 ));
    this.scene.add(new THREE.HemisphereLight(0x8b86d7, 0x000000, 0.79));
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    this.directionalLight.position.set( 0, 1, 0 );
    this.directionalLight.castShadow = true;
    this.scene.add( this.directionalLight );
    this.spotLight1 = new THREE.SpotLight( 0xffffff, 1.01 );
    this.spotLight1.position.set( -751.94, 127.55, 736.43 );
    this.spotLight1.castShadow = true;
    this.spotLight1.shadowDarkness = -0.17;
    this.scene.add(this.spotLight1);
    this.spotLight2 = new THREE.SpotLight( 0xffffff, 0 );
    this.spotLight2.position.set( 100, 1000, 100 );
    this.spotLight2.castShadow = true;
    this.spotLight2.shadowDarkness = 0.2;
    this.scene.add(this.spotLight2);
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 5000; i ++ ) {
      var vertex = new THREE.Vector3();
      vertex.x = 10000 * Math.random() - 5000;
      vertex.y = 10000 * Math.random() - 5000;
      vertex.z = 10000 * Math.random() - 50;
      geometry.vertices.push( vertex );
    }
    const material = new THREE.ParticleBasicMaterial({ size: 3, sizeAttenuation: true, transparent: true });
		material.color.setHex( 0xffffff );
		const particles = new THREE.ParticleSystem(geometry, material);
		particles.sortParticles = true;
		this.scene.add(particles);
		window.addEventListener('resize', this.resize);
    this.mount.appendChild(this.renderer.domElement);
    // this.renderScene();
    setTimeout(() => this.start(), 2500);
  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.resize);
    // window.removeEventListener('scroll', this.start);
  }
  start() {
    if (!this.frameId) this.frameId = requestAnimationFrame(this.animate);
  }
  stop() {
    cancelAnimationFrame(this.frameId);
  }
  resize() {
    this.width = window.innerWidth;
    this.height = this.width * 9/16;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  animate() {
    this.renderScene();
    this.planet.rotateY(0.05);
		this.camera.position.z = Math.tan( Date.now() * 0.0002 ) * 2000;
		this.camera.lookAt(this.planet.position);
    if (window.scrollY >= this.mount.offsetTop - window.innerHeight && window.scrollY < this.mount.offsetTop + this.mount.offsetHeight) {
      this.frameId = window.requestAnimationFrame(this.animate);
    } else {
      setTimeout(() => this.frameId = window.requestAnimationFrame(this.animate), 2000 );
    }
  }
  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
  planet() {
    const geometry = new THREE.SphereGeometry(50, 100, 100);
    const map = new THREE.TextureLoader().load(earth);
    const material = new THREE.MeshLambertMaterial({ shading: THREE.FlatShading, map });
    this.planet = new THREE.Mesh(geometry, material);
    this.planet.position.y = 99.22;
    this.scene.add(this.planet);
  }
  render() {
    return (
      <div 
        style={{
          position: 'relative',
          zIndex: 99,
          width: window.innerWidth,
          height: window.innerWidth * 9/16
        }}
        ref={(mount) => this.mount = mount }
      >
      </div>
    )
  }
}