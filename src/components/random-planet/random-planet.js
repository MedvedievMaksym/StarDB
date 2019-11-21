import React, { Component } from "react";

import SwapiService from '../../services/swapi-services'
import Spinner from '../spinner';
import "./random-planet.css";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
      planet: {},
      loading: true
    };

    constructor(){
        super();
        this.updatePlanet();
    };

    onPlanetLoader = (planet) => {
        this.setState({ 
            planet,
            loading: false });
    };

    updatePlanet() {
        const id = Math.floor(Math.random()*25) + 2;
        this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoader);
    }

    render() {

        const { planet, loading } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <PlanetView planet={ planet } /> : null;

        if(loading) {
            return <Spinner />
        }
               
        return (
            <div className="random-planet jumbotron rounded">
            { spinner }
            { content } 
            </div>

        );
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population,
        rotationPeriod , diameter} = planet;

    return (
        <React.Fragment>
            <img
                className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                alt="#"
            />
            <div>
                <h4>{ name }</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span className="term">Population</span>
                    <span>{ population }</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Rotation Period</span>
                    <span>{ rotationPeriod }</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Diameter</span>
                    <span>{ diameter }</span>
                </li>
            </ul>
            </div>

        </React.Fragment>
    );
};