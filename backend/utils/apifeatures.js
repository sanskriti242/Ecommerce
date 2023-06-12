class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //product with similar pattern name
            $options: "i", //case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword }); //updating find function using keyword we created above
    return this; //returning the same class
  }
  filter() {
    //category
    const queryCopy = { ...this.queryStr }; //we we directly write this.queryStr then it will be passed as reference new copy will not be created
    //removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    //filter for price and rating
    // console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy); //converting object to string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr)); //this.query means Product.find()
    // console.log(queryStr);
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //if no pageNum then currentPage=1, queryStr is a string converting to number
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip); //this.query will find all products then we put a limit according to currentPage starting pages are skipped
    return this;
  }
}
module.exports = ApiFeatures;
