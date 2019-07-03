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