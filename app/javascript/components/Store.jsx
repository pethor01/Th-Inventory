import React, {useState, useEffect} from 'react'
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBModalFooter } from 'mdbreact';
import CreateService from "../components/CreateService"


export default function Store ({ dataStore, handleUpdate, handleDelete }){
    const [isClicked, SetIsClicked] = useState(false)
    const [isOpen, SetIsOpen] = useState(false)
    // for View Modal
    const [isView, SetIsView] = useState(false)
    const [name, SetName] = useState("")
    const [contactNo, SetContactNo] = useState("")
    const [address, SetAddress] = useState("")
    const [idStore, SetIdStore] = useState("")

    function showClicked  () { 
        SetIsClicked(true)
        SetName(dataStore.name)
        SetAddress(dataStore.address)
        SetContactNo(dataStore.contact_no)
        SetIdStore(dataStore.id)        
    }  

    useEffect(() => {
        if (isClicked) {
            callViewModal()
        }
    }, [isClicked])
    
    function updateStore(event) {
        event.preventDefault()
        if (name.length == 0 || address.length == 0 || contactNo.length == 0) 
            return;
        const storeDetails = {id: idStore, name: name, address: address, contact_no: contactNo}   
        handleUpdate(storeDetails)
        SetIsClicked(false)
        toggleModal(SetIsView, isView)
    }

    function toggleModal(SetModal, modal) {
        SetModal(!modal)
    }
    
    function deleteStore() {
        handleDelete(idStore)
        SetIsOpen(!isOpen)
        SetIsClicked(false)
        toggleModal(SetIsView, isView)
    }

    function resetModalData() {
        SetIsClicked(false)
        toggleModal(SetIsView, isView)
    }
    function callViewModal() {
        toggleModal(SetIsView, isView)
    }

    const deleteStoreModal = (
        <MDBModal isOpen={isOpen} toggle={() => toggleModal(SetIsOpen, isOpen)} size="sm" side position="top-center">
            <MDBModalHeader toggle={() => toggleModal(SetIsOpen, isOpen)}>Delete Store </MDBModalHeader>
            <MDBModalBody>
                Are you sure you want to delete this Store
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="blue-grey" size="sm" onClick={() => toggleModal(SetIsOpen, isOpen)}>No</MDBBtn>
                <MDBBtn color="danger" size="sm" onClick={deleteStore}>Yes</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )

    const ViewModal = (
        <MDBModal isOpen={isView} toggle={resetModalData} size="md" >
            <form  onSubmit={updateStore}>
            <MDBModalHeader toggle={resetModalData}>Store Details</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12">
                                <div >
                                    <MDBInput label="Store name" type="text" value={name} onChange={(e)=> SetName(e.target.value)} required />
                                    <MDBInput id="storeAddress" type="textarea" label="Store Address:"  rows="3" value={address} onChange={(e)=> SetAddress(e.target.value)} required/>
                                    <MDBInput id="contactNo" type="text" label="Contact Number:"  value={contactNo} onChange={(event) => SetContactNo(event.target.value.replace(/\D/,''))} name="contact_no" required/>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="blue-grey"  onClick={resetModalData}>Close</MDBBtn>
                <MDBBtn color="danger"  onClick={() => toggleModal(SetIsOpen, isOpen)}>Delete</MDBBtn>
                <button type="submit" className="btn btn-success">Update</button>
            </MDBModalFooter>
            </form>
        </MDBModal>
    )
    
        return(
            <>
                <div>{isClicked ?  ViewModal : ''}</div>
                <div>{isOpen ?  deleteStoreModal : ''}</div>
                <div>
                    <MDBBtn color="info"  onClick={showClicked}>View</MDBBtn>
                    <CreateService storeDtls={dataStore} />
                </div>
            </>
        )
    
}

