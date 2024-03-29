import React , { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-services';

import './people-page.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
      }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

    return(
        <div className="row mb2">
            <div className="col-md-6">
                <ItemList onItemSelected={ this.onPersonSelected }
                        getData={ this.swapiService.getAllPeople } 
                        renderItem={ ({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`} />
            </div>

            <div className="col-md-6">
                <PersonDetails personId={ this.state.selectedPerson }/>
            </div>
        </div>
    )};
}