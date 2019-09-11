import React, { Component } from 'react';
import axios from 'axios';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button,Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

class App extends Component {
  state = {
    resumes: [],
    newResumeData: {
      name: '',
      number: '',
      profile: '',
      email: '',
      linkedin: ''
    },
    editResumeData: {
      id: '',
      name: '',
      number: '',
      profile: '',
      email: '',
      linkedin: ''
    },
    newResumeModal: false,
    editResumeModal: false
  }
  componentDidMount() {
    this._refreshResumes();
  }
  toggleNewResumeModal() {
    this.setState({
      newResumeModal: ! this.state.newResumeModal
    });
  }
  toggleEditResumeModal() {
    this.setState({
      editResumeModal: ! this.state.editResumeModal
    });
  }
  addResume() {
    axios.post('http://localhost:3001/resumes', this.state.newResumeData).then((response) => {
      let { resumes } = this.state;

      resumes.push(response.data);

      this.setState({ resumes, newResumeModal: false, newResumeData: {
        name: '',
        number: '',
        profile: '',
        email: '',
        linkedin: ''
      }});
    });
  }
  updateResume() {
    let { name, number, profile, email , linkedin} = this.state.editResumeData;

    axios.put('http://localhost:3001/resumes/' + this.state.editResumeData.id, {
      name, number,profile,email, linkedin
    }).then((response) => {
      this._refreshResumes();

      this.setState({
        editResumeModal: false, editResumeData: { id: '', name: '', number: '',profile: '', email: '', linkedin: '' }
      })
    });
  }
  editResume(id, name, number, profile, email, linkedin) {
    this.setState({
      editResumeData: { id, name, number, profile , email, linkedin }, editResumeModal: ! this.state.editResumeModal
    });
  }
  deleteResume(id) {
    axios.delete('http://localhost:3001/resumes/' + id).then((response) => {
      this._refreshResumes();
    });
  }
  _refreshResumes() {
    axios.get('http://localhost:3001/resumes').then((response) => {
      this.setState({
        resumes: response.data
      })
    });
  }


  resume;

  exportPDF = () => {
      this.resume.save();
  }




  render() {
    let resumes = this.state.resumes.map((resumee) => {
      return (

<div>

<div className="container">
<div className="row">
        <div className="col-sm-12">

        <PDFExport paperSize={'Letter'}
            fileName="Resume.pdf"
            title=""
            subject=""
            keywords=""
            ref={(r) => this.resume = r}>

                  <Card >
                         <CardBody>
                           <CardTitle className="text-center"><b>Resume { resumee.id}</b></CardTitle>

                           <CardText >
                            <div >
                           <div className="row" key={resumee.id}>
                           <div className="col-sm-6" >
                               <div><b>Name :</b> {resumee.name}</div> <br />
                               <div><b>Contact :</b> {resumee.number}</div>

                               </div>

                               <div className="col-sm-6" >


                               <div><b>Email Id :</b> {resumee.email}</div> <br />
                               <div><b>Linked In :</b> {resumee.linkedin}</div>

                                   </div>

                               </div>

                               <div className="row">
                                <div className="col-sm-12" ><br />
                               <div><b>Profile Summary :</b> {resumee.profile}</div>
                               </div>
                              </div>

                             </div></CardText>

                         </CardBody>
                       </Card><br />
       </PDFExport>


  </div>

</div>
</div>



  <div>
    <Button color="success" size="sm" className="mr-2" onClick={this.editResume.bind(this, resumee.id, resumee.name, resumee.number, resumee.profile , resumee.email, resumee.linkedin)}>Edit</Button>
    <Button color="danger" size="sm" onClick={this.deleteResume.bind(this, resumee.id)}>Delete</Button>
  </div>

  <div style={{ textAlign: 'center', marginBottom: 10 }}><Button color="primary" onClick={this.exportPDF} style={{ margin: 'auto' }}>download</Button></div>

<br />
<hr />
<br />

  </div>
      )
    });

    return (
      <div className="App container">

      <h1>Resume Editing App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewResumeModal.bind(this)}>Add Your Resume</Button>

      <Modal isOpen={this.state.newResumeModal} toggle={this.toggleNewResumeModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewResumeModal.bind(this)}>Add a new Resume</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newResumeData.name} onChange={(e) => {
              let { newResumeData } = this.state;

              newResumeData.name = e.target.value;

              this.setState({ newResumeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="number">Number</Label>
            <Input id="number" value={this.state.newResumeData.number} onChange={(e) => {
              let { newResumeData } = this.state;

              newResumeData.number = e.target.value;

              this.setState({ newResumeData });
            }} />
          </FormGroup>


          <FormGroup>
            <Label for="profile">Profile</Label>
            <Input id="profile" value={this.state.newResumeData.profile} onChange={(e) => {
              let { newResumeData } = this.state;

              newResumeData.profile = e.target.value;

              this.setState({ newResumeData });
            }} />
          </FormGroup>


          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" value={this.state.newResumeData.email} onChange={(e) => {
              let { newResumeData } = this.state;

              newResumeData.email = e.target.value;

              this.setState({ newResumeData });
            }} />
          </FormGroup>


          <FormGroup>
            <Label for="linkedin">Profile</Label>
            <Input id="linkedin" value={this.state.newResumeData.linkedin} onChange={(e) => {
              let { newResumeData } = this.state;

              newResumeData.linkedin = e.target.value;

              this.setState({ newResumeData });
            }} />
          </FormGroup>


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addResume.bind(this)}>Add Your Resume</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewResumeModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editResumeModal} toggle={this.toggleEditResumeModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditResumeModal.bind(this)}>Edit a new Resume</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editResumeData.name} onChange={(e) => {
              let { editResumeData } = this.state;

              editResumeData.name = e.target.value;

              this.setState({ editResumeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="number">Number</Label>
            <Input id="number" value={this.state.editResumeData.number} onChange={(e) => {
              let { editResumeData } = this.state;

              editResumeData.number = e.target.value;

              this.setState({ editResumeData });
            }} />
          </FormGroup>


          <FormGroup>
            <Label for="profile">Profile</Label>
            <Input id="profile" value={this.state.editResumeData.profile} onChange={(e) => {
              let { editResumeData } = this.state;

              editResumeData.profile = e.target.value;

              this.setState({ editResumeData });
            }} />
          </FormGroup>


          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" value={this.state.editResumeData.email} onChange={(e) => {
              let { editResumeData } = this.state;

              editResumeData.email = e.target.value;

              this.setState({ editResumeData });
            }} />
          </FormGroup>


          <FormGroup>
            <Label for="linkedin">LinkedIn</Label>
            <Input id="linkedin" value={this.state.editResumeData.linkedin} onChange={(e) => {
              let { editResumeData } = this.state;

              editResumeData.linkedin = e.target.value;

              this.setState({ editResumeData });
            }} />
          </FormGroup>


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateResume.bind(this)}>Update Resume</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditResumeModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

{resumes}

      </div>
    );
  }
}

export default App;
