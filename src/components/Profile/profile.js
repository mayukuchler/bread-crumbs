import React, { Component } from 'react';
import "./Profile.css";
import "../../js/Main";



class Profile extends Component {
  render() {
    return (
      <div>
        <header> <h1>---</h1>
          <span> <a href="/logout">Logout</a></span>
        </header>
        <section className="hero">
          <section className="map" id="mapContainer">
            <section id="map">
              <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiZak0qOeEp0FJC_zAH17SX_CyGzR2TXM&callback=initMap" async defer></script>
            </section>
          </section>
          <section className="memoryPane" id="memoryPane">
        <section className="innerMemoryPane" id="innerMemoryPane">
          <main>
            <input id="tab1" type="radio" name="tabs" defaultChecked />
            <label htmlFor="tab1">All Memories</label>

            <input id="tab2" type="radio" name="tabs" />
            <label htmlFor="tab2">Memory</label>

            <section id="content1">
              <table id="memLocation"></table>
            </section>

            <section id="content2"></section>
          </main>
        </section>
      </section>


      <section className="tasksContainer" id="tasksContainer">
        <section className="subHeader">
          <ul>
            <li className="one"><button className="buttonAllTasks" id="buttonAllTasks" type="button" name="button"></button></li>
            <li className="two" id="currentDate"></li>
            <li className="three" id="memoryCount"></li>
          </ul>
        </section>
        <section className="taskPane" id="taskPane">
          <section className="innerTaskPane" id="innerTaskPane">
            <form className="demo-form" id="newMemForm" role="form" action="/signup" acceptCharset="UTF-8" method="post">
              <fieldset>
                <legend>Add a Memory</legend>
                <input placeholder="Name your Memory..." type="text" name='name' id="title" />
                <input placeholder="mm/dd/yyyy" type="text" name="date" id="date" />
                <input placeholder="Miami, FL" type="text" name="location" id="location" />
                <input placeholder="Description..." type="text" name="description" id="description" />
                <input type="file" id="fileInput" className="fileInput" />
                <section className="buttonSection">
                  <button className="buttonAddTask" id="buttonAddTask" type="button" name="button">+</button>
                </section>
              </fieldset>
              </form>
          </section>
        </section>
              <section className="notes">
                <span id="msg"></span>
              </section>
            </section>
          <section className="imageCarousel"></section>
        </section>
      </div>
    );
  }
}

export default Profile;