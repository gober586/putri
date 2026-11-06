
// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'boncabe', price: 2000, img: 'boncabe.jpg' },
    { id: 2, name: 'makaroni', price: 2500, img: 'makaroni.jpg' },
    { id: 3, name: 'milo', price: 2000, img: 'milo.jpg' },
    { id: 4, name: 'mie spageti', price: 2500, img: 'mie spageti.jpg' },
    { id: 5, name: 'teh gelas', price: 500, img: 'teh gelas.jpg' },
    { id: 6, name: 'mochi', price: 2000, img: 'mochi.jpg' },
];

// Keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayproducts() {
    const productsContainer = document.getElementById('products');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');

        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updatecart();
}

// Fungsi untuk menampilkan isi keranjang
function updatecart() {
    const cartItemContainer = document.getElementById('cart-items');
    cartItemContainer.innerHTML = '';

    let totalprice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`;

        cartItemContainer.appendChild(listItem);

        totalprice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent =
        totalprice.toLocaleString('id-ID');
}

// Fungsi checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda Kosong');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const payment = Number(prompt(
        `Total Belanja Anda Rp ${total.toLocaleString('id-ID')}. Masukkan Jumlah Pembayaran:`
    ));

    if (payment >= total) {
        alert(`Pembayaran Berhasil! Kembalian Anda: Rp ${(payment - total).toLocaleString('id-ID')}`);

        cart = [];
        updatecart();
    } else {
        alert('Uang Anda Tidak Mencukupi.');
    }
}

// Event listener tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Tampilkan produk saat halaman dimuat
displayproducts();

