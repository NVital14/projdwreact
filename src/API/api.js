
export async function getReviewsPaginated(pageNum) {
    const response = await fetch("https://localhost:7218/api/Reviews/reviews-paginated?pageNumber=" + pageNum + "&pageSize=9");
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data = await response.json();
    return data;
}

export async function getImage(imageName) {
    console.log(imageName);
    const response = await fetch("https://localhost:7218/api/Image/" + imageName);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob); // Cria um URL de objeto a partir do blob
}