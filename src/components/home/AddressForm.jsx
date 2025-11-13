import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded">
      <Form.Group className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          required
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          required
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          required
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          required
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="number"
          required
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Save Address
      </Button>
    </Form>
  );
};

export default AddressForm;