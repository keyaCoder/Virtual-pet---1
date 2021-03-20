var dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg;

function preload()
{
	dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
  
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  foodS = 0;
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  fill("black");
  stroke("black");
  text("Food : " + foodS, 150, 20 );

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food : x
  });
}



