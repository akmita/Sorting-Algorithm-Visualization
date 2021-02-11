// sort class stores data specific to each sort
class sort {
    constructor(containerName) {
        this.index = 1;
        this.numSwaps = 0;
        this.container = document.getElementById(containerName);
        this.done = false;
    }
}


var sortObj = [];  
sortObj.push(new sort("sort-container-1"));
sortObj.push(new sort("sort-container-2"));
var numElements = 50;                                                               // Number of elements
var elementWidth = toString((sortObj[0].container.offsetWidth / 50) + 4) + "px";     // width of each data element
var inputHeight = 350;                                                             // max heigh (pixels) of data element
var sortInterval= [];
var isRunning = false;
             // stores all instances of the sort instances




// Creates new instances of sort, which store associated variables
// selectionSort = new sort();    
// bubbleSort = new sort();




// add specified number, of HTML elements with random values to specified container
function createElements(container) {
    var prefix;          // The letter before the element ID, specifying the type of SORT done on the element (selection, bubble... ect)

    switch (container.id[container.id.length - 1]) {    // sets prefix
        case "1": prefix = "B"; break;
        case "2": prefix = "S"; break;
    }
    console.log("prefix: " + prefix);
    
    for (var i = 0; i < numElements; i++) {
        container.innerHTML += `<div id="${prefix}${i}" class="element"></div>`;                // adds html element to be sorted
        document.getElementById(prefix + i).style.width = elementWidth;                               // sets element width
        console.log("width: " + elementWidth);                                       
        document.getElementById(prefix + i).style.height = `${Math.random() * inputHeight}px`; // randomizes height of each element
    }
}


// switch around bubble sort method based on elements' height
function run_BubbleSort() {
    var prevElement = document.getElementById(`B${sortObj[0].index}`);
    var currElement = document.getElementById(`B${sortObj[0].index - 1}`);
    var tempHeight;

    // Highlights elements being currently sorted with red
    if ( sortObj[0].index > 1) { setColor("B" ,sortObj[0].index - 2, "rgb(188, 188, 240)"); }   
    else            { setColor("B" ,sortObj[0].index - 1, "red"); }                 
    setColor("B" ,sortObj[0].index, "red");                            

    // If elements aren't in order, swap
    if (parseInt(prevElement.style.height) > parseInt(currElement.style.height)) {
        tempHeight = prevElement.style.height;
        prevElement.style.height = currElement.style.height;
        currElement.style.height = tempHeight; 
        sortObj[0].numSwaps++;
    }
    
    if (sortObj[0].index < numElements - 1) { sortObj[0].index++; }  // increments index to check next element
    else {                                                           // End of current pass
        setColor("B" ,sortObj[0].index - 1, "rgb(188, 188, 240)");   // Resets colors
        setColor("B" ,sortObj[0].index, "rgb(188, 188, 240)");
        if (sortObj[0].numSwaps > 0) {                               // if any elements were swapped last pass, run another pass
            sortObj[0].index = 1; 
            sortObj[0].numSwaps = 0;
        }
        else {                                                       // Else end the sorting
            console.log("Sort finished");
            stopSort();
            document.getElementById("btn-start").innerHTML = "START";
            document.getElementById("btn-start").style.background = "rgb(115, 187, 101)";
        }
    }
}


/*function run_SelectionSort() {
    var start = 0;                          // set the start index to selectionSort.index
    var lowestElement;                      // lowest element, updated as we loop through the elements
    while (start < numElements) {           // loop through elements, starting start + 1
        lowestElement = document.getElementById(`S${start}`);          // set lowest element to element at start index
        if (lowestElement.height < ) {      // 

        }
    }
    
    
    // set lowest variable to the lowest index going through the list
    // once end is reached, swap start element with lowest height element
    // increment start
}*/

sortObj[1].sort = run_SelectionSort;
// selectionSort.sort();  

function run_SelectionSort() {
	console.log("running sort() from selectionsort object");
    var prevElement = document.getElementById(`S${sortObj[1].index}`);
    var currElement = document.getElementById(`S${sortObj[1].index - 1}`);
    var tempHeight;

    // Highlights elements being currently sorted with red
    if ( sortObj[1].index > 1) { setColor("S" ,sortObj[1].index - 2, "rgb(188, 188, 240)"); }   
    else            { setColor("S" ,sortObj[1].index - 1, "red"); }                 
    setColor("S" ,sortObj[1].index, "red");                            

    // If elements aren't in order, swap
    if (parseInt(prevElement.style.height) > parseInt(currElement.style.height)) {
        tempHeight = prevElement.style.height;
        prevElement.style.height = currElement.style.height;
        currElement.style.height = tempHeight; 
        sortObj[1].numSwaps++;
    }
    
    if (sortObj[1].index < numElements - 1) { sortObj[1].index++; }   // increments index to check next element
    else {                                                                  // End of current pass
        setColor("S" ,sortObj[1].index - 1, "rgb(188, 188, 240)");       // Resets colors
        setColor("S" ,sortObj[1].index, "rgb(188, 188, 240)");
        if (sortObj[1].numSwaps > 0) {                               // if any elements were swapped last pass, run another pass
            sortObj[1].index = 1; 
            sortObj[1].numSwaps = 0;
        }
        else {                                                       // Else end the sorting

            console.log("Sort finished");
            stopSort();
            document.getElementById("btn-start").innerHTML = "START";
            document.getElementById("btn-start").style.background = "rgb(115, 187, 101)";
        }
    }
}



// sets the color of specified element 
function setColor(prefix ,num, color) {
    document.getElementById(prefix + num).style.background = color; 
}


// Turns sorting on or off
function toggleSort() {
    var button = document.getElementById("btn-start");
    if (isRunning) {                              
        stopSort();
        button.innerHTML = "START";
        button.style.background = "rgb(115, 187, 101)";
    }
    else {
        startSort();
        document.getElementById("btn-start").innerHTML = "STOP";
        document.getElementById("btn-start").style.background = "rgb(160, 60, 50)";
    }   
}


// Takes user input, defaults to preset input if none given, creates elements on first iteration
function startSort() {
    numElements = (document.getElementById("input-numElements").value != "") ? document.getElementById("input-numElements").value : 10;
    inputHeight = (document.getElementById("input-height").value != "" ) ? document.getElementById("input-numElements").value : 300;
    refreshRate = (document.getElementById("input-speed").value != "" ) ? 1000 / document.getElementById("input-speed").value : 20;
    elementWidth = (sortObj[0].container.offsetWidth / numElements) + "px";         
    console.log("bubble inner HTML = ");  
    console.log(sortObj[0].container.innerHTML.length);                             
    // Creates elements if they don't exist
    if (sortObj[0].container.innerHTML == "") {                                   
        console.log("creating new elements");
        createElements(sortObj[0].container); 
        createElements(sortObj[1].container); 
    }               
    // STARTS SORTING INTERVAL                                      // TODO put this inside sort class
    sortInterval[0] = setInterval(run_BubbleSort, refreshRate);
    sortInterval[1] = setInterval(run_SelectionSort, refreshRate);
    isRunning = true;
}


// Stops sorting, sets flag to false
function stopSort() {
    for (var i = 0; i < sortInterval.length; i++) {
        clearInterval(sortInterval[i]);
    }    
    isRunning = false;
}


// Calls stopSort if running, resets index, numOFSwaps, wipes the elements
function resetElements(typeOfSort, container) {   
    if (isRunning) {         // If already running, stop sort first, set flag to false
        stopSort();
        isRunning = false;
    }
    typeOfSort.index = 1;                                            
    typeOfSort.numSwaps = 0;
    container.innerHTML = "";             
}


// START button event listener - toggles sort on or off
document.getElementById("btn-start").addEventListener("click", ()=>{
    toggleSort();  
});


// RESET button event listener - changes button text to START, calls reset function
document.getElementById("btn-reset").addEventListener("click", ()=> {
    document.getElementById("btn-start").innerHTML = "START";
    document.getElementById("btn-start").style.background = "rgb(115, 187, 101)";
    resetElements(sortObj[0], sortObj[0].container);
    resetElements(sortObj[1], sortObj[1].container);

});

