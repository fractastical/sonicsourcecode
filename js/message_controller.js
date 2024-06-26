allVideoLoopsIndex = 0;


window.addEventListener('message', function(event) {
    const data = event.data;

    // const targetOrigin = event.origin || "*";
    const targetOrigin = "*";

    //TODO add bidirectional messaging
    event.source.postMessage({
        name: 'videolist',
        value: document.getElementById('videoListContents').textContent,
    }, targetOrigin);

    console.log("got a message");

    if (event.data.name === "playbackrate") {

        playbackrate =  parseFloat(event.data.value);
        const videoElement = document.getElementById('videoElement');
        videoElement.playbackRate = playbackRate;  // Ensure normal playback speed
        console.log(playbackrate);
        console.log(videoElement.playbackRate);
        videoElement.play();

    }

    //TODO: figure out some way to get this to work
    if (event.data.name === "videoInput") {

        console.log(event.data.value);
        // substitute "fakepath" for root to file /Users/jd/Desktop/Audiosphere_VJ
        const path = "/Users/jd/Desktop/Audiosphere_VJ/" + event.data.value.slice(12,event.data.value.length);
        console.log(path);
        const url = URL.createObjectURL(path);
        console.log(url);
        videoQueue.push(url);

    }


    if (event.data.name === "xrotation") {

        X_ROTATION_SPEED = parseFloat(event.data.value);
        

    }
    if (event.data.name === "videochange") {

        if (activeVideoQueue.length === 0) {
            // Repopulate activeVideoQueue with original video URLs
            activeVideoQueue.push(...originalVideos);
        }
    
        if (activeVideoQueue.length > 0) {
            videoElement.src = activeVideoQueue.shift();
            videoElement.playbackRate = playbackRate;  // Ensure normal playback speed
            videoElement.play();
        }
             

    }
    if (event.data.name === "videochangeloop") {
        
        allVideoLoopsIndex++;


        if(allVideoLoopsIndex >= allVideoLoops.length)
            allVideoLoopsIndex = 0;

        console.log("allVideoLoopsIndex"+allVideoLoopsIndex);
        console.log("allVideoLoops.length"+allVideoLoops.length);

        activeVideoQueue.length = 0; 
        activeVideoQueue = [];

        console.log("allVideoLoops[allVideoLoopsIndex:" + allVideoLoops[allVideoLoopsIndex].length);
        console.log(allVideoLoops[allVideoLoopsIndex]);
        activeVideoQueue.push(...allVideoLoops[allVideoLoopsIndex]);
        console.log("activeVideoQueue.length"+activeVideoQueue.length);

        if (activeVideoQueue.length > 0) {
            videoElement.src = activeVideoQueue[0];
            videoElement.muted = true;
            videoElement.playbackRate = playbackRate;  // Ensure normal playback speed
            // videoElement.load();
            videoElement.play();
        }
        

    }
    
    if (event.data.name === "mode") 
    {

        if(event.data.value === "color")
        {
            videoElementActive = false;
            mixedElementActive = false;
            mixedModeCounter = 0;

        }
        if(event.data.value === "video")
        {
            videoElementActive = true;
            mixedElementActive = false;
            mixedModeCounter = 0;

        }
        if(event.data.value === "mixed")
        {
            videoElementActive = true;
            mixedElementActive = true;
            mixedModeCounter = 1;

        }
        

    }

    if (event.data.name.startsWith("threshold")) {


        let threshNum = event.data.name.slice(9,event.data.name.length);
        let threshindex = parseInt(threshNum);
        console.log(threshNum + ":" + volumeThresholds[threshindex]);
        thresholds[threshindex] = parseInt(event.data.value)
        let input = document.getElementById('threshold' + threshindex);
        input.value = volumeThresholds[threshindex];

    }

    if (event.data.name === "master") {
        // Same for variable B
            let masterValue = parseInt(event.data.value);
            master.value = masterValue;
            let delta = masterValue - lastMasterValue;
            // volumeThresholds = volumeThresholds.map(() => masterValue);  // Set all thresholds to the master's value

            for (let i = 0; i < numBands; i++) {
                let input = document.getElementById('threshold' + i);
                thresholds[i] =  parseInt(input.value) + delta;
                input.value = thresholds[i];
                console.log(thresholds[i]);
                document.getElementById('volume' + i).textContent = 'v: 0 / ' + thresholds[i];
            }

            lastMasterValue = masterValue;

    }

    if (event.data.name === "hueoffset") {

        hueoffset = parseInt(event.data.value);

    }
    if (event.data.name === "hueoffset1") {

        hueoffset1 = parseInt(event.data.value);

    }
    if (event.data.name === "hueoffset2") {

        hueoffset2 = parseInt(event.data.value);

    }
    if (event.data.name === "hueoffset3") {

        hueoffset3 = parseInt(event.data.value);

    }
    if (event.data.name === "hueoffset4") {

        hueoffset4 = parseInt(event.data.value);

    }
    if (event.data.name === "hueoffset5") {

        hueoffset5 = parseInt(event.data.value);

    }

    if (event.data.name === "pointlightintensity") {

        pointLight.intensity = parseFloat(event.data.value);

    }


    if (event.data.name === "audiopop") {

        audioQueue.shift();

    }

    console.log(event.data);

    if (event.data.name === "videopop") {

        console.log("videopop");
        videoQueue.shift();

    }

    if (event.data.name === "numbands") {

        numBands = parseInt(event.data.value);
        initBands();
    }

    if (event.data.name === "holofanmode") {
        console.log(event.data.value);

        let fanon = parseInt(event.data.value);
        if(fanon == 1)
            holographicFanMode = true;
        else(fanon == 0)
            holographicFanMode = false;

    }

    if (event.data.name === "hueoffsetspeed") {

        hueOffsetSpeed = parseFloat(event.data.value);
        console.log("speed");
        console.log(event.data);

    }

    if (event.data.name === "yrotation") {

        Y_ROTATION_SPEED = parseFloat(event.data.value);

    }

    if (event.data.name === "brightness") {

        brightness = parseInt(event.data.value);

    }

    if (event.data.name === "saturation") {

        saturation = parseInt(event.data.value);
    }
    
    if (event.data.name === "volumemagnification") {

        volumemagnification = parseFloat(event.data.value);
    }

    if (event.data.name === "cxposition") {

        camera.position.x = parseFloat(event.data.value);
    }

    if (event.data.name === "cyposition") {

        camera.position.y = parseFloat(event.data.value);
    }
    
    
    if (event.data.name === "czposition") {

        camera.position.z = parseFloat(event.data.value);
    }

    //TODO: doesn't not apepar to update properly
    if (event.data.name === "activegeometrieslimit") {
        console.log(parseInt(event.data.value));
        ACTIVE_GEOMETRIES_LIMIT = parseInt(event.data.value);
    }

    if (event.data.name === "activegeometriesagedeath") {
        console.log(parseInt(event.data.value));
        activegeometriesagedeath = parseInt(event.data.value);
    }
    if (event.data.name === "activegeometriesopacityreduction") {
        console.log(parseFloat(event.data.value));
        activegeometriesopacityreduction = parseFloat(event.data.value);
    }

    

    if (event.data.name === "pointlightx") {

    
        pointLight.position.set(parseFloat(event.data.value), pointLight.position.y, pointLight.position.z);  // x, y, z

    }

    if (event.data.name === "pointlighty") {

        pointLight.position.set(pointLight.position.x, parseFloat(event.data.value), pointLight.position.z);  // x, y, z

    }

    if (event.data.name === "pointlightz") {

        pointLight.position.set(pointLight.position.x, pointLight.position.y, parseFloat(event.data.value));  // x, y, z

    }

    if (event.data.name === "renderdensity") {

        let pixeldensity = parseFloat(event.data.value);
        renderer.setPixelRatio(pixeldensity); // x times the normal resolution

        // might not work

    }

    if (event.data.name === "refreshrate") {

        
        // pointLight.position.set(pointLight.position.x, pointLight.position.y, parseFloat(event.data.value));  // x, y, z

    }


    if (event.data.name === "innertriangleactive") {

        if(parseInt(event.data.value) == 1)
         innerTriangleActive = true;
        else if (parseInt(event.data.value) == 0)
            innerTriangleActive = false;
        

    }

    if (event.data.name === "innertriangleoffset") {

        innerTriangleOffset = parseFloat(event.data.value); 
        

    }



});
