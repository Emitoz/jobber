import React from 'react';
import { Form, Col } from 'react-bootstrap';

export default function SearchJobs({ params, onParamChange }) {
    return (
        <Form className="mb-4">
            <Form.Row className="">
                <Form.Group as={Col} className="my-form-field ">
                    <Form.Label>Keyword(s)</Form.Label>
                    <Form.Control 
                        onChange={onParamChange}
                        value={params.description}
                        name="description"
                        type="text"
                        placeholder="Designation, Industry or Company"
                        />
                </Form.Group>
                <Form.Group as={Col} className="my-form-field">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        onChange={onParamChange}
                        value={params.location}
                        name="location"
                        type="text"
                        placeholder="E.g. New York"
                        />
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2 my-form-field">
                    <Form.Check 
                        className="mb-2"
                        onChange={onParamChange} 
                        value={params.full_time}
                        name="full_time"
                        id="full_time"
                        label="Only full time"
                        type="checkbox"
                        />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
