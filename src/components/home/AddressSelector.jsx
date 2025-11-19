import { useState } from "react";
import {Button, ListGroup} from "react-bootstrap";
import AddressForm from "./AddressForm";

const AddressSelector=({addresses, onSelect, onAddNew})=>{
    const [addingNew, setAddingNew] = useState(false);
    if(addingNew)
        return(
            <AddressForm 
                onSubmit={(addr) => {
                    onAddNew(addr);
                    setAddingNew(false);
                    } 
                }
            />);
    return(
        <>
            <h5>Select Delivery Address</h5>
            <ListGroup className="mb-3">
                {addresses.map((addr, idx) => (
                    <ListGroup.Item
                        key={idx}
                        action
                        onClick={() => onSelect(addr)}
                        className="p-3"
                    >
                        <strong>{addr.name}</strong>, {addr.street}, {addr.city} - {addr.pincode}
                        <br />
                        Phone: {addr.phone}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Button variant="outline-primary" onClick={() => setAddingNew(true)}>
                + Add New Address
            </Button>
        </>
    )
}

export default AddressSelector;