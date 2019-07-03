function Product(id, name, price, unit) {
	this.id = id;
	this.name = name;
	this.price = price;
	this.unit = unit;
}

function DiscountStrategy() {
	this.discountItem = ["ITEM000001", "ITEM000002"];
	this.DISCOUNT = 0.95;
}
DiscountStrategy.prototype.isInStrategyScope = function (itemId) {
	return this.discountItem.includes(itemId);
};

DiscountStrategy.prototype.getTotalPrice = function (price, count) {
	return parseFloat((count * price * this.DISCOUNT).toFixed(2));
};

DiscountStrategy.prototype.getConent = function (product, count) {
	const paid = this.getTotalPrice(product.price, count);
	return "<br>" + "<br>" + "名称： " + product.name + "， 数量: " + count + product.unit + "， " +
		"单价： " + product.price + "（元）， " +
		"小计： " + paid + "（元）， " +
		"节省： " + (product.price * count - paid) + "（元）";
};

function GiftStrategy() {
	this.buyTwoAndGiveOneItem = ["ITEM000001", "ITEM0000021"];
}
GiftStrategy.prototype.isInStrategyScope = function (itemId) {
	return this.buyTwoAndGiveOneItem.includes(itemId);
};

GiftStrategy.prototype.getTotalPrice = function (price, count) {
	const leftCount = parseFloat((Math.floor(count / 3) * 2 + count % 3).toFixed(2));
	return price * leftCount;
};

GiftStrategy.prototype.getConent = function (product, count) {
	const paid = this.getTotalPrice(product.price, count);
	return "<br>" + "<br>" + "名称： " + product.name + "， 数量: " + count + product.unit + "， " +
		"单价： " + product.price + "（元）， " +
		"小计： " + paid + "（元）， " +
		"节省： " + (product.price * count - paid) + "（元）";
};

GiftStrategy.prototype.getGiftConent = function (product, count) {
	const leftCount = parseFloat((Math.floor(count / 3) * 2 + count % 3).toFixed(2));
	return "<br>" + "<br>" + "名称： " + product.name + "， 数量: " + (count - leftCount) + product.unit;
};

function NormalStrategy() {}

NormalStrategy.prototype.isInStrategyScope = function (itemId) {
	return true
};

NormalStrategy.prototype.getTotalPrice = function (price, count) {
	return price * count;
};

NormalStrategy.prototype.getConent = function (product, count) {
	return "<br>" + "<br>" + "名称： " + product.name + "， 数量: " + count + product.unit + "， " +
		"单价： " + product.price + "（元）， " +
		"小计： " + this.getTotalPrice(product.price, count) + "（元）";
};

function Store() {
	this.productList = initProduct();
	this.strategies = [new GiftStrategy(), new DiscountStrategy(), new NormalStrategy()];
	this.shoppingCart = new Map();
	this.SPLITTER = "-";

	function initProduct() {
		var productStore = new Map();
		productStore.set("ITEM000001", new Product("ITEM000001", "苹果", 5.5, "斤"));
		productStore.set("ITEM000002", new Product("ITEM000002", "羽毛球", 1, "个"));
		productStore.set("ITEM000003", new Product("ITEM000003", "可口可乐", 2, "瓶"));
		productStore.set("ITEM000004", new Product("ITEM000004", "巧克力", 10, "盒"));
		return productStore;
	}
}
Store.prototype.processShoppingCart = function (itemInput) {
	for (var i = 0; i < itemInput.length; i++) {
		var item = itemInput[i];
		var splitterIndex = item.search(this.SPLITTER);
		if (splitterIndex === -1) {
			this.shoppingCart.has(item) ?
				this.shoppingCart.set(item, this.shoppingCart.get(item) + 1) :
				this.shoppingCart.set(item, 1);
		} else {
			var itemId = item.substr(0, splitterIndex);
			var itemNum = item.substr(splitterIndex + 1);
			this.shoppingCart.has(itemId) ?
				this.shoppingCart.set(itemId, this.shoppingCart.get(item) + parseInt(itemNum)) :
				this.shoppingCart.set(itemId, parseInt(itemNum));
		}
	}
}

Store.prototype.printBill = function () {
	var actualPaidSum = 0;
	var discountSum = 0;
	var totalPrice = 0;
	var totalProductText = "所购物品如下:";
	var giftText = "买二赠一商品: ";

	for (var [itemId, count] of this.shoppingCart) {
		var product = this.productList.get(itemId);
		for (var strategy of this.strategies) {
			if (strategy.isInStrategyScope(itemId)) {
				actualPaidSum = actualPaidSum + strategy.getTotalPrice(product.price, count);
				totalProductText = totalProductText + strategy.getConent(product, count);
				if (strategy instanceof GiftStrategy) {
					giftText += strategy.getGiftConent(product, count);
				}
				break;
			}
		}
		totalPrice = totalPrice + product.price * count;
	}

	document.getElementById("productdetail").innerHTML = totalProductText;
	document.getElementById("discountdetail").innerHTML = giftText;
	document.getElementById("total").innerHTML = "总价：" + actualPaidSum + "（元）" + "<br>" + "<br>" +
		"节省： " + (totalPrice - actualPaidSum).toFixed(2) + "（元）";
}

var order = ["ITEM000001", "ITEM000001", "ITEM000001", "ITEM000002-5", "ITEM000003-2", "ITEM000003", "ITEM000004"];
const store = new Store();
store.processShoppingCart(order);
store.printBill();