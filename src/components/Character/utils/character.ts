import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
                const mat = mesh.material as THREE.MeshStandardMaterial;
                if (!mat || !mat.color) return;
                const name = child.name || "";
                if (name === "BODYSHIRT") {
                  mat.emissive = new THREE.Color(0xaaaacc);
                  mat.emissiveIntensity = 2.0;
                  mat.roughness = 0.5;
                } else if (name === "Pant") {
                  mat.color.set(0x1a1a2e);
                  mat.emissive = new THREE.Color(0x2a2a4e);
                  mat.emissiveIntensity = 1.5;
                } else if (name === "Shoe") {
                  mat.color.set(0x1a1a1a);
                  mat.emissive = new THREE.Color(0x222222);
                  mat.emissiveIntensity = 1.2;
                } else if (name === "Sole") {
                  mat.color.set(0xeeeeee);
                  mat.emissive = new THREE.Color(0x666666);
                  mat.emissiveIntensity = 1.0;
                } else if (name === "hair") {
                  mat.color.set(0x1a1a1a);
                  mat.emissive = new THREE.Color(0x151515);
                  mat.emissiveIntensity = 1.2;
                } else if (name === "Ear001" || name === "Hand" || name === "Neck") {
                  mat.color.set(0xe8b896);
                  mat.emissive = new THREE.Color(0xb08060);
                  mat.emissiveIntensity = 1.5;
                } else if (name === "EYEs001") {
                  mat.emissive = new THREE.Color(0x9966ff);
                  mat.emissiveIntensity = 1.5;
                } else if (name === "Eyebrow") {
                  mat.color.set(0x1a1a1a);
                  mat.emissive = new THREE.Color(0x151515);
                  mat.emissiveIntensity = 1.0;
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
