import React, {useState} from 'react'
import moment from 'moment';
import { MDBInput, MDBBtn, MDBDatePicker, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBCol, MDBRow, MDBContainer} from 'mdbreact';

export default function CreateService() {
    const dateToday = moment().format('YYYY-MM-DD')
    const [isOpen, SetIsOpen] = useState(false)
    const [serviceType, SetServiceType] = useState('')
    const [serviceDate, SetServiceDate] = useState('')



    function toggle()  {
        SetIsOpen(!isOpen)
        console.log(dateToday)
    }

    const createService = (
        <MDBModal isOpen={isOpen} toggle={toggle} size="md" >
            <MDBModalHeader toggle={toggle}>Create Service </MDBModalHeader>
            <MDBModalBody>
                    <MDBRow>
                        <MDBCol size="6">
                            <MDBInput
                                label="Service Type"
                                type="text"
                                onChange={(e)=> serviceType(e.target.value)}
                                required
                            />
                        </MDBCol>
                        <MDBCol size="6">  
                            <MDBInput
                                label="Service Date"
                                type="date"
                                valueDefault={dateToday}
                                onChange={(e)=> SetServiceDate(e.target.value)}
                                required
                            />                        </MDBCol>
                    </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="blue-grey" size="sm" onClick={toggle}>No</MDBBtn>
                <MDBBtn color="blue" size="sm" >Save</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )

    return(
        <>
            <>{isOpen ?  createService : ''}</>
            <MDBBtn outline color="info" onClick={toggle}>Service</MDBBtn>
        </>
    )

}