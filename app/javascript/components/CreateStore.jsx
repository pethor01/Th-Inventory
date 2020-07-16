import React from "react"
import { Link , withRouter} from "react-router-dom"
import Stores from "../components/Stores";



class NewStore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            address: "",
            contact_no: "",
            numbersOnly: ""
        };
        
        this.onChange = this.onChange.bind(this);
        this.submitStore = this.submitStore.bind(this);
    }

    handleNumbersOnly(evt) {
        const contact_no = (evt.target.validity.valid) ? evt.target.value : this.state.contact_no;
        this.setState({ contact_no });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    submitStore(event){
        event.preventDefault();
        const url = "/api/v1/create_store";
        const { name, address, contact_no} = this.state
        if (name.length == 0 || address.length == 0 || contact_no.length == 0) 
            return;
        const body = {name, address, contact_no};
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
            .then(response => this.props.handleSubmit(response))
            .catch(error => console.log(error.message));  
        event.target.reset();
        this.setState({contact_no: ""})
    }
    render(){
        return(
            <>
                <button className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal">
                    Create New Store
                </button>
                <div className="modal" id="exampleModal" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <form onSubmit={this.submitStore} >
                            <div className="modal-header">
                                <h5 className="modal-title" id="StoreModalTitle">Create Store</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                    <div className="container ">
                                        <div className=" row form-group ">
                                            <label htmlFor="store_name">Store Name:</label>
                                            <input type="text" id="store_name" name="name" className="form-control" onChange={this.onChange} required/>
                                        </div>
                                        <div className=" row form-group ">
                                            <label htmlFor="store_address">Store Address:</label>
                                            <textarea id="store_address" name="address" type="text" className="form-control" required onChange={this.onChange}/>
                                        </div>
                                        <div className=" row form-group ">
                                            <label htmlFor="contact_no">Contact Number:</label>
                                            <input type="text" id="contact_no" name="contact_no" pattern="[0-9]*" value={this.state.contact_no} onChange={event => this.setState({contact_no: event.target.value.replace(/\D/,'')})} name="contact_no" className="form-control" required/>
                                        </div>
                                    </div>
                            </div>
                            <div id="btnOption" className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewStore;

