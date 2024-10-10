import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';

const url = "http://localhost:5000/usuarios"

const ModalCadastrar = (props) => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [tipo, setTipo] = useState("administrador")

    const handleCadastrar = async () => {
        if(nome !="" && email !="" && senha !=""){
          const user = {nome, email, senha, tipo };
          const res =await fetch(url, {
            method: "POST",
            headers: {"Comtent-Type": "application/json"},
            body: JSON.stringify(user)
          });
          setNome("")
          setEmail("")
          setSenha("")
          alert("Cadastrado com sucesso");
          props.onHide();
        }
        else{
            alert("Cadastrado com sucessoo")
        }


    } 
  
    return (
    <div>
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{color: "green"}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastrar Funcionario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* caixinha do nome */}
      <FloatingLabel
        controlId="floatingInputName"
        label="Nome"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Digite seu nome..." value={nome} onChange={(e) =>{setNome(e.target.value);}}/>
        </FloatingLabel>
        {/* caixinha email */}
        <FloatingLabel
        controlId="floatingInputEmail"
        label="Email"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) =>{setEmail(e.target.value);}}/>
      </FloatingLabel>
      {/* caixinha da senha */}
      <FloatingLabel controlId="floatingPassword" label="Senha" className='mb-3'>

        <Form.Control type="password" placeholder="Password" value={senha} onChange={(e) =>{setSenha(e.target.value);}}/>
      </FloatingLabel>

        {/* caixinha tipo */}
        <Form.Group controlId='formGridTipo'>
            <Form.Label>Tipo</Form.Label>
            <Form.Select
            value={tipo}
            onChange={(e) => {
                setTipo(e.target.value);
            }}
            >
                <option >Administrador</option>
                <option >Gerente</option>
                <option >Funcionario</option>
                
            </Form.Select>

        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCadastrar}>Cadastrar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default ModalCadastrar