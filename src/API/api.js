//GET

//vai buscar as reviews paginadas
export async function getReviewsPaginated(pageNum, byUser) {
    try {

        const response = await fetch("https://localhost:7218/api/Reviews/reviews-paginated?pageNumber=" + pageNum + "&pageSize=9&byUser=" + byUser, {

            method: 'GET',
            credentials: 'include', // Para enviar cookies
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        return data;

    }
    catch (e) {
        console.log("ERRO", e);
    }
}

//vai buscar uma review
export async function getReview(id) {
    try {

        const response = await fetch("https://localhost:7218/api/Reviews/review-id-details/"+id, {

            method: 'GET',
            credentials: 'include', // Para enviar cookies
            // headers: {
            //     'Content-Type': 'application/json',
            // }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        return data;

    }
    catch (e) {
        console.log("ERRO", e);
    }
}


//verifica se o utilizador está autenticado
export async function isAuthenticated() {
    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/is-authenticaded");
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        return data;

    }
    catch (e) {
        console.log("ERRO", e);
    }
}

//verifica se o utilizador é administrador
export async function isAdmin() {
    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/is-admin", {

            method: 'GET',
            credentials: 'include', // Para enviar cookies
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        return data;

    }
    catch (e) {
        console.log("ERRO", e);
    }
}

// Vai buscar os dados do utilizador atual
export async function getCurrentUser() {

    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/user", {

            method: 'GET',
            credentials: 'include', // Para enviar cookies
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Verifique o status da resposta
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        // Verifique o conteúdo da resposta antes de processá-la como JSON
        const text = await response.text();
        console.log('Resposta bruta:', text);

        // Tente parsear a resposta como JSON se houver conteúdo
        if (text) {
            const data = JSON.parse(text);
            console.log('Dados do utilizador:', data);
            return data;
        } else {
            throw new Error('Resposta vazia do servidor');
        }
    } catch (e) {
        console.error("ERRO", e);
        throw e; // Propaga o erro para ser tratado por quem chamar esta função
    }
}


//vai buscar todos os utilizadores
export async function getUsers() {
    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/users", {

            method: 'GET',
            credentials: 'include', // Para enviar cookies
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        return data;

    }
    catch (e) {
        console.log("ERRO", e);
    }
}

//vai buscar todas as categorias
export async function getCategories() {
    try {
        const response = await fetch("https://localhost:7218/api/Categories/category");
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        return data;

    }
    catch (e) {
        console.log("ERRO", e);
    }
}


//POST
//cria um comentário
export function saveComment(revId, comment) {
    try {

        return fetch("https://localhost:7218/api/Comments/create-comment/" + revId, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                comment: comment,
            })
        });
    }
    catch (e) {
        console.log("ERRO", e);
    }
}

//cria uma conta nova
export async function createAccount(email, userName, pass) {
    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/create-user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: pass,
                userName: userName
            })
        });

        return response; // retorna a resposta 
    } catch (error) {
        console.error("Erro ao criar a conta", error);
        throw error; // lança o erro para ser tratado pelo código a função
    }
}

//entra numa conta
export async function signIn(email, pass) {
    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/sign-in-user", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: pass,
            })
        });

        return response; // retorna a resposta 
    } catch (error) {
        console.error("Erro ao criar a conta", error);
        throw error; // lança o erro para ser tratado pelo código que chamou a função
    }
}

//sai da conta
export async function logOut() {
    try {
        const response = await fetch("https://localhost:7218/api/Utilizadores/log-out-user", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        return response; // retorna a resposta 
    } catch (error) {
        console.error("Erro ao sair da conta", error);
        throw error; // lança o erro para ser tratado pelo código que chamou a função
    }
}

//guarda uma review
export async function saveReview(body) {
    try {
        const response = await fetch("https://localhost:7218/api/Reviews/create-review", {
            method: 'POST',
            credentials: 'include',
            body: body
        });

        return response.json(); // retorna a resposta 
    } catch (error) {
        console.error("Erro ao sair guardar a review", error);
        throw error; // lança o erro para ser tratado pelo código que chamou a função
    }
}

//PUT
//edita uma review
export async function editReview(id,body) {
    try {
        const response = await fetch("https://localhost:7218/api/Reviews/edit-review/" + id, {
            method: 'PUT',
            credentials: 'include',
            body: body
        });

        return response.json(); // retorna a resposta 
    } catch (error) {
        console.error("Erro ao editar a review", error);
        throw error; // lança o erro para ser tratado pelo código que chamou a função
    }
}