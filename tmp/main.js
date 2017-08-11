window.addEventListener('DOMContentLoaded', function() {
        
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);

	var createScene = function() {
		BABYLON.SceneLoader.ShowLoadingScreen = false;

	    var scene = new BABYLON.Scene(engine);

	    //var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0,-5), scene);
	    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1.5, 1.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

	    //camera.setTarget(BABYLON.Vector3.Zero());

	    camera.attachControl(canvas, false);

	 
	    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

	    var mainMat = new BABYLON.StandardMaterial("ground", scene);
	    mainMat.diffuseColor = new BABYLON.Color3(255, 255, 255);
	    //mainMat.wireframe = true;

		var loader = new BABYLON.AssetsManager(scene);
		loader.useDefaultLoadingScreen = false;
		

		var android = loader.addMeshTask("android", "", "assets/", "androidB.obj");

		android.onSuccess = function(task){
			task.loadedMeshes.forEach(function(m) {
                console.log("Loaded!");
                m.position = BABYLON.Vector3.Zero();
                m.material = mainMat;
             });
		};

		loader.onFinish = function() {
			console.log("ended");

	        engine.runRenderLoop(function () {
	            scene.render();
	        });
   		};
	   
	   	loader.load();

	    return scene;
	}

	var scene = createScene();


	// engine.runRenderLoop(function() {
	//     scene.render();
	// });

	window.addEventListener('resize', function() {
	    engine.resize();
	});
});
