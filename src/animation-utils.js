import React from 'react';
import * as THREE from 'three';

import speakerJSON from './models/speaker.json';
import speakerTopJSON from './models/speakertop.json';
import speakerBottomJSON from './models/speakerbottom.json';
import checkerboard from './textures/FloorsCheckerboard_S_Normal.jpg';
import perlin from './textures/perlin-512.png';
import moon from './textures/moon_1024.jpg';

const flyingHome = require('./audio/flying home.mp3');
const takeOver = require('./audio/TakeOver.mp3');

THREE.Cache.enabled = true;

const jsonLoader = new THREE.JSONLoader();

export const size = {
  width: null,
  height: null
}

export const animObj = {
  camera: new THREE.PerspectiveCamera(75, 16/9, 10, 1000),
  scene: new THREE.Scene(),
  renderer: new THREE.WebGLRenderer({ antialias: true, alpha: true }),
  audio: Math.random() <= .5 ? new Audio(flyingHome) : new Audio(takeOver),
  hemLight: new THREE.HemisphereLight(0xffffff, 0xc61aff, 0.5),
  spotLight: new THREE.SpotLight( 0xee82ee, 4.0, 1000, 0.9, 0.0),
  delta: 0,
  upDown: false,
  moon: new THREE.Mesh(
    new THREE.SphereGeometry(50, 100, 100), 
    new THREE.MeshLambertMaterial({
      color: 0x808080,
      map: new THREE.TextureLoader().load(moon),
    })
  ),
  play: false,
  music: false
}


animObj.audio.volume = 0.5;
animObj.scene.add(animObj.hemLight);
animObj.scene.add( animObj.spotLight );
animObj.scene.add( animObj.spotLight.target );
animObj.scene.fog = new THREE.Fog( 0xf2f7ff, 1, 1000);

export const setWidthAndHeight = (width, height) => {
  size.width = width;
  size.height = height;
};


export const cameraRender = () =>
  animObj.camera.position.z = 30;

export const resetCamera = () => {
  animObj.camera.aspect = size.width / size.height;
  animObj.camera.updateProjectionMatrix();
  animObj.renderer.setSize(size.width, size.height);
};

export const renderer = (pixelRatio) => {
  animObj.renderer.setClearColor(0xffffff, 0);
  animObj.renderer.shadowMap.enabled = true;
  animObj.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  animObj.renderer.gammaInput = true;
  animObj.renderer.gammaOutput = true;
  animObj.renderer.receiveShadow = true;
  animObj.renderer.setPixelRatio(pixelRatio);
  animObj.renderer.setSize(size.width, size.height);
};

export const setSpotLight = () => {
  animObj.spotLight.castShadow = true;
  animObj.spotLight.position.setZ(-20);
  animObj.spotLight.position.setY(40);
  animObj.spotLight.position.setX(-40);
  animObj.spotLight.target.position.set(0, -100, -100);
};

export const setAnimate = () => {
  animObj.delta += 0.1;
  animObj.moon.rotateY(0.01);
  animObj.moon.rotateX(0.003);
  if (animObj.play && animObj.partyMesh.visible)
    animObj.partyMesh.visible = false;
  if (!animObj.play && animObj.partyMesh && !animObj.partyMesh.visible)
    animObj.partyMesh.visible = true;
  if (animObj.partyMesh) setOpacity();
  if (animObj.music && animObj.play) {
    animObj.renderer.setClearColor(0x000000, 1);
    if (!animObj.lightInt)
      animObj.lightInt = setInterval(() => setLightColor(), 460);
  }
  if (!animObj.music && !animObj.play) {
    animObj.renderer.setClearColor(0xffffff, 0);
    clearInterval(animObj.lightInt);
    animObj.lightInt = null;
  }
};


const setLightColor = () => {
  const randomColor = Math.random() * 0xffffff;
  animObj.spotLightColor.color.setHex(randomColor);
}
export const setSpeakers = () => {
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
  speakers.position.setZ(-200);
  speakers.position.setY(-100);
  speakers.position.setX(-100);
  speakers.castShadow = true;
  animObj.scene.add(speakers);
};

export const setMoon = () => {
  animObj.moon.position.z = -500;
  animObj.moon.position.x = 500;
  animObj.moon.position.y = 300;
  animObj.moon.castShadow = true;
  animObj.scene.add(animObj.moon);
};

export const setPartyText = () => {
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
    animObj.partyMesh = new THREE.Mesh(geometry, material);
    animObj.partyMesh.position.y = -30;
    animObj.partyMesh.position.x = -5;
    animObj.partyMesh.position.z = -25; 
    animObj.scene.add(animObj.partyMesh);
  });
};

export const setText = () => {
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
    mesh.position.y = 28;
    mesh.position.x = 4;
    mesh.position.z = -50;
    animObj.scene.add(mesh);
    const light = new THREE.DirectionalLight(0xee82ee, 20.0);
    light.target = mesh;
  });
};

export const setPlane = () => {
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
  animObj.scene.add(mesh);
};

export const setSpotLightColor = () => {
  animObj.spotLightColor = new THREE.SpotLight( 0x08FF00, 10, 1000, 0.9, 0.0);
  animObj.spotLightColor.castShadow = true;
  animObj.spotLightColor.position.setZ(0);
  animObj.spotLightColor.position.setY(200);
  animObj.spotLightColor.position.setX(0);
  animObj.spotLightColor.target.position.set(0, -100, -200);
  animObj.scene.add(animObj.spotLightColor);
};

export const setOpacity = () => {
  if (animObj.partyMesh.position.y >= -20) animObj.positionUp = false;
  if (animObj.partyMesh.position.y <= -30) animObj.positionUp = true;
  animObj.positionUp ? animObj.partyMesh.position.y += 0.5 : animObj.partyMesh.position.y -= 0.5;
  if (animObj.partyMesh.material.opacity >= 1) animObj.upDown = true;
  if (animObj.partyMesh.material.opacity <= 0) animObj.upDown = false;
  if (animObj.partyMesh.material.opacity > 0 && animObj.upDown)
    animObj.partyMesh.material.opacity -= 0.1;
  if (animObj.partyMesh.material.opacity < 1 && !animObj.upDown)
    animObj.partyMesh.material.opacity += 0.1;
};
