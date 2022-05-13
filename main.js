Webcam.set(
{
height: 300,
 width:350, 
 image_format:'jpeg',
jpeg_quality:90

});
camera= document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(
        function(data_uri)
        {
            document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
        }
    );

}
console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RInuMTOJp/model.json",modelLoaded)

function modelLoaded()
{
 console.log("model is loaded") 
}

prediction_1="";        

prediction_2="";

function speak()
{
    synth=window.speechSynthesis;
    speak_data_1="The first prediction is"+prediction_1;
    speak_data_2="The second prediction is"+prediction_2;
    utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);

}

function check()
{
    img=document.getElementById("captured_image");
    console.log("***")
    classifier.classify(img,gotResult); 
    console.log("***after classify")
}

function gotResult(error,results)
{
 if(error)
 {
     console.log("inside error")
     console.error(error);
 }
 else
 {
     console.log("inside else case")
  console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;

prediction_1=results[0].label;
prediction_2=results[1].label;

speak();
if(prediction_1=="happy")
{
    document.getElementById("update_emoji").innerHTML="&#128522;";
}

if(prediction_1=="sad")
{
    document.getElementById("update_emoji").innerHTML="&#128532;";
}

if(prediction_1=="angry")
{
    document.getElementById("update_emoji").innerHTML="&#128548;";
}

if(prediction_2=="happy")
{
    document.getElementById("update_emoji2").innerHTML="&#128522;";
}

if(prediction_2=="sad")
{
    document.getElementById("update_emoji2").innerHTML="&#128532;";
}

if(prediction_2=="angry")
{
    document.getElementById("update_emoji2").innerHTML="&#128548;";
}
 }

}


