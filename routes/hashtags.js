var express = require("express");
var router = express.Router();
const Hashtag = require('../models/hashtags');

// Add new hashtag
router.post("/", async (req, res) => {
    const { pwittId, hashtag } = req.body;
    // Check if the hashtag already exists
    const hashtagId = await Hashtag.exists({ hashtag });

    if (hashtagId) {
        // Add the pwitt in pwitts list
        Hashtag.findByIdAndUpdate(hashtagId, { $push: { pwittsList: pwittId } })
            .then(data => {
                if (data.modifiedCount) {
                    // Pwitt removed in like list
                    return res.json({ result: true, pwittAdded: pwittId });
                } else {
                    // Pwitt not removed in like list
                    return res.status(400).json({ result: false, error: 'Pwitt not added' });
                }
            })
            // Update error
            .catch(error => res.status(400).json({ result: false, error }));
    } else {
        // Create the hashtag with the pwitt in pwitts list
        const newHashtagObj = new Hashtag({
            hashtag,
            pwitts: [pwittId],
        });

        newHashtagObj.save()
            .then(hashtagObj => {
                return res.json({ result: true, hastagAdded: hashtagObj.hashtag });
            })
            .catch(error => res.status(400).json({ result: false, error }));
    }
});

module.exports = router;
