import React, { Component, Fragment } from "react";
import '../assests/css/search.css'

export default class search extends Component {
  render() {
    return (
      <Fragment>
        <div className='search_container'>
          <div id="wrap">
            <form action="" autoComplete="off" >
            <input className="search159" name="search" type="text" placeholder="What're we looking for ?"/>
            <input className="search_submit159" value="Rechercher" type="submit"/>
            </form>
            </div>
            </div>    
      </Fragment>
    );
  }
}
