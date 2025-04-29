const shapes = document.querySelectorAll(".shape");
const button = document.querySelector("button");

let selectedShape = null;
let highestZ = document.body.dataset.highestZ;

shapes.forEach(element => {
  element.addEventListener('mousedown', e => {
    selectedShape = e.target;
    highestZ = +highestZ + 1;
    selectedShape.style.zIndex = highestZ;
  });
});

document.addEventListener("mousemove", e => {
  if (selectedShape !== null) {
    const width = selectedShape.style.width.slice(0, -2);
    const height = selectedShape.style.height.slice(0, -2);

    selectedShape.style.top = e.clientY - height / 2 + "px";
    selectedShape.style.left = e.clientX - width / 2 + "px";
  }
});

document.addEventListener('mouseup', e => {
  if (selectedShape === null) return;

  fetch('moveShape', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: +selectedShape.dataset.id,
      top: selectedShape.style.top,
      left: selectedShape.style.left,
      zIndex: +selectedShape.style.zIndex
    })
  })
  
  selectedShape = null;
});

document.addEventListener("dragstart", e => {
  e.preventDefault();
});

button.addEventListener("click", () => {  
  fetch('createShape')
  .then(() => window.location.reload())
});

// fetch('thumbUp', {
//   method: 'put',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     'name': name,
//     'msg': msg,
//     'thumbUp':thumbUp
//   })
// })
// .then(response => {
//   if (response.ok) return response.json()
// })
// .then(data => {
//   console.log(data)
//   window.location.reload(true)
// })