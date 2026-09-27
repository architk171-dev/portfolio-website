import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const rimLight = new THREE.PointLight(0xff6ec7, 0, 80, 1.5);
  rimLight.position.set(-5, 14, -5);
  scene.add(rimLight);

  const accentLight = new THREE.PointLight(0x7b4dff, 0, 80, 1.5);
  accentLight.position.set(6, 12, -4);
  scene.add(accentLight);

  const frontFill = new THREE.PointLight(0xfff5ee, 0, 60, 1.8);
  frontFill.position.set(0, 13, 9);
  scene.add(frontFill);

  const topLight = new THREE.PointLight(0xc2a4ff, 0, 60, 1.5);
  topLight.position.set(0, 18, 0);
  scene.add(topLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 1.0,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 4,
      duration: duration,
      ease: ease,
    });
    gsap.to(accentLight, {
      intensity: 3.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(frontFill, {
      intensity: 2.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(topLight, {
      intensity: 2.0,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 0.55,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
