import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Store from "../components/Store"
import CreateStore from "../components/CreateStore"
import Pagination from "react-js-pagination";
import Navbar from "../components/Navbar";
import TropicalLogo from '../images/tropicalhut.jpg'
import { useLocation } from 'react-router'
import {MDBContainer, MDBRow, MDBJumbotron, MDBIcon, MDBCol, MDBCard, MDBCardImage, MDBCardTitle, MDBCardBody, MDBCardText, MDBBtn } from 'mdbreact';


export default function Stores (){
  const [stores, setStores] = useState([])
  const [totalStores, setTotalStores] =  useState(0)
  const [activePage, SetActivePage] = useState(1)
  let location = useLocation()
  const token = document.querySelector('meta[name="csrf-token"]').content;	


  function handleSubmit() {
    // Add the new created store in array
    getStores()
  }

  function handleUpdate(store) {
    // /api/v1/updateStore/:id(.:format)
    const body = store
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

  function handleDelete(storeId) {
    const url = `/api/v1/deleteStore/${storeId}`
    fetch(url,{
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"   
      },
      })
      .then(() => {getStores()})
  }

  function handlePageChange(pageNumber) {
    SetActivePage(pageNumber)
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
        .then(response => {setStores(response.stores), 
              setTotalStores(response.total_stores)}
             )
        .catch(response => console.log(response));
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getStores()
  }, [activePage])

  const AllStores = stores.map((store, index) => (
    <MDBCol key={index} className=" col-md-6 col-lg-4 mb-4">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{store.name}</MDBCardTitle>
          <MDBCardText>{store.address}</MDBCardText>
          <Store dataStore={store} activePage={activePage} handleUpdate={handleUpdate} handleDelete={handleDelete} ></Store>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  ));
  const NoStore = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No stores yet <Link to="/new_recipe" className="btn-outline-success">create one</Link>
      </h4>
  </div>

  )

  return(
    <>
      <Navbar location={location.pathname}/>
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className="text-center">
              <MDBCardImage src={TropicalLogo} className="center img-fluid" waves/>
              <MDBCardBody>
                <MDBCardTitle className="indigo-text h5 m-4">
                  Photography
                </MDBCardTitle>
                <MDBCardText>
                  Sed ut perspiciatis unde omnis iste natus sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </MDBCardText>
              </MDBCardBody>
            </MDBJumbotron>
          </MDBCol>
      </MDBRow>
    </MDBContainer>
      <div className="">
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
                itemsCountPerPage={12}
                totalItemsCount={totalStores}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </div>
            <Link to="/" className="btn btn-outline-primary waves-effect" >
              Home
            </Link>
          </main>
        </div>
    </>
  );

}