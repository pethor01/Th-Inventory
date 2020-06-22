import React from "react";
import { Link } from "react-router-dom"

class Stores extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stores: []
      };
    }

    componentDidMount() {
        const url = "/api/v1/stores";
        fetch(url)
            .then(response => {
                if (response.ok){
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({stores: response},
              console.log(response) )
            )
            .catch(() => this.props.history.push("/"));
    }
    render(){
      const { stores } = this.state;
      const AllStores = stores.map((store, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card mb-4">
            <div className="container">
              {store.name}
            </div>
          <div className="card-body">

          </div>
          </div>
        </div>
      ));
      const NoStore = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No stores yet <Link to="/new_recipe">create one</Link>
        </h4>
      </div>

      )
      return(
        <>
          <section className="jumbotron jumbotron-fluid text-center">
            <div className="container py-5">
              <h1 className="display-4">Recipes for every occasion</h1>
              <p className="lead text-muted">
                We’ve pulled together our most popular recipes, our latest
                additions, and our editor’s picks, so there’s sure to be something
                tempting for you to try.
              </p>
            </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/recipe" className="btn custom-button">
                Create New Recipe
              </Link>
            </div>
            <div className="row">
              {stores.length > 0 ? AllStores : NoStore}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>

        </>
      )
    }
}

export default Stores;