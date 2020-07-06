import React from "react";
import { Link } from "react-router-dom"
import Store from "../components/Store"
import CreateStore from "../components/CreateStore"
import Pagination from "react-js-pagination"


class Stores extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  stores: [],
                      activePage: 1
      };
      
    }

  handleSubmit = (newstore) => {
    console.log(newstore);
    console.log("wawi")
    // Add the new created store in array
    this.setState({ stores: [newstore, ...this.state.stores] })

  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

    // ShowClick = (id) => {
    //   console.log("hehehehe")
    //   console.log(id);
    //   return <Store id={id} />
    // }
    componentDidMount() {
        const url = "/api/v1/stores";
        fetch(url)
          .then(response => {
              if (response.ok){
                return response.json();
              }
                throw new Error("Network response was not ok.");
          })
            .then(response => this.setState({stores: response}))
            .catch(() => this.props.history.push("/"));
    }
    render(){
      const { stores } = this.state;
      const AllStores = stores.map((store, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card mb-4">
          <h3 className="card-header"> {store.name} {index}</h3>
          <div className="card-body">
            {store.address}
            <div className="mt-3"> 
              <Store id={store.id} >
                View
              </Store>
            </div>
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
              <h1 className="display-4">Tropical Hut Stores</h1>
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
              <CreateStore handleSubmit={this.handleSubmit}/>
            </div>
            <div className="row">
              {stores.length > 0 ? AllStores : NoStore}
            </div>
            <div>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={stores.length}
                pageRangeDisplayed={10}
                onChange={this.handlePageChange.bind(this)}
              />
              <h4>{stores.length}</h4>
            </div>
            <Link to="/" className="btn btn-outline-primary">
              Home
            </Link>
          </main>
        </div>

        </>
      )
    }
}

export default Stores;