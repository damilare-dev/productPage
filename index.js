const productDisplay = document.getElementById('display')


const fetchAPi  = async  (url) => {

    const product = await fetch(url)

    const {products} = await product.json()

    return products
}

const view = (product) => {

    return `<div class="card-product">
        <div>
            <img id="img1" src=${product.images[0]}>
        </div>
        <h2><b id="pdName">${product.title}</b></h2>
        <h3>Price: $ <b id="prize1">${product.price}</b></h3>
        <h4><span id="pd1">${product.description}</span></h4>
        <button data-product=${product.id} class="btn">Add to Cart</button>
    </div>`
}

const products = []

fetchAPi('https://dummyjson.com/products').then((data) => {

data.forEach(product => {
    products.push(product)
    productDisplay.insertAdjacentHTML("afterbegin", view(product))
});
})

productDisplay.addEventListener("click", (e) => {

    if(!(e.target.tagName === "BUTTON")) return;

    const index = e.target.getAttribute("data-product")
  
    const  {title, price, id} = products[index - 1]

    const product = JSON.parse(localStorage.getItem(index)) ?? {id:Date.now(), title:title, price:price, quantity: 0}

    localStorage.setItem(index, JSON.stringify({quantity: product.quantity++, ...product}))

})


