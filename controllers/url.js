const shortid = require("shortid");
const URL = require('../models/url')

/*async function handleGenerateNewShortURL(req , res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' })
   const shortID = shortid();
   await URL.create({
      shortId : shortID,
      redirectURL : body.url,
      visitHistory : [],
   });
   
      return res.render("home" , {
     id: shortID,
   });
}*/

   async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Check if the URL already exists (optional, depending on your logic)
    const existing = await URL.findOne({ redirectURL: body.url });
    if (existing) {
        return res.render("home", { id: existing.shortId });
    }

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render("home", {
        id: shortID,
    });
}




async function handleGetAnalytics(req , res)
{
    const shortId = req.params.shortId;
    const result = await findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length , analytics:result.visitHistory,

     });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};