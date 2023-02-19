// Background particle inspiration from 'Design Course' tutorial at https://www.youtube.com/watch?v=dLYMzNmILQA&ab_channel=DesignCourse -->

		
		//Scene
		const scene = new THREE.Scene();

		//Camera
		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(new THREE.Color('#000000'), 1)
		document.body.appendChild(renderer.domElement);

		//Mouse
		document.addEventListener('mousemove', animateParticles)

		let mouseX = 0
		let mouseY = 0

		function animateParticles(event) {
			mouseY = event.clientY
			mouseX = event.clientX
		}

		//Geometry objects
		const geometry = new THREE.SphereGeometry(1.2, 90, 90);

		const particlesGeometry = new THREE.BufferGeometry;
		const particlesCnt = 5000;

		const posArray = new Float32Array(particlesCnt * 2);

		for(let i = 0; i < particlesCnt * 3; i++) {
			// posArray[i] = Math.random()
			// posArray[i] = Math.random() - 0.5
			posArray[i] = (Math.random() - 0.5) * 10
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

		//Materials
		const material = new THREE.PointsMaterial( {
			size: 0.009,
		});


		const particlesMaterial = new THREE.PointsMaterial({
			size: 0.009,
		});

		//Mesh
		const sphere = new THREE.Points(geometry, material)
		const particlesMesh = new THREE.Points(particlesGeometry, material, particlesMaterial)
		scene.add(sphere, particlesMesh);

		camera.position.z = 5;


		//Animate
		const clock = new THREE.Clock()

		const tick = () =>
		{

			const elapsedTime = clock.getElapsedTime()

			sphere.rotation.y = .2 * elapsedTime
			sphere.rotation.x = .2 * elapsedTime
			particlesMesh.rotation.y = -.1 * elapsedTime

			if (mouseX > 0) {
				particlesMesh.rotation.y = -mouseY * (elapsedTime * 0.000008)
				particlesMesh.rotation.x = -mouseX * (elapsedTime * 0.000008)
		}

			renderer.render(scene,camera);

			window.requestAnimationFrame(tick)
		}

		tick()



