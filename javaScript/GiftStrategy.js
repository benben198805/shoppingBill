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