import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkDown from 'react-markdown';

export default function JobCard({ job }) {
    const [open, setOpen] = useState(false)
    return (
        <Card className="mb-3 job-card">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-3">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="warning">{job.location}</Badge>
                        <hr />
                        <div style={{ wordBreak: 'break-all' }}>
                            <small><strong>HOW TO APPLY:</strong></small>
                            <ReactMarkDown source={job.how_to_apply} />
                        </div>
                    </div>

                    <img src={job.company_logo} alt={job.company} className="d-none d-md-block" style={{height: 35}}/>
                </div>
                <Card.Text>
                    <Button 
                        onClick={() => setOpen(prevOpen => !prevOpen)}
                        className="app-button"
                    >
                        { open ? 'Hide details' : 'View details'}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkDown source={job.description}/>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}
