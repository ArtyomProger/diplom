const xmlTemplate = require('bpmn-js-xml-templater');

// Main function for create scheme
function SchemeTemplate(arr1, arr2, arr3, yStep = 150) {
    let heightOfScheme = caculateHeightOfLists(arr1, arr2, arr3, yStep);
    let template = new xmlTemplate();

    let list1 = createShapes(template, arr1, 80, yStep, heightOfScheme);
    let list2 = createShapes(template, arr2, 280, yStep, heightOfScheme);
    let list3 = createShapes(template, arr3, 480, yStep, heightOfScheme);

    connectShapes(template, list1, list2);
    connectShapes(template, list2, list3);

    return template.xml;
}

// Function for create shapes from array
function createShapes(template, arr, x, yStep, offset) {
    let arrayOfShapes = [];
    let y = 0;

    for (let i = 0; i < arr.length; i++) {
        arrayOfShapes.push(template.addShape(80, 100, x, y + offset * 0.5, arr[i]));
        if (i % 2 != 0) {
            y = -y;
        } else {
            y = -y + yStep;
        }
    }

    return arrayOfShapes;
}

// Function for connect shapes
function connectShapes(template, list1, list2) {
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            template.connect(list1[i], list2[j]);
        }
    }
}

function caculateHeightOfLists(list1, list2, list3, yStep) {
    let array = [list1.length, list2.length, list3.length].sort((a, b) => a - b);
    return array[array.length - 1] * yStep;
}

module.exports = SchemeTemplate;