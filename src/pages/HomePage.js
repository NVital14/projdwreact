import React, { useEffect, useMemo, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { getFavorites, getReviewsPaginated } from '../API/api';
import {AppContext } from '../App';
import ReviewItem from '../components/ReviewItem';
import ReviewDetails from '../components/ReviewDetails';
import PaginationComponent from '../components/Pagination';

const HomePage = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedReviewId, setSelectedReviewId] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [nPages, setNPages] = useState(0);
    const { context, setContext } = useContext(AppContext);
    

    const inic = async () => {
        try {
            const r = await getReviewsPaginated(currentPage, false);
            const revs = r.reviews;
            setReviews(revs);
            setNPages(r.totalPages);



            console.log(revs);
        } catch (error) {
            console.error('Erro ao obter reviews:', error);
        }

    }

    useEffect(() => {

        inic();
    }, [currentPage]);

    const rows = useMemo(() => {
        const rows = [];
        for (let i = 0; i < reviews.length; i += 3) {
            rows.push(reviews.slice(i, i + 3));
        }
        return rows
    }, [reviews])

    return (
        <>
            <div>
                {reviews.length > 0 ? (
                    <div className="container" style={{ marginTop: '50px' }}>
                        {rows.map((row, rowIndex) => (
                            <div className="row" key={rowIndex}>
                                {row.map((review) => (
                                    <ReviewItem key={review.reviewId} setIsOpen={setIsOpen} review={review} setSelectedReviewId={setSelectedReviewId} source="homePage"
                                    //vindo daqui o setIsEditOpen e o setReviewToEdit não vai servir para nada
                                        setIsEditOpen={setIsOpen}
                                        setReviewToEdit={ setIsOpen}
                                    />

                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhuma review disponível.</p>
                )}
                <ReviewDetails isOpen={isOpen} setIsOpen={setIsOpen} revId={selectedReviewId}></ReviewDetails>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                    <PaginationComponent currentPage={currentPage} nPages={nPages} setCurrentPage={setCurrentPage}></PaginationComponent>
                </div>
            </div>

        </>

    );
}

export default HomePage;