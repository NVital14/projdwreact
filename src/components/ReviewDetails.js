import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { AppContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentItem from './CommentItem';
import '../App.css';
import { saveComment, getReview } from '../API/api';

const ReviewDetails = ({ isOpen, setIsOpen, revId }) => {
    const { context, setContext } = useContext(AppContext);
    const [comment, setComment] = useState('');
    const [newComment, setNewComment] = useState(false);
    const [review, setReview] = useState({});


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

    const handleSubmitComment = async () => {
        try {
            const r = await saveComment(review.reviewId, comment);
            console.log(r);
            setComment('');
            newComment ? setNewComment(false) : setNewComment(true);
        } catch (error) {
            console.error('Erro ao obter guardar o comentário:', error);
        }
    }

    //em vez de mandar a review da HomePage, vou buscá-la aqui, para os comentários estarem sempre atualizados
    const inic = async (revId) => {
        try {

            //vai buscar a review com base no id
            const r = await getReview(revId);
            console.log(r);
            setReview(r);
        } catch (error) {
            console.error('Erro ao obter reviews:', error);
        }

    }

    useEffect(() => {

        if (revId != -1) {

            inic(revId);
        }
    }, [newComment, revId]);

    console.log(review);
    return (
        <Modal show={isOpen} onHide={() => { setIsOpen(false); setComment(''); }} className="custom-modal" style={{}} >
            <Modal.Header>
                <Modal.Title className='title'> {review?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '70vh', maxHeight: '1000px', overflowY: 'auto' }}>
                <Row style={{ height: '100%' }}>
                    <Col md={8} style={{ height: '100%' }}>
                        <center>
                            {review?.image && (
                                <img src={"https://localhost:7218/api/Image/" + review?.image} alt={review?.title} width="125px" style={{
                                    maxHeight: '200px', maxWidth: '150px'

                                }} />
                            )}
                            <h4 style={{ margin: '15px' }}>Avaliação</h4>
                            <h6>{renderStars(review?.rating)}</h6>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <h4 style={{ marginTop: '10px' }}>Categoria: </h4>
                                <h5 style={{ marginTop: '13px', marginLeft:'4px' }}>{review?.category?.name}</h5>
                            </div>
                            {/* <h6>Partilhado: {review.isShared ? 'Sim' : 'Não'}</h6> */}
                        </center>
                        <h4>Descrição</h4>
                        <div className='description-box'>{review?.description}</div>
                    </Col>
                    <Col md={4} style={{ height: '100%' }}>
                        <div style={{ height: '100%', border: '2px inset', MozBorderRadius: '20px', WebkitBorderRadius: '20px' }}>
                            <h4 style={{ width: '90%', height: '10%', textAlign: 'center', margin: '10px' }}>Comentários</h4>
                            <div style={{ height: '75%', overflowY: 'auto' }}>

                                {review?.comments && review?.comments.map((comment, index) => (
                                    <CommentItem userName={comment.utilizador.userName} comment={comment.comment} ></CommentItem>

                                ))}
                            </div>

                            <div style={{ height: '15%', marginBottom: '4px' }}>
                                <div className="input-group mb-3">

                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Comentário"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        disabled={!context.isAuthenticated}
                                        style={{ resize: 'none', overflow: 'hidden', marginRight: '4px', overflowY: 'auto', height: '60px' }}
                                    ></textarea>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" style={{ height: '60px' }} type="button" disabled={!context.isAuthenticated} onClick={() => handleSubmitComment()} >
                                            <FontAwesomeIcon icon="paper-plane" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { setIsOpen(false); setComment(''); }}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReviewDetails;