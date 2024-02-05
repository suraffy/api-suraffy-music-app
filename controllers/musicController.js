const Music = require("../models/musicModel");

const filter = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) =>
    allowedFields.includes(prop) ? (newObj[prop] = obj[prop]) : undefined
  );

  return newObj;
};

exports.createMuisc = async (req, res) => {
  try {
    req.body.owner = req.user.id;

    const allowedFields = ["title", "artist", "genre", "album"];
    const filteredBody = filter(req.body, allowedFields);

    const music = new Music(filteredBody);
    await music.save();

    res.status(201).json({ music });
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

exports.getAllMusic = async (req, res) => {
  try {
    const filter = {};
    filter.owner = req.user.id;

    const options = {};
    options.limit = parseInt(req.query.limit);
    options.skip = parseInt(req.query.skip);

    const musics = await Music.find(filter, null, options);

    res.status(200).json({ results: musics.length, musics });
  } catch (err) {
    res.status(500).json({ error: "Can not get musics!" });
  }
};

exports.getMusic = async (req, res) => {
  try {
    const _id = req.params.id;
    const owner = req.user.id;

    const music = await Music.findOne({ _id, owner });
    if (!music) return res.status(404).json({ error: "Music not found!" });

    res.status(200).json({ music });
  } catch (err) {
    res.status(500).json({ error: "Can not get music!" });
  }
};

exports.updateMusic = async (req, res) => {
  try {
    const _id = req.params.id;
    const owner = req.user.id;

    const allowedFields = ["title", "artist", "genre", "album"];
    const filteredBody = filter(req.body, allowedFields);

    const music = await Music.findOneAndUpdate({ _id, owner }, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!music) return res.status(404).json({ error: "Music not found!" });

    res.status(200).json({ music });
  } catch (err) {
    res.status(400).json({ error: "Can not update music!" });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    const _id = req.params.id;
    const owner = req.user.id;

    const music = await Music.findOneAndDelete({ _id, owner });
    if (!music) return res.status(404).json({ error: "Music not found!" });

    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: "Can not delete music!" });
  }
};
