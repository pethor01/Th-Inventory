import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Store from "../components/Store"
import CreateStore from "../components/CreateStore"
import Pagination from "react-js-pagination";

export default function Stores (){
  const [stores, setStores] = useState([])
  const [totalStores, setTotalStores] =  useState(0)
  const [activePage, SetActivePage] = useState(1)



  function handleSubmit(newstore) {
    console.log(newstore);
    console.log("wawi")
    // Add the new created store in array
    this.getStores()
  }

  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`)
    SetActivePage(pageNumber)
  }

  function getTotalStores(){
    const url = "/api/v1/totalStores";
    fetch(url)
      .then(response => {
          if (response.ok){
            return response.json();
          }
            throw new Error("Network response was not ok.");
      })
        .then(response => setTotalStores(response))
        .catch(response => console.log(response));

  }

  function getStores(){
    try {
      const url = `/api/v1/stores?page=${activePage}`;
      fetch(url)
      .then(response => {
          if (response.ok){
            return response.json();
          }
            throw new Error("Network response was not ok.");
      })
        .then(response => setStores(response))
        .catch(response => console.log(response));
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=> {
    getTotalStores()
    getStores()
    console.log(activePage)
    console.log(stores)

  }, [activePage])
  const AllStores = stores.map((store, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
      <h3 className="card-header"> {store.name}</h3>
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
                Inventory List of Tropical Hut Stores in the Philippines 
              </p>
            </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
              <CreateStore handleSubmit={handleSubmit}/>
            </div>
            <div className="row">
              {stores.length > 0 ? AllStores : NoStore}
            </div>
            <div>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalStores}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
              <p>{stores.length}</p>
            </div>
            <Link to="/" className="btn btn-outline-primary">
              Home
            </Link>
          </main>
        </div>


    </>
  );

}