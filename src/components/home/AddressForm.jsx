import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddressForm = ({ onSubmit, initialData }) => {
  const [address, setAddress] = useState(initialData || {
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (initialData) {
      setAddress(initialData);
    }
  }, [initialData]);

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
          minLength={10}
          maxLength={10}
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
          type="text"
          required
          minLength={6}
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />
      </Form.Group>

      <Button type="submit" variant="success" className="mt-2 w-auto d-block mx-auto px-4">
        Save Address
      </Button>
    </Form>
  );
};

export default AddressForm;