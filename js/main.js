window.onload = function() {

var Challenge = (function() {

  function PuzzleImage (id, name, src, altsrc) {
    this.id = id;
    this.name = name;
    this.image = new Image();
    this.src = src;
    this.makeDiv = '<img src="' + src + '">';
    this.altsrc = altsrc;
  }
  var proto = PuzzleImage.prototype;

  var lemon1 = new PuzzleImage('0', 'lemon1', 'img/still/lemon_step_1_master.jpg', 'img/motion/lemon_step_1_master.gif');
  var lemon2 = new PuzzleImage('1', 'lemon2', 'img/still/lemon_step_2_master.jpg', 'img/motion/lemon_step_2_master.gif');
  var lemon3 = new PuzzleImage('2', 'lemon3', 'img/still/lemon_step_3_master.jpg', 'img/motion/lemon_step_3_master.gif');
  var lemon4 = new PuzzleImage('3', 'lemon4', 'img/still/lemon_step_4_master.jpg', 'img/motion/lemon_step_4_master.gif');
  var lemon5 = new PuzzleImage('4', 'lemon5', 'img/still/lemon_step_5_master.jpg', 'img/motion/lemon_step_5_master.gif');
  var lemon6 = new PuzzleImage('5', 'lemon6', 'img/still/lemon_step_6_master.jpg', 'img/motion/lemon_step_6_master.gif');
  var lemon7 = new PuzzleImage('6', 'lemon7', 'img/still/lemon_step_7_master.jpg', 'img/motion/lemon_step_7_master.gif');


  //Arrays//
  var lemonArray = [];
  lemonArray.push(lemon1, lemon2, lemon3, lemon4, lemon5, lemon6, lemon7);
  //need two versions of the array--one as index and one to shuffle//
  var copyLemon = lemonArray.slice();


  //Using Durstenfeld shuffle algorithm//
  function shuffleArray(array) {
    for (var g = array.length - 1; g > 0; g--) {
        var j = Math.floor(Math.random() * (g + 1));
        var temp = array[g];
        array[g] = array[j];
        array[j] = temp;
    }
    return array;
  }

  //Adding to the DOM//


  proto.populateDOM = function() {
    var greenBox = document.getElementById('greenBox');
    var fragment = document.createDocumentFragment();
    var purpleBox = document.getElementById('purpleBox');
       for (var i = 0; i < copyLemon.length; ++i) {
               var lemonButton = document.createElement('button');
               lemonButton.className = 'lemonButton';
               lemonButton.id = copyLemon[i].id;
               lemonButton.src = copyLemon[i].src;
               lemonButton.altsrc = copyLemon[i].altsrc;
               var oneImage = copyLemon[i].makeDiv;
               fragment.appendChild(lemonButton);
               lemonButton.innerHTML = oneImage;

        }

      //When we're done we add this finished SHUFFLED <IMAGES> to the <DIV>//
      greenBox.appendChild(fragment);

      //Here we create the answers using the unshuffled array//

      for (var h = 0; h < lemonArray.length; ++h) {
            var li = document.createElement('li');
            li.className = 'hiddenAnswers';
            li.id = lemonArray[h].id;
            li.name = lemonArray[h].name;
            var oneImage = lemonArray[h].makeDiv;
            fragment.appendChild(li);
            li.innerHTML = oneImage;
      }
      purpleBox.appendChild(fragment);
  }

  proto.moveMyMouse = function() {
    var theParent = document.querySelector("#greenBox");
    theParent.addEventListener("mouseover", initiateMouse, true); 
    purpleAnswer = document.querySelector("#purpleBox");

      function initiateMouse(event) {
          //toggles images on hover//
          event.target.addEventListener('mouseout', switchThem, false);
          event.target.addEventListener('dblclick', moveImage, false);

          function switchThem(){
            if (event.target !== event.currentTarget) {
              var testing = this.parentNode.altsrc;
              event.target.src = testing;
            }
            event.stopPropagation();
          }
          // var testing = event.target.src;  //has to be twice so they go back and forth//
          // event.target.src = event.target.src;
          // console.log(testing);

      }

      function moveImage(event) {
      
        purpleAnswer.addEventListener('click', dropImage, false);
        //has to be inside to have access to mySelection variable//
        mySelection = this.parentNode.id;  //needs to be public
        // console.log(mySelection);  //this will be a number.
        selectionPac = this.parentNode;  //needs to be public
        this.setAttribute('class', ' movingStyle');
        //to prevent the gray button placeholders from being moveable//

          var self = this;
          document.onmousemove = function(e) {

            e = e || event;
                  self.style.left = e.pageX-1+'px';
                  self.style.top = e.pageY-1+'px';
            }
      }
            var wrongAnswer = 0;
            var rightAnswer = 0;
            // var currentScore = 0;

      function dropImage(event) {
            var isMatch = event.target.parentNode.id;
            // console.log(isMatch)  //shows ids of the two compared //
            // console.log(mySelection)
            var dimIt = event.target;
            console.log(dimIt);
            dimIt.setAttribute('class', ' dimIt');
            if ((mySelection - isMatch) !== 0) {  //subtracts ids from one another--if they match then obviously they are the same.//
              event.target.src = selectionPac.src;  //replaces correct image with wrong one//
              selectionPac.setAttribute('class', ' hiddenClass') //hides the gray buttons
              event.target.parentNode.setAttribute('class', 'wrongPuzzle');  //will use this to call style //
              wrongAnswer = wrongAnswer + 1; //to keep track of how many pieces have been used//
            }

            if ((mySelection - isMatch) === 0) {
              var matchedChoice = event.target; //this is the correctly matching images/
              console.log(matchedChoice);
              event.target.parentNode.setAttribute('class', 'reveal');
              //hide the original leftSideimage when successfully placed in the purpleBox//
              selectionPac.setAttribute('class', ' hiddenClass');
              rightAnswer = rightAnswer + 1;
            }
            console.log('right answers= ' + rightAnswer);
            console.log('wrong answers= ' + wrongAnswer);
            var currentValue = rightAnswer + wrongAnswer;
            console.log(currentValue);
            if(currentValue === 7) {
              var redOnes = document.querySelectorAll('.wrongPuzzle');
              var greenOnes = document.querySelectorAll('.reveal');
              //need to turn these into array I can add CSS classes to//

              function toArray(obj) {
                var myArray = [];
                  for (var m = obj.length >>> 0; m--;) {
                    myArray[m] = obj[m];
                  }
                  return myArray;
              }
              var wrongPuzzles = toArray(redOnes);
              var rightPuzzles = toArray(greenOnes);
              for (var k = 0; k < wrongPuzzles.length; k++) {
                wrongPuzzles[k].setAttribute('class', ' red');
              }
              for (var m = 0; m < rightPuzzles.length; m++){
                rightPuzzles[m].setAttribute('class', ' silly');
              }
              if (rightPuzzles.length === 7) {
                purpleAnswer.setAttribute('class', ' allCorrect');

              var video= document.getElementById('theVideo');
                video.setAttribute('id', 'showVideo');
                video.autoplay = true;
              }


              //Calculating Score //
              console.log('the current answer is ' + rightAnswer);
              var percentageScore = ((rightAnswer / currentValue) * 100);
              var percentageRounded = Math.round(percentageScore);
              console.log('the percentagescore is ' + percentageRounded);
              if (rightAnswer >= 5){
                alert('You passed with a score of ' + percentageRounded + '%');
              }
              else {
                alert('You received a score of ' + percentageRounded + '%');
              }
            }
        }
      }//end of mouse functions

  //Make the magic--ie call the functions//
  shuffleArray(copyLemon);  //This makes the puzzle change each time//
  proto.populateDOM(); // This puts all of the images and such into the DOM//
  proto.moveMyMouse(); //This is for the mouse events.//

  var shuffler = document.getElementById('shuffleButton');
  shuffler.addEventListener('click', function(event){
    console.log('clicked');
    location.reload();


  });

  return PuzzleImage;

  })();

  }
