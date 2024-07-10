import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';
import { getImage } from '../API/api';

function ReviewItem({ setIsOpen, review, setSelectedReview }) {
    const [imageSrc, setImageSrc] = useState(null);
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

        <div className="col">
            <div className="col-sm">
                <div className="card border-light mb-3" style={{ maxWidth: '18rem', height: '410px' }} onClick={() => {
                    setIsOpen(true)
                    setSelectedReview(review)
                }}>
                    <div className="card-header"><b><center>{review.title}</center></b></div>
                    <div className="card-body">
                        {review.image != null ?
                            <center>
                                <img src={"https://localhost:7218/api/Image/" + review.image} title={review.title} width="125px" max-height="100px" />
                            </center> : <div></div>
                        }
                        <h6 style={{ margin: '15px' }}>Avaliação: {renderStars(review.rating)}</h6>
                        {/* <h6 style={{margin:'15px'}}>Categoria: {review.category.name}</h6> */}
                        {/* <h6 style={{margin:'15px'}}>Partilhado: {review.isShared ? 'Sim' : 'Não'}</h6> */}
                    </div>
                    <div className="card-footer bg-transparent border-success">
                        {/* <center>
                            <FontAwesomeIcon icon="fa fa-info-circle" style={{ color: '#8EAADB' }} />
                                <i className="fa fa-info-circle" style={{ color: '#8EAADB' }} />
                            </center> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;