var numberOfNumberButtons = document.querySelectorAll(".number").length;
var numberOfOperationButtons = document.querySelectorAll(".operation").length;
var equation = 0;
// var var1 = 0;
// var var2 = 0;
// var operation = 0;

var numbers = [];
var operations = [];

//onClick = button
document.querySelector("#equal").addEventListener("click", function () {
  calculateEquation();
});

//onClick del button
document.querySelector("#del").addEventListener("click", function () {
  console.log(lastInput(equation));
  equation = removeLast(equation);
  document.querySelector(".viewLabel").innerHTML = equation;
});

// onClick reset button
document.querySelector("#reset").addEventListener("click", function () {
  equation = 0;
  numbers = [];
  // var1 = 0;
  // var2 = 0;
  // operation = 0;
  document.querySelector(".viewLabel").innerHTML = equation;
});

//onClick number button
for (var i = 0; i < numberOfNumberButtons; i++) {
  document
    .querySelectorAll(".number")
    [i].addEventListener("click", function () {
      var buttonInnerHTML = this.innerHTML;
      var buttonId = this.id;
      buttonAnimation(buttonId);
      if (equation === 0) {
        equation = buttonInnerHTML;
      } else {
        equation += buttonInnerHTML;
      }

      document.querySelector(".viewLabel").innerHTML = equation;
      // if (operation != 0){
      //     if (var2 ===0){
      //         var2 = buttonInnerHTML;
      //     }else{
      //     var2 += buttonInnerHTML;
      //     }
      // }
      // console.log(var1);
      // console.log(var2);
    });
}

// onClick any operation button
for (var i = 0; i < numberOfOperationButtons; i++) {
  document
    .querySelectorAll(".operation")
    [i].addEventListener("click", function () {
      if (
        lastInput(equation) == "+" ||
        lastInput(equation) == "-" ||
        lastInput(equation) == "*" ||
        lastInput(equation) == "/"
      ) {
        equation = removeLast(equation);
        document.querySelector(".viewLabel").innerHTML = equation;
      }

      var buttonInnerHTML = this.innerHTML;
      var buttonId = this.id;
      buttonAnimation(buttonId);
      equation += "";
      if (equation.substr(equation.length - 1) === ".") {
        equation += "0";
        document.querySelector(".viewLabel").innerHTML = equation;
      }
      // var1 = equation;
      operation = buttonInnerHTML;
      equation += operation;
      document.querySelector(".viewLabel").innerHTML = equation;
    });
}

function buttonAnimation(currentKey) {
  document.querySelector("#" + currentKey).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentKey).classList.remove("pressed");
  }, 100);
}

function calculate(var1, var2, operation) {
  var answer = 0;
  if (operation === "*") {
    answer = var1 * var2;
  } else if (operation === "/") {
    answer = var1 / var2;
  } else if (operation === "-") {
    answer = var1 - var2;
  } else if (operation === "+") {
    answer = parseFloat(var1) + parseFloat(var2);
  }
  return answer;
}

function calculateEquation() {
  // putting each digit in its place as a variable or operation
  // and putting them in its corresponding array.
  var number = 0;
  numbers = [];
  for (var i = 0; i < equation.length; i++) {
    if (
      equation[i] != "+" &&
      equation[i] != "-" &&
      equation[i] != "*" &&
      equation[i] != "/"
    ) {
      if (number === 0) {
        number = equation[i];
      } else number += equation[i];
    } else {
      numbers.push(number);
      number = 0;
      operations.push(equation[i]);
    }
  }
  numbers.push(number);

  // start taking from the arrays and calculating
  //for loop to start calculating all * and /
  for (var i = 0; i < operations.length; i++) {
    if (operations[i] == "*" || operations[i] == "/") {
      var1 = numbers[i];
      var2 = numbers[i + 1];
      operation = operations[i];
      numbers[i] = calculate(var1, var2, operation);
      removeItemOnce(operations, operation);
      removeItemOnce(numbers, var2);
      console.log(numbers);
      console.log(operations);
    }
  }
  // while loop to start calculating all other calculations
  while (operations.length != 0) {
    var1 = numbers[0];
    var2 = numbers[1];
    operation = operations[0];
    numbers[0] = calculate(var1, var2, operation);
    removeItemOnce(operations, operation);
    removeItemOnce(numbers, var2);
    console.log(numbers);
    console.log(operations);
  }
  equation = numbers[0];
  document.querySelector(".viewLabel").innerHTML = equation;

  console.log(number);
  console.log(numbers);
  console.log(operations);
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function lastInput(str) {
  return str[str.length - 1];
}

function removeLast(str) {
  return str.slice(0, -1);
}
