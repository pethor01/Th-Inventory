import React, {useState, useEffect} from 'react'
import $ from "jquery";

export default function Store ({ dataStore, activePage, handleUpdate, getStores }){
    const [isClicked, SetIsClicked] = useState(false)
    const [name, SetName] = useState("")
    const [contactNo, SetContactNo] = useState("")
    const [address, SetAddress] = useState("")
    const [idStore, SetIdStore] = useState("")

    function showClicked  () { 
        SetIsClicked(true);
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
            console.log(name + address + contactNo)
        const storeDetails = {id: idStore, name: name, address: address, contact_no: contactNo}   
        handleUpdate(storeDetails)
        SetIsClicked(false)
        $("#ViewModal").modal("hide")
    }

    function resetModalData() {
        SetIsClicked(false)
        $("#ViewModal").modal("hide");
    }

    const ViewModal = (
        <div className="modal" id='ViewModal' role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <form  onSubmit={updateStore}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="StoreModalTitle">Store Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container ">
                            <div className=" row form-group ">
                                <label htmlFor="store_name">Store Name:</label>
                                <input type="text" id="storeName" name="name" className="form-control"  value={name} onChange={(e)=> SetName(e.target.value)} required/>
                            </div>
                            <div className=" row form-group ">
                                <label htmlFor="store_address">Store Address:</label>
                                <textarea id="storeAddress" name="address" type="text" className="form-control" value={address} onChange={(e)=> SetAddress(e.target.value)}required />
                            </div>
                            <div className=" row form-group ">
                                <label htmlFor="contact_no">Contact Number:</label>
                                 <input type="text" id="contactNo" name="contact_no" pattern="[0-9]*" value={contactNo} onChange={(event) => SetContactNo(event.target.value.replace(/\D/,''))} name="contact_no" className="form-control" required/>
                            </div>
                        </div>
                    </div>        
                    <div id="" className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={resetModalData} >Close</button>
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
                </div>
            </div>
        </div>

    )
    function callViewModal() {
        $("#ViewModal").modal("show");
    }

        return(
            <>
                <div>{isClicked ?  ViewModal : ''}</div>
                <div>
                    <button className="btn custom-button" onClick={showClicked}>
                        View 
                    </button>
                </div>
            </>
        )
    
}

