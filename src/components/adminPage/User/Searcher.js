import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Searcher extends Component {

    readData = (e) => {
        const value = e.target.value;
        this.props.searchUsers(value);
    }

    render() {
        return (
            <form>
                <div class="form-group has-search">
                    <FontAwesomeIcon class="form-control-feedback" icon={faSearch} />
                    <input type="text" id="search" ref={this.searchRef} onChange={this.readData} class="form-control" placeholder="Ingrese el ci del usuario..." />
                </div>
            </form>
        );
    }
}

export default Searcher;