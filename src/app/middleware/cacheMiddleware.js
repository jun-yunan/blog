// const cacheMiddleware = (req, res, next) => {
//     res.setHeader('Cache-Control', 'public, max-age=1800');
//     next();
// };
// module.exports = cacheMiddleware;

const cacheMiddleware = (req, res, next) => {
    // // Kiểm tra header If-Modified-Since trong yêu cầu
    // const ifModifiedSince = req.headers['if-modified-since'];
    // if (ifModifiedSince) {
    //     // Nếu header If-Modified-Since có tồn tại
    //     const lastModified = new Date(res.locals.lastModified); // Giả sử res.locals.lastModified chứa giá trị Last-Modified của response

    //     // Kiểm tra nếu giá trị Last-Modified không thay đổi so với giá trị trong header If-Modified-Since
    //     if (lastModified <= new Date(ifModifiedSince)) {
    //         // Trả về mã trạng thái 304 (Not Modified) nếu dữ liệu không thay đổi
    //         return res.status(304).end();
    //     }
    // }

    // // Nếu dữ liệu có thay đổi, thiết lập giá trị Last-Modified cho header
    // const currentTime = new Date().toUTCString();
    // res.setHeader('Last-Modified', currentTime);

    // Thiết lập Cache-Control cho header
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Chuyển tiếp đến middleware hoặc route tiếp theo
    next();
};

module.exports = cacheMiddleware;

// app.use(cacheMiddleware);
