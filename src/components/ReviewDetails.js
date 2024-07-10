import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';

function ReviewDetails({ isOpen, setIsOpen, imageSrc, review }) {

    //função para dar render das estrelas da review
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon key={i} icon="star" style={{ color: 'gold' }} />);
        }
        for (let i = rating; i < 5; i++) {
            stars.push(<FontAwesomeIcon key={i + 5} icon="star" style={{ color: 'lightgrey' }} />);
        }
        return stars;
    };



    return (
        <Modal show={isOpen} onHide={() => setIsOpen(false)} size="lg">
            <Modal.Header>
                <Modal.Title className='title' style={{ alignItems: 'center' }}>{review.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                        <center>
                            {review.image && (
                                <img src={"https://localhost:7218/api/Image/" + review.image} alt={review.title} width="125px" style={{
                                    maxHeight: '200px', maxWidth: '150px'

                                }} />
                            )}
                            <h4 style={{ margin: '15px' }}>Avaliação: {renderStars(review.rating)}</h4>
                            {review.category && <h4 style={{ margin: '15px' }}>Categoria: {review.category.name}</h4>}
                            {/* <h6>Categoria: {review.category.name}</h6> */}
                            {/* <h6>Partilhado: {review.isShared ? 'Sim' : 'Não'}</h6> */}
                        </center>
                        <h4>Descrição</h4>
                        <div className='description-box'>{review.description}</div>
                    </Col>
                    <Col md={4}>
                        <h6>Comentários</h6>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {review.comments && review.comments.map((comment, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <b>{comment.user}:</b> {comment.text}
                                </div>
                            ))}
                        </div>
                        <form>
                            <div className="form-group">
                                <textarea className="form-control" rows="3" placeholder="Adicione um comentário"></textarea>
                            </div>
                            <Button type="submit" variant="primary">
                                Enviar
                            </Button>
                        </form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReviewDetails;