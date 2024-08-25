const data = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

let paymentCardArray = [];
let itemQuantities = {};
let cardLength = [];
let totalLength = 0;

function getData() {
  data.map((item, index) => {
    let cardItem = `
    <div class="col-lg-4 col-md-6 card-item-wrapper mb-5" id="${index}">
                <div class="card-item-container card border-0">
                  <div class="card-item-img bg-dark rounded">
                    <img
                      src="${item.image.desktop}"
                      class="rounded card-img-top"
                      alt="${item.name}"
                    />
                    <div class="card-item-settings">
                      <div class="card-item-settings-wrapper">
                        <button
                          class="add-btn active-btn d-flex gap-1 align-items-center"
                        >
                          <i class="bx bx-cart-add"></i><span>Add to Cart</span>
                        </button>
                        <button class="plusOrminus-btn">
                          <i class="bx bx-minus minus-btn"></i>

                          <span class="card-number">1</span>

                          <i class="bx bx-plus plus-btn"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="card-item-body pt-5 d-flex flex-column gap-1">
                    <span class="card-category">${item.category}</span>
                    <p class="card-name">${item.name}</p>
                    <span class="card-price">$${item.price}</span>
                  </div>
                </div>
              </div>
    
    `;
    document.querySelector("#shopping-container").innerHTML += cardItem;
  });

  addItem();
}

function addItem() {
  const addBtns = document.querySelectorAll(".add-btn");
  for (const addBtn of addBtns) {
    let cardItemId =
      addBtn.parentElement.parentElement.parentElement.parentElement
        .parentElement.id;
    let minusPlusBtn = addBtn.nextElementSibling;
    let img = addBtn.parentElement.parentElement.parentElement.children[0];

    // console.log(img);
    addBtn.addEventListener("click", function () {
      img.classList.add("card-item-active");
      if (paymentCardArray.length > 0) {
        addBtn.classList.remove("active-btn");
        minusPlusBtn.classList.add("active-btn");
      } else {
        minusPlusBtn.classList.remove("active-btn");
        addBtn.classList.add("active-btn");
      }
      data.map((item, index) => {
        if (cardItemId == index) {
          if (!paymentCardArray.includes(item)) {
            paymentCardArray.push(item);
            // console.log(item);
            itemQuantities[item.name] = 1;
            cardLength = Object.values(itemQuantities);

            // console.log(cardLength);
            // console.log(paymentCardArray);
            getCard();
            updateCard();
          }
        }
      });
    });
  }
}

function getCard() {
  let totalCard = 0;
  for (const length of cardLength) {
    totalCard += length;
  }
  const paymentWrapper = document.querySelector(".payment-wrapper");

  if (!paymentCardArray.length == 0) {
    paymentWrapper.innerHTML = "";

    paymentWrapper.innerHTML = `
        <div class="payment-container-full d-flex flex-column">
    <h3>Your Cart (${totalCard})</h3>
    <div class="payment-items d-flex flex-column gap-3 mt-3">
     
    </div>
    
    <div
      class="payment-order-total d-flex align-items-center justify-content-between py-3"
    >
      <span class="total-title">Order Total</span>
      <h4 class="total-price"></h4>
    </div>
    
    <p class="payment-important-info text-center">
      <img
        src="./assets/images/icon-carbon-neutral.svg"
        alt="icon-carbon-neutral"
        class="me-1"
      />
      This is a <span> carbon-neutral</span> deivery
    </p>
    <button class="confirm-btn mt-3" onclick="getConfirmCard(this)">Confirm Order</button>
    </div> 
        
        
        
        `;
  } else {
    paymentWrapper.innerHTML = "";

    paymentWrapper.innerHTML = `
        
                      <div class="payment-container-empty active-payment">
                    <h3 class="text-start">Your Cart (0)</h3>
                    <img
                      src="./assets/images/illustration-empty-cart.svg"
                      alt="illustration-empty-cart"
                      class="mt-3"
                    />
                    <p>Your added items will appear here</p>
                  </div>
        `;
  }
}

getData();
getCard();
addItem();
plusItem();
minusItem();

function updateCard() {
  const payItemsContainer = document.querySelector(".payment-items");
  const totalPriceContainer = document.querySelector(".total-price");

  let totalPrice = 0;

  paymentCardArray.map((item, index) => {
    let quantity = itemQuantities[item.name] || 1;
    let paymentCardAItem = `
   <div
                    class="payment-item d-flex align-items-center justify-content-between pb-3" id="${index}"
                  >
                    <div class="payment-item-info">
                      <h4>${item.name}</h4>
                      <div class="payment-item-other-info d-flex gap-3">
                        <p class="piece"><span class="piece-number">${quantity}</span>x</p>
                        <span class="one-piece">@ $${item.price}</span>
                        <span class="more-piece">$${
                          item.price * quantity
                        }</span>
                      </div>
                    </div>
                    <i class="bx bx-x" id="cancel-id" onclick="removeItem(this)"></i>
                  </div>
    `;

    payItemsContainer.innerHTML += paymentCardAItem;

    totalPrice += item.price * quantity;
    totalPriceContainer.innerHTML = `$ ${totalPrice}`;
  });
}

function plusItem() {
  const plusBtns = document.querySelectorAll(".plus-btn");

  for (const plusBtn of plusBtns) {
    plusBtn.addEventListener("click", function () {
      let cardName =
        plusBtn.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling.children[1].textContent;
      let cardNumber = plusBtn.previousElementSibling;
      itemQuantities[cardName] += 1;
      cardNumber.textContent = itemQuantities[cardName];

      for (const payItem of document.querySelectorAll(".payment-item")) {
        let paymentItemName = payItem.children[0].children[0].textContent;
        // console.log(paymentItemName);
        let paymentPiece =
          payItem.children[0].children[1].children[0].children[0];

        if (cardName == paymentItemName) {
          paymentPiece.textContent = itemQuantities[cardName];
          let totalItemPrice = payItem.children[0].children[1].children[2];
          totalItemPrice.textContent = `$${
            data.find((item) => item.name === cardName).price *
            itemQuantities[cardName]
          }`;
        }
      }

      totalLength += 1;
      cardLength = Object.values(itemQuantities);

      // console.log(cardLength);

      getCard();
      updateCard();
    });
  }
}

function minusItem() {
  const minusBtns = document.querySelectorAll(".minus-btn");

  for (const minusBtn of minusBtns) {
    minusBtn.addEventListener("click", function () {
      let cardName =
        minusBtn.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling.children[1].textContent;

      let cardNumber = minusBtn.nextElementSibling;
      itemQuantities[cardName] -= 1;
      if (itemQuantities[cardName] < 1) {
        itemQuantities[cardName] = 1;
      }
      cardNumber.textContent = itemQuantities[cardName];

      for (const payItem of document.querySelectorAll(".payment-item")) {
        let paymentItemName = payItem.children[0].children[0].textContent;
        let paymentPiece =
          payItem.children[0].children[1].children[0].children[0];

        if (cardName == paymentItemName) {
          paymentPiece.textContent = itemQuantities[cardName];
          let totalItemPrice = payItem.children[0].children[1].children[2];
          totalItemPrice.textContent = `$${
            data.find((item) => item.name === cardName).price *
            itemQuantities[cardName]
          }`;
        }
      }

      totalLength -= 1;
      cardLength = Object.values(itemQuantities);
      // console.log(cardLength);

      getCard();
      updateCard();
    });
  }
}

function removeItem(e) {
  let nameId = e.parentElement;
  let name = e.parentElement.children[0].children[0];
  paymentCardArray.map((item, index) => {
    if (index == nameId.id) {
      paymentCardArray.splice(index, 1);
      cardLength.splice(index, 1);
      getCard();
      updateCard();
    }
  });
  let plusOrminus;
  for (const element of document.querySelectorAll(".card-name")) {
    if (element.textContent == name.textContent) {
      let addBtn =
        element.parentElement.previousElementSibling.children[1].children[0]
          .children[0];

      plusOrminus =
        element.parentElement.previousElementSibling.children[1].children[0]
          .children[1];
      plusOrminus.classList.remove("active-btn");
      addBtn.classList.add("active-btn");
      let img =
        plusOrminus.parentElement.parentElement.parentElement.children[0];
      img.classList.remove("card-item-active");
    }
  }

  for (const key in itemQuantities) {
    if (key === name.textContent) {
      delete itemQuantities[key];
      plusOrminus.children[1].textContent = 1;
    }
  }
}
const confirmWrapper = document.querySelector(".order-confirm-wrapper");
function getConfirmCard() {
  document.querySelector("body").classList.add("bodyGetConfirmBg");
  confirmWrapper.classList.add("confirm-wrapper-active");

  confirmWrapper.innerHTML = `  <div class="order-confirm-container">
        <img
          src="./assets/images/icon-order-confirmed.svg"
          alt="icon-order-confirmed"
          style="width: 50px"
          class="mb-3"
        />
        <h3 class="mb-1">Order Confirmed</h3>
        <span class="mb-4">We hope you enjoy your food!</span>
        <div class="confirm-items">

        </div>

        <div
          class="payment-order-total d-flex align-items-center justify-content-between py-3"
        >
          <span class="total-title">Order Total</span>
          <h4 class="order-total-price"></h4>
        </div>
        <button class="order-btn mt-3" onclick="restartShopping()">Start New Order</button>
      </div>

      `;

  getConfirmIt();
  // console.log(paymentCardArray);
}

function getConfirmIt() {
  const confirmItems = document.querySelector(".confirm-items");
  const totalPriceContainerConfirm =
    document.querySelector(".order-total-price");

  let totalPrice = 0;
  for (const element of paymentCardArray) {
    let quantity = itemQuantities[element.name] || 1;

    let container = `
    <div
      class="payment-item-confirm d-flex align-items-center justify-content-start"
    >
      <img
        src="${element.image.desktop}"
        style="width: 50px"
        alt=""
        class="rounded me-3"
      />
      <div class="payment-item-info me-2">
        <h4>${element.name}</h4>
        <div class="payment-item-other-info d-flex gap-3">
          <span class="piece">${quantity}x</span>
          <span class="one-piece">@ $5.50</span>
        </div>
      </div>
      <span class="more-piece ms-auto confirm-piece">$${
        element.price * quantity
      }</span>
    </div>

    

`;

    totalPrice += element.price * quantity;
    totalPriceContainerConfirm.textContent = `$ ${totalPrice}`;
    confirmItems.innerHTML += container;
  }
}

function restartShopping() {
  paymentCardArray = [];
  cardLength = [];
  itemQuantities = {};
  getCard();
  updateCard();
  document.querySelector("body").classList.remove("bodyGetConfirmBg");
  confirmWrapper.classList.remove("confirm-wrapper-active");

  for (const element of document.querySelectorAll(".card-name")) {
    let addBtn =
      element.parentElement.previousElementSibling.children[1].children[0]
        .children[0];

    let plusOrminus =
      element.parentElement.previousElementSibling.children[1].children[0]
        .children[1];
    plusOrminus.classList.remove("active-btn");
    addBtn.classList.add("active-btn");
    plusOrminus.children[1].textContent = 1;

    let img = plusOrminus.parentElement.parentElement.parentElement.children[0];
    img.classList.remove("card-item-active");
  }

  // console.log(paymentCardArray);
  // console.log(cardLength);
}
