//Etape 4 : Faire le lien entre un produit de la page d’accueil et la page Produit

//Changer l'url de l'API
const param = new URLSearchParams(document.location.search);
let id = param.get('id');


//Etape 5 : Récupérer l'id du produit à afficher

//Appel de l'API
const fetchProduct = async () => {
    let fetchDataProduct = await fetch(`http://localhost:3000/api/products/${id}`);
    let productData = await fetchDataProduct.json();
    return productData;
};

fetchProduct();


//Etape 6 : Insérer un produit et ses détails dans la page Produit

//Insérer l'API
const canapeViews = async () => {
    let canapeProductView = await fetchProduct();
    let itemImg = document.querySelector('.item__img');
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let description = document.getElementById('description');
    let color = document.getElementById('colors');
    itemImg.innerHTML += `<img src='${canapeProductView.imageUrl}' alt=${canapeProductView.altTxt} />`;
    title.innerHTML += `<h1 id='title'>${canapeProductView.name}</h1>`;
    price.innerHTML += `${canapeProductView.price}`;
    description.innerHTML += `${canapeProductView.description}`;
    
    for (let i = 0; i <canapeProductView.colors.length; i++){
        color.innerHTML +=
        `<option value = "${canapeProductView.colors[i]}"> ${canapeProductView.colors[i]} </option>`
    }
}; 

canapeViews();


//Etape 7 : Ajouter des produits dans le panier

//Possibilité de cliquer et d'ajouter au panier
const bouton = document.getElementById('addToCart');
bouton.addEventListener('click', () => {
    const param = new URLSearchParams(document.location.search);
    let id = param.get('id');
    let color = document.getElementById('colors').value;
    let quantity = Number(document.getElementById('quantity').value);

let Panier = {
    id: id,
    color: color,
    quantity: quantity,
};
localStorage.setItem('panier', JSON.stringify(Panier))

//Alerte si manque de renseignement ou erreur
if (!color) {
    alert('Veuillez choisir une couleur');
    return;
  }
if (!(quantity > 0 && quantity < 101)) {
    alert('Veuillez choisir une quantité entre 1 et 100');
    return;
  };
});