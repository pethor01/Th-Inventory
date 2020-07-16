import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Store from "../components/Store"
import CreateStore from "../components/CreateStore"
import Pagination from "react-js-pagination";
import $ from "jquery";


export default function Stores (){
  const [stores, setStores] = useState([])
  const [totalStores, setTotalStores] =  useState(0)
  const [activePage, SetActivePage] = useState(1)

  function handleSubmit() {
    // Add the new created store in array
    $("#exampleModal").modal("hide");
    getStores()
  }

  function handleUpdate(store) {
    console.log('awit', store)
    console.log(store.id)
    // /api/v1/updateStore/:id(.:format)
    const body = store
    const token = document.querySelector('meta[name="csrf-token"]').content;	
    const url = `/api/v1/updateStore/${store.id}`
    fetch(url,{
      method: "PUT",
      headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"   
      },
      body: JSON.stringify(body)
      })
      .then(response => {
          if (response.ok){
            return response.json();
          }
            throw new Error("Network response was not ok.");
      })
        .then(response => getStores(response))
        .catch(response => console.log(response))
  }

  function handlePageChange(pageNumber) {
    SetActivePage(pageNumber)
  }

  function getTotalStores(){
    const url = "/api/v1/totalStores"
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
  }, [activePage])

  const AllStores = stores.map((store, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <h3 className="card-header"> {store.name}</h3>
      <div className="card-body">
        {store.address}
        <div className="mt-3"> 
          <Store dataStore={store} activePage={activePage} handleUpdate={handleUpdate} ></Store>
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