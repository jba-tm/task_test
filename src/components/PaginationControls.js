import React, { Component } from "react";
import { PaginationButtons } from "./PaginationButtons";

export class PaginationControls extends Component {
    constructor(props) {
        super(props);
        this.sortKeys = this.props.keys || [];
    }

    handleSortPropertyChange = (ev) => {
        this.props.setSortParams(ev.target.value)
    }

    render() {
        return <div className="m-2">
                <div className="text-center m-1">            
                    <PaginationButtons currentPage={this.props.currentPage}
                        pageCount={this.props.pageCount}
                        navigate={ this.props.navigateToPage }/>
                </div>
                <div className="form-inline justify-content-center">
                    <select className="form-control"
                            onChange={ this.handleSortPropertyChange } 
                            value={ this.props.taskData.sortBy || this.sortKeys[0] }>
                        { this.sortKeys.map(k => 
                            <option value={k.toLowerCase()} key={k}>
                                Sort By { k }
                            </option>
                        )}
                    </select>
            </div>
        </div>
    }
}
