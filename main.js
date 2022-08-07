var song1 = "";
var song2 = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristVis = "false";
var rightWristVis = "false";
var ScoreLeftWrist = 0;
var Song1_isplaying = "";
var SOng2_isplaying = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
    song1.setVolume(1);
    song2.setVolume(1);
    song1.rate(1);
    song2.rate(1);
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet( video , modelloaded);
    poseNet.on("pose",gotPoses);

}

function modelloaded(){
    console.log("model is loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        ScoreLeftWrist = results[0].pose.keypoints[10].score;

        console.log("left wrist x ="+ leftWristX + ",left wrist y =" + leftWristY+ ".");
        console.log("right wrist x ="+ rightWristX + ",right wrist y =" + rightWristY + ".");

        leftWriststr/*string*/ = results[0].keypoints[9].score;
        leftWristnum /*number*/= Number(leftWristnum);
        leftWrist = Math.floor(leftWristnum);

        if(leftWristX != 0){
              leftWristVis = "true";
              console.log("left Wrist is visible");
              Song1_isplaying = "true";
              Song2_isplaying = "false";
              console.log("Song 1 is playing");
        }
        else if(rightWristX != 0){
            rightWristVis = "true";
            console.log("Right wrist is visible");
            Song2_isplaying = "true";
            Song1_isplaying = "false";
            console.log("Song 2 is playing")
        }

        
    }
}



function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");


if(leftWrist > 0.2){
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20);
    song2.stop();
    song1.play();
    console.log("Song 1 stopped and song 2 played")
}
if(leftWristVis == "false" && rightWristVis == "true"){
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristX,rightWristY,20);
    song1.stop();
    song2.play();
    console.log("song 1 playing and song 2 stopped");
}


}