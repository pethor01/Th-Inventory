import React from "react"
import { Link } from "react-router-dom"

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            store: "" ,
            isClicked: false
        }
    }

    showClicked = () => { 
        this.setState({isClicked: true});
    }   

    populateRsponse = (res) => {
        this.state.store = res;
        this.setState({isClicked: false});
    }

    showStore = () => {
        const { id } = this.props;
        console.log("hahaha" + id)
                   
        const url = `/api/v1/store/${id}`
                    fetch(url)
                        .then(response => {
                        if (response.ok)
                        {   
                            return response.json()
                        }
                        throw new Error("Network response was not ok.");
                    })
                    .then(o => this.populateRsponse(o))
                    .catch(() => this.props.history.push("/stores"))
    }

    render(){
        const { store, isClicked } =  this.state;
        if (isClicked === true) {
            this.showStore();
        }
        return(
            <div>
                <button className="btn btn-outline-success" onClick={this.showClicked}>
                    View
                </button>
            </div>
        )
    }
}

export default Store