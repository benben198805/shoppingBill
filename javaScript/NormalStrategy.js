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