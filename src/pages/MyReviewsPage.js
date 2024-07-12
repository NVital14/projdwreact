import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getUsers, getCategories, getReviewsPaginated } from '../API/api';
import CreateReview from '../components/CreateReview';
import ReviewItem from '../components/ReviewItem';
import { ROUTES, AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ReviewDetails from '../components/ReviewDetails';
import PaginationComponent from '../components/Pagination';

const MyReviewsPage = () => {
    const navigate = useNavigate();
    const { context, setContext } = useContext(AppContext);
    const [isNewReviewOpen, setIsNewReviewOpen] = useState(false);
    const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState({});
    const [reviewToEdit, setReviewToEdit] = useState({});
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nPages, setNPages] = useState(0);


    const inic = async () => {
        try {
            //vai buscar as reviews do utilizador paginadas
            const r = await getReviewsPaginated(currentPage, true);
            console.log(r);
            setMyReviews(r.reviews);
            setNPages(r.totalPages);

            //vai buscar os users
            const u = await getUsers();
            setUsers(u);

            //vai buscar as categorias
            const c = await getCategories();
            setCategories(c);
            console.log(u);
            console.log(c);
        } catch (error) {
            console.error('Erro ao obter reviews:', error);
        }

    }

    useEffect(() => {
        if (context.isAuthenticated) {

            inic();
        }
        else {
            navigate(ROUTES.HOME);
        }
    }, [currentPage]);

    const rows = useMemo(() => {
        const rows = [];
        if (myReviews.length > 0) {
            for (let i = 0; i < myReviews.length; i += 3) {
                rows.push(myReviews.slice(i, i + 3));
            }
        }
        return rows
    }, [myReviews])

    return (
        <>

            <div>
                <div style={{ marginLeft: '15%', marginTop: '25px' }}>
                    <h2>Reviews</h2>
                    <button className="button-criar-review" style={{ marginTop: '20px' }} onClick={() => setIsNewReviewOpen(true)}>
                        Criar Nova Review
                    </button>
                </div>
                {myReviews.length > 0 ? (
                    <div className="container" style={{ marginTop: '50px' }}>
                        {rows.map((row, rowIndex) => (
                            <div className="row" key={rowIndex}>
                                {row.map((review) => (
                                    <ReviewItem key={review.reviewId} setIsOpen={setIsDetailsOpen} review={review} setSelectedReviewId={setSelectedReviewId} source="myReviewsPage" setIsEditOpen={setIsEditReviewOpen} setReviewToEdit={setReviewToEdit} />

                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhuma review disponível.</p>)}
                <CreateReview isOpen={isNewReviewOpen} setIsOpen={setIsNewReviewOpen} categories={categories} users={users} review={null} />
                <CreateReview isOpen={isEditReviewOpen} setIsOpen={setIsEditReviewOpen} categories={categories} users={users} review={reviewToEdit} />

                <ReviewDetails isOpen={isDetailsOpen} setIsOpen={setIsDetailsOpen} revId={selectedReviewId}></ReviewDetails>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                    <PaginationComponent currentPage={currentPage} nPages={nPages} setCurrentPage={setCurrentPage}></PaginationComponent>
                </div>
            </div>
        </>
    );
};

export default MyReviewsPage;
