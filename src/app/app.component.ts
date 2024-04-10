// video tutorial (ang+threejs getting started 10min): https://www.youtube.com/watch?v=xnlC2KtKbYA
// threejs crash course (40min+): https://www.youtube.com/watch?v=_OwJV2xL8M8
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';

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
    const width = window.innerWidth,
      height = window.innerHeight;

    // init

    // what you're "looking at" (perspective)
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 10;

    const scene = new THREE.Scene();

    // geometry source (sphere): https://threejs.org/docs/?q=geom#api/en/geometries/SphereGeometry

    // for box geometry:
    // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // const material = new THREE.MeshNormalMaterial();

    // "geometry" = shape
    const geometry = new THREE.SphereGeometry(1, 16, 16);

    // "material" = texture
    const material = new THREE.MeshNormalMaterial();

    // "mesh" = combination of geo + mat
    const mesh = new THREE.Mesh(geometry, material);

    // add mesh to the scene (view window)
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    // animation

    function animation(time: number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  }
}
