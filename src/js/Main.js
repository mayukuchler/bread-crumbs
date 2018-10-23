import moment from 'moment';
import GoogleMapReact from 'google-map-react';
const google = window.google;


// stores list of memories to be shown in table
let memoryList = [];
let currentId = null

//toggle variables
let memView = document.getElementById('memoryPane')
let innerMemView = document.getElementById('innerMemoryPane')
let mapContainer = document.getElementById('mapContainer')// selection
let toggle = document.getElementById('buttonAllTasks') //toggle trigger
let closePane = document.getElementById('closePane')
let tasksContainer = document.getElementById('tasksContainer');

//event listener to toggle to map view to memory panel

function swapper() {
  toggle.document.getElementById(('overlay'), 'open');
  }
var e = document.getElementById('overlayBtn');
if(e){
  e.addEventListener('click', swapper, false);
}
toggle.addEventListener('click', function(e) {
    e.preventDefault()
    memView.classList.toggle('memoryPane'); // shows memory pane view
    memView.classList.toggle('memoryPaneView'); // shows memory pane view
    innerMemView.classList.toggle('innerMemoryPane'); // inner memory pane view
    innerMemView.classList.toggle('innerMemoryPaneView'); // inner memory pane view
    mapContainer.classList.toggle('hidden'); // hides map
});


// sort helpers
const sortByTitle = memories => {
  return memories.sort((a,b) => {
    return a.title > b.title
  })
}
const sortByDate = memories => {
  return memories.sort((a,b) => {
    return a.date > b.date
  })
}
const sortByTime = memories => {
  return memories.sort((a,b) => {
    console.log(a.time, b.time)
    return a.time > b.time
  })
}

const currentDate = document.getElementById('currentDate')//display current date
const formattedCurrentDate = moment().format('MM/DD/YYYY');
currentDate.innerHTML = formattedCurrentDate;

const showMemoryCount = memories => { //display memory count
  let memCount = document.getElementById('memoryCount')
  let count = memories.length
  memCount.innerHTML = count + ' saved memories '
}

const displayCompleteMessage = msg =>{
    document.getElementById("msg").innerHTML=msg;
}

//populate table function
const populateTable = memories => { //memory table, view all memories
  let memTable = document.getElementById('memLocation')
  memTable.innerHTML='' //clears out the table

  let header = document.createElement('tr'); // tr for header

  //create headers and event listeners
  const titleHeader = document.createElement('td')
  titleHeader.innerHTML = 'Title';
  header.appendChild(titleHeader);
  titleHeader.addEventListener('click', ()=>{
    let sortedTitle = sortByTitle(memoryList)
    populateTable(sortedTitle)
  })

  const dateHeader = document.createElement('td')
  dateHeader.innerHTML = 'Date';
  header.appendChild(dateHeader);
  dateHeader.addEventListener('click', ()=>{ //creates an event listener for Date
    let sortedDate = sortByDate(memoryList) //stores sorted memory list in sorted date
    populateTable(sortedDate) //populating table with a memory list sorted by date
  })

  const timeHeader = document.createElement('td')
  timeHeader.innerHTML = 'Time';
  header.appendChild(timeHeader);
  timeHeader.addEventListener('click', ()=>{
    let sortedTime = sortByTime(memoryList)
    populateTable(sortedTime)
  })

  const locationHeader = document.createElement('td')
  locationHeader.innerHTML = 'Location';
  header.appendChild(locationHeader);

  const descriptionHeader = document.createElement('td')
  descriptionHeader.innerHTML = 'Description';
  descriptionHeader.classList.add('description');
  header.appendChild(descriptionHeader);

  memTable.appendChild(header);

  
  for (let i=0 ; i <memories.length; i++){
    // tr element to add details to
    let memTr = document.createElement('tr');

    //for styling
    const titleSpan = document.createElement('td')
    titleSpan.innerHTML = memories[i].title //sets span value to title
    titleSpan.classList.add('title'); //adds the class title to titleSpan
    memTr.appendChild(titleSpan); //appends titleSpan to memLi

    const dateSpan = document.createElement('td');
    const formattedDate = moment(memories[i].date).format('MM/DD/YYYY');
    dateSpan.innerHTML = formattedDate;
    dateSpan.classList.add('date');
    memTr.appendChild(dateSpan);

    const timeSpan = document.createElement('td');
    timeSpan.innerHTML = memories[i].time;
    timeSpan.classList.add('time');
    memTr.appendChild(timeSpan);

    const locationSpan = document.createElement('td');
    locationSpan.innerHTML = memories[i].location;
    locationSpan.classList.add('location');
    memTr.appendChild(locationSpan);

    const descriptionSpan = document.createElement('td');
    descriptionSpan.innerHTML = memories[i].description;
    descriptionSpan.classList.add('description');
    memTr.appendChild(descriptionSpan);

    addRowClickListener(memTr, memories[i]);

    memTable.appendChild(memTr);
  }
}
//row click
const addRowClickListener = (tr, memory) => { //sends clicked memory to tab 2 for full view
  tr.addEventListener('click', () => {
    const tab1 = document.getElementById('tab1')
    tab1.checked = false
    const tab2 = document.getElementById('tab2')
    tab2.checked = true

    const content2 = document.getElementById('content2')
    content2.innerHTML = '' //clears content2

    const editMem = document.createElement('button')
    editMem.innerHTML = "Edit Desc."
    editMem.classList.add('editMem')
    content2.appendChild(editMem)

    editMem.addEventListener('click', function(){
      descriptionLi.contentEditable = true
    });

    currentId = memory._id //gets the ID for the memory

    const saveMem = document.createElement('button')
    saveMem.innerHTML = "Save Memory"
    saveMem.classList.add('saveMem')
    content2.appendChild(saveMem)

    saveMem.addEventListener('click', function(){
      descriptionLi.contentEditable = false
      let description = document.getElementById('descriptionLi').innerText
      updateMemory({'description': description, 'currentId': currentId})
    });

    const titleLi = document.createElement('li')
    titleLi.innerHTML = memory.title //sets span value to title
    titleLi.classList.add('titleLi'); //adds the class title to titleSpan
    content2.appendChild(titleLi); //appends titleSpan to content2

    const dateLi = document.createElement('li');
    const formattedDate = moment(memory.date).format('MM/DD/YYYY');
    dateLi.innerHTML = formattedDate;
    dateLi.classList.add('dateLi');
    content2.appendChild(dateLi);

    const timeLi = document.createElement('li');
    timeLi.innerHTML = memory.time;
    timeLi.classList.add('timeLi');
    content2.appendChild(timeLi);

    const locationLi = document.createElement('li');
    locationLi.innerHTML = memory.location;
    locationLi.classList.add('locationLi');
    content2.appendChild(locationLi);

    const descriptionLi = document.createElement('li');
    descriptionLi.innerHTML = memory.description;
    descriptionLi.classList.add('descriptionLi');
    descriptionLi.id = 'descriptionLi';
    content2.appendChild(descriptionLi);

    const fileLi = document.createElement('li');
    const img = document.createElement('img');
    img.src = memory.file;
    fileLi.appendChild(img);
    fileLi.classList.add('fileLi');
    content2.appendChild(fileLi);
  });
}

//api call to server to get the memories
fetch('memory', {
  method: 'get',
  headers: {'Content-Type': 'application/json'},
})
.then(response => {
  response.json().then(memories => { //memories is the array of memories
    memoryList = memories
    showMemoryCount(memories);
    populateTable(memories);
    })
});

const addMemory = memoryObject => {
  fetch("memory", {
    //api call to server to post a memory
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(memoryObject)
  });
};

//update memory in server
const updateMemory = memoryObject => {
  fetch("memory", {
    //api call to update memory
    method: "put",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(memoryObject)
  });
};

//helper to get lat/lon for a given address, don't want to hit this API unnecessarily
const getLatLng = address => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCbObK8_sqJ5A_EKzX6mryeDl7IcsKiorE`,
    {
      method: "get"
    }
  );
};

// add a new memory
let submitMem = document.getElementById('buttonAddTask');

submitMem.addEventListener('click', function(){
  let title = document.getElementById('title').value //stores the value of each input
  let date = document.getElementById('date').value
  let epochDate = moment(date).valueOf();
  if (isNaN(epochDate)){
    alert('Please enter valid date.')
    return
  }
  let time = document.getElementById('time').value
  let location = document.getElementById('location').value
  if (!location){
    alert('Please enter valid location.')
    return
  }
  let description = document.getElementById('description').value
  let selectedFile = document.getElementById('fileInput').files[0];

  getBase64(selectedFile).then(
    data => {
      getLatLng(location).then(response => {
        //geocode address and get the lat lng so we are able to put it on the map
        response.json().then(r => {
          if (r && r.results[0] && r.results[0].geometry) { // google maps perams
            //get the lat and lng out of the response
            const { lat, lng } = r.results[0].geometry.location;
            //make api call to save memory to the db
            addMemory({ //memory object
              'title': title,
              'date': epochDate,
              'time': time,
              'location': location,
              'description': description,
              lat: lat,
              lng: lng,
              file: data
            });
          }
        });
      });
    }
  )
  displayCompleteMessage('memory captured!')
});

// convert file to base64 string, asynchronous
const getBase64 = file => {
  if(!file) {
    return Promise.resolve();
  }
  // returning a promise so we can wait until it's done before uploading
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // read the file
    reader.onload = () => resolve(reader.result); // return the result when it's done
    reader.onerror = error => reject(error); // reject if error occurs
  });
}


// google maps stuff
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.09024, lng: -95.712891},
      zoom: 1.5,
      styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#787878"
        },
        {
          "visibility": "on"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "weight": 0.5
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#2f6dfe"
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]
    });

    fetch('memory', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      response.json().then(memories => { //memories is the array of memories
        for (let i = 0; i < memories.length; i++){
          const memory =  memories[i]
          const myLatlng = new google.maps.LatLng(memory.lat, memory.lng);

          let marker = new google.maps.Marker({
              position: myLatlng,
          });

          const contentString = `${memory.title}: ${memory.location}`

          let infoWindow = new google.maps.InfoWindow({
            content: contentString
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker)
          });

          marker.setMap(map);

        }
      })
    })
  }
