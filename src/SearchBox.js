import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;
class SearchBox extends Component {
    render() {
        return (
            <Search
            className="search-box"
            placeholder="input github user name"
            onSearch={this.props.onSearch}
            enterButton
          />
        );
    }
}

export default SearchBox;