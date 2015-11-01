function Pagination(currentPageIndex, elementsPerPage, elementsTotal, args) {
  this.currentPageIndex = parseInt(currentPageIndex);
  this.elementsPerPage = parseInt(elementsPerPage);
  this.elementsTotal = parseInt(elementsTotal);
  this.prefix = '';
  for(var key in args) {
    this.prefix += key + '=' + args[key] + '&';
  }
  this.maxPageIndex = Math.ceil(elementsTotal / elementsPerPage);
  this.startIndex = (currentPageIndex - 1) * elementsPerPage;
}
module.exports = Pagination;
