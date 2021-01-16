//Create variables here
var dog , dogHappy, dogSad;
var dogImg, dogImg2;
var db , foodS , foodStock;
var fedTime, lastFed, feed,addFood, foodObj;

function preload()

{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();

  db = firebase.database();
  dog = createSprite(800 , 200 , 10 , 10);
  dog.scale = 0.2;
  dog.addImage(dogImg);

  feed = createButton("FEED");
  feed.position(600 , 30);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(700 , 30);
  addFood.mousePressed(addFood);


  foodStock = db.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(140 , 210 , 144);
  foodObj.diplay();

  fedTime = db.ref('fedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();

  })
  if(lastFed>= 12){
    text("LAST FEED:" +lastFed % 12 +'pm', 350 , 30);

  }else if(lastFed === 0){
    text("LAST FEED: 12am", 350 , 30); 

  }else{
    text("LAST FEDD:"+ lastFed+'am', 350 , 30);
  }

  

  drawSprites();
}


function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    food:foodObj.getFoodStock(),fedTime:hour()
  })
}
function addFood(){
  foodS++
  db.ref('/').update({
    food:foodS
  })
}

