import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap';

function App() {

  const [formData, setFormData] = useState({
    bookName: '',
    review: ''
  });
  const [fetchData, setFetchData] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState('');


  useEffect(() => {
    axios.get("/api/get")
      .then((response) => {
        setFetchData(response.data);
      });
  }, [])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChange2 = (event) => {
    setReviewUpdate(event.target.value);
  }


  const submit = () => {
    axios.post('/api/insert', this.state)
      .then(() => { alert('success post') })
    console.log(this.state)
    document.location.reload();
  };

  const deleteData = (id) => {
    if (window.confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
    }
  };

  const editData = (id) => {
    axios.put(`/api/update/${id}`, this.state)
    document.location.reload();
  };

  let card = fetchData?.map((val, key) => {
    return (
      <React.Fragment key={key}>
        <Card style={{ width: '18rem' }} className='m-2'>
          <Card.Body>
            <Card.Title>{val.book_name}</Card.Title>
            <Card.Text>
              {val.book_review}
            </Card.Text>
            <input name='reviewUpdate' onChange={handleChange2} placeholder='Update Review' ></input>
            <Button className='m-2' onClick={() => { editData(val.id) }}>Update</Button>
            <Button onClick={() => { deleteData(val.id) }}>Delete</Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  });

  return (
    <div className='App'>
      <h1>Dockerized Fullstack React Application</h1>
      <div className='form'>
        <input name='bookName' value={formData.bookName} placeholder='Enter Book Name' onChange={handleChange} />
        <input name='review' value={formData.review} placeholder='Enter Review' onChange={handleChange} />
      </div>
      <Button className='my-2' variant="primary" onClick={submit}>Submit</Button> <br /><br />
      <Container>
        <Row>
          {card}
        </Row>
      </Container>
    </div>
  );
}

export default App;
