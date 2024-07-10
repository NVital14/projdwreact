import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AppBar from '../components/AppBar';
import { getReviewsPaginated, getImage } from '../API/api';
import ReviewItem from '../components/ReviewItem';
import ReviewDetails from '../components/ReviewDetails';

function HomePage() {
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const inic = async () => {
        try {
            const r = await getReviewsPaginated(1);
            const revs = r.reviews;
            setReviews(revs);

            console.log(revs);
            // await processReviewsWithImages(revs);
        } catch (error) {
            console.error('Erro ao obter reviews:', error);
        }

    }

    // função para processar e atualizar as reviews com imagens
    const processReviewsWithImages = async (reviews) => {
        const updatedReviews = [];
        try {

            // for (const element of reviews) {
            //     element.image = await fetchImage(element);
            //     updatedReviews.push(element);
            // }

            // Promise.allSettled([await fetchImage(element), fetchImage(element), fetchImage(element)])

            await Promise.allSettled(reviews.map(async element => {
                element.image = await fetchImage(element);
                updatedReviews.push(element);
            }));

            setReviews(updatedReviews); // Define as revisões atualizadas no estado

        } catch (error) {
            console.error('Erro ao processar reviews com imagens:', error);
        }
    };

    const fetchImage = async (review) => {
        var imageUrl = "";
        try {
            imageUrl = await getImage(review.image);
            console.log("URL:", imageUrl);
        } catch (error) {
            console.error('Failed to fetch image', error);
        }

        return imageUrl;
    };

    useEffect(() => {
        inic();
        // processReviewsWithImages();
    }, []);

    const rows = useMemo(() => {
        const rows = [];
        for (let i = 0; i < reviews.length; i += 3) {
            rows.push(reviews.slice(i, i + 3));
        }
        return rows
    }, [reviews])

    return (
        <>
            <AppBar />

            <div>
                {reviews.length > 0 ? (
                    <div className="container" style={{ marginTop: '50px' }}>
                        {rows.map((row, rowIndex) => (
                            <div className="row" key={rowIndex}>
                                {row.map((review) => (
                                    <ReviewItem key={review.reviewId} setIsOpen={setIsOpen} review={review} setSelectedReview={setSelectedReview} />

                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhuma review disponível.</p>
                )}
                <ReviewDetails isOpen={isOpen} setIsOpen={setIsOpen} review={selectedReview}></ReviewDetails>
            </div>

        </>

    );
}

export default HomePage;