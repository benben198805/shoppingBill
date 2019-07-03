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
