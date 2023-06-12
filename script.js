const dragArea = document.getElementById('drag-area');
const dropArea = document.getElementById('drop-area');
const resetButton = document.getElementById('reset-button');

// --------------------------------------------------
// All items displayed in the drag area
// --------------------------------------------------

const items = [
    { id: 'image1', type: 'image', src: './assets/bridge.jpg', alt: 'bridge' },
    { id: 'text1', type: 'text', content: "Let's drag me into the container." },
    { id: 'icon1', type: 'icon', class: 'fa', iconName: 'fa-heart-o' },
    { id: 'image2', type: 'image', src: './assets/flowers.jpg', alt: 'flowers' },
    { id: 'text2', type: 'text', content: "I'm here to be dragged." },
    { id: 'icon2', type: 'icon', class: 'fa', iconName: 'fa-star-o' },
    { id: 'image3', type: 'image', src: './assets/mountains.jpg', alt: 'mountains' },
    { id: 'text3', type: 'text', content: 'Try to drag me and see.' },
    { id: 'icon3', type: 'icon', class: 'fa', iconName: 'fa-paper-plane-o' },
    { id: 'image4', type: 'image', src: './assets/boy.jpg', alt: 'boy' },
];

// --------------------------------------------------
// Handling dragStart items
// --------------------------------------------------

const dragStart = (event) => {
    // Set the element id for each items
    const elementId = event.target.id || event.target.closest('li.image').id;
    event.dataTransfer.setData('text/plain', elementId);
    
    // Provide visual feedback during dragging
    event.target.classList.add('dragged-item');
}

// --------------------------------------------------
// Add each item to draggable container
// --------------------------------------------------

items.forEach((item) => {
    const liElement = document.createElement('li');
    liElement.classList.add(item.type);

    if (item.type === 'image') {
        const imgElement = document.createElement('img');
        imgElement.src = item.src;
        imgElement.alt = item.alt;
        liElement.appendChild(imgElement);
    } 
    else if (item.type === 'text') {
        const spanElement = document.createElement('span');
        spanElement.textContent = item.content;
        liElement.appendChild(spanElement);
    } 
    else if (item.type === 'icon') {
        const iElement = document.createElement('i');
        iElement.classList.add(item.class, item.iconName);
        liElement.appendChild(iElement);
    }

    liElement.id = item.id;
    liElement.draggable = true;
    liElement.addEventListener('dragstart', dragStart);

    dragArea.appendChild(liElement);
});

// --------------------------------------------------
// Handling dragOver items
// --------------------------------------------------

const dragOver = (event) => {
    event.preventDefault();
}

// --------------------------------------------------
// Displaying drop and reset items message
// --------------------------------------------------
  
const showMessage = (message, type) => {
    const displayMessage = document.createElement('div');
    displayMessage.classList.add('message');
    displayMessage.textContent = message;
    displayMessage.classList.add(type);
    document.body.appendChild(displayMessage);

    setTimeout(() => {
        displayMessage.remove();
    }, 1000);
}

// --------------------------------------------------
// Handling drop items
// --------------------------------------------------

const drop = (event) => {
    event.preventDefault();

    // Remove visual feedback during dropping
    const draggedItem = document.querySelector('.dragged-item');
    draggedItem.classList.remove('dragged-item');
    showMessage('Success! Item just dropped.', 'success');

    // Get the element id for each items
    const elementId = event.dataTransfer.getData('text/plain');
    const droppedElement = document.getElementById(elementId);

    // Remove the default message from the drop area
    if (dropArea.querySelector('#default-message')) {
        dropArea.innerHTML = '';
    }

    // Append the liElement to the drop area
    const liElement = droppedElement.cloneNode(true);
    dropArea.appendChild(liElement);

    // Enable the reset button
    resetButton.disabled = false;

    // Scroll to the dropped element in the drop area
    liElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove the dropped element from the drag container
    const element = dragArea.querySelector(`#${elementId}`);
    element.parentNode.removeChild(element);
}

// --------------------------------------------------
// Handling reset items
// --------------------------------------------------

const resetContainers = () => {
    // Clear content of the drop container
    dropArea.innerHTML = '';

    // Add back the default message to the drop area container
    const defaultMessage = document.createElement('span');
    defaultMessage.id = 'default-message';
    defaultMessage.classList.add('default-message');
    defaultMessage.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i> Drop your items here.';
    dropArea.appendChild(defaultMessage);

    // Clear content of the drag container
    dragArea.innerHTML = '';

    // Reset the first container to its original state
    items.forEach((item) => {
        const liElement = document.createElement('li');
        liElement.classList.add(item.type);
        liElement.id = item.id;
        liElement.draggable = true;
        liElement.addEventListener('dragstart', dragStart);

        if (item.type === 'image') {
            const imgElement = document.createElement('img');
            imgElement.src = item.src;
            imgElement.alt = item.alt;
            liElement.appendChild(imgElement);
        } else if (item.type === 'text') {
            const spanElement = document.createElement('span');
            spanElement.textContent = item.content;
            liElement.appendChild(spanElement);
        } else if (item.type === 'icon') {
            const iElement = document.createElement('i');
            iElement.classList.add(item.class, item.iconName);
            liElement.appendChild(iElement);
        }

        dragArea.appendChild(liElement);
    });
  
    // Disable the reset button again
    resetButton.disabled = true;
    showMessage('Reset, Items removed.', 'reset');
}
  