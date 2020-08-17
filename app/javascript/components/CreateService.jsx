import React, {useState, forwardRef, createRef, useEffect} from 'react'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBCol, MDBRow, MDBContainer} from 'mdbreact';

export default function CreateService({storeDtls}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const [serviceType, setServiceType] = useState('')
    const [serviceTimeIn, setServiceTimeIn] = useState(new Date())
    const [serviceTimeOut, setServiceTimeOut] = useState(new Date())
    const [serviceDate, setServiceDate] = useState(new Date())
    const ref = createRef()

    const ServiceDateTime = forwardRef((props, ref) => (
        <MDBInput ref={ref} valueDefault={props.value} label={props.label} readOnly={true} className=" example-custom-input" onClick={props.onClick} />
    ));
    
    function onClick(){ 
        setIsClick(true)
    }

    useEffect(() => {
        if(isClick){
            toggle()
        }
    }, [isClick])

    function toggle()  {
        setIsOpen(!isOpen)
        setServiceDate(new Date())
        setServiceTimeIn(new Date())
        setServiceTimeOut(new Date())
        if(isClick){
            setIsClick(false)
        }
    }

    function onChangeTimeOut(value){
        value < serviceTimeIn ?  alertTimeOut : setServiceTimeOut(value)
        if (value < serviceTimeIn) {
            setServiceTimeOut(serviceTimeIn)
        }
    }

    function submitService(event){
        event.preventDefault();
    }
    const alertTimeOut = (
        <MDBModal isOpen={true} toggle={this.toggle(3)} size="sm">
            <MDBModalHeader toggle={this.toggle(3)}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" size="sm" onClick={this.toggle(3)}>Close</MDBBtn>
                <MDBBtn color="primary" size="sm">Save changes</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )
    const createService = (
        <MDBModal isOpen={isOpen} toggle={toggle} size="md" >
            <form  onSubmit={submitService}>
            <MDBModalHeader toggle={toggle}>Create Service </MDBModalHeader>
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol size="10">
                            <MDBInput
                                label="Store Name"
                                type="text"
                                value={storeDtls.name}
                                readOnly={true}
                            />
                        </MDBCol>
                        <MDBCol size="6">
                            <MDBInput
                                label="Service Type"
                                type="text"
                                onChange={(e)=> serviceType(e.target.value)}
                                required
                            />
                        </MDBCol>
                        <MDBCol size="6">
                            <DatePicker selected={serviceDate} 
                                customInput={<ServiceDateTime label={"Service Date To"} ref={ref}/>}
                                onChange={date => setServiceDate(date)}
                                required
                            />                        
                        </MDBCol>
                        <MDBCol size="6">
                            <DatePicker
                                selected={serviceTimeIn}
                                onChange={date => setServiceTimeIn(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                popperPlacement="bottom-end"
                                customInput={<ServiceDateTime label={"Service Time In"} ref={ref}/>}    
                                timeCaption="Time"
                                dateFormat="h:mm aa"              
                            />                       
                        </MDBCol>
                        <MDBCol size="6">
                            <DatePicker
                                selected={serviceTimeOut}
                                onChange={date => setServiceTimeOut(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                popperPlacement="bottom-end"
                                customInput={<ServiceDateTime label={"Service Time Out"} ref={ref}/>}    
                                timeCaption="Time"
                                dateFormat="h:mm aa"              
                            />                       
                        </MDBCol>
                        <MDBCol size="6">
                            <MDBInput
                                label="Service Type"
                                type="text"
                                onChange={(e)=> serviceType(e.target.value)}
                                required
                            />                         
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="blue-grey" onClick={toggle}>No</MDBBtn>
                    <button type="submit" className="btn btn-success" size="sm" >Save</button>
                </MDBModalFooter>
                </form>
        </MDBModal>
    )

    return(
        <>
            <>{isOpen ?  createService : ''}</>
            <MDBBtn outline color="info" onClick={onClick}>Service</MDBBtn>
        </>
    )

}