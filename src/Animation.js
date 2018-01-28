import React from 'react';
import * as THREE from 'three';
import flyingHome from './audio/flying home.mp3';
import takeOver from './audio/TakeOver.mp3';
import speakerJSON from './models/speaker.json';
import speakerTopJSON from './models/speakertop.json';
import speakerBottomJSON from './models/speakerbottom.json';
import checkerboard from './textures/FloorsCheckerboard_S_Normal.jpg';
import perlin from './textures/perlin-512.png';
import moon from './textures/moon_1024.jpg';

export default class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.play = false;
    this.music = false;
    this.start = this.start.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.text = this.text.bind(this);
    this.shape = this.shape.bind(this);
    this.plane = this.plane.bind(this);
    this.speaker = this.speaker.bind(this);
    this.light = this.light.bind(this);
    this.partyText = this.partyText.bind(this);
    this.cycleOpacity = this.cycleOpacity.bind(this);
    this.changeLightColor = this.changeLightColor.bind(this);
    this.resize = this.resize.bind(this);
  }
  componentDidMount() {
    this.delta = 0;
    this.audio = Math.random() <= .5 ? new Audio(flyingHome) : new Audio(takeOver);
    this.audio.volume = 0.5;
    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = this.width * 9/16;
    this.camera = new THREE.PerspectiveCamera(75, this.width/this.height, 10, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const hemLight = new THREE.HemisphereLight(0xffffff, 0xc61aff, 0.5);
    this.scene.add(hemLight);
    // const pointLight = new THREE.PointLight(0xb5b5fd, 0.5, 200);
    // this.scene.add(pointLight);  maybe turn this on
    // pointLight.castShadow = true;
    this.speaker();
    this.text();
    this.shape();
    this.plane();
    this.camera.position.z = 30;
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
    this.renderer.receiveShadow = true;
    this.spotLight = new THREE.SpotLight( 0xee82ee, 4.0, 1000, 0.9, 0.0);
    this.spotLight.castShadow = true;
    this.spotLight.position.setZ(-20);
    this.spotLight.position.setY(40);
    this.spotLight.position.setX(-40);
    this.spotLight.target.position.set(0, -100, -100);
    this.scene.add( this.spotLight );
    this.scene.add( this.spotLight.target );
    // var helper = new THREE.CameraHelper( this.spotLight.shadow.camera );
    //this.scene.add( helper );
    this.scene.fog = new THREE.Fog( 0xf2f7ff, 1, 1000);
    this.upDown = false;
    this.light();
    this.partyText();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.mount.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.resize);
    THREE.Cache.enabled = true
    // window.addEventListener('scroll', this.animate);
    setTimeout(() => this.start(), 3000);
  }
  componentWillUnmount() {
    this.stop();
    window.removeEventListener('mousedown', this.onDocumentMouseDown);
    window.removeEventListener('touchstart', this.onDocumentTouchStart);
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
  async speaker() {
    const jsonLoader = new THREE.JSONLoader();
    this.geo = new THREE.Geometry();
    const speaker = jsonLoader.parse(speakerJSON);
    const speakerTop = jsonLoader.parse(speakerTopJSON);
    const speakerBottom = jsonLoader.parse(speakerBottomJSON);
    const mats = [...speaker.materials, ...speakerBottom.materials, ...speakerTop.materials];
    this.geo.merge(speaker.geometry, speaker.geometry.matrix);
    this.geo.merge(
      speakerBottom.geometry,
      speakerBottom.geometry.matrix,
      speaker.materials.length
    );
    this.geo.merge(
      speakerTop.geometry,
      speakerTop.geometry.matrix,
      speaker.materials.length + speakerTop.materials.length
    );
    this.speak = new THREE.Mesh(this.geo, new THREE.MultiMaterial(mats));
      // setInterval(() => this.speaktop.position.z += 0.002, 10);
      // setTimeout(() => setInterval(() => this.speaktop.position.z -= 0.002, 10), 5);
    this.speak.rotateY(-0.65);
    this.speak.scale.set(20, 20, 20);
    this.speak.position.setZ(-200);
    this.speak.position.setY(-100);
    this.speak.position.setX(-100);
    this.speak.castShadow = true;
    this.scene.add(this.speak);
  }
  animate(timestamp) {
    this.renderScene();
    this.delta += 0.1;
    this.shapeOne.rotateY(0.01);
    this.shapeOne.rotateX(0.003);
    if (this.play && this.partyMesh.visible) this.partyMesh.visible = false;
    if (!this.play && this.partyMesh && !this.partyMesh.visible) this.partyMesh.visible = true;
    // if (this.play && timestamp % 10 < 3 && Math.random() < 0.5) this.changeLightColor();
    if (this.partyMesh) this.cycleOpacity();
    if (this.music && this.play) {
      this.renderer.setClearColor(0x000000, 1);
      if (!this.lightInt) this.lightInt = setInterval(() => this.changeLightColor(), 460);
    }
    if (!this.music && !this.play) {
      this.renderer.setClearColor(0xffffff, 0);
      clearInterval(this.lightInt);
      this.lightInt = null;
    }
    if (window.scrollY >= this.mount.offsetTop - window.innerHeight && window.scrollY < this.mount.offsetTop + this.mount.offsetHeight) {
      setTimeout(() => this.frameId = window.requestAnimationFrame(this.animate), 1000 / 30 );
    } else {
      setTimeout(() => this.frameId = window.requestAnimationFrame(this.animate), 2000 );
    }
  }
  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
  onPlay() {
    if (this.play) this.audio.play();
    else this.audio.pause();
  }
  cycleOpacity() {
    if (this.partyMesh.position.y >= -20) this.positionUp = false;
    if (this.partyMesh.position.y <= -30) this.positionUp = true;
    this.positionUp ? this.partyMesh.position.y += 0.5 : this.partyMesh.position.y -= 0.5;
    if (this.partyMesh.material.opacity >= 1) this.upDown = true;
    if (this.partyMesh.material.opacity <= 0) this.upDown = false;
    if (this.partyMesh.material.opacity > 0 && this.upDown) this.partyMesh.material.opacity -= 0.1;
    if (this.partyMesh.material.opacity < 1 && !this.upDown) this.partyMesh.material.opacity += 0.1;
  }
  light() {
    this.spotLightColor = new THREE.SpotLight( 0x08FF00, 10, 1000, 0.9, 0.0);
    this.spotLightColor.castShadow = true;
    this.spotLightColor.position.setZ(0);
    this.spotLightColor.position.setY(200);
    this.spotLightColor.position.setX(0);
    this.spotLightColor.target.position.set(0, -100, -200);
    this.scene.add(this.spotLightColor);
  }
  changeLightColor() {
    const randomColor = Math.random() * 0xffffff;
		this.spotLightColor.color.setHex(randomColor);
  }
  plane() {
    const geometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
    const texture =  new THREE.TextureLoader().load(checkerboard);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -90 * Math.PI / 180;
    mesh.position.y = -100;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
  partyText() {
    const loader = new THREE.FontLoader();
     loader.load('fonts/gentilis_regular.typeface.json', (font) => {
      const geometry = new THREE.TextGeometry("Click To Party\n(light flashes)",
        {font: font, size: 3, height: 0.5, bevelEnabled: true, curveSegments: 3, bevelThickness: 0.1, bevelSize: 0.2, bevelSegments: 3 });
      const texture = new THREE.TextureLoader().load(perlin);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const material = new THREE.MeshLambertMaterial({
        map: texture 
    });
      this.partyMesh = new THREE.Mesh(geometry, material);
      this.partyMesh.position.y = -30;
      this.partyMesh.position.x = -5;
      this.partyMesh.position.z = -25; 
      this.scene.add(this.partyMesh);
    });
  }
  text() {
    const loader = new THREE.FontLoader();
    loader.load('fonts/gentilis_regular.typeface.json', (font) => {
      const geometry = new THREE.TextGeometry("    \"I'm not a \nbusinessman.. \n      I'm a business,\n                MAN\"",
        {font: font, size: 7, height: 0.5, bevelEnabled: true, curveSegments: 3, bevelThickness: 0.1, bevelSize: 0.2, bevelSegments: 3 });
      const texture = new THREE.TextureLoader().load(perlin);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const material = new THREE.MeshLambertMaterial({
        wireframe: true,
        wireframeLinewidth: 2,
        map: texture 
    });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 28;
      mesh.position.x = 4;
      mesh.position.z = -50;
      this.scene.add(mesh);
      const light = new THREE.DirectionalLight(0xee82ee, 20.0);
      light.target = mesh;
    });
  }
    shape() {
      this.shapeOne = new THREE.Mesh(new THREE.SphereGeometry(50, 100, 100), 
      new THREE.MeshLambertMaterial({
          color: 0x808080,
          map: new THREE.TextureLoader().load(moon),
          normalMap: new THREE.TextureLoader().load(moon)
        }));
      this.shapeOne.position.z = -500;
      this.shapeOne.position.x = 500;
      this.shapeOne.position.y = 300;
      this.shapeOne.castShadow = true;
      this.scene.add(this.shapeOne);
    }
  render() {
    return (
      <div onClick={() => {
          this.play = !this.play;
          this.music = !this.music;
          this.onPlay();
        }}
        style={{
          position: 'relative', 
          zIndex: 99,
          width: window.innerWidth,
          height: window.innerWidth * 9/16,
          cursor: 'pointer'
        }}
        ref={(mount) => this.mount = mount }
      >
      </div>
    )
  }
}