import * as THREE from 'three';
import speakerJSON from './models/speaker.json';
import speakerTopJSON from './models/speakertop.json';
import speakerBottomJSON from './models/speakerbottom.json';
import checkerboard from './textures/FloorsCheckerboard_S_Normal.jpg';
import perlin from './textures/perlin-512.png';
import moon from './textures/moon_1024.jpg';
import earth from './textures/earth_atmos_4096.jpg';

const flyingHome = require('./audio/flying home.mp3');
const takeOver = require('./audio/TakeOver.mp3');

const jsonLoader = new THREE.JSONLoader();

const size = {
  width: null,
  height: null
};

THREE.Cache.enabled = true;

class AnimationLogic {
  constructor(options) {
    this.size = size;
    this.camera = new THREE.PerspectiveCamera(...options.camera);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer(options.renderer);
  }
  setWidthAndHeight(width, height) {
    this.size.width = width;
    this.size.height = height;
    return this;
  }
  resetCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.size.width, this.size.height);
    return this;
  }
}



export class MusicLogicAnimation extends AnimationLogic {
  constructor(options) {
    super(options);
    this.audio = Math.random() <= .5 ? new Audio(flyingHome) : new Audio(takeOver);
    this.hemLight = new THREE.HemisphereLight(0xffffff, 0xc61aff, 0.5);
    this.spotLight = new THREE.SpotLight( 0xee82ee, 4.0, 1000, 0.9, 0.0);
    this.spotLightColor = new THREE.SpotLight( 0x08FF00, 10, 1000, 0.9, 0.0);
    this.delta = 0;
    this.upDown = false;
    this.moon = new THREE.Mesh(
      new THREE.SphereGeometry(50, 100, 100), 
      new THREE.MeshLambertMaterial({
        color: 0x808080,
        map: new THREE.TextureLoader().load(moon),
      })
    );
    this.play = false;
    this.music = false;
  }
  setScene() {
    this.audio.volume = 0.5;
    this.scene.fog = new THREE.Fog( 0xf2f7ff, 1, 1000);
    this.scene.add(
      this.hemLight,
      this.spotLight,
      this.spotLight.target,
      this.spotLightColor,
      this.moon
    );
    return this;
  }
  setRenderer(pixelRatio) {
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.receiveShadow = true;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);
    return this;
  }
  setCameraPosition() {
    this.camera.position.z = 30;
    return this;
  }
  setSpotLight() {
    this.spotLight.castShadow = true;
    this.spotLight.position.set(-40, 40, -20);
    this.spotLight.target.position.set(0, -100, -100);
    return this;
  }
  setAnimate() {
    this.delta += 0.1;
    this.moon.rotateY(0.01);
    this.moon.rotateX(0.003);
    if (this.play && this.partyMesh.visible)
      this.partyMesh.visible = false;
    if (!this.play && this.partyMesh && !this.partyMesh.visible)
      this.partyMesh.visible = true;
    if (this.partyMesh) this.setOpacity();
    if (this.music && this.play) {
      this.renderer.setClearColor(0x000000, 1);
      if (!this.lightInt)
        this.lightInt = setInterval(() => this.changeLightColor(), 460);
    }
    if (!this.music && !this.play) {
      this.renderer.setClearColor(0xffffff, 0);
      clearInterval(this.lightInt);
      this.lightInt = null;
    }
    return this;
  }
  changeLightColor() {
    const randomColor = Math.random() * 0xffffff;
    this.spotLightColor.color.setHex(randomColor);
    return this;
  }
  setSpeakers() {
    const geo = new THREE.Geometry();
    const speaker = jsonLoader.parse(speakerJSON);
    const speakerTop = jsonLoader.parse(speakerTopJSON);
    const speakerBottom = jsonLoader.parse(speakerBottomJSON);
    const mats = [
      ...speaker.materials,
      ...speakerBottom.materials,
      ...speakerTop.materials
    ];
    geo.merge(speaker.geometry, speaker.geometry.matrix);
    geo.merge(
      speakerBottom.geometry,
      speakerBottom.geometry.matrix,
      speaker.materials.length
    );
    geo.merge(
      speakerTop.geometry,
      speakerTop.geometry.matrix,
      speaker.materials.length + speakerTop.materials.length
    );
    const speakers = new THREE.Mesh(geo, mats);
    speakers.rotateY(-0.65);
    speakers.scale.set(20, 20, 20);
    speakers.position.set(-100, -100, -200);
    speakers.castShadow = true;
    this.scene.add(speakers);
    return this;
  }
  setMoon() {
    this.moon.position.set(500, 300, -500);
    this.moon.castShadow = true;
    return this;
  }
  setPartyText() {
    const loader = new THREE.FontLoader();
    loader.load('fonts/gentilis_regular.typeface.json', (font) => {
      const geometry = new THREE.TextGeometry("Click To Party\n(light flashes)",
        {
          font: font,
          size: 3,
          height: 0.5,
          bevelEnabled: true,
          curveSegments: 3,
          bevelThickness: 0.1,
          bevelSize: 0.2,
          bevelSegments: 3
        }
      );
      const texture = new THREE.TextureLoader().load(perlin);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const material = new THREE.MeshLambertMaterial({
        map: texture 
      });
      this.partyMesh = new THREE.Mesh(geometry, material);
      this.partyMesh.position.set(-5, -30, -25);
      this.scene.add(this.partyMesh);
    });
    return this;
  }
  setText() {
    const loader = new THREE.FontLoader();
    loader.load('fonts/gentilis_regular.typeface.json', (font) => {
      const geometry = new THREE.TextGeometry("    \"I'm not a \nbusinessman.. \n      I'm a business,\n                MAN\"",
        {
          font: font,
          size: 7,
          height: 0.5,
          bevelEnabled: true,
          curveSegments: 3,
          bevelThickness: 0.1,
          bevelSize: 0.2,
          bevelSegments: 3
        }
      );
      const texture = new THREE.TextureLoader().load(perlin);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const material = new THREE.MeshLambertMaterial({
        wireframe: true,
        wireframeLinewidth: 2,
        map: texture 
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(4, 28, -50);
      this.scene.add(mesh);
      const light = new THREE.DirectionalLight(0xee82ee, 20.0);
      light.target = mesh;
    });
    return this;
  }
  setPlane() {
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
    return this;
  }
  setSpotLightColor() {
    this.spotLightColor.castShadow = true;
    this.spotLightColor.position.set(0, 200, 0);
    this.spotLightColor.target.position.set(0, -100, -200);
    return this;
  }
  setOpacity() {
    if (this.partyMesh.position.y >= -20) this.positionUp = false;
    if (this.partyMesh.position.y <= -30) this.positionUp = true;
    this.positionUp ? this.partyMesh.position.y += 0.5 : this.partyMesh.position.y -= 0.5;
    if (this.partyMesh.material.opacity >= 1) this.upDown = true;
    if (this.partyMesh.material.opacity <= 0) this.upDown = false;
    if (this.partyMesh.material.opacity > 0 && this.upDown)
      this.partyMesh.material.opacity -= 0.1;
    if (this.partyMesh.material.opacity < 1 && !this.upDown)
      this.partyMesh.material.opacity += 0.1;
    return this;
  }
}

export class SpaceLogicAnimation extends AnimationLogic {
  constructor(options) {
    super(options);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    this.firstSpotLight = new THREE.SpotLight(0xffffff, 1.01);
    this.secondSpotLight = new THREE.SpotLight(0xffffff, 0);
  }
  setScene() {
    this.scene.fog = new THREE.Fog(0x9c76f7, 3624.77, 9000);
    this.scene.add(
      new THREE.AmbientLight(0x000000),
      new THREE.HemisphereLight(0x8b86d7, 0x000000, 0.79),
      this.directionalLight,
      this.firstSpotLight,
      this.secondSpotLight
    );
    return this;
  }
  setAnimate() {
    this.planet.rotateY(0.05);
		this.camera.position.z = Math.tan(Date.now() * 0.0002) * 2000;
    this.camera.lookAt(this.planet.position);
    return this;
  }
  setCameraPosition() {
    this.camera.position.z = 500;
    return this;
  }
  setRenderer(pixelRatio) {
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(this.size.width, this.size.height);
    return this;
  }
  setPlanet() {
    const geometry = new THREE.SphereGeometry(50, 100, 100);
    const map = new THREE.TextureLoader().load(earth);
    const material = new THREE.MeshLambertMaterial(
      {
        shading: THREE.FlatShading,
        map 
      }
    );
    this.planet = new THREE.Mesh(geometry, material);
    this.planet.position.y = 99.22;
    this.scene.add(this.planet);
    return this;
  }
  setDirectionalLight() {
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    return this;
  }
  setFirstSpotLight() {
    this.firstSpotLight.position.set(-751.94, 127.55, 736.43);
    this.firstSpotLight.castShadow = true;
    return this;
  }
  setSecondSpotLight() {
    this.secondSpotLight.position.set(100, 1000, 100);
    this.secondSpotLight.castShadow = true;
    return this;
  }
  setStars() {
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 5000; i ++ ) {
      var vertex = new THREE.Vector3();
      vertex.x = 10000 * Math.random() - 5000;
      vertex.y = 10000 * Math.random() - 5000;
      vertex.z = 10000 * Math.random() - 50;
      geometry.vertices.push( vertex );
    }
    const material = new THREE.PointsMaterial(
      {
        size: 3,
        sizeAttenuation: true,
        transparent: true 
      }
    );
		material.color.setHex(0xffffff);
		const particles = new THREE.Points(geometry, material);
    particles.sortParticles = true;
    this.scene.add(particles);
    return this;
  }
}