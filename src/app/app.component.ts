// video tutorial (ang+threejs getting started 10min): https://www.youtube.com/watch?v=xnlC2KtKbYA
// threejs crash course (40min+): https://www.youtube.com/watch?v=_OwJV2xL8M8
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
// for controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // import window source: https://www.leonelngande.com/how-to-get-a-reference-to-the-window-object-in-an-angular-8-application/
  providers: [{ provide: Window, useValue: window }],
})
export class AppComponent implements AfterViewInit {
  title = 'ang-threejs';
  constructor(private window: Window) {}

  // source: https://www.npmjs.com/package/three
  ngAfterViewInit(): void {
    let width = window.innerWidth,
      height = window.innerHeight;

    // init

    // what you're "looking at" (perspective)
    // param: fov,
    const camera = new THREE.PerspectiveCamera(50, width / height);
    camera.position.z = 8;

    const scene = new THREE.Scene();

    // geometry source (sphere): https://threejs.org/docs/?q=geom#api/en/geometries/SphereGeometry

    // for box geometry:
    // const geometry = new THREE.BoxGeometry(1, 1, 1);

    // "geometry" = shape
    const geometry = new THREE.SphereGeometry(1, 12, 12);

    // "material" = texture
    // const material = new THREE.MeshBasicMaterial({ color: 0x00008b });
    var material = new THREE.MeshLambertMaterial({ color: 0x00008b });

    // Add edges to the geometry (chatGPT)
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edges = new THREE.LineSegments(edgesGeometry, material);

    // "mesh" = combination of geo + mat
    const mesh = new THREE.Mesh(geometry, material);

    // light source
    var light = new THREE.PointLight(0xffffff, 1000, 250, 2);
    light.position.set(0, 10, 8);

    // Combine mesh and edges into a group
    const group = new THREE.Group();
    group.add(mesh);
    // edges for debugging
    group.add(edges);
    scene.add(light);

    // add mesh to the scene (view window)
    scene.add(group);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    // animation

    function animation(time: number) {
      group.rotation.x = time / 2000;
      group.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }

    // resize
    this.window.addEventListener('resize', () => {
      //update sizes
      width = window.innerWidth;
      height = window.innerHeight;
      // update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // change movement (acceleration on hold)
    controls.enableDamping = true;
    // zoom (scroll) + move object (x/y with right click) disabled
    controls.enablePan = false;
    controls.enableZoom = false;
  }
}
