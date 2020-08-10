import React, {useState} from 'react'
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBModalFooter } from 'mdbreact';

export default function NewStore ({ handleSubmit}){
    const [name, SetName] = useState("")
    const [contactNo, SetContactNo] = useState("")
    const [address, SetAddress] = useState("")
    const [isOpen, SetIsOpen] = useState(false)

    function toggle() {
        SetIsOpen(!isOpen)
    }

    function submitStore(event){
        event.preventDefault();
        const url = "/api/v1/create_store";
        if (name.length == 0 || address.length == 0 || contactNo.length == 0) 
            return;
        const body = {name: name, address: address, contact_no: contactNo};
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url,{
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"   
            },
            body: JSON.stringify(body)

        }).then(response => {
            if (response.ok) {
                return response.json();

            }
                throw new Error("Network Response Erros");
        })
            .then(response => handleSubmit(response))
            .catch(error => console.log(error.message));  
        event.target.reset();
        SetContactNo("")
        toggle()
    }

    return(
        <>
            <button className="btn btn-outline-success" onClick={toggle}>
                Create New Store
            </button>
            <MDBModal isOpen={isOpen} toggle={toggle} size="md" >
                <form  onSubmit={submitStore}>
                    <MDBModalHeader toggle={toggle}>Create Store</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <div >
                                            <MDBInput label="Store name" type="text"  onChange={(e)=> SetName(e.target.value)} required />
                                            <MDBInput id="storeAddress" type="textarea" label="Store Address:"  rows="3"  onChange={(e)=> SetAddress(e.target.value)} required/>
                                            <MDBInput id="contactNo" type="text" label="Contact Number:"  onChange={(event) => SetContactNo(event.target.value.replace(/\D/,''))} name="contact_no" required/>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="blue-grey"  onClick={toggle}>Close</MDBBtn>
                        <button type="submit" className="btn btn-success">Save</button>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        </>
    )
}