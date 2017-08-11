window.addEventListener('DOMContentLoaded', function() {
        
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);

	var createScene = function() {
		assetsManager.useDefaultLoadingScreen = false;
		engine.displayLoadingUI();

		engine.loadingUIText = "Welcome";
		engine.loadingUIBackgroundColor = "red";

	    var scene = new BABYLON.Scene(engine);

	    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

	    camera.setTarget(BABYLON.Vector3.Zero());

	    camera.attachControl(canvas, false);

	 
	    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

	    var mainMat = new BABYLON.StandardMaterial("ground", scene);
	    mainMat.diffuseColor = new BABYLON.Color3(255, 255, 255);
	    mainMat.wireframe = true;

		var loader = new BABYLON.AssetsManager(scene);

		
		var android = loader.addMeshTask("android", "", "assets/", "android.obj");

		android.onSuccess = function(task){
			task.loadedMeshes.forEach(function(m) {
                console.log("Loaded!");
                m.position = BABYLON.Vector3.Zero();
                m.material = mainMat;
             });
		};

		loader.onFinish = function() {
			console.log("ended");
			engine.hideLoadingUI();

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
