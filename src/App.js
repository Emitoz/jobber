import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import JobCard from './JobCard';
import JobsPagination from './JobsPagination';
import SearchJobs from './SearchJobs';
import './App.css';
import Logo from './jobrLogo.svg';

function App() {

  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamsChange(e){
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    });
  }

  return (
    <Container className="my-5">
      <img src={Logo} style={{ height: 50 }}/>
      <hr />
      <SearchJobs params={params} onParamChange={handleParamsChange}/>

      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />

      {loading && <h1>Loading...</h1>}
      {error && <h1>Error occured, try refreshing.</h1>}
      
      {jobs.map(job => {
        return <JobCard key={job.id} job={job} />
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
