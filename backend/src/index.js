const express = require("express");
const sessions = require("./data/sessions");
const cors = require("cors");
const delayPromise = require("./lib/delayPromise");

const app = express();
const port = 3100;

app.use(cors());

app.get("/api/sessions", async (req, res) => {
    await delayPromise(Math.random() * 500);
    
    // Extract page and pageSize from query parameters
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 20;

    // Calculate starting and ending indices
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Slice the sessions data to get the page's data
    const pagedData = sessions.data.slice(startIndex, endIndex);

    // Determine if there are more items to fetch for pagination
    const hasMore = endIndex < sessions.metaData.totalCount;

    // Send paginated response
    res.send({
        data: pagedData,
        metaData: {
            count: pagedData.length,
            totalCount: sessions.metaData.totalCount,
            hasMore
        }
    });
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
